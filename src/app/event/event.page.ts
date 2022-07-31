import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from "@angular/forms";
import { ActivatedRoute } from '@angular/router';
import { CalendarEvent } from '../models/calendarEvent';
import { Pacient } from '../models/pacient';
import { BedsService } from '../services/beds.service';
import { CalendarEventsService } from '../services/calendar-events.service';
import { PacientService } from '../services/pacient.service';

@Component({
  selector: 'app-event',
  templateUrl: './event.page.html',
  styleUrls: ['./event.page.scss'],
})
export class EventPage implements OnInit {
  private calendarEventLocal: CalendarEvent=new CalendarEvent(0,0,"","","")    
  private pacientNumber=0;
  private pacientLocal: Pacient=new Pacient(0,"giac ","como ",0,0,0);

  ionicForm: FormGroup = new FormGroup({    
    type: new FormControl(),
    note: new FormControl()    
  });


  pacientId = 0;
  
  public title="";

  constructor(
    private activatedRoute: ActivatedRoute,
    public formBuilder: FormBuilder,
    public bedServ: BedsService,
    public pacientServ: PacientService,
    public calServ:CalendarEventsService 
  ) { }

  ngOnInit() {
    this.pacientId = parseInt(this.activatedRoute.snapshot.paramMap.get("id"));    
    console.log("pacientId: " + this.pacientId);
    this.calendarEventLocal.pacientId=this.pacientId;
  }
  
  async send() {
  let dt= new Date(this.calendarEventLocal._dateTime);
  let date=this.calendarEventLocal._dateTime.split("T");  
  let time=date[1].split("-");
  

  let data= JSON.stringify(date[0].toString()+" "+time[0].toString());
  
  console.log(data);
  this.calendarEventLocal._dateTime=data;
  
  
  await this.calServ.sendNewEvent(this.calendarEventLocal);
  
  }
  upgradingtype(type : string){
    this.calendarEventLocal.type=type;
  }
  upgradingNote(d : string){
    this.calendarEventLocal._note =d;
  }
  upgradingDay(s : string){
    this.calendarEventLocal.dateTime=s;
 //  console.log(i);
  }

}
