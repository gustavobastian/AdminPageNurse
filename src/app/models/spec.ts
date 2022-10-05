export class Spec {
  public _id: number;
  public _name: string;
  

  constructor(
    id: number,
    Name: string,    
  ) {
    this._id = id;
    this._name = Name;
    
  }

  public get_id(): number {
    return this._id;
  }
  
  public get_name() {
    return this._name;
  }

  public set_name(name: string) {
    this._name = name;
  }
  public set_specId(specId: number) {
    this._id = specId;
  }

  public Name(){
    return this._name;
  }
  public id(){
    return this._id;
  }
}
