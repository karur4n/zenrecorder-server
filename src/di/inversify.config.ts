import { Container } from 'inversify'
import { TYPES } from './types'
import { RoomRepository } from '../domain/Room/RoomRepository'
import { RoomRepositoryImpl } from '../infrastructure/repositoryImpl/RoomRepositoryImpl'
import { JoinRoomUseCase } from '../application/usecases/JoinRoomUseCase'
import { CreateRoomUseCase } from '../application/usecases/createRoomUseCase'
import { DisconnectUseCase } from '../application/usecases/DisconnectUseCase'
import { StartRecordingUseCase } from '../application/usecases/StartRecordingUseCase'
import { CompleteRecordingUseCase } from '../application/usecases/CompleteRecordingUseCase'
import { ClientMessenger } from '../application/ClientMessenger'
import { ClientMessengerImpl } from '../infrastructure/ClientMessengerImpl'
import { OnDynamoDbChangeUseCase } from '../application/usecases/OnDynamoDbChangeUseCase'

const myContainer = new Container()
myContainer.bind<RoomRepository>(TYPES.RoomRepository).to(RoomRepositoryImpl)
myContainer.bind<CreateRoomUseCase>(TYPES.CreateRoomUseCase).to(CreateRoomUseCase)
myContainer.bind<DisconnectUseCase>(TYPES.DisconnectUseCase).to(DisconnectUseCase)
myContainer.bind<JoinRoomUseCase>(TYPES.JoinRoomUseCase).to(JoinRoomUseCase)
myContainer.bind<StartRecordingUseCase>(TYPES.StartRecordingUseCase).to(StartRecordingUseCase)
myContainer.bind<CompleteRecordingUseCase>(TYPES.CompleteRecordingUseCase).to(CompleteRecordingUseCase)
myContainer.bind<ClientMessenger>(TYPES.ClientMessenger).to(ClientMessengerImpl)
myContainer.bind<OnDynamoDbChangeUseCase>(TYPES.OnDynamoDbChangeUseCase).to(OnDynamoDbChangeUseCase)

export { myContainer }
