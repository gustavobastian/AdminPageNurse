export class Spec {
  private _id: number;
  private _name: string;
  

  constructor(
    id: number,
    Name: string,    
  ) {
    this._id = id;
    this._name = Name;
    
  }

  public get_specId() {
    return this._id;
  }
  
  public get_name() {
    return this._name;
  }

  public set_name(name: string) {
    this._name = name;
  }
  public set specId(specId: number) {
    this._id = specId;
  }
  
}
