const TYPES = {
  RoomRepository: Symbol.for('RoomRepository'),
  CreateRoomUseCase: Symbol.for('CreateRoomUseCase'),
  DisconnectUseCase: Symbol.for('DisconnectUseCase'),
  JoinRoomUseCase: Symbol.for('JoinRoomUseCase'),
  StartRecordingUseCase: Symbol.for('StartRecordingUseCase'),
  CompleteRecordingUseCase: Symbol.for('CompleteRecordingUseCase'),
  ClientMessenger: Symbol.for('ClientMessenger'),
  OnDynamoDbChangeUseCase: Symbol.for('OnDynamoDbChangeUseCase'),
}

export { TYPES }
