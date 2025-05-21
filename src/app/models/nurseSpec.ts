export class NurseSpec {
  public _id: number;  
  private _specId: number;
  private _name: string;
  

  constructor(
    id: number,
    Name: string,        
    specId: number,
  ) {
    this._id = id;
    this._name = Name;
    this._specId = specId;
    
  }

  public get_specId() {
    return this._specId;
  }
  
  public get_name() {
    return this._name;
  }
  public Name() {
    return this._name;
  }
  public set_userId(name: string) {
    this._name = name;
  }
  public set_specId(specId: number) {
    this._specId = specId;
  }
  public get_id(): number {
    return this._id ;
  }
  public id(): number {
    return this._id ;
  }
}
