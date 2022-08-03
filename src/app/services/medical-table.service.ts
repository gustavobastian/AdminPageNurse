import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { medicalTable } from '../models/medicalTable';
import { environment } from '../../environments/environment'

@Injectable({
  providedIn: 'root'
})
export class MedicalTableService {
  postId;
  //array of medicals from table
  medicals : Array<medicalTable>=new Array<medicalTable>;
  //port for api--> must be changed to a global variable
  urlApi =environment.urlApi;
  
  constructor(
    private _http: HttpClient
  ) { }

  getAllMedicalsTable(): Promise<medicalTable[]> {    
    const headers = new HttpHeaders();
    headers.append('Content-Type', 'application/json');    
    return this._http
      .get(this.urlApi + "/api/medicalTable",{ headers: headers})
      .toPromise()
      .then((table: medicalTable[]) => {
       // console.log(table);
        return table;
      });
  } 

  getSingleMedicalsTable(index:number): Promise<medicalTable[]> { 
    console.log("index:",index)
    const headers = new HttpHeaders();
    headers.append('Content-Type', 'application/json');    

    return this._http
      .get(this.urlApi + "/api/medicalTable/"+index,{ headers: headers})
      .toPromise()
      .then((table: medicalTable[]) => {
       // console.log(table);
        return table;
      });
  } 

}
