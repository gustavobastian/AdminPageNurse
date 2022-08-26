import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { BedsService } from "../services/beds.service";
import { Bed } from "../models/bed";
import { User } from "../models/user";
import { Pacient } from "../models/pacient";
import { Message } from "../models/message";
import { UsersService } from "../services/users.service";
import { PacientService } from "../services/pacient.service";
import { MessagesService } from "../services/messages.service";
import { AlertController } from '@ionic/angular';
import { LogEventsService } from "../services/log-events.service";
import { logEvent } from "../models/logEvent";



@Component({
  selector: "app-folder",
  templateUrl: "./folder.page.html",
  styleUrls: ["./folder.page.scss"],
})
export class FolderPage implements OnInit {
  public folder: string;
  private beds: Array<Bed> = new Array<Bed>();
  private users: Array<User> = new Array<User>();
  public pacientNumber: number = 0;
  public userNumber: number = 0;
  public bedNumber: number = 0;
  private pacients: Array<Pacient> = new Array<Pacient>();
  private messages: Array<Message> = new Array<Message>();
  private logEventsLocal: Array<logEvent> = new Array<logEvent>();

  handlerMessage = '';
  roleMessage = '';


  constructor(
    private activatedRoute: ActivatedRoute,
    public bedServ: BedsService,
    public userServ: UsersService,
    public pacientServ: PacientService,
    private alertController: AlertController,
    public messageServ: MessagesService,
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
    this.pacientServ.sendDeletePacient(id);
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

  upgradingBedNumber(i : number){
    this.bedNumber=i;
    console.log(i)
  }


  //asking for logs events


  async retrieveLogs() {
    console.log("Estoy en el retrieveLogs y llame al service");
    let listado = JSON.stringify(await this.logEvents.getAllLogEvents());
    let listado2= JSON.parse(JSON.stringify( listado));
    /*listado.forEach(element => {
      console.log("logs:"+element);  
      
    });*/
    
    
    this.logEventsLocal=JSON.parse(listado2);
    console.log(this.logEventsLocal)
  }
}
