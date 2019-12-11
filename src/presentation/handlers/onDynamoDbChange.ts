require('dotenv').config()

import { Context, Callback, DynamoDBStreamEvent } from 'aws-lambda'
import { myContainer } from '../../di/inversify.config'
import { TYPES } from '../../di/types'
import { OnDynamoDbChangeUseCase } from '../../application/usecases/OnDynamoDbChangeUseCase'

export const handler = async (event: DynamoDBStreamEvent, _: Context, callback: Callback) => {
  const onDynamoDbChangeUseCase = myContainer.get<OnDynamoDbChangeUseCase>(TYPES.OnDynamoDbChangeUseCase)

  await onDynamoDbChangeUseCase.execute(event)

  callback(null, {
    statusCode: 204,
  })
}
