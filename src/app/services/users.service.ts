import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { User } from "../models/user";

@Injectable({
  providedIn: "root",
})
export class UsersService {
  postId;
  //array of beds
  urlApi = "http://localhost:8000";
  private users: Array<User> = new Array<User>();

  constructor(private _http: HttpClient) {}
  //get information of all users
  getAllUsers(): Promise<User[]> {
    return this._http
      .get(this.urlApi + "/api/user")
      .toPromise()
      .then((users: User[]) => {
        console.log(users);
        return users;
      });
  }
//get information of a single user
  getSingleUser(id:number): Promise<User> {
    return this._http
      .get(this.urlApi + "/api/user/"+id)
      .toPromise()
      .then((user: User) => {
        console.log(user[0]);
        return user[0];
      });
  }


  sendNewUser(newUser: User) {
    //console.log(newUser);
    const headers = new HttpHeaders();
    headers.append('Content-Type', 'application/json');

    delete newUser.userId;    
    this._http
      .post<any>(this.urlApi + "/api/user/", newUser,{ headers: headers})
      .subscribe((data) => {
        this.postId = data.id;
      });
  }

  sendAlterUser(newUser: User) {
    let id=newUser.userId;  
    const headers = new HttpHeaders();
    headers.append('Content-Type', 'application/json');    

    delete newUser.userId;
    
    
    this._http
      .put<any>(this.urlApi + "/api/user/"+id, newUser,{ headers: headers})
      .subscribe((data) => {
        this.postId = data.id;
      });
  }


  deleteUser(id:number) {
    const headers = new HttpHeaders();
    headers.append('Content-Type', 'application/json');    
    
    this._http
      .delete<any>(this.urlApi + "/api/user/"+id,{ headers: headers})
      .subscribe((data) => {
        this.postId = data.id;
      });
  }
}
