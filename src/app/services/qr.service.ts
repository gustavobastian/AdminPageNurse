import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";


@Injectable({
  providedIn: 'root'
})
export class QRService {
  postId;
  //array of beds
  private qrs: Array<string> = new Array<string>();
  //port for api--> must be changed to a global variable
  urlApi = "http://localhost:8000";

  constructor(private _http: HttpClient) { }

//getting single beds information
getSingleQR(id: number): Promise<string> {
  return this._http
    .get(this.urlApi + "/api/QR/"+id)
    .toPromise()
    .then((output: string) => {
      console.log(output[0]);
      return output[0];
    });
}

/**
 * Modify a bed QR in the system
 * @param bedId The id of the bed
 * @param QRData The string representation of the QR
 */

 sendAlterQR(bedId: number, QRData:string) {
  let id=bedId;  
  const headers = new HttpHeaders();
  headers.append('Content-Type', 'application/json');       
  
  
  let message=[{"QR": "example"}]
  message[0].QR=QRData;
  
 // console.log(JSON.stringify(message[0]))
  this._http
    .put<any>(this.urlApi + "/api/QR/"+id, message[0],{ headers: headers})
    .subscribe((data) => {
      this.postId = data.id;
    });
}

/**
 * 
 * @param newBed Adding a QR to the system
 */
 sendNewQR(QRData:string) {  
  
  const headers = new HttpHeaders();
  headers.append('Content-Type', 'application/json');
  let message=[{"QR": "example"}]
  message[0].QR=QRData;
  ;  
  
  this._http
    .post<any>(this.urlApi + "/api/QR/", message[0],{ headers: headers})
    .subscribe((data) => {
      this.postId = data.id;
    });
 }


}

