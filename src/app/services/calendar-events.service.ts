import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { CalendarEvent } from '../models/calendarEvent';



@Injectable({
  providedIn: 'root'
})
export class CalendarEventsService {
  urlApi = "http://localhost:8000";
  private CalendarEventsLocal: Array<CalendarEvent> = new Array<CalendarEvent>();
  constructor(private _http: HttpClient) { 


  
  }

  getAllCalendarEvents(): Promise<CalendarEvent[]> {
    return this._http
      .get(this.urlApi + "/api/events")
      .toPromise()
      .then((messages: CalendarEvent[]) => {
         console.log(messages);
        return messages;
      });

  }

  getPacientCalendarEvents(id: number):Promise<CalendarEvent[]> {
    return this._http
      .get(this.urlApi + "/api/events/pacient/"+id)
      .toPromise()
      .then((messages: CalendarEvent[]) => {
         console.log(messages);
        return messages;
      });

  }

}
