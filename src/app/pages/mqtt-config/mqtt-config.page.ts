import { Component, OnInit } from '@angular/core';
import { Storage } from '@capacitor/storage';
import { LocalStorageService } from '../../services/local-storage.service';
import {Client, connect} from 'rsup-mqtt'
import { Filesystem, Directory, Encoding } from '@capacitor/filesystem';





@Component({
  selector: 'app-mqtt-config',
  templateUrl: './mqtt-config.page.html',
  styleUrls: ['./mqtt-config.page.scss'],
})
export class MqttConfigPage implements OnInit {
  MQTTSERVER:string="192.168.1.100";
  MQTTPORT:number=9001;
  MQTTClientLocal: Client;
  number:number;
  connected: number;  

  general_data:string;//for debugging

  constructor(public localSto: LocalStorageService ) { 
    this.number=0;
    this.connected=0;
  }

  ngOnInit() {
  /*  connect({host: this.MQTTSERVER, port: this.MQTTPORT, ssl: false,path:'/test/'})
    .then(client => { this.MQTTClientLocal = client; });*/
    
  }

  public saveClick(){
    //console.log("clicked:", this.MQTTSERVER,":", this.MQTTPORT);
    this.saveValues();
  }

   public async Reset(){
    //console.log("clicked:", this.MQTTSERVER,":", this.MQTTPORT);

    //this.getServer();
    //this.getPort();  
    this.connected=0;
    
    /*if(this.MQTTClientLocal!==null){    
    
    this.MQTTClientLocal.disconnect();
    console.log("here");
    this.MQTTClientLocal= null;
    }*/
    //this.MQTTClientLocal= NULL;
    
    const client = await connect({host: this.MQTTSERVER, port: this.MQTTPORT, ssl: false,path:'/test/'})
    //connect({host: "192.168.1.100", port: 9001, username:"Laura", password:"123123", ssl: false,path:'/test/'})
    .then(client => { 
      console.log(client);
      console.log("**************************************************************");
      console.log("*******************************************************************************");
      console.log("**************************************************************");
      
      if(client.isConnected())
        {this.connected=1;
          this.MQTTClientLocal = client; 
          console.log("status: connected");
        }    
    })
    .catch (function(json) { 
      console.log("Error:"+json.errorCode);
      console.log("*******************************************************************************");
      console.log("**************************************************************");
      console.log("*******************************************************************************");
      if(json.errorCode == 7)
        {alert("error: mala configuracion broker");}
      return this.connected=0;})
    .finally(function(){return this.connected=0;}); 
  }

  public pruebaClick(){
    
    this.number++;
    this.MQTTClientLocal.publish('/mensajes', 'hello')

  }
  /**
   * Saving port values to localStorage
   */
  public saveValues = async () => { 
    this.writeSecretFile(); 
    this.localSto.saveValuesString('MQTTSERVER',this.MQTTSERVER);
    this.localSto.saveValuesNumber('MQTTPORT',this.MQTTPORT);
    this.readSecretFile();
  };

  /**
   * Get the server ip from the local storage
   */
  public getServer = async () => {
    let { value } = await Storage.get({ key: 'MQTTSERVER' });    
    let server=value;    
    this.MQTTSERVER=server;
    console.log('MQTTSERVER:'+this.MQTTSERVER);
  };

  /**
   * Get the broker port from the local storage
   */
  public getPort = async () => {
    
    let {value}  = await Storage.get({ key: 'MQTTPORT' });    
    let port=parseInt(value);  
    this.MQTTPORT=port;
    console.log('MQTTPORT:'+this.MQTTPORT);  
  };

  /**
   * Read the server IP from the filesystem
   */
  
  public writeSecretFile = async () => {
    try {
    const test=await Filesystem.writeFile({
      path: 'mqtt.txt',
      data: 'MQTTSERVER:'+this.MQTTSERVER+'\nMQTTPort: '+this.MQTTPORT,
      directory: Directory.Documents,
      encoding: Encoding.UTF8,
    });
    console.log(test);
  } catch (e){
    console.log(e);
  }
  };
  
  public readSecretFile = async () => {
    try{
    let contents = await Filesystem.readFile({
      path: 'mqtt.txt',
      directory: Directory.Documents,
      encoding: Encoding.UTF8,
    });
    
    console.log('secrets:', contents);
    this.general_data = contents.data.toString();    
    
    } catch (e){
    console.log(e);
  } 

  };
  
  public deleteSecretFile = async () => {
    await Filesystem.deleteFile({
      path: 'mqtt.txt',
      directory: Directory.Documents,
    });
  };
  
  public readFilePath = async () => {
    // Here's an example of reading a file with a full file path. Use this to
    // read binary data (base64 encoded) from plugins that return File URIs, such as
    // the Camera.
    const contents = await Filesystem.readFile({
      path: 'file:///var/mobile/Containers/Data/Application/22A433FD-D82D-4989-8BE6-9FC49DEA20BB/Documents/text.txt'
    });
  
    console.log('data:', contents);
  };

}
