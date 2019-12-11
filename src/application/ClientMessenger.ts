export interface ClientMessenger {
  post(connectionId: string, body: string): Promise<void>
}

export class ClientMessengerStaleConnectionError extends Error {
  constructor(...params: any) {
    super(params)

    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, ClientMessengerStaleConnectionError)
    }
  }
}
