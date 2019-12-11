import { UserName } from './UserName'
import { UserId } from './UserId'

export class User {
  private _id: UserId
  private _name: UserName

  constructor(id: UserId, name: UserName) {
    this._id = id
    this._name = name
  }

  get id(): UserId {
    return this._id
  }

  get name(): UserName {
    return this._name
  }
}
