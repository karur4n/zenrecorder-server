import { inject, injectable } from 'inversify'
import { RoomRepository } from '../../domain/Room/RoomRepository'
import { RoomId } from '../../domain/Room/RoomId'
import { User } from '../../domain/Room/User/User'
import { UserId } from '../../domain/Room/User/UserId'
import { UserName } from '../../domain/Room/User/UserName'
import { TYPES } from '../../di/types'
import { DomainRuleError } from '../../domain/DomainRuleError'

@injectable()
export class JoinRoomUseCase {
  public constructor(@inject(TYPES.RoomRepository) private roomRepository: RoomRepository) {}

  public async execute(roomId: string, userId: string, userName: string): Promise<void> {
    const user = new User(new UserId(userId), new UserName(userName))
    const room = await this.roomRepository.findById(new RoomId(roomId))

    if (room == undefined) {
      throw new DomainRuleError()
    }

    room.join(user)
    await this.roomRepository.store(room)
  }
}
