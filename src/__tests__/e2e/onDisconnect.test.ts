import { handler } from '../../presentation/handlers/onDisconnect'
import { dummyCallback } from './dummyCallback'

const event = {
  requestContext: {
    connectionId: '11',
  },
}
;(async () => {
  try {
    await handler(event as any, undefined as any, dummyCallback as any)
  } catch (e) {
    console.log(e)
  }
})()
