import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Bed } from '../models/bed';
import { Pacient } from '../models/pacient';
import { BedsService } from '../services/beds.service';
import { PacientService } from '../services/pacient.service';



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
  }

  async retrieveSinglePacient(id:number) {
    
    let pacientLocal2 = await this.pacientServ.getPacient(id);    
    this.pacientLocal = pacientLocal2;
    console.log(JSON.stringify(this.pacientLocal));
  }

  async retrieveBeds() {
    console.log("Estoy en el retrieveBeds y llame al service");
    let listado = await this.bedServ.getAllbed();
    //console.log("llego");
    this.beds = listado;
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
