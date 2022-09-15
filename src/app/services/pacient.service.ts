import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Pacient } from "../models/pacient";
import { environment } from "src/environments/environment";

@Injectable({
  providedIn: "root",
})
export class PacientService {
  postId;
  //array of Pacient
  private beds: Array<Pacient> = new Array<Pacient>();
  //port for api--> must be changed to a global variable
  urlApi = environment.urlApi;

  constructor(private _http: HttpClient) {}

  //getting all patients information
  getAllPacients(): Promise<Pacient[]> {
    return this._http
      .get(this.urlApi + "/api/patient")
      .toPromise()
      .then((pacients: Pacient[]) => {
        console.log(pacients);
        return pacients;
      });
  }
  //getting single patients information
  getPatient(id: number): Promise<Pacient> {
    return this._http
      .get(this.urlApi + "/api/patient/"+id)
      .toPromise()
      .then((pacient: Pacient) => {
        console.log(pacient[0]);
        return pacient[0];
      });
  }

  sendNewPatient(newPatient: Pacient) {
    console.log(newPatient);
    let output = JSON.stringify(newPatient);
    console.log(output);
    const headers = new HttpHeaders();
    headers.append('Content-Type', 'application/json');    
    this._http
      .post<any>(this.urlApi + "/api/patient", newPatient)
      .subscribe((data) => {
        this.postId = data.id;
      });
  }

  sendAlterPatient(patient: Pacient) {
    console.log(patient);
    let output = JSON.stringify(patient);
    console.log(output);
    let id=patient.pacientId;
    const headers = new HttpHeaders();
    delete patient.pacientId;
    this._http
      .put<any>(this.urlApi + "/api/patient/"+id, patient,{ headers: headers})
      .subscribe((data) => {
        this.postId = data.id;
      });
  
  }

  sendDeletePatient(id: number) {    
    const headers = new HttpHeaders();    
    headers.append('Content-Type', 'application/json');    
    this._http
      .delete<any>(this.urlApi + "/api/patient/"+id, { headers: headers})
      .subscribe((data) => {
        this.postId = data.id;
      });
  
  }

}
