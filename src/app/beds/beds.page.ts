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
  ionicForm: FormGroup = new FormGroup({
    room: new FormControl(),
    floor: new FormControl(),
    caller: new FormControl()
  });



  constructor(private activatedRoute: ActivatedRoute,public formBuilder: FormBuilder, public bedServ: BedsService) { 
   
  }

  ngOnInit() {
    this.id = this.activatedRoute.snapshot.paramMap.get("id");
    if(this.id === "0")
    {console.log("new bed");
    
    }    
    else{
     console.log("loading data");
     this.retrieveSingleBed(parseInt(this.id)) 
    }

  }

  async retrieveSingleBed(id:number) {
    console.log("Estoy en el retrieveBed y llame al service");
    let bedLocal = await this.bedServ.getSingleBed(id);    
    
    this.bed = bedLocal;
  }

  submitForm() {
    console.log("se envio");
    console.log(this.ionicForm.value)
  }

}
