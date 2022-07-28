import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Bed } from '../models/bed';
import { Pacient } from '../models/pacient';
import { BedsService } from '../services/beds.service';
import { PacientService } from '../services/pacient.service';

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
    public pacientServ: PacientService ) { }

  ngOnInit() {
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
    this.retrieveSinglePacient(parseInt(this.id));
    }
    this.retrieveBeds();
    this.retrieveBedStates();
    console.log(this.bedState);
    console.log(this.bedState[0]);
  }

  async retrieveSinglePacient(id:number) {
    
    let pacientLocal2 = await this.pacientServ.getPacient(id);    
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
}
