export class CalendarEvent {
    public _eventId: number;
    public _pacientId: number;    
    public _dateTime: string;
    public _type: string;
    public _note: string;

    constructor(eventId: number, pacientId: number, dateTime:string, type:string, note:string){
        this._dateTime=dateTime;
        this._eventId= eventId;
        this._note=note;
        this._pacientId= pacientId;
        this._type=type

    }

    public get type():string{
        return this._type;
    }
    public get note():string{
        return this._note;
    }
    public get dateTime():string{
        return this._dateTime;
    }
    public get pacientId():number{
        return this._pacientId;
    }
    public get eventId():number{
        return this._eventId;
    }
    public set type( type:string){
        this._type=type;
    }
    public set note(noteL:string){
        this._note=noteL;
    }
    public set dateTime(dateTimeL:string){
        this._dateTime=dateTimeL;
    }
    public set pacientId(i:number){
        this._pacientId=i;
    }
    public set eventId(i:number){
        this._eventId=i;
    }

}