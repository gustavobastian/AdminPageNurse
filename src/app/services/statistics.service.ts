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

  //getting single pacients information
  getStatsAllPacient(): Promise<string> {
    console.log("here 2")
    return this._http
      .get(this.urlApi + "/api/Statistics/promPacient")
      .toPromise()
      .then((response: string) => {
        console.log(response);
        return response;
      });
  }

}
