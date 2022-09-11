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
  }
  
  //asking jwt token

  public async askToken(username,password){
    
    const headers = new HttpHeaders();
    headers.append('Content-Type', 'application/json');
    //{"username":"robertop","password":"1234"}
    let data={"username":username.toString(), "password":password.toString()};
    
    let data2=JSON.stringify(data);
    console.log(data2)
  
    
    await this._http
      .post<any>(this.urlApi + "/api/authentication/",data ,{ headers: headers})
      .subscribe((data) => {
        this.postId = data.id;
        console.log(data.token);
        console.log(data.id)
      });
    }    
}
