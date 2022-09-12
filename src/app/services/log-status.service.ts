import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';


  
@Injectable({
  providedIn: 'root'
})
export class LogStatusService {
  logged=false;
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

  public async askToken(username:string,password:string) : Promise<any> {
    
    const headers = new HttpHeaders();
    headers.append('Content-Type', 'application/json');
    
    let data={"username":username.toString(), "password":password.toString()};    

    let response=await this._http.post<any>(this.urlApi + "/api/authentication/",data,{ headers: headers}).toPromise()
    if (response!=null){    
        this.postId = response.signed_user;
        localStorage.setItem('token', response.token);
        //this.postId=response.username;
        console.log(response.token);
        console.log(this.postId);        //console.log(data.id)
        
    }
    }
    
public async logout() {
      localStorage.removeItem('token');
    }
       
}
