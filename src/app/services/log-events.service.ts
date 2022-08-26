import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { logEvent } from '../models/logEvent';
import { environment } from '../../environments/environment'



@Injectable({
  providedIn: 'root'
})
export class LogEventsService {
  urlApi = environment.urlApi;
  private logEventsLocal: Array<logEvent> = new Array<logEvent>();
  postId;


  constructor(private _http: HttpClient) { }



  getAllLogEvents(): Promise<logEvent[]> {
    return this._http
      .get(this.urlApi + "/api/logEvents")
      .toPromise()
      .then((messages: logEvent[]) => {
        console.log(messages);
        return messages;
      });

  }
}
