require('dotenv').config()

import { Context, Callback, APIGatewayEvent } from 'aws-lambda'
import { myContainer } from '../../di/inversify.config'
import { DisconnectUseCase } from '../../application/usecases/DisconnectUseCase'
import { TYPES } from '../../di/types'

export const handler = async (event: APIGatewayEvent, _: Context, callback: Callback) => {
  const connectionId = event.requestContext.connectionId!

  const disconnectUseCase = myContainer.get<DisconnectUseCase>(TYPES.DisconnectUseCase)

  await disconnectUseCase.execute(connectionId)

  callback(null, {
    statusCode: 204,
  })
}
