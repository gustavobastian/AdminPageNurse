export class userStats{      
    private _userId: number;    
    private _st: number;
    
    constructor(userId: number, st: number){        
        this._userId= userId;
        this._st= st;        
    } 

    public get_userId():number{
        return this._userId;    
    }
    public get_st():number{
        return this._st;    
    }    
    
    public set_userId(num:number){
        this._userId=num;    
    }
    public set_st(num:number){
        this._st=num;    
    }

}