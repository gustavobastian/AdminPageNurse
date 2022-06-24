import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { User } from '../models/user';
import { UsersService } from '../services/users.service';
import { FormGroup, FormBuilder, Validators, FormControl } from "@angular/forms";

@Component({
  selector: 'app-user',
  templateUrl: './user.page.html',
  styleUrls: ['./user.page.scss'],
})
export class UserPage implements OnInit {
  public id: string;
  public user: User=new User(0,"","","","",0,"");
  ionicForm: FormGroup = new FormGroup({
    firstName: new FormControl(),
    lastName: new FormControl(),
    userName: new FormControl(),
    password: new FormControl(),
    occupation: new FormControl(),
    state: new FormControl()
  });



  constructor(private activatedRoute: ActivatedRoute,public formBuilder: FormBuilder,public userServ: UsersService) {
    
   }

  ngOnInit() {    
    this.id = this.activatedRoute.snapshot.paramMap.get("id");
    if(this.id === "0")
    {console.log("new User");
    
    }    
    else{
     console.log("loading data");
    this.retrieveSingleUser(parseInt(this.id));
    }
  }

  async retrieveSingleUser(id:number) {
    console.log("Estoy en el retrieveUser y llame al service");
    let userLocal = await this.userServ.getSingleUser(id);
    //console.log("llego2");
    
    this.user = userLocal;
  }

  submitForm() {
    console.log("se envio");
    console.log(this.ionicForm.value)
  }

}
