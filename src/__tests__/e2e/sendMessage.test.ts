import { handler } from '../../presentation/handlers/sendMessage/sendMessage'
import { dummyCallback } from './dummyCallback'

// const event = {
//   body: JSON.stringify({
//     type: 'JOIN_ROOM',
//     payload: {
//       roomId: '66999356-0197-41a7-b93b-77e9f8e8a82f',
//       userName: 'Foo',
//     },
//   }),
//   requestContext: {
//     connectionId: '11',
//   },
// }

const event = {
  body: JSON.stringify({
    type: 'JOIN_ROOM',
    payload: {
      roomId: '1723ec75-5d6c-49a1-9370-576a474f1fa3',
      userName: '古河和樹',
    },
  }),
  requestContext: {
    connectionId: 'BBFRueneNjMCJSg=',
  },
}
;(async () => {
  try {
    await handler(event as any, undefined as any, dummyCallback as any)
  } catch (e) {
    console.log(e)
  }
})()
