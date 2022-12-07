import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { BedsService } from "../services/beds.service";
import { Bed } from "../models/bed";
import { User } from "../models/user";
import { Patient } from "../models/patient";
import { Message } from "../models/message";
import { UsersService } from "../services/users.service";
import { PacientService } from "../services/pacient.service";
import { MessagesService } from "../services/messages.service";
import { AlertController } from '@ionic/angular';
import { LogEventsService } from "../services/log-events.service";
import { logEvent } from "../models/logEvent";
import { LogStatusService } from "../services/log-status.service";

import { interval } from 'rxjs';
import { takeWhile } from 'rxjs/operators';



@Component({
  selector: "app-folder",
  templateUrl: "./folder.page.html",
  styleUrls: ["./folder.page.scss"],
})
export class FolderPage implements OnInit {
  public folder: string;
  public beds: Array<Bed> = new Array<Bed>();
  public users: Array<User> = new Array<User>();
  public pacientNumber: number = 0;
  public userNumber: number = 0;
  public bedNumber: number = 0;
  public pacients: Array<Patient> = new Array<Patient>();
  public messages: Array<Message> = new Array<Message>();
  public logEventsLocal: Array<logEvent> = new Array<logEvent>();


  priorities: Array<number> = [0,1,2,3,4,5];
  bedPriority=0;
  handlerMessage = '';
  roleMessage = '';


  constructor(
    public routes: Router,
    public activatedRoute: ActivatedRoute,
    public bedServ: BedsService,
    public userServ: UsersService,
    public pacientServ: PacientService,
    public alertController: AlertController,
    public messageServ: MessagesService,
    public logStatus: LogStatusService,
    public logEvents: LogEventsService
  ) {
    //console.log("in constructor");
    this.retrieveBeds();
    this.retrieveUsers();
    this.retrievePacients();
    this.retrieveMessages();
    this.retrieveLogs();
  }

  ngOnInit() {
    this.folder = this.activatedRoute.snapshot.paramMap.get("id");
    this.bedPriority=0;
    //this.logStatus.setLogged(false);
    interval(5000)
    .pipe(takeWhile(() => !stop))
    .subscribe(() => {
      console.log("asking for logs")
      this.retrieveLogs();
    });

  }

  async retrieveBeds() {
    console.log("Estoy en el retrieveBeds y llame al service");
    let listado = await this.bedServ.getAllbed();
    console.log("beds:"+listado);
    this.beds = listado;
  }
  async retrieveUsers() {
    console.log("Estoy en el retrieveUsers y llame al service");
    let listado = await this.userServ.getAllUsers();
    //console.log("llego2");
    this.users = listado;
  }
  async retrievePacients() {
    console.log("Estoy en el retrievePacient y llame al service");
    let listado = await this.pacientServ.getAllPacients();
    //console.log("llego2");
    this.pacients = listado;
  }

  async retrieveMessages() {
    console.log("Estoy en el retrieveMessages y llame al service");
    let listado = await this.messageServ.getAllMessages();
    console.log("listado");
    this.messages = listado;
  }

  public deleteUsers(id:number) {
    console.log("borrando:"+id);
    //let listado = await this.messageServ.getAllMessages();
    //console.log("Eliminando:" + this.users[id].username);
   // this.userServ.deleteUser(id);
  }
  public deletePacient(id:number) {
    console.log("borrando paciente :"+id);
    //let listado = await this.messageServ.getAllMessages();
    //console.log("Eliminando:" + this.users[id].username);
    this.pacientServ.sendDeletePatient(id);
    setTimeout(()=>{  this.retrievePacients(); }, 1000)
  }
  public upgradingNumber(i: number){
    console.log("number:"+i)
    this.pacientNumber=i;
  }
  upgradingUserNumber(i:number){
  console.log("Usernumber:"+i)
    this.userNumber=i;
  }

  async presentAlert() {
    const alert = await this.alertController.create({
      header: 'Desea eliminar Usuario?',
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancelada',
          handler: () => {             
            this.handlerMessage = 'Accion'; }
        },
        {
          text: 'OK',
          role: 'confirmada',
          handler: () => { 
            this.deleteUsers(this.userNumber);
            this.handlerMessage = 'Acción'; }
        }
      ]
    });

    await alert.present();

    const { role } = await alert.onDidDismiss();
    this.roleMessage = `: ${role}`;
  }

  async presentAlertPacient() {
    const alert = await this.alertController.create({
      header: 'Desea dar de baja Paciente?',
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancelada',
          handler: () => {             
            this.handlerMessage = 'Accion'; }
        },
        {
          text: 'OK',
          role: 'confirmada',
          handler: () => { 
           this.deletePacient(this.pacientNumber);
            this.handlerMessage = 'Accion'; }
        }
      ]
    });

    await alert.present();

    const { role } = await alert.onDidDismiss();
    this.roleMessage = `: ${role}`;
  }

  async upgradingBedNumber(i : number){
    this.bedNumber=i;
    console.log(i)
    this.retrievePriority(i);
    
  }

  upgradingPriorityNumber(i : number){
    this.bedPriority=i;
    console.log("priority:"+(this.bedPriority).toString())
  }

  //asking for logs events


  async retrieveLogs() {
    console.log("Estoy en el retrieveLogs y llame al service");
    let listado = JSON.stringify(await this.logEvents.getAllLogEvents());
    console.log(listado);
    let listado2= JSON.parse( listado)
    console.log(listado2);
    /*listado2.forEach(element => {
      console.log("logs:"+element);  
      
    });
    */
    
    this.logEventsLocal=(listado2);
    console.log(this.logEventsLocal[0])
  }
  /**
   *  getting priority information of a single bed
   * @param i bed number
   */
  async retrievePriority(i:number)  {
    let received = await (this.bedServ.getSinglePriority(i))
    console.log((received))
    let received2= JSON.parse(JSON.stringify(received))
    console.log("p:"+JSON.stringify(received2.priority))
    this.bedPriority=received2.priority
  }

  /**
   * 
   * setting priority information of a single bed
   */
   async sendPriority()  {    
    console.log("sending bed " + this.bedNumber.toString() +" prioridad:" + this.bedPriority.toString() )
    this.bedServ.SendAlterPriority(this.bedNumber,this.bedPriority)
  }
  //playing with view
  public onClick2(){
    this.logStatus.setLogged(false);
    this.logStatus.mode=""
    this.routes.navigateByUrl("/login");
  }
  public onClickLogin(){    
    this.routes.navigateByUrl("/login");
  }

  
}
