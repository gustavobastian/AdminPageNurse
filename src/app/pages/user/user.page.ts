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
  public specTable: Array<Spec> = new Array<Spec>();
  public NurseSpecTable: Array<NurseSpec> = new Array<NurseSpec>();
  public specToAddId = 0;
  public specToDeleteId = 0;
  public needNurseOptions=false;

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

  public async onClickAddingNurses(){

    if(this.user.occupation!=="Enfermero"){
      alert("Solo valido para enfermeros!");
      return;
    }
    this.specToAddId=0;
    this.modeNurse=true;
    this.specTable= await this.tableSpecServ.getAllSpec();
    if(this.newUser!=true){
      console.log("debo buscar tabla de especialidades")
      this.NurseSpecTable= await this.nurseSpecServ.getAllNurseSpec(parseInt(this.id))
    }
  }

  public async onAddNewSpect(): Promise<boolean>{
    console.log("check if it is in the actual list")
    if(await this.checkIfPresent(this.specToAddId)===true){
      alert("la especificación ya está en la lista")
    }
    else{
    console.log("user:"+this.id+" spec to add:"+this.specToAddId)

                  this.nurseSpecServ.sendNurseNewSpec(this.specToAddId,parseInt(this.id))
    }
    return true;
  }

  public async onDeleteSpec(id: number): Promise<boolean>{
 //   console.log("user:"+this.id+" spec to remove:"+id)
    this.nurseSpecServ.deleteSpecFromTable(id);
    return true;
  }

  public onClickNoAddingNurses(){
    this.modeNurse=false;
    
  }

  public async upgradeSpecId(i:number): Promise<boolean>{
    this.specToAddId=i;
    return true;
  }

  //do not repeat spec for a person
  public checkIfPresent(specId: number): boolean{
    let d=0;
    this.NurseSpecTable.forEach(element => {
      console.log(element)
      if (element.get_specId() == specId) {
        console.log("found");
        d = 1;
      } 
      
    });
    if(d==0)
    {return false;}
    else{
      return true;
    }
  }

  public checkNurse(idlocal:string){
    console.log("parameter:"+idlocal);
    if(idlocal=="Enfermero" && this.newUser==false){
      console.log("adding enfermero must select spec")
      this.needNurseOptions==true;
    }
  }

}
