import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError } from 'rxjs/operators';
import { environment } from 'src/environments/environment';


  
@Injectable({
  providedIn: 'root'
})
export class LogStatusService {
  logged=false;
  mode="";
  username="";
  urlApi =  environment.urlApi;
  postId=""

  constructor(private _http: HttpClient) {  
    this.logged=false;
   }
  
  public setLogged(type: boolean){
    this.logged=type;
    if(type==false){
      this.logout();
    }
  }
  
  //asking jwt token

  public async askToken(username:string,password:string) : Promise<boolean>{
    //console.log("username:"+username)
    const headers = new HttpHeaders();
    headers.append('Content-Type', 'application/json');
    
    let data={"username":username.toString(), "password":password.toString()};    
    try{
      console.log("intentamos")
      let response=await this._http.post<any>(this.urlApi + "/api/authentication/",data,{ headers: headers}).toPromise();
      if (response!=null){    
        console.log(response)
        if(response.status=='403'){
          console.log("recibimos 403")
          return false;}
        this.postId = response.signed_user;
        localStorage.setItem('token', response.token);
        //this.postId=response.username;
        //console.log(response.token);
     //   console.log(this.postId);        //console.log(data.id)
        this.mode=response.signed_user.occupation;
        this.username=response.signed_user.username;
      //  console.log(this.mode)
        return true;
    }
    else{console.log("simpleError")
      return false;}
    }catch (e){   
      console.log("cactchamos 403")
      return false;}

    
    
    }
    
public async logout() {
      localStorage.removeItem('token');
    }
       
}
