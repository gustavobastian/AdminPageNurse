import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { User } from '../../models/user';
import { UsersService } from '../../services/users.service';
import { FormGroup, FormBuilder, Validators, FormControl } from "@angular/forms";
import { NurseSpecService } from 'src/app/services/nurse-spec.service';
import { Spec } from 'src/app/models/spec';
import { TableSpecService } from 'src/app/services/table-spec.service';
import { NurseSpec } from 'src/app/models/nurseSpec';

@Component({
  selector: 'app-user',
  templateUrl: './user.page.html',
  styleUrls: ['./user.page.scss'],
})
export class UserPage implements OnInit {
  public id: string;
  public user: User=new User(0,"","","","",0,"");
  public newUser= true; 
  public modeNurse=false;
  private specTable: Array<Spec> = new Array<Spec>();
  private NurseSpecTable: Array<NurseSpec> = new Array<NurseSpec>();

  ionicForm: FormGroup = new FormGroup({
    firstName: new FormControl(),
    lastName: new FormControl(),
    userName: new FormControl(),
    password: new FormControl(),
    occupation: new FormControl(),
    state: new FormControl()
  });



  constructor(
    private activatedRoute: ActivatedRoute,
    public formBuilder: FormBuilder,
    public userServ: UsersService,
    public nurseSpecServ:NurseSpecService,
    private tableSpecServ:TableSpecService,

    ) {
    
   }

  ngOnInit() {    
    this.id = this.activatedRoute.snapshot.paramMap.get("id");
    console.log("id:"+this.id)
    if(this.id === "0")
    {console.log("new User"); 
    this.newUser=true;  
    }    
    else{
    this.newUser=false;
    this.retrieveSingleUser(parseInt(this.id));
    }
  }

  async retrieveSingleUser(id:number) {    
    let userLocal = await this.userServ.getSingleUser(id);    
    
    this.user = userLocal;
  }

  submitForm() {
    console.log("se envio");
    console.log(this.ionicForm.value);
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


  }

  async onClickAddingNurses(){
    this.modeNurse=true;
    this.specTable= await this.tableSpecServ.getAllSpec();
    if(this.newUser!=true){
      console.log("debo buscar tabla de especialidades")
      this.NurseSpecTable= await this.nurseSpecServ.getAllNurseSpec(parseInt(this.id))
    }
  }
  onClickNoAddingNurses(){
    this.modeNurse=false;
  }

}
