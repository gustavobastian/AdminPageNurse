import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { environment } from "src/environments/environment";
import { Spec } from "../models/spec";

@Injectable({
  providedIn: 'root'
})
export class TableSpecService {  
  postId;
  urlApi = environment.urlApi;

  constructor(private _http: HttpClient) {    
   }
  
  //getting all especialization on database
  async getAllSpec(): Promise<Spec[]> {
    console.log("/////////////////////////////////////")
    return this._http
      .get(this.urlApi + "/api/specTable/all")
      .toPromise()
      .then((specs: Spec[]) => {
        console.log(specs);
        return specs;
      });
  }
  //sending new spec 
  //[{Spec: "Enfermeria de salud mental"}]
  async sendNewSpec(name: string) {
    console.log(name);
    let output = ({Spec: name});
    //console.log(JSON.stringify(output));
    let data=[];
    data.push(output);
    const headers = new HttpHeaders();
    headers.append('Content-Type', 'application/json');    
    this._http
      .post<any>(this.urlApi + "/api/specTable/", data, {headers})
      .subscribe((data) => {
        this.postId = data.id;
      });
  }
}
