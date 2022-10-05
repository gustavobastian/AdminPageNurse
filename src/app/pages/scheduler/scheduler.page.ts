import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { CalendarEvent } from '../../models/calendarEvent';
import { BedsService } from '../../services/beds.service';
import { PacientService } from '../../services/pacient.service';
import {CalendarEventsService} from '../../services/calendar-events.service'
import { Patient } from '../../models/pacient';



@Component({
  selector: 'app-scheduler',
  templateUrl: './scheduler.page.html',
  styleUrls: ['./scheduler.page.scss'],
})
export class SchedulerPage implements OnInit {
  public calendarEventLocal: CalendarEvent=new CalendarEvent(0,0,"","","")
  public calendarEventsLocal: Array<CalendarEvent>=new Array<CalendarEvent>();
  public pacients: Array<Patient>=new Array<Patient>();
  public pacientNumber=0;
  public pacientLocal: Patient=new Patient(0,"giac ","como ",0,0,0);
  public eventsUpgraded: boolean=false;
  public id =0; //used to now what the user wants to do
  public title="";

  

  constructor(

    private activatedRoute: ActivatedRoute,
    public formBuilder: FormBuilder,
    public bedServ: BedsService,
    public pacientServ: PacientService,
    public calServ:CalendarEventsService 
  ) {

    
   }

  async ngOnInit() {
    this.id = parseInt(this.activatedRoute.snapshot.paramMap.get("id"));    
    await this.retrievePacients();
    console.log("Patients:"+JSON.stringify(this.pacients[0]));
    if(this.id===1){this.title="Agregando eventos para paciente";
            
            } 
      else if(this.id===2){this.title="Viendo eventos de paciente";
            
            }
         else if(this.id===3){this.title="Viendo eventos del día"}
            else {this.title="Error"}
  
    await this.retrieveEvents();
     console.log("Eventos:"+JSON.stringify(this.calendarEventsLocal));
  }

  async retrieveEvents() {
    this.calendarEventsLocal=[];
    console.log("Estoy en el calling events y llame al service");
    let listado = await this.calServ.getAllCalendarEvents();
    //console.log("llego");
    this.calendarEventsLocal = listado;
    this.eventsUpgraded=true;
  }
  /***
   * Note: it only refers to the original retrieve Events function, the filter is donde in the html element
   */
  async retrieveEventsPacient(id:number) {
    this.eventsUpgraded=false;
    console.log("Estoy en el calling filtering pacient y llame al service");

    let listado = await this.calServ.getAllCalendarEvents();
    //console.log("llego");
    this.calendarEventsLocal = listado;
    this.eventsUpgraded=true;
  }
  async retrievePacients() {
    console.log("Estoy en el retrievePacient y llame al service");
    let listado = await this.pacientServ.getAllPacients();    
    this.pacients = listado;
  }
  upgradingNumber (id:number) {
    this.pacientNumber=id;
    console.log(this.pacientNumber)
  }
  async deleteEvent(i:number) {
    let evId=this.calendarEventsLocal[i].eventId;
    console.log("Removing event " + evId);
    await this.calServ.sendDeleteEvent(evId);
    await this.retrieveEvents() ;   

  }

  

  addEvent(i:number){

  }
}
