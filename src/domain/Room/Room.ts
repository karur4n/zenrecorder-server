import { addSeconds } from 'date-fns'
import { RoomId } from './RoomId'
import { User } from './User/User'
import { RecordingStatus } from './RecordingStatus'
import { UserId } from './User/UserId'
import { RecordingStartedAt } from './RecordingStartedAt'
import { DomainRuleError } from '../DomainRuleError'

export class Room {
  private _id: RoomId
  private _recordingStatus: RecordingStatus
  private _recordingStartedAt?: RecordingStartedAt
  private _users: User[]

  constructor(
    id: RoomId,
    users: User[],
    recordingStartedAt: RecordingStartedAt | undefined,
    recordingStatus: RecordingStatus
  ) {
    this._id = id
    this._recordingStatus = recordingStatus
    this._recordingStartedAt = recordingStartedAt
    this._users = users
  }

  get id(): RoomId {
    return this._id
  }

  get recordingStatus(): RecordingStatus {
    return this._recordingStatus
  }

  get recordingStartedAt(): RecordingStartedAt | undefined {
    return this._recordingStartedAt
  }

  get users(): User[] {
    return this._users
  }

  public getUser(userId: UserId): User | undefined {
    return this._users.find((u) => u.id.equals(userId))
  }

  public join(user: User): void {
    this._users = [...this.users, user]
  }

  public exit(user: User): void {
    this._users = this._users.filter((u) => !u.id.equals(user.id))
  }

  public startRecording(): void {
    if (this._recordingStatus === RecordingStatus.recording) {
      throw new DomainRuleError('すでに収録中です')
    }

    this._recordingStatus = RecordingStatus.recording
    this._recordingStartedAt = RecordingStartedAt.ofByDate(addSeconds(new Date(), 5))
  }

  public completeRecording(): void {
    if (this._recordingStatus === RecordingStatus.completed) {
      throw new DomainRuleError('すでに収録中です')
    }
    this._recordingStatus = RecordingStatus.completed
  }

  public toObject(): object {
    return {
      roomId: this._id.asString(),
      status: this._recordingStatus,
      recordingStartedAt: this._recordingStartedAt ? this._recordingStartedAt.asDate().toString() : undefined,
      users: this._users.map((u) => ({
        id: u.id.asString(),
        name: u.name.asString(),
      })),
    }
  }
}
