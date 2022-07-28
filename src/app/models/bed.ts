export class Bed {
  public _bedId: number;
  public _roomId: number;
  public _callerId: number;
  public _floorId: number;

  constructor(
    bedId: number,
    roomId: number,
    callerId: number,
    floorId: number
  ) {
    this._bedId = bedId;
    this._callerId = callerId;
    this._floorId = floorId;
    this._roomId = roomId;
  }

  public get bedId() {
    return this._bedId;
  }
  public get roomId() {
    return this._roomId;
  }
  public get floorId() {
    return this._floorId;
  }
  public get callerId() {
    return this._callerId;
  }

  public set bedId(bedId: number) {
    this._bedId = bedId;
  }
  public set callerId(callerId: number) {
    this._callerId = callerId;
  }
  public set floorId(floorId: number) {
    this._floorId = floorId;
  }
  public set roomId(roomId: number) {
    this._roomId = roomId;
  }
}
