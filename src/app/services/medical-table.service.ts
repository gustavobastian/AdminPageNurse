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

  async getSingleMedicalsTable(index:number): Promise<medicalTable[]> { 
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
  /**
 * 
 * @param 
 */
   sendDoctorTable(userId: number, userTable:number) {
    const headers = new HttpHeaders();
    headers.append('Content-Type', 'application/json');    

    console.log(userId)
    console.log(userTable)
    
      
    let message=[{"userTableID": 2},{"userID":1}]
    message[0].userID=userId;
    message[0].userTableID=userTable;
    
    
    this._http
      .post<any>(this.urlApi + "/api/medicalTable/", message,{ headers: headers})
      .subscribe((data) => {
        this.postId = data.id;
        console.log(data.id)
      });
   }

   /**
    * removing a doctor from a medical table
    *  
    */
   async deleteDoctorFromTable(medicalTableId:number) {
    const headers = new HttpHeaders();
    headers.append('Content-Type', 'application/json');           
    
    this._http
      .delete<any>(this.urlApi + "/api/medicalTable/"+medicalTableId,{ headers: headers})
      .subscribe((data) => {
        this.postId = data;
      });
  }
}
