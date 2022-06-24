export class User {
  private _userId: number;
  private _username: string;
  private _firstname: string;
  private _lastname: string;
  private _occupation: string;
  private _state: number;
  private _password: string;

  constructor(
    userId: number,
    username: string,
    firstName: string,
    lastName: string,
    occupation: string,
    state: number,
    password: string
  ) {
    this._userId = userId;
    this._username = username;
    this._firstname = firstName;
    this._lastname = lastName;
    this._occupation = occupation;
    this._state = state;
    this._password = password;
  }

  public set userId(value: number) {
    this._userId = value;
  }
  public set username(value: string) {
    this._username = value;
  }
  public set firstname(value: string) {
    this._firstname = value;
  }
  public set lastname(value: string) {
    this._lastname = value;
  }
  public set occupation(value: string) {
    this._occupation = value;
  }
  public set state(state: number) {
    this._state = state;
  }
  public set password(password: string) {
    this._password = password;
  }

  public get userId(): number {
    return this._userId;
  }
  public get username(): string {
    return this._username;
  }
  public get firstName(): string {
    return this._firstname;
  }
  public get lastName(): string {
    return this._lastname;
  }
  public get occupation(): string {
    return this._occupation;
  }
  public get state(): number {
    return this._state;
  }
  public get password(): string {
    return this._password;
  }
}
