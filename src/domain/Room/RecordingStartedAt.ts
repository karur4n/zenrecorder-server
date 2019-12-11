export class RecordingStartedAt {
  private _date: Date

  private constructor(date: Date) {
    this._date = date
  }

  public asDate(): Date {
    return this._date
  }

  public static ofByString(str: string): RecordingStartedAt {
    return new RecordingStartedAt(new Date(str))
  }

  public static ofByDate(date: Date): RecordingStartedAt {
    return new RecordingStartedAt(date)
  }
}
