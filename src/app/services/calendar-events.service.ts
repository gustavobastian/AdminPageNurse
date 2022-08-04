import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { CalendarEvent } from '../models/calendarEvent';
import { environment } from '../../environments/environment'


@Injectable({
  providedIn: 'root'
})
export class CalendarEventsService {
  urlApi = environment.urlApi;
  private CalendarEventsLocal: Array<CalendarEvent> = new Array<CalendarEvent>();
  postId;

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
  /**
 * 
 * @param calevent Adding a calendar event to the system
 */
   sendNewEvent(calevent: CalendarEvent){
    
    const headers = new HttpHeaders();
    headers.append('Content-Type', 'application/json');
    
    
    this._http
      .post<any>(this.urlApi + "/api/events/", calevent,{ headers: headers})
      .subscribe((data) => {
        this.postId = data.id;
        console.log(data.id)
      });
   }

}