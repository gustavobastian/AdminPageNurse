import { Component, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { Spec } from 'src/app/models/spec';
import { TableSpecService } from 'src/app/services/table-spec.service';


@Component({
  selector: 'app-tabla-spec-treat',
  templateUrl: './tabla-spec-treat.page.html',
  styleUrls: ['./tabla-spec-treat.page.scss'],
})
export class TablaSpecTreatPage implements OnInit {
  private specTable: Array<Spec> = new Array<Spec>();
  private addingSpec= false;
  private Name="";
  interval:any;
  


  constructor(
    private tableSpecServ:TableSpecService
    ) { }

  ngOnInit() {

    this.Name="";
    this.retrieveTable();
    this.interval = setInterval(()=>{
      this.retrieveTable();
      },1000);
  }
  
  ngOnDestroy():void{
    clearInterval(this.interval);
  }
  async retrieveTable() {
    console.log("Estoy en el retrieveTable y llame al service");
    let listado = await  this.tableSpecServ.getAllSpec();
    console.log("listado");
    this.specTable = listado;
  }
  onClickAdd(){
    this.addingSpec=true;
  }
  async onClickSend(){
    this.addingSpec=false;
    this.Name.toLowerCase();
    let strinti= this.Name;
    let strinti2=strinti[0].toLocaleUpperCase()+strinti.slice(1)
    this.Name=strinti2

    await this.tableSpecServ.sendNewSpec(this.Name)
    
  }
  upgradingName(name: string){        
    this.Name=name;
  }
  
}
