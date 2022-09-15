import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { environment } from "src/environments/environment";
import { PatientTreat } from "../models/patientTreat";

@Injectable({
  providedIn: 'root'
})
export class PatientTreatService {
  postId;
  urlApi = environment.urlApi;

  constructor(private _http: HttpClient) { }

  //getting all treatment on database of a patient
  async getAllPatientSpec(patientId: number): Promise<PatientTreat[]> {
    console.log("asking for patient")
    const headers = new HttpHeaders();
    return this._http
      .get(this.urlApi + "/api/treatment/"+patientId,{ headers: headers})
      .toPromise()
      .then((specs: PatientTreat[]) => {
        console.log(specs);
        return specs;
      });
  }

  //Adding a new patient treatment
  
  async sendNewTreatment(patienThreat: PatientTreat){
    let data=patienThreat;
    console.log(JSON.stringify(data));
    let data2=[];
    data2.push(data);
        
    const headers = new HttpHeaders();
    headers.append('Content-Type', 'application/json');    
    this._http
      .post<any>(this.urlApi + "/api/treatment/", data2, {headers})
      .subscribe((data) => {
        this.postId = data.id;
      });
  }
  //Altering a new patient treatment
  
  async sendAlterTreatment(patienThreat: PatientTreat){
    let data=patienThreat;
    console.log(JSON.stringify(data));
        
    const headers = new HttpHeaders();
    headers.append('Content-Type', 'application/json');    
    this._http
      .put<any>(this.urlApi + "/api/treatment/", data, {headers})
      .subscribe((data) => {
        this.postId = data.id;
      });
  }
}
