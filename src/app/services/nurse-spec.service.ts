import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { environment } from "src/environments/environment";
import { NurseSpec } from "../models/nurseSpec";

@Injectable({
  providedIn: 'root'
})
export class NurseSpecService {
  postId;
  urlApi = environment.urlApi;

  constructor(private _http: HttpClient) { }

  //getting all especialization on database
  async getAllNurseSpec(userId: number): Promise<NurseSpec[]> {
    
    const headers = new HttpHeaders();
    return this._http
      .get(this.urlApi + "/api/NurseSpecTable/"+userId,{ headers: headers})
      .toPromise()
      .then((specs: NurseSpec[]) => {
        console.log(specs);
        return specs;
      });
  }
  //sending new spec 
  //[{Spec: "Enfermeria de salud mental"}]
  async sendNurseNewSpec(specId: number,userId: number){
    let data=[{"specId": specId, "userId": userId}]
    //console.log(JSON.stringify(output));
        
    const headers = new HttpHeaders();
    headers.append('Content-Type', 'application/json');    
    this._http
      .post<any>(this.urlApi + "/api/NurseSpecTable/", data, {headers})
      .subscribe((data) => {
        this.postId = data.id;
      });
  }

  /**
    * removing a especialization from the table
    *  
    */
   async deleteSpecFromTable(specId:number) {
    const headers = new HttpHeaders();
    headers.append('Content-Type', 'application/json');           
    
    this._http
      .delete<any>(this.urlApi + "/api/NurseSpecTable/"+specId,{ headers: headers})
      .subscribe((data) => {
        this.postId = data;
      });
  }
}
