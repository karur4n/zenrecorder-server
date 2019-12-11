import { handler } from '../../presentation/handlers/createRoom'
import { dummyCallback } from './dummyCallback'

const event = {}

handler(event as any, undefined as any, dummyCallback as any)
