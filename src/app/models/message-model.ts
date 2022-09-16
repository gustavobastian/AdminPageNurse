export class MessageModel{
    private _username: string;    
    private _content: string;
    private _bedId: number;
    private _time: string;
    private _type: number;

    constructor(userName: string, content: string, bedId: number, time: string, type: number){
        this._username= userName;
        this._content= content;
        this._bedId= bedId;
        this._time= time;
        this._type= type;
    } 

    public get username(){
        return this._username;
    }
    public get content(){
        return this._content;
    }
    public get bedId(){
        return this._bedId;
    }
    public get time(){
        return this._time;
    }
    public get type(){
        return this._type;
    }

    public set username(username: string){
        this._username = username;
    }
    public set content(content: string){
        this._content = content;
    }
    public set bedId(bedId: number){
        this._bedId = bedId;
    }
    public set time(time: string){
        this._time = time;
    }
    public set type(type: number){
        this._type = type;
    }
    
}
