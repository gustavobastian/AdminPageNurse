export class logEvent {
    public _logeventId: number;
    public _type: number;    
    public _init: string;
    public _finish: string;
    public _patientId: number;
    public _userId: number;
    public _Note: string;
    public _Note2: string;

    constructor(logEventId: number, type: number, init: string, finish: string, patientId: number, userId: number, Note: string, Note2: string){
        this._logeventId=logEventId;
        this._userId=userId;
        this._Note=Note;
        this._Note2=Note2;  
        this._init=init;
        this._finish=finish;
        this._patientId=patientId;
        this._type=type;

    }
    
    get logeventId():number{
        return this._logeventId;
    }
    get type():number{
        return this._type;
    }
    get patientId():number{
        return this._patientId;
    }
    get userId():number{
        return this._userId;
    }
    get note():string{
        return this._Note;
    }
    get Note2():string{
        return this._Note2;
    }
    get init():string{
        return this._init;
    }
    get finish():string{
        return this._finish;
    }

    //setters

    set logeventId(n:number){
         this._logeventId=n;
    }
    set type(n:number){
        this._type=n;
    }
    set patientId(n:number){
        this._patientId=n;
    }
    set userId(n:number){
        this._userId=n;
    }
    set note(s:string){
        this._Note=s;
    }
    set Note2(s:string){
        this._Note2=s;
    }
    set init(s:string){
        this._init=s;
    }
    set finish(s:string){
        this._finish=s;
    }


}