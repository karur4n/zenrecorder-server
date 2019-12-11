import { inject, injectable } from 'inversify'
import { RoomRepository } from '../../domain/Room/RoomRepository'
import { TYPES } from '../../di/types'
import { UserId } from '../../domain/Room/User/UserId'
import { DomainRuleError } from '../../domain/DomainRuleError'

@injectable()
export class DisconnectUseCase {
  public constructor(@inject(TYPES.RoomRepository) private roomRepository: RoomRepository) {}

  public async execute(_userId: string): Promise<void> {
    const userId = new UserId(_userId)

    const room = await this.roomRepository.findByUserId(userId)

    if (room == undefined) {
      throw new DomainRuleError()
    }

    const disconnectedUser = room.getUser(userId)

    if (disconnectedUser == undefined) {
      throw new DomainRuleError()
    }

    room.exit(disconnectedUser)

    await this.roomRepository.store(room)
  }
}
