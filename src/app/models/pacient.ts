export class Pacient{
    private _pacientId: number;
    private _pacientFirstName: string;
    private _pacientLastName: string;
    private _bedId: number;
    private _notesTableId: number;
    private _userTableId: number;

    constructor(pacientId: number, pacientFirstName: string, pacientLastName: string, bedId: number, notesTableId: number, userTableId: number){
        this._pacientId= pacientId;
        this._pacientFirstName= pacientFirstName;
        this._pacientLastName= pacientLastName;
        this._bedId= bedId;
        this._notesTableId= notesTableId;
        this._userTableId= userTableId;
    }

    public set pacientId(pacient:number){
        this._pacientId=pacient;
    }
    public get pacientId():number{
        return this._pacientId;
    }

    public set pacientFirstName(pacient:string){
        this._pacientFirstName=pacient;
    }
    public get pacientFirstName():string{
        return this._pacientFirstName;
    }
    public set pacientLastName(pacient:string){
        this._pacientLastName=pacient;
    }
    public get pacientLastName():string{
        return this._pacientLastName;
    }
    public set bedId(pacient: number){
        this._bedId=pacient;
    }
    public get bedId():number{
        return this._bedId;
    }
    public set notesTableId(number: number){
        this._notesTableId=number;
    }
    public get notesTableId():number{
        return this._notesTableId;
    }
    public set userTableId(number: number){
        this._userTableId=number;
    }
    public get userTableId():number{
        return this._userTableId;
    }

}