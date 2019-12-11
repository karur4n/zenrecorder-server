import { DomainRuleError } from '../../DomainRuleError'

export class UserName {
  private _name: string

  constructor(name: string) {
    if (name.length <= 0) {
      throw new DomainRuleError('UserName が不正')
    }

    this._name = name
  }

  public asString(): string {
    return this._name
  }
}
