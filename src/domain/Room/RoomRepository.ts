import { Room } from './Room'
import { RoomId } from './RoomId'
import { UserId } from './User/UserId'

export interface RoomRepository {
  findById(id: RoomId): Promise<Room | undefined>
  findByUserId(id: UserId): Promise<Room | undefined>
  store(room: Room): Promise<void>
}
