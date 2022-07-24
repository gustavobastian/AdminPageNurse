export class Pacient {
/*  private _pacientId: number;
  private _firstName: string;
  private _lastName: string;
  private _bedId: number;
  private _notesTableId: number;
  private _userTableId: number;*/
  public _pacientId: number;
  public _firstName: string;
  public _lastName: string;
  public _bedId: number;
  public _notesTableId: number;
  public _userTableId: number;

  constructor(
    pacientId: number,
    firstName: string,
    lastName: string,
    bedId: number,
    notesTableId: number,
    userTableId: number
  ) {
    this._pacientId = pacientId;
    this._firstName = firstName;
    this._lastName = lastName;
    this._bedId = bedId;
    this._notesTableId = notesTableId;
    this._userTableId = userTableId;
  }

  public set pacientId(pacient: number) {
    this._pacientId = pacient;
  }
  public get pacientId(): number {
    return this._pacientId;
  }

  public set firstName(pacient: string) {
    this._firstName = pacient;
  }
  public get firstName(): string {
    return this._firstName;
  }
  public set lastName(pacient: string) {
    this._lastName = pacient;
  }
  public get lastName(): string {
    return this._lastName;
  }
  public set bedId(pacient: number) {
    this._bedId = pacient;
  }
  public get bedId(): number {
    return this._bedId;
  }
  public set notesTableId(number: number) {
    this._notesTableId = number;
  }
  public get notesTableId(): number {
    return this._notesTableId;
  }
  public set userTableId(number: number) {
    this._userTableId = number;
  }
  public get userTableId(): number {
    return this._userTableId;
  }
}
