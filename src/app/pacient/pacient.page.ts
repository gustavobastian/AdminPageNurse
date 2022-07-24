import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Pacient } from '../models/pacient';
import { PacientService } from '../services/pacient.service';



@Component({
  selector: 'app-pacient',
  templateUrl: './pacient.page.html',
  styleUrls: ['./pacient.page.scss'],
})
export class PacientPage implements OnInit {
  public id: string;
  public pacientLocal: Pacient = new Pacient(0," "," ",0,0,0);
  public newPacient= true;
  ionicForm: FormGroup = new FormGroup({
    firstName: new FormControl(),
    lastName: new FormControl(),
    bedId: new FormControl(),
    notesTableId: new FormControl(),
    userTableId: new FormControl()
  });



  constructor(
    private activatedRoute: ActivatedRoute,
    public formBuilder: FormBuilder,
    public pacientServ: PacientService ) { }

  ngOnInit() {
    this.id = this.activatedRoute.snapshot.paramMap.get("id");
    if(this.id === "0")
    {console.log("new Pacient");
    this.newPacient=true;
    }    
    else{
     this.newPacient=false;
     console.log("loading data");
    this.retrieveSinglePacient(parseInt(this.id));
    }
  }

  async retrieveSinglePacient(id:number) {
    
    let pacientLocal2 = await this.pacientServ.getPacient(id);    
    this.pacientLocal = pacientLocal2;
    console.log(JSON.stringify(this.pacientLocal));
  }

  submitForm() {
    console.log("se envio");
    console.log(this.ionicForm.value);
    /*
    let local=(this.ionicForm.value);
    this.user.firstname=local.firstName;
    this.user.lastname=local.lastName;
    this.user.username=local.userName;
    this.user.occupation=local.occupation;
    this.user.password=local.password;
    this.user.state=local.state;

    if(this.newUser===true)
    {
     this.userServ.sendNewUser(this.user);
    }
    else{
      this.userServ.sendAlterUser(this.user);
    }
*/

  }
}
