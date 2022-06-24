import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { User } from '../models/user';
import { UsersService } from '../services/users.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.page.html',
  styleUrls: ['./user.page.scss'],
})
export class UserPage implements OnInit {
  public id: string;
  public user: User=new User(0,"","","","",0,"");
  constructor(private activatedRoute: ActivatedRoute,public userServ: UsersService) {
    
   }

  ngOnInit() {    
    this.id = this.activatedRoute.snapshot.paramMap.get("id");
    if(this.id === "0")
    {console.log("new User");
    
    }    
    else{
     console.log("loading data");
    this.retrieveSingleUser(parseInt(this.id));}
  }

  async retrieveSingleUser(id:number) {
    console.log("Estoy en el retrieveUser y llame al service");
    let userLocal = await this.userServ.getSingleUser(id);
    //console.log("llego2");
    
    this.user = userLocal;
  }

}
