import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Bed } from "../models/bed";
import { environment } from '../../environments/environment'

@Injectable({
  providedIn: "root",
})
export class BedsService {
  postId;
  //array of beds
  private beds: Array<Bed> = new Array<Bed>();  
  urlApi =environment.urlApi;


  constructor(private _http: HttpClient) {}

  getAllbed(): Promise<Bed[]> {
    /*return this._http
      .get(this.urlApi + "/api/beds")
      .toPromise()
      .then((beds: Bed[]) => {
        console.log(beds);
        return beds;
      });
      */
      const headers = new HttpHeaders();
      headers.append('Content-Type', 'application/json');
      return new Promise ((resolve,reject)=>{
      this._http
        .get<Bed[]>(this.urlApi + "/api/beds/", { headers: headers})
        .subscribe({          
          next:data =>{

          console.log(data);
          //bed[]=data;          
          resolve(data);
        },
          error: err =>{
          reject(err);
        }
      })
      })
  }
// Ask for information of bed status in order to get not used ones
  getAllBedStatus(): Promise< String []> {
    return this._http
      .get(this.urlApi + "/api/beds/state/")
      .toPromise()
      .then((beds: String[]) => {
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
    delete newBed.bedId;
    const headers = new HttpHeaders();
    headers.append('Content-Type', 'application/json');
    this._http
      .post<any>(this.urlApi + "/api/beds/", newBed,{ headers: headers})
      .subscribe({
        next: data => {
            this.postId = data.id;
            alert("done!");
        },
        error: error => {
            let errorMessage = error.message;
            console.error('There was an error!', error);
        }
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
      .subscribe({
        next: data => {
            this.postId = data.id;
            alert("done!");
        },
        error: error => {
            let errorMessage = error.message;
            console.error('There was an error!', error);
        }
    });
      
  }

  /**
   * working with beds priorities
   */
//getting single beds information
 async getSinglePriority(id: number): Promise<number> {
  return this._http
    .get(this.urlApi + "/api/beds/priority/"+id)
    .toPromise()
    .then((received: number) => {
      console.log(received[0]);
      return received[0];
    });
}
/**
 * Modify a bed parameters in the system
 * @param newBed 
 */

 async SendAlterPriority(bedNumber:number, priority:number) {
  
  const headers = new HttpHeaders();
  headers.append('Content-Type', 'application/json');    
  let newData=[{"priority":priority}]
  let data=(newData)
  console.log(data)
  this._http
    .put<any>(this.urlApi + "/api/beds/priority/"+bedNumber, data,{ headers: headers})
    .subscribe({
      next: data => {
          this.postId = data.id;
          alert("done!");
      },
      error: error => {
          let errorMessage = error.message;
          alert('There was an error!');
      }
  });
    
}

}
