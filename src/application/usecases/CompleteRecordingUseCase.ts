import { inject, injectable } from 'inversify'
import { RoomRepository } from '../../domain/Room/RoomRepository'
import { RoomId } from '../../domain/Room/RoomId'
import { User } from '../../domain/Room/User/User'
import { UserId } from '../../domain/Room/User/UserId'
import { UserName } from '../../domain/Room/User/UserName'
import { TYPES } from '../../di/types'
import { DomainRuleError } from '../../domain/DomainRuleError'

@injectable()
export class CompleteRecordingUseCase {
  public constructor(@inject(TYPES.RoomRepository) private roomRepository: RoomRepository) {}

  public async execute(roomId: string, rawRequestUserId: string): Promise<void> {
    const room = await this.roomRepository.findById(new RoomId(roomId))

    if (room == undefined) {
      throw new DomainRuleError()
    }

    const requestUserId = new UserId(rawRequestUserId)

    const ルームの参加者でない = room.users.every((u) => !u.id.equals(requestUserId))

    if (ルームの参加者でない) {
      throw new DomainRuleError()
    }

    room.completeRecording()

    await this.roomRepository.store(room)
  }
}
