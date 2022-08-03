import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Message } from "../models/message";
import { environment } from '../../environments/environment'

@Injectable({
  providedIn: "root",
})
export class MessagesService {
  //array of messages
  private messages: Array<Message> = new Array<Message>();
  //port for api--> must be changed to a global variable
  urlApi =  environment.urlApi;
  constructor(private _http: HttpClient) {}

  getAllMessages(): Promise<Message[]> {
    return this._http
      .get(this.urlApi + "/api/messages/info")
      .toPromise()
      .then((messages: Message[]) => {
        // console.log(messages);
        return messages;
      });
  }
}
