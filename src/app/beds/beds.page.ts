import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from "@angular/router";
import { Bed } from '../models/bed';
import { BedsService } from '../services/beds.service';
import { FormGroup, FormBuilder, Validators, FormControl } from "@angular/forms";
import { QRService } from '../services/qr.service';


@Component({
  selector: 'app-beds',
  templateUrl: './beds.page.html',
  styleUrls: ['./beds.page.scss'],
})
export class BedsPage implements OnInit {
  public id: string;
  public bed:  Bed = new Bed(0,0,0,0);
  public newBed= true;
  public qr_string :string
  
  ionicForm: FormGroup = new FormGroup({
    roomId: new FormControl(),
    floorId: new FormControl(),
    callerId: new FormControl(),
    QRString: new FormControl()
  });



  constructor(
    private activatedRoute: ActivatedRoute,
    public formBuilder: FormBuilder,
    public QRServ: QRService,
    public bedServ: BedsService) { 
    
    this.bed.roomId = 11111;
    this.bed.floorId = 1;
    this.bed.callerId = 1;
   
  }

  ngOnInit() {
    this.id = this.activatedRoute.snapshot.paramMap.get("id");
    console.log("id:"+this.id);
    if(parseInt(this.id) == 0)
    {
    console.log("new bed");
    this.bed.roomId = 11111;
    this.bed.floorId = 1111;
    this.bed.callerId = 1111;
    this.newBed=true;
    this.qr_string="hola mundo";
    }    
    else{
     console.log("loading data");
     this.bed.roomId = 2222;
     this.newBed=false;
     this.retrieveSingleBed(parseInt(this.id)) 
    }

  }

  async retrieveSingleBed(id:number) {
    console.log("Estoy en el retrieveBed y llame al service");
    let bedLocal = await this.bedServ.getSingleBed(id);    
    console.log(bedLocal);
    this.bed = bedLocal;
    let response = await this.QRServ.getSingleQR(this.bed.bedId);
    let response2=(JSON.stringify(response))
    let response3=(JSON.parse(response2))
    console.log(response3.QR);
    this.qr_string=response3.QR;
    console.log(this.qr_string);
  }

  async submitForm() {
    console.log("se envio");
    console.log("original bed:"+JSON.stringify(this.bed));
    //console.log(this.ionicForm.value)
    let local=(this.ionicForm.value);
    console.log(JSON.stringify(local));
    this.bed.roomId=parseInt(local.roomId);
    this.bed.floorId=parseInt(local.floorId);
    this.bed.callerId=parseInt(local.callerId);
    this.qr_string=local.QRString;
    console.log(JSON.stringify(this.bed));
    if(this.newBed===true){            
      console.log("bed:"+JSON.stringify(this.bed))
      await this.bedServ.sendNewBed(this.bed);
      await this.QRServ.sendNewQR(this.qr_string);
    
    }
      
    else{      
      console.log("bed:"+JSON.stringify(this.bed))
      await this.bedServ.sendAlterBed(this.bed);
      await this.QRServ.sendAlterQR(parseInt(this.id), this.qr_string)
      console.log("modificando")}
  }
 

}

