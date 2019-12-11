import { ClientMessenger, ClientMessengerStaleConnectionError } from '../application/ClientMessenger'
import { ApiGatewayManagementApi } from 'aws-sdk'
import { injectable } from 'inversify'

@injectable()
export class ClientMessengerImpl implements ClientMessenger {
  private apiGatewayManagementApi: ApiGatewayManagementApi

  constructor() {
    this.apiGatewayManagementApi = new ApiGatewayManagementApi({
      apiVersion: '2018-11-29',
      endpoint: 'https://8mre732jfk.execute-api.ap-northeast-1.amazonaws.com/production',
    })
  }

  public async post(connectionId: string, body: string): Promise<any> {
    const params = {
      ConnectionId: connectionId,
      Data: body,
    }

    try {
      await this.apiGatewayManagementApi.postToConnection(params).promise()

      console.log('コネクションID', connectionId)
      return
    } catch (e) {
      if (e.statusCode === 410) {
        console.log('このエラー', connectionId)
        throw new ClientMessengerStaleConnectionError()
      } else {
        throw e
      }
    }
  }
}
