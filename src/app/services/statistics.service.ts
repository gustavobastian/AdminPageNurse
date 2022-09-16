import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class StatisticsService {

  postId;
  //array of beds
  urlApi = environment.urlApi;

  constructor(private _http: HttpClient) { }

  //getting all pacients information
  getStatsAllPatient(): Promise<string> {
    console.log("here 2")
    return this._http
      .get(this.urlApi + "/api/Statistics/promPatient")
      .toPromise()
      .then((response: string) => {
        console.log(response);
        return response;
      });
  }

  //getting all nurses information
  getStatsAllNurse(): Promise<string> {    
    return this._http
      .get(this.urlApi + "/api/Statistics/promNurse")
      .toPromise()
      .then((response: string) => {
        console.log(response);
        return response;
      });
  }

  //getting all treatment information
  getStatsAllTreatment(): Promise<string> {    
    return this._http
      .get(this.urlApi + "/api/Statistics/promTreatment")
      .toPromise()
      .then((response: string) => {
        console.log(response);
        return response;
      });
  }

  //getting all treatment information
  getStatsAllNurseSpec(): Promise<string> {    
    return this._http
      .get(this.urlApi + "/api/Statistics/promNurseSpec")
      .toPromise()
      .then((response: string) => {
        console.log(response);
        return response;
      });
  }

}
