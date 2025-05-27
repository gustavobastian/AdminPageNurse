export class BedStats{      
    public _bedId: number;    
    public _st: number;
    public _spec: number;
    
    constructor(bedId: number, st: number, spec:number){        
        this._bedId= bedId;
        this._st= st;        
        this._spec= spec;        
    } 

    public get_bedId():number{
        return this._bedId;    
    }
    public get_st():number{
        return this._st;    
    }    
    public get_spec():number{
        return this._spec;    
    }    
    
    public set_bedId(num:number){
        this._bedId=num;    
    }
    public set_st(num:number){
        this._st=num;    
    }
    public set_spec(num:number){
        this._spec=num;    
    }

}