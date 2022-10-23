import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Patient } from "../models/patient";
import { environment } from "src/environments/environment";

@Injectable({
  providedIn: "root",
})
export class PacientService {
  postId;
  //array of Pacient
  private beds: Array<Patient> = new Array<Patient>();
  //port for api--> must be changed to a global variable
  urlApi = environment.urlApi;

  constructor(private _http: HttpClient) {}

  //getting all patients information
  getAllPacients(): Promise<Patient[]> {
    return this._http
      .get(this.urlApi + "/api/patient")
      .toPromise()
      .then((pacients: Patient[]) => {
        console.log(pacients);
        return pacients;
      });
  }
  //getting single patients information
  getPatient(id: number): Promise<Patient> {
    return this._http
      .get(this.urlApi + "/api/patient/"+id)
      .toPromise()
      .then((pacient: Patient) => {
        console.log(pacient[0]);
        return pacient[0];
      });
  }

  sendNewPatient(newPatient: Patient) {
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

  sendAlterPatient(patient: Patient) {
    console.log(patient);
    let output = JSON.stringify(patient);
    console.log(output);
    let id=patient.patientId;
    const headers = new HttpHeaders();
    delete patient.patientId;
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
