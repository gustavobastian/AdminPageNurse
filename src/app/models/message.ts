//[{"messageId":1,"firstname":"Jose","lastname":"laurm","patientId":"1","content":"Se levanto bien"}]
export class Message {
  private _messageId: number;
  private _firstNameSender: string;
  private _lastNameSender: string;
  private _patientId: number;
  private _content: string;

  constructor(
    messageId: number,
    firstNameSender: string,
    lastNameSender: string,
    patientId: number,
    content: string
  ) {
    this._messageId = messageId;
    this._firstNameSender = firstNameSender;
    this._lastNameSender = lastNameSender;
    this._patientId = patientId;
    this._content = content;
  }

  public get messageId(): number {
    return this._messageId;
  }
  public get firstNameSender(): string {
    return this._firstNameSender;
  }
  public get lastNameSender(): string {
    return this._lastNameSender;
  }
  public get content(): string {
    return this._content;
  }
  public get patientId(): number {
    return this._patientId;
  }

  public set messageId(nu: number) {
    this._messageId = nu;
  }
  public set firstNameSender(nu: string) {
    this._firstNameSender = nu;
  }
  public set lastNameSender(nu: string) {
    this._lastNameSender = nu;
  }
  public set content(nu: string) {
    this._content = nu;
  }
  public set patientId(nu: number) {
    this._patientId = nu;
  }
}
