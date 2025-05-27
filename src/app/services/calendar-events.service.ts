import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { CalendarEvent } from '../models/calendarEvent';
import { environment } from '../../environments/environment'


@Injectable({
  providedIn: 'root'
})
export class CalendarEventsService {
  urlApi = environment.urlApi;
  public CalendarEventsLocal: Array<CalendarEvent> = new Array<CalendarEvent>();
  postId;

  constructor(private readonly _http: HttpClient) {
  
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
/**
 * 
 * Do not use... not implemented in the backend. Use html filtering instead
 */
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
    
    
    let data= {"patientId":calevent.patientId,
              "type": calevent.type,
              "note": calevent.note,
              "dateTime": JSON.stringify(calevent.dateTime)
            }
    
    
    console.log(JSON.stringify(data))
    this._http
      .post<any>(this.urlApi + "/api/events/", data,{ headers: headers})
      .subscribe((data) => {
        this.postId = data.id;
        console.log(data.id)
      });
   }
  /**
   * 
   * @param caleventId removing a calendar event from the system
   */
   sendDeleteEvent(id: number) {    
    const headers = new HttpHeaders();    
    headers.append('Content-Type', 'application/json');    
    this._http
      .delete<any>(this.urlApi + "/api/events/"+id, { headers: headers})
      .subscribe((data) => {
        this.postId = data.id;
      });
  
  }

}
