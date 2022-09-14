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
/*async sendNewSpec(name: string) {
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
  }*/
}
