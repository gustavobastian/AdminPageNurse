import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BedsService } from '../services/beds.service';
import { Bed } from '../models/bed';
import { User } from '../models/user';
import { Pacient } from '../models/pacient';
import { UsersService } from '../services/users.service';
import { PacientService } from '../services/pacient.service';


@Component({
  selector: 'app-folder',
  templateUrl: './folder.page.html',
  styleUrls: ['./folder.page.scss'],
})
export class FolderPage implements OnInit {
  public folder: string;
  private beds: Array <Bed> = new Array<Bed>();
  private users: Array <User> = new Array<User>();
  private pacients: Array <Pacient> = new Array<Pacient>();

  constructor(private activatedRoute: ActivatedRoute, public bedServ:BedsService, public userServ: UsersService, public pacientServ:PacientService ) { 
    //console.log("in constructor");
    this.retrieveBeds();
    this.retrieveUsers();
    this.retrievePacients();
  }

  ngOnInit() {
    this.folder = this.activatedRoute.snapshot.paramMap.get('id');
  }

  async retrieveBeds(){
    console.log("Estoy en el retrieveBeds y llame al service");
    let listado= await this. bedServ.getAllbed();    
    //console.log("llego");
    this.beds=listado;    
  }
  async retrieveUsers(){
    console.log("Estoy en el retrieveUsers y llame al service");
    let listado= await this. userServ.getAllUsers();    
    //console.log("llego2");
    this.users=listado;    
  }
  async retrievePacients(){
    console.log("Estoy en el retrievePacient y llame al service");
    let listado= await this. pacientServ.getAllPacients();    
    //console.log("llego2");
    this.pacients=listado;    
  }

}
