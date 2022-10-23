import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { PatientTreat } from 'src/app/models/patientTreat';
import { Spec } from 'src/app/models/spec';
import { PatientTreatService } from 'src/app/services/patient-treat.service';
import { TableSpecService } from 'src/app/services/table-spec.service';
import { Bed } from '../../models/bed';
import { medicalTable } from '../../models/medicalTable';
import { Patient } from '../../models/patient';
import { User } from '../../models/user';
import { BedsService } from '../../services/beds.service';
import { MedicalTableService } from '../../services/medical-table.service';
import { PacientService } from '../../services/pacient.service';
import { UsersService } from '../../services/users.service';



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
  selector: 'app-patient',
  templateUrl: './patient.page.html',
  styleUrls: ['./patient.page.scss'],
})
export class PatientPage implements OnInit {
  public id: string;
  public pacientLocal: Patient = new Patient(0,"giac ","como ",0,0,0);
  public newPacient= true;
  public beds: Array<Bed> = new Array<Bed>();
  public bedState: Array<BedStatus> = new Array<BedStatus>();
  public users: Array<User> = new Array<User>();
  public pacientUsers: Array<User> = new Array<User>();
  public addingDoctor= false;
  public doctorNumber=0;
  public editingTreatment=false;
  public specToAddId=0;
  public canSend=false;

  public specTable: Array<Spec> = new Array<Spec>();

  public patientTreatLocal= new PatientTreat(0,0,0,"")


  public MDT : Array<medicalTable>=new Array<medicalTable>;
  public allMDT : Array<medicalTable>=new Array<medicalTable>;


  ionicForm: FormGroup = new FormGroup({
    patientId: new FormControl(),
    firstName: new FormControl(),
    lastName: new FormControl(),
    bedId: new FormControl(),
    notesTableId: new FormControl(),
    userTableId: new FormControl()
  });



  constructor(
    public activatedRoute: ActivatedRoute,
    public formBuilder: FormBuilder,
    public bedServ: BedsService,
    public medTabServ: MedicalTableService,
    public pacientServ: PacientService,
    public userServ: UsersService,
    public patientTreatServ: PatientTreatService,
    public tableSpecServ:TableSpecService,
    ) { }

    public async ngOnInit() {
    this.id = this.activatedRoute.snapshot.paramMap.get("id");    
    this.specTable= await this.tableSpecServ.getAllSpec();
    
    if(parseInt(this.id) < 1)
    {
    console.log("new Pacient");
    this.newPacient=true;
    }    
    if(parseInt(this.id)>0)
    {
     this.newPacient=false;
     console.log("loading data");
    await this.retrieveSinglePatient(parseInt(this.id));
    this.canSend=true;
    }
    this.retrieveBeds();
    this.retrieveBedStates();
    this.retrieveAllMedicalTable();
    //bring list of users
    let listado = await this.userServ.getAllUsers();
    //console.log("llego2");
    let data = listado[0];        
    this.users=listado;
    if(this.newPacient!=true){
      let response=await this.patientTreatServ.getAllPatientSpec(parseInt(this.id));
      if(response.length==0){console.log("No esta definido");
      response=await this.patientTreatServ.getAllPatientSpec(1);
    }
      /*if(response==null){
        response=await this.patientTreatServ.getAllPatientSpec(1);
      }*/
      this.patientTreatLocal=response[0];
      console.log("Tratamiento:"+ JSON.stringify(this.patientTreatLocal));

    }
    else{
      this.patientTreatLocal.Name="";
      this.patientTreatLocal.patientId=0;
      this.patientTreatLocal.patientSpecId=0;
      this.patientTreatLocal.specId=0;
    }
    
  }

  public lookForUsers(userIdP: number): string  {
    let i=1;
    let d=0;
    if(this.users.length>0){
    this.users.forEach(element => {            
      if(element.userId==userIdP){i=d;return;}
      d++;
    });
    //console.log(this.users[i])
    return JSON.stringify(this.users[i].userId+":"+this.users[i].lastname+","+this.users[i].firstname);
    }
    else {return ""}
  }

  public async retrieveSinglePatient(id:number) {
    
    let pacientLocal2 = await this.pacientServ.getPatient(id);    
    await this.retrieveMedicalTable(pacientLocal2.userTableId);
    this.pacientLocal = pacientLocal2;
   
  }

  public async retrieveBeds() {

    let listado = await this.bedServ.getAllbed();

    this.beds = listado;
  }
  public async retrieveBedStates() {
    let  localState= new BedStatus(0,0);

    let listado = JSON.stringify(await this.bedServ.getAllBedStatus());

    let listado2= JSON.parse(listado);

    listado2.forEach(element => {      
      this.bedState.push(element);
    });
    return;
  }

  
  public submitForm() {    
    //console.log("id:"+this.id);
    let localsend: Patient=new Patient(0,"giac ","como ",0,0,0);
    //console.log("nombre : "+localsend.firstName);
    
    let local=((this.ionicForm.value.firstName));
    if(this.ionicForm.value.patientId<1){alert("Error en nro de paciente!!!");return;}
    
    localsend.firstName=(this.ionicForm.value.firstName);
   // console.log("nombre : "+localsend.firstName);
    localsend.lastName=this.ionicForm.value.lastName;
    localsend.patientId=this.ionicForm.value.patientId;
    localsend.bedId=this.ionicForm.value.bedId;
    let status=0;
    this.beds.forEach(element => {
      if(element.bedId==localsend.bedId){
        status=1;
      }
    });
    if(status==0){alert("No existe esa cama");return;}

    localsend.userTableId=this.ionicForm.value.userTableId;
    //console.log((localsend));
    //console.log((this.id));

    if(parseInt(this.id) < 1)
    {
     // console.log("sending new")
     this.pacientServ.sendNewPatient(localsend);
    }
    else
    {
      this.pacientServ.sendAlterPatient(localsend);
      console.log("editing "+this.id)
    }
  }


  public async upgradingpatientId(){
    this.canSend=true;
  }

/**
 * Medical table 
 */
  
 public async retrieveMedicalTable(index: number) {
    this.MDT= [];
    
    let listado = JSON.stringify(await this.medTabServ.getSingleMedicalsTable(index));
    this.MDT=JSON.parse(listado);
    
    return;
  }
  public async  retrieveAllMedicalTable() {
    let listado = JSON.stringify(await this.medTabServ.getAllMedicalsTable());
      this.allMDT=JSON.parse(listado);
  }

  /***
   * Adding new doctors to the list of doctors
   */

  public addingNewDoctor(){
    this.addingDoctor=true;
  }
  public quitAddingNewDoctor(){
    this.addingDoctor=false;
  }
  public upgradingDoctorNumber(userId:number){
    this.doctorNumber=userId;
  }
  public async sendDoctor(){
   
    let correct=true;
    this.MDT.forEach(element => {
      console.log("number: "+element.userId)
      if(element.userId==this.doctorNumber){
     //   console.log("repetido")
        alert("Doctor ya presente en la lista")
        correct=false;        
      }      
    });
    if(correct==true){  
      await this.medTabServ.sendDoctorTable(this.doctorNumber,this.pacientLocal.userTableId)
    
      setTimeout(()=>{  this.retrieveMedicalTable(this.pacientLocal.userTableId); }, 1000)
      
      this.addingDoctor=false;
      }
    else console.log("already present:", this.doctorNumber);
  }

  public async removeDoctor(i:number){
    let index=0;
    console.log(JSON.stringify(this.MDT))
    this.MDT.forEach(element => {      
      if(element.userId==i){
     
        console.log("medicalTable index:"+element.MedicalTableId)
        index=element.MedicalTableId;
      }      
    });
    await this.medTabServ.deleteDoctorFromTable(index);
    console.log("removing:"+i)
    setTimeout(()=>{  this.retrieveMedicalTable(this.pacientLocal.userTableId); }, 1000)
    
    
  }
  public async newMDT(){
    let maximunUlist = 0;
    this.allMDT.forEach(element => {
      if (maximunUlist<element.userTableId){maximunUlist=element.userTableId;}
    });
    await this.medTabServ.sendDoctorTable(3,maximunUlist+1)
    
  }
  public upgradingMDTNumber(i:number){
    setTimeout(()=>{  this.retrieveMedicalTable(i); }, 1000)
  }
  /**
   * Patient treatment
   */
  public editTreatment(){
  this.editingTreatment=true;
  }
  public exitEditTreatment(){
    this.editingTreatment=false;
    }
  
  public async upgradeSpecId(i:number): Promise<boolean>{
      this.specToAddId=i;
      console.log("Treatment:"+this.specToAddId);

    this.specTable.forEach(element => {
      let element2=JSON.parse(JSON.stringify(element));
      
      if(this.specToAddId==element2.id){        
      //  console.log("find:"+element2.id+"|"+this.specToAddId)
      //  console.log("find:"+element2.Name);
        this.patientTreatLocal.specId=element2.id;
        this.patientTreatLocal.Name=element2.Name;
        this.patientTreatLocal.patientId=this.pacientLocal.patientId;
       
      //  console.log("Treatment:"+JSON.stringify( this.patientTreatLocal));
      }
    });
      return true;      
  }  

  public updateTreatment(){
    console.log("Treatment:"+this.specToAddId);  
    this.patientTreatServ.sendAlterTreatment(this.patientTreatLocal);
    
    console.log("sending treatment")  
  }

  public newTreatment(){
    console.log("Treatment:"+this.specToAddId);  
    this.patientTreatServ.sendNewTreatment(this.patientTreatLocal);
    
    console.log("sending treatment")  
  }
}
