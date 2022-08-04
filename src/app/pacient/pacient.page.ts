import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Bed } from '../models/bed';
import { medicalTable } from '../models/medicalTable';
import { Pacient } from '../models/pacient';
import { User } from '../models/user';
import { BedsService } from '../services/beds.service';
import { MedicalTableService } from '../services/medical-table.service';
import { PacientService } from '../services/pacient.service';
import { UsersService } from '../services/users.service';



class BedStatus{
  public _id: number;
  public _st: number;
  constructor(id: number, st: number){
    this._id=id;
    this._st=st;
  }
  public get id(){ return this._id; }
  public set id(val: number){ this._id=val; }
  public get st(){ return this._st; }
  public set st(val: number){ this._st=val; }
}

@Component({
  selector: 'app-pacient',
  templateUrl: './pacient.page.html',
  styleUrls: ['./pacient.page.scss'],
})
export class PacientPage implements OnInit {
  public id: string;
  public pacientLocal: Pacient = new Pacient(0,"giac ","como ",0,0,0);
  public newPacient= true;
  private beds: Array<Bed> = new Array<Bed>();
  public bedState: Array<BedStatus> = new Array<BedStatus>();
  private users: Array<User> = new Array<User>();
  private pacientUsers: Array<User> = new Array<User>();
  private addingDoctor= false;
  private doctorNumber=0;

  private MDT : Array<medicalTable>=new Array<medicalTable>;


  ionicForm: FormGroup = new FormGroup({
    pacientId: new FormControl(),
    firstName: new FormControl(),
    lastName: new FormControl(),
    bedId: new FormControl(),
    notesTableId: new FormControl(),
    userTableId: new FormControl()
  });



  constructor(
    private activatedRoute: ActivatedRoute,
    public formBuilder: FormBuilder,
    public bedServ: BedsService,
    private medTabServ: MedicalTableService,
    public pacientServ: PacientService,
    public userServ: UsersService ) { }

  async ngOnInit() {
    this.id = this.activatedRoute.snapshot.paramMap.get("id");    
    console.log(this.id.toString())
    if(parseInt(this.id) < 1)
    {
    console.log("new Pacient");
    this.newPacient=true;
    }    
    if(parseInt(this.id)>0)
    {
     this.newPacient=false;
     console.log("loading data");
    await this.retrieveSinglePacient(parseInt(this.id));
    
    }
    this.retrieveBeds();
    this.retrieveBedStates();
    //bring list of users
    let listado = await this.userServ.getAllUsers();
    //console.log("llego2");
    let data = listado[0];        
    this.users=listado;

  }

   lookForUsers(userIdP: number): string  {
    let i=1;
    let d=0;
    
    this.users.forEach(element => {            
      if(element.userId==userIdP){i=d;return;}
      d++;
    });
    console.log(this.users[i])
    return JSON.stringify(this.users[i].userId+":"+this.users[i].lastname+","+this.users[i].firstname);
    
  }

  async retrieveSinglePacient(id:number) {
    
    let pacientLocal2 = await this.pacientServ.getPacient(id);    
    await this.retrieveMedicalTable(pacientLocal2.userTableId);
    this.pacientLocal = pacientLocal2;
    console.log(this.pacientLocal);
  }

  async retrieveBeds() {
    console.log("Estoy en el retrieveBeds y llame al service");
    let listado = await this.bedServ.getAllbed();
    //console.log("llego");
    this.beds = listado;
  }
  async retrieveBedStates() {
    let  localState= new BedStatus(0,0);
    console.log("Estoy en el retrieveBedState y llame al service");
    let listado = JSON.stringify(await this.bedServ.getAllBedStatus());
    console.log(listado);
    let listado2= JSON.parse(listado);
    console.log(listado2);
    listado2.forEach(element => {      
      this.bedState.push(element);
    });
    return;
  }

  async retrieveMedicalTable(index: number) {
    this.MDT= [];
    console.log("Estoy en el retrieve MedicalTableService y llame al service:"+index);
    let listado = JSON.stringify(await this.medTabServ.getSingleMedicalsTable(index));
    this.MDT=JSON.parse(listado);
    console.log(listado)
    return;
  }

  submitForm() {    
    console.log("id:"+this.id);
    let localsend: Pacient=new Pacient(0,"giac ","como ",0,0,0);
    //console.log("nombre : "+localsend.firstName);
    
    let local=((this.ionicForm.value.firstName));
    if(this.ionicForm.value.pacientId<1){alert("Error en nro de paciente!!!");return;}
    
    localsend.firstName=(this.ionicForm.value.firstName).toString();
    console.log("nombre : "+localsend.firstName);
    localsend.lastName=this.ionicForm.value.lastName;
    localsend.pacientId=this.ionicForm.value.pacientId;
    localsend.bedId=this.ionicForm.value.bedId;
    let status=0;
    this.beds.forEach(element => {
      if(element.bedId==localsend.bedId){
        status=1;
      }
    });
    if(status==0){alert("No existe esa cama");return;}

    localsend.userTableId=this.ionicForm.value.userTableId;
    console.log((localsend));
    console.log((this.id));

    if(parseInt(this.id) < 1)
    {
      console.log("sending new")
     this.pacientServ.sendNewPacient(localsend);
    }
    else
    {
      this.pacientServ.sendAlterPacient(localsend);
      console.log("editing "+this.id)
    }
  }

  /***
   * Adding new doctors to the list of doctors
   */

  addingNewDoctor(){
    this.addingDoctor=true;
  }
  quitAddingNewDoctor(){
    this.addingDoctor=false;
  }
  upgradingDoctorNumber(userId:number){
    this.doctorNumber=userId;
  }
  async sendDoctor(){
    console.log("Aqui")
    let correct=true;
    this.MDT.forEach(element => {
      console.log("number: "+element.userId)
      if(element.userId==this.doctorNumber){
        console.log("repetido")
        alert("Doctor ya presente en la lista")
        correct=false;        
      }      
    });
    if(correct==true){  console.log("adding:", this.doctorNumber);
      await this.medTabServ.sendDoctorTable(this.doctorNumber,this.pacientLocal.userTableId)
      await this.retrieveMedicalTable(this.pacientLocal.userTableId);
      this.addingDoctor=false;
      }
    else console.log("already present:", this.doctorNumber);
  }

  async removeDoctor(i:number){
    let index=0;
    console.log(JSON.stringify(this.MDT))
    this.MDT.forEach(element => {      
      if(element.userId==i){
        //console.log(JSON.stringify(element))
        console.log("medicalTable index:"+element.MedicalTableId)
        index=element.MedicalTableId;
      }      
    });
    await this.medTabServ.deleteDoctorFromTable(index);
    await this.retrieveMedicalTable(this.pacientLocal.userTableId);
    console.log("removing:"+i)
  }
}
