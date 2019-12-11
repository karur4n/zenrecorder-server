import { Room } from './Room'
import { RoomId } from './RoomId'
import { RecordingStatus } from './RecordingStatus'

export function newRoom(): Room {
  return new Room(new RoomId(), [], undefined, RecordingStatus.beforeRecording)
}
