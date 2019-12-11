import { Context, Callback, APIGatewayEvent } from 'aws-lambda'

export const handler = (_: APIGatewayEvent, __: Context, callback: Callback) => {
  callback(null, {
    statusCode: 204,
  })
}
