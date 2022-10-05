import { Component, OnInit } from '@angular/core';

import { ActivatedRoute,Routes, RouterModule, Router } from "@angular/router";
import { LogStatusService } from 'src/app/services/log-status.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  username=""
  password=""
  
  constructor(
    private routes: Router,
    private logStatus: LogStatusService
    ) { }

  ngOnInit() {
  }
  
  async navTabs(){
    //you can use either of below
    this.routes.navigateByUrl("/folder/camas");
    //this.navCtrl.navigateRoot("/app/tabs/(home:home)")
}
   public async onclick(){
    
    
    if(await this.logStatus.askToken(this.username, this.password)==true){
      console.log("setting status logged")
      this.logStatus.setLogged(true);}
    else{this.logStatus.setLogged(false);
      console.log("setting status not logged")
      alert("usuario o password incorrectos");
    }  

  }
 
}
