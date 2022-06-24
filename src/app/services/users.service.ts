import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
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


  sendNewBed(newUser: User) {
    console.log(newUser);
    let output = JSON.stringify(newUser);
    console.log(output);
    this._http
      .post<any>(this.urlApi + "/api/user", newUser)
      .subscribe((data) => {
        this.postId = data.id;
      });
  }
}
