import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage-angular';

@Injectable({
  providedIn: 'root'
})
export class ChecklistService {

  constructor(private storage: Storage) {
    this.init()
   }

  addItem(key, value){
    this.storage.set(key, value)
  }

  deleteItem(key){
    this.storage.remove(key)
  }

  updateItem(key, newValue){
    this.storage.set(key, newValue)
    this.getAllItems()
  }

  getAllItems(){
    let items: any = []
    this.storage.forEach((key, value, index) => {
    items.push({'key':value, 'value':key})

  });
  return items
  }

  async init(){
    await this.storage.create()
  }

}
