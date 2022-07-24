import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Bed } from "../models/bed";
import { Observable } from "rxjs/internal/Observable";

@Injectable({
  providedIn: "root",
})
export class BedsService {
  postId;
  //array of beds
  private beds: Array<Bed> = new Array<Bed>();
  //port for api--> must be changed to a global variable
  urlApi = "http://localhost:8000";
  constructor(private _http: HttpClient) {}

  getAllbed(): Promise<Bed[]> {
    return this._http
      .get(this.urlApi + "/api/beds")
      .toPromise()
      .then((beds: Bed[]) => {
        console.log(beds);
        return beds;
      });
  }

  //getting single beds information
  getSingleBed(id: number): Promise<Bed> {
    return this._http
      .get(this.urlApi + "/api/beds/"+id)
      .toPromise()
      .then((bed: Bed) => {
        console.log(bed[0]);
        return bed[0];
      });
  }
/**
 * 
 * @param newBed Adding a bed to the system
 */
  sendNewBed(newBed: Bed) {
    newBed.bedId=22;
    
    
    
    const headers = new HttpHeaders();
    headers.append('Content-Type', 'application/json');
    
    delete newBed.bedId;
    
    this._http
      .post<any>(this.urlApi + "/api/beds", newBed,{ headers: headers})
      .subscribe((data) => {
        this.postId = data.id;
      });
   }
/**
 * Modify a bed parameters in the system
 * @param newBed 
 */

  sendAlterBed(newBed: Bed) {
    let id=newBed.bedId;  
    const headers = new HttpHeaders();
    headers.append('Content-Type', 'application/json');    
    delete newBed.bedId;    
    
    this._http
      .put<any>(this.urlApi + "/api/beds/"+id, newBed,{ headers: headers})
      .subscribe((data) => {
        this.postId = data.id;
      });
  }
}
