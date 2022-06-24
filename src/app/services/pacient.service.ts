import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Pacient } from '../models/pacient';

@Injectable({
  providedIn: 'root'
})
export class PacientService {
  postId;
  //array of Pacient
  private beds: Array <Pacient> = new Array<Pacient>();
  //port for api--> must be changed to a global variable
  urlApi='http://localhost:8000';

  constructor(private _http: HttpClient) { }


  getAllPacients(): Promise<Pacient[]> {
    return this._http.get(this.urlApi+"/api/pacient")
    .toPromise()
    .then((users:Pacient[])=>{
      console.log(users);
        return users;

    });
  }
  
  sendNewPacient(newPacient: Pacient){
    console.log(newPacient);
    let output = JSON.stringify(newPacient);
    console.log(output);
     this._http.post<any>(this.urlApi+"/api/pacient",newPacient).subscribe(data => {this.postId = data.id;})
  }
}
