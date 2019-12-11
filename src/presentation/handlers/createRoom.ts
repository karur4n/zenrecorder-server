require('dotenv').config()

import { Context, Callback, APIGatewayEvent } from 'aws-lambda'
import { myContainer } from '../../di/inversify.config'
import { TYPES } from '../../di/types'
import { CreateRoomUseCase } from '../../application/usecases/CreateRoomUseCase'

export const handler = async (_: APIGatewayEvent, __: Context, callback: Callback) => {
  const createRoomUseCase = myContainer.get<CreateRoomUseCase>(TYPES.CreateRoomUseCase)

  const room = await createRoomUseCase.execute()

  callback(null, {
    statusCode: 200,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Credentials': true,
    },
    body: JSON.stringify({
      roomId: room.id.asString(),
    }),
  })
}
