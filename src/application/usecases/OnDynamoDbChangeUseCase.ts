import { inject, injectable } from 'inversify'
import { RoomRepository } from '../../domain/Room/RoomRepository'
import { RoomId } from '../../domain/Room/RoomId'
import { UserId } from '../../domain/Room/User/UserId'
import { UserName } from '../../domain/Room/User/UserName'
import { TYPES } from '../../di/types'
import { DynamoDBStreamEvent } from 'aws-lambda'
import { Room } from '../../domain/Room/Room'
import { User } from '../../domain/Room/User/User'
import { ClientMessenger, ClientMessengerStaleConnectionError } from '../ClientMessenger'
import { RecordingStartedAt } from '../../domain/Room/RecordingStartedAt'

@injectable()
export class OnDynamoDbChangeUseCase {
  public constructor(
    @inject(TYPES.ClientMessenger) private clientMessenger: ClientMessenger,
    @inject(TYPES.RoomRepository) private roomRepository: RoomRepository
  ) {}

  public async execute(event: DynamoDBStreamEvent): Promise<void> {
    const newRoomRecords = event.Records.filter((r) => r.eventName === 'MODIFY')

    const newRooms = newRoomRecords.map(
      (record): Room => {
        return mapNewImageToRoom(record.dynamodb!.NewImage)
      }
    )

    for (const room of newRooms) {
      for (const user of room.users) {
        try {
          await this.clientMessenger.post(user.id.asString(), JSON.stringify(room.toObject()))
        } catch (e) {
          if (e instanceof ClientMessengerStaleConnectionError) {
            room.exit(user)

            await this.roomRepository.store(room)

            continue
          }

          throw e
        }
      }
    }
  }
}

function mapNewImageToRoom(image: any): Room {
  const roomId = new RoomId(image.roomId.S)
  const recordingStatus = image.status.S

  const users = image.users.L.map(
    (userRecord: any): User => {
      const userId = new UserId(userRecord.M.id.S)
      const userName = new UserName(userRecord.M.name.S)

      return new User(userId, userName)
    }
  )

  const recordingStartedAt =
    image.recordingStartedAt && image.recordingStartedAt.S
      ? RecordingStartedAt.ofByString(image.recordingStartedAt.S)
      : undefined

  return new Room(roomId, users, recordingStartedAt, recordingStatus)
}
