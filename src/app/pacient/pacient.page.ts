import { Component, OnInit } from '@angular/core';
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
  public pacient: Pacient = new Pacient(0,"","",0,0,0);
  constructor(private activatedRoute: ActivatedRoute, public pacientServ: PacientService ) { }

  ngOnInit() {
    this.id = this.activatedRoute.snapshot.paramMap.get("id");
    if(this.id === "0")
    {console.log("new Pacient");
    
    }    
    else{
     console.log("loading data");
    this.retrieveSinglePacient(parseInt(this.id));
    }
  }

  async retrieveSinglePacient(id:number) {
    console.log("Estoy en el retrievePacient y llame al service");
    let pacientLocal = await this.pacientServ.getPacient(id);    
    this.pacient = pacientLocal;
  }

}
