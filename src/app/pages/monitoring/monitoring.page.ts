import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { bedStats } from 'src/app/models/bed-status';
import { MessageModel } from 'src/app/models/message-model';
import { userStats } from 'src/app/models/user-status';
import { LocalStorageService } from 'src/app/services/local-storage.service';
import { MqttService } from 'src/app/services/mqtt.service';


@Component({
  selector: 'app-monitoring',
  templateUrl: './monitoring.page.html',
  styleUrls: ['./monitoring.page.scss'],
})
export class MonitoringPage implements OnInit {
  id="hola";
  number:number;  
  username="sistema";
  password="987654321";
  messagesBeds2: Array<bedStats> = new Array;
  
  messagesUsers: Array<userStats> = new Array;

  private view=0;//1 for beds, 2 for users...0 nothing

  bedstates = ["Desocupada","Ocupada","Llamando","Por ser atendida","Siendo atendida","Llamada programada","Solicita Ayuda"]
  userstates=["no Logeado","Logeado"]
  
  constructor(
    private activatedRoute: ActivatedRoute,
    public localSto: LocalStorageService, 
    private MQTTServ:MqttService,

  ) { }

  async ngOnInit() {
    this.number =  await this.MQTTServ.Connect("sistema", "987654321");
    console.log(this.number);
    this.eventsSubscription();
    this.usersSubscription();
    this.id = (this.activatedRoute.snapshot.paramMap.get("id")).toString();  
    console.log("id:"+this.id)
    if(this.id==="beds"){this.view=2;}
    if(this.id==="users"){this.view=1;}

    await new Promise(f => setTimeout(f, 1000));
    this.Log_in();
    
  }
  async ngOnDestroy() {
    console.log("quitting");
    this.eventsDesSbuscription();
    this.usersDesSubscription();
    this.Log_out();
  }
  
  async Log_out() {
    console.log("here")
    let question="987654321";
    var time= new Date();
    let value= (time.getHours())+":"+ (time.getMinutes())+":"+time.getSeconds();
    let a=new MessageModel("sistema","987654321",  0, value,2);    
    console.log(a)
    let mqttmessage=JSON.stringify(a);
    console.log(mqttmessage);
    let topic="/User/general";
    this.MQTTServ.sendMesagge(topic, mqttmessage);
  }
  async Log_in() {
    this.GetUserLogKind(); 
    console.log("here")
    let question="987654321";
    var time= new Date();
    let value= (time.getHours())+":"+ (time.getMinutes())+":"+time.getSeconds();
    let a=new MessageModel("sistema","987654321",  0, value,1);    
    console.log(a)
    let mqttmessage=JSON.stringify(a);
    console.log(mqttmessage);
    let topic="/User/general";
    this.MQTTServ.sendMesagge(topic, mqttmessage);
    await new Promise(f => setTimeout(f, 1000));
    
  }

  GetUserLogKind()  {
    console.log("wainting for response");
    let question="";
    let topic="/User/"+this.username+"/response";    
    let localMessage;
    this.MQTTServ.MQTTClientLocal.subscribe(topic).on(Message=>{
      console.log("respuestaSystem:  "+Message.toString());
    
    })
  };

  /**
   * Subscription for receiving messages
   * of the status of the beds   
   */
 eventsSubscription(){
    
  let topic="/Beds/status";
  let receivedMessage;
  console.log("subscribed")
  this.MQTTServ.MQTTClientLocal.subscribe(topic).on(Message=>{
    console.log("received")
  // console.log(Message.string);            
  let localMessage = JSON.parse(Message.string);        
  
  console.log(localMessage.message);    
  
  this.messagesBeds2=[];
  localMessage.forEach(element => {      
    {        
    console.log("element:"+JSON.stringify(element.id));  
    let bedStatsLocal=new bedStats(element.id,element.st,element.spec)  
    this.messagesBeds2.push(bedStatsLocal);
    
   }
  });
  
  });
}
public eventsDesSbuscription(): void{
  let topic="/Beds/status";
  let receivedMessage;  
  this.MQTTServ.MQTTClientLocal.unsubscribe(topic);
  console.log("beds status unsubscribed")
}

public usersSubscription(): void{
    
  let topic="/User/status";
  let receivedMessage;
  console.log("user subscribed")
  this.MQTTServ.MQTTClientLocal.subscribe(topic).on(Message=>{
   
  let localMessage = JSON.parse(Message.string);      
  let local2=Message.string;
  console.log(localMessage[0].message);    
  
  this.messagesUsers=[];
  localMessage.forEach(element => {      
    {        
    let userStatsLocal =  new userStats(element.id,element.st)
    this.messagesUsers.push(userStatsLocal);
    console.log(JSON.stringify(userStatsLocal))
  
   }
  })
  })
}
  
  public usersDesSubscription(){
    let topic="/User/status";
    let receivedMessage;
    
    this.MQTTServ.MQTTClientLocal.unsubscribe(topic)
    console.log("users status  unsubscribed")
  }

  
async onClickUser(){
  this.view=1;
}

async onClickBeds(){
  this.view=2;
}

}
