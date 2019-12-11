import uuid from 'uuid'

export class RoomId {
  private _id: string

  constructor(id?: string) {
    this._id = id ? id : uuid.v4()
  }

  public asString() {
    return this._id
  }
}
