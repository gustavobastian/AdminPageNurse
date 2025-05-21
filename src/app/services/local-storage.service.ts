import { Injectable } from '@angular/core';
import { Storage } from '@capacitor/storage';

@Injectable({
  providedIn: 'root'
})
export class LocalStorageService {

  constructor() { 
    console.log("starting localStorage");
  }

  /**
   * Saving a string in the local storage
   * @param keyP key
   * @param valueP value
   */
  public async saveValuesString (keyP: string, valueP: string) {
    await Storage.set({
      key: keyP,
      value: valueP,
    });
  }

  /**
   * Saving a number to the local storage
   * @param keyP key
   * @param valueP value
   */
  public async saveValuesNumber (keyP: string, valueP: number) {
    await Storage.set({
      key: keyP,
      value: valueP.toString(),
    });
  }  /*
  public async getValuesString (keyP: string) : Promise<string>{
    let value  = await Storage.get({ key: keyP });
    let value2 = JSON.parse(value);
    console.log("value inside:"+value2[2]);
    return value.toString();
  }
  public async getValuesNumber (keyP: string) : Promise<number>{
    let value  = await Storage.get({ key: keyP });
    return parseInt(value.toString(),1);
  }*/

}
