import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage-angular';
import { Drivers } from '@ionic/storage';
//import { BehaviorSubject } from 'rxjs/Rx';
import { BehaviorSubject, from, of } from 'rxjs';
import { switchMap,filter} from 'rxjs/operators';

import * as CordobaSQLiteDriver from 'localforage-cordovasqlitedriver';


const STORAGE_KEY= 'mylist';

@Injectable({
  providedIn: 'root'
})
export class StorageService {

  private storageReady = new BehaviorSubject(false);

  private _storage: Storage | null = null;

  constructor(private storage: Storage) { 
    //this.init();

  }
  async init() {
    // If using, define drivers here: await this.storage.defineDriver(/*...*/);
    console.log("DB INIT");
    await this.storage.defineDriver(CordobaSQLiteDriver);
    await this.storage.create();

    console.log("DB INIT DONE");
    this.storageReady.next(true);
    
  }
  // Create and expose methods that users of this service can
  // call, for example:
  public set(key: string, value: any) {
    this._storage?.set(key, value);
  }
  getData(){
    console.log("GET DATA");

    return this.storageReady.pipe(
      filter(ready=>ready), 
      switchMap(_=>{
        return from(this.storage.get(STORAGE_KEY)) || of([]);
      })
      )

    
  }

  async addData(item){
    const storedData = await this.storage.get(STORAGE_KEY) || []; //
    storedData.push(item);
    return this.storage.set(STORAGE_KEY,storedData);
  }
  async removeData(index){
    const storedData = await this.storage.get(STORAGE_KEY) || []; //
    storedData.splice(index,1);
    return this.storage.set(STORAGE_KEY,storedData);
  }

  
}
