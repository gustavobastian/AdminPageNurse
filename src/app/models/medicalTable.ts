import { NumberSymbol } from "@angular/common";

export class medicalTable {    
    private _medicalTableId: number;    
    private _userTableId:number;
    private _userId: number;
    constructor(medicalTableid:number, userTableid:number, userId: number){
        this._medicalTableId= medicalTableid;
        this._userTableId= userTableid;
        this._userId=userId;
    }

    public get medicalTableId():number{
        return this._medicalTableId;
    }
    public get userid():number{
        return this._userId;
    }
    public get userTableId():number{
        return this._userTableId;
    }
    public set userTableId( i :number){
        this._userTableId=i ;
    }
    public set userId( i :number){
        this._userId=i ;
    }
    public set medicalTableId( i :number){
        this._medicalTableId=i;
    }

}