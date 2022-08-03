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

  //getting all pacients information
  getAllPacients(): Promise<Pacient[]> {
    return this._http
      .get(this.urlApi + "/api/pacient")
      .toPromise()
      .then((pacients: Pacient[]) => {
        console.log(pacients);
        return pacients;
      });
  }
  //getting single pacients information
  getPacient(id: number): Promise<Pacient> {
    return this._http
      .get(this.urlApi + "/api/pacient/"+id)
      .toPromise()
      .then((pacient: Pacient) => {
        console.log(pacient[0]);
        return pacient[0];
      });
  }

  sendNewPacient(newPacient: Pacient) {
    console.log(newPacient);
    let output = JSON.stringify(newPacient);
    console.log(output);
    const headers = new HttpHeaders();
    headers.append('Content-Type', 'application/json');    
    this._http
      .post<any>(this.urlApi + "/api/pacient", newPacient)
      .subscribe((data) => {
        this.postId = data.id;
      });
  }

  sendAlterPacient(pacient: Pacient) {
    console.log(pacient);
    let output = JSON.stringify(pacient);
    console.log(output);
    let id=pacient.pacientId;
    const headers = new HttpHeaders();
    delete pacient.pacientId;
    this._http
      .put<any>(this.urlApi + "/api/pacient/"+id, pacient,{ headers: headers})
      .subscribe((data) => {
        this.postId = data.id;
      });
  
  }

  sendDeletePacient(id: number) {    
    const headers = new HttpHeaders();    
    headers.append('Content-Type', 'application/json');    
    this._http
      .delete<any>(this.urlApi + "/api/pacient/"+id, { headers: headers})
      .subscribe((data) => {
        this.postId = data.id;
      });
  
  }

}
