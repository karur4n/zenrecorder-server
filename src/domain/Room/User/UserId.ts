import uuid from 'uuid'

export class UserId {
  private _id: string

  constructor(id?: string) {
    this._id = id ? id : uuid.v4()
  }

  public asString(): string {
    return this._id
  }

  public equals(other: UserId): boolean {
    return this._id === other._id
  }
}
