export class Note {
  private _noteId: number;
  private _note: string;
  private _state: string;

  constructor(noteId: number, note: string, state: string) {
    this._noteId = noteId;
    this._note = note;
    this._state = state;
  }

  public set noteId(noteId: number) {
    this._noteId = noteId;
  }
  public set note(note: string) {
    this._note = note;
  }
  public set state(state: string) {
    this._state = state;
  }

  public get note(): string {
    return this._note;
  }
  public get state(): string {
    return this._state;
  }
}
