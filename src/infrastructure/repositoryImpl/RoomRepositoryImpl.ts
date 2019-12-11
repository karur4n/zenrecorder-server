import 'reflect-metadata'
import { injectable } from 'inversify'
import { DynamoDB, AWSError } from 'aws-sdk'
import { RoomRepository } from '../../domain/Room/RoomRepository'
import { Room } from '../../domain/Room/Room'
import { RoomId } from '../../domain/Room/RoomId'
import { RecordingStatus } from '../../domain/Room/RecordingStatus'
import { DomainRuleError } from '../../domain/DomainRuleError'
import { User } from '../../domain/Room/User/User'
import { UserId } from '../../domain/Room/User/UserId'
import { UserName } from '../../domain/Room/User/UserName'
import { RecordingStartedAt } from '../../domain/Room/RecordingStartedAt'

type GetItemOutput = AWS.DynamoDB.DocumentClient.GetItemOutput

type GetItemOutputItem = {
  roomId: string
  status: string
  users: Array<{
    id: string
    name: string
  }>
  recordingStartedAt?: string
}

const dynamo = new DynamoDB.DocumentClient({
  region: process.env.DYNAMODB_REGION,
})

const TABLE_NAME = process.env.DYNAMODB_TABLE_NAME!

@injectable()
export class RoomRepositoryImpl implements RoomRepository {
  findById(id: RoomId): Promise<Room> {
    return new Promise((resolve, reject) => {
      const params = {
        TableName: TABLE_NAME,
        Key: {
          roomId: id.asString(),
        },
      }
      dynamo.get(params, function(err: AWSError, data: GetItemOutput) {
        if (err != undefined) {
          console.log('dynamo_err:', err)
          return reject(err)
        }

        if (data == undefined || Object.keys(data).length === 0) {
          return resolve(undefined)
        }

        resolve(mapToRoom(data.Item as GetItemOutputItem))
      })
    })
  }

  findByUserId(id: UserId): Promise<Room | undefined> {
    return new Promise((resolve, reject) => {
      const params = {
        TableName: TABLE_NAME,
        ExpressionAttributeValues: { ':userId': id.asString() },
        FilterExpression: `contains (userIds, :userId)`,
      }

      dynamo.scan(params, function(err, data) {
        if (err != undefined) {
          console.log('dynamo_err:', err)
          return reject(err)
        }

        if (data == undefined || data.Items == undefined || data.Items.length === 0) {
          return resolve(undefined)
        }

        resolve(mapToRoom(data.Items[0] as GetItemOutputItem))
      })
    })
  }

  store(room: Room): Promise<void> {
    console.log('room', room)
    return new Promise((resolve, reject) => {
      dynamo.put(
        {
          TableName: TABLE_NAME,
          Item: {
            roomId: room.id.asString(),
            status: room.recordingStatus,
            recordingStartedAt: room.recordingStartedAt ? room.recordingStartedAt.asDate().toString() : undefined,
            users: room.users.map((u) => ({
              id: u.id.asString(),
              name: u.name.asString(),
            })),
            userIds: room.users.map((u) => u.id.asString()),
          },
        },
        function(err: Error | undefined) {
          if (err != undefined) {
            reject(err)
          }

          resolve()
        }
      )
    })
  }
}

function mapToRoom(room: GetItemOutputItem): Room {
  if (room.status in RecordingStatus === false) {
    throw new DomainRuleError('room.status が不正')
  }

  const recordingStartedAt = (() => {
    if (room.recordingStartedAt) {
      RecordingStartedAt.ofByString(room.recordingStartedAt)
    } else {
      return undefined
    }
  })()

  return new Room(
    new RoomId(room.roomId),
    room.users.map((u) => {
      return new User(new UserId(u.id), new UserName(u.name))
    }),
    recordingStartedAt,
    room.status as RecordingStatus
  )
}
