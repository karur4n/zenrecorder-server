require('dotenv').config()

import { APIGatewayEvent, Context, Callback } from 'aws-lambda'
import { myContainer } from '../../../di/inversify.config'
import { TYPES } from '../../../di/types'
import { JoinRoomUseCase } from '../../../application/usecases/JoinRoomUseCase'
import { StartRecordingUseCase } from '../../../application/usecases/StartRecordingUseCase'
import { CompleteRecordingUseCase } from '../../../application/usecases/CompleteRecordingUseCase'

export const handler = async (event: APIGatewayEvent, _: Context, callback: Callback) => {
  if (event.body == undefined) {
    return callback(null, {
      statusCode: 400,
    })
  }

  const action = JSON.parse(event.body) as Action
  const requestUserId = event.requestContext.connectionId!

  switch (action.type) {
    case 'JOIN_ROOM':
      const joinRoomUseCase = myContainer.get<JoinRoomUseCase>(TYPES.JoinRoomUseCase)
      await joinRoomUseCase.execute(action.payload.roomId, requestUserId, action.payload.userName)
      return callback(null, { statusCode: 200 })
    case 'START_RECORDING':
      const startRecordingUseCase = myContainer.get<StartRecordingUseCase>(TYPES.StartRecordingUseCase)
      await startRecordingUseCase.execute(action.payload.roomId, requestUserId)
      return callback(null, { statusCode: 200 })
    case 'COMPLETE_RECORDING':
      const completeRecordingUseCase = myContainer.get<CompleteRecordingUseCase>(TYPES.CompleteRecordingUseCase)
      await completeRecordingUseCase.execute(action.payload.roomId, requestUserId)
      return callback(null, { statusCode: 200 })
  }
}

const JOIN_ROOM = 'JOIN_ROOM'

type JoinRoomAction = {
  type: typeof JOIN_ROOM
  payload: {
    roomId: string
    userName: string
  }
}

const START_RECORDING = 'START_RECORDING'

type StartRecordingAction = {
  type: typeof START_RECORDING
  payload: {
    roomId: string
  }
}

const COMPLETE_RECORDING = 'COMPLETE_RECORDING'

type CompleteRecordingAction = {
  type: typeof COMPLETE_RECORDING
  payload: {
    roomId: string
  }
}

type Action = JoinRoomAction | StartRecordingAction | CompleteRecordingAction
