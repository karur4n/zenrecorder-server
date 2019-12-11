import { inject, injectable } from 'inversify'
import { RoomRepository } from '../../domain/Room/RoomRepository'
import { TYPES } from '../../di/types'
import { newRoom } from '../../domain/Room/RoomFactory'
import { Room } from '../../domain/Room/Room'

@injectable()
export class CreateRoomUseCase {
  public constructor(@inject(TYPES.RoomRepository) private roomRepository: RoomRepository) {}

  public async execute(): Promise<Room> {
    const room = newRoom()

    await this.roomRepository.store(room)

    return room
  }
}
