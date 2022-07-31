import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { CalendarEvent } from '../models/calendarEvent';
import { BedsService } from '../services/beds.service';
import { PacientService } from '../services/pacient.service';
import {CalendarEventsService} from '../services/calendar-events.service'
import { Pacient } from '../models/pacient';



@Component({
  selector: 'app-scheduler',
  templateUrl: './scheduler.page.html',
  styleUrls: ['./scheduler.page.scss'],
})
export class SchedulerPage implements OnInit {
  private calendarEventLocal: CalendarEvent=new CalendarEvent(0,0,"","","")
  private calendarEventsLocal: Array<CalendarEvent>=new Array<CalendarEvent>();
  private pacients: Array<Pacient>=new Array<Pacient>();
  private pacientLocal: Pacient=new Pacient(0,"giac ","como ",0,0,0);
  private eventsUpgraded: boolean=false;
  private id =0; //used to now what the user wants to do
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
    console.log("Pacients:"+JSON.stringify(this.pacients[0]));
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
    console.log("Estoy en el calling events y llame al service");
    let listado = await this.calServ.getAllCalendarEvents();
    //console.log("llego");
    this.calendarEventsLocal = listado;
    this.eventsUpgraded=true;
  }
  async retrieveEventsPacient(id:number) {
    console.log("Estoy en el calling filtering pacient y llame al service");
    let listado = await this.calServ.getPacientCalendarEvents(id);
    //console.log("llego");
    this.calendarEventsLocal = listado;
  }
  async retrievePacients() {
    console.log("Estoy en el retrievePacient y llame al service");
    let listado = await this.pacientServ.getAllPacients();    
    this.pacients = listado;
  }
  BajaEvento(){

  }
}
