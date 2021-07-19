import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage-angular';

const KEY = 'checklist'
export interface checklistItem{
  id: number,
  name: string,
  priority: string,
  category: string
}
@Injectable({
  providedIn: 'root'
})
export class ChecklistService {

  constructor(private storage: Storage) {
    this.init()
   }

   addItems(item: checklistItem): Promise<any>{
    return this.storage.get(KEY).then((items: checklistItem[]) => {
      if (items){
        items.push(item);
        return this.storage.set(KEY, items);
      } else{
        return this.storage.set(KEY, [item]);
      }
    });
  }

  deleteItem(id: number): Promise<checklistItem>{
    return this.storage.get(KEY).then((items: checklistItem[]) => {
      if (!items || items.length === 0){
        return null;
      }

      let toKeep: checklistItem[] = [];

      for(let i of items){
        if (i.id !== id){
          toKeep.push(i);
        }
      }

      return this.storage.set(KEY, toKeep);
    });
  }

  updateItems(item: checklistItem): Promise<any>{
    return this.storage.get(KEY).then((items: checklistItem[]) => {
      if (!items || items.length === 0){
        return null;
      }

      let newItems: checklistItem[] = [];

      for (let i of items){
        if (i.id === item.id){
          newItems.push(item);
        } else{
          newItems.push(i);
        }
      }

      return this.storage.set(KEY, newItems);
    });
  }

  getAllItems(): Promise<checklistItem[]>{
    return this.storage.get(KEY);
  }

  async init(){
    await this.storage.create()
  }

}
