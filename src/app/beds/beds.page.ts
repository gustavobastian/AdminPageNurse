import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from "@angular/router";
import { Bed } from '../models/bed';
import { BedsService } from '../services/beds.service';
import { FormGroup, FormBuilder, Validators, FormControl } from "@angular/forms";


@Component({
  selector: 'app-beds',
  templateUrl: './beds.page.html',
  styleUrls: ['./beds.page.scss'],
})
export class BedsPage implements OnInit {
  public id: string;
  public bed:  Bed = new Bed(0,0,0,0);
  public newBed= true;
  ionicForm: FormGroup = new FormGroup({
    roomId: new FormControl(),
    floorId: new FormControl(),
    callerId: new FormControl()
  });



  constructor(
    private activatedRoute: ActivatedRoute,
    public formBuilder: FormBuilder, 
    public bedServ: BedsService) { 
   
  }

  ngOnInit() {
    this.id = this.activatedRoute.snapshot.paramMap.get("id");
    console.log("id:"+this.id);
    if(this.id === "0")
    {
    console.log("new bed");
    this.bed.roomId = 11111;
    this.newBed=true;
    }    
    else{
     console.log("loading data");
     this.bed.roomId = 11111;
     this.newBed=false;
     this.retrieveSingleBed(parseInt(this.id)) 
    }

  }

  async retrieveSingleBed(id:number) {
    console.log("Estoy en el retrieveBed y llame al service");
    let bedLocal = await this.bedServ.getSingleBed(id);    
    console.log(bedLocal);
    this.bed = bedLocal;
  }

  submitForm() {
    console.log("se envio");
    //console.log(this.ionicForm.value)
    let local=(this.ionicForm.value);
    this.bed.roomId=local.roomId;
    this.bed.floorId=local.floorId;
    this.bed.callerId=local.callerId;

    if(this.newBed===true){            
      console.log("bed:"+JSON.stringify(this.bed))
      this.bedServ.sendNewBed(this.bed);}
    else{      
      console.log("bed:"+JSON.stringify(this.bed))
      this.bedServ.sendAlterBed(this.bed);
      console.log("modificando")}
  }

}

