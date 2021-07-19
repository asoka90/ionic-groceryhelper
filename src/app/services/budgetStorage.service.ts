import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';

export interface budgetItem{
  id: number,
  name: string,
  amount: number
}

const ITEMS_KEY = 'my-items-budget';

@Injectable({
  providedIn: 'root'
})
export class budgetStorageService {

  constructor(private storage : Storage) { 
    this.init();
  }

  // Create
  addBudgetItems(item: budgetItem): Promise<any>{
    return this.storage.get(ITEMS_KEY).then((items: budgetItem[]) => {
      if (items){
        items.push(item);
        return this.storage.set(ITEMS_KEY, items);
      } else{
        return this.storage.set(ITEMS_KEY, [item]);
      }
    });
  }

  // Read
  getBudgetItems(): Promise<budgetItem[]>{
    return this.storage.get(ITEMS_KEY);
  }

  // Update
  updateBudgetItems(item: budgetItem): Promise<any>{
    return this.storage.get(ITEMS_KEY).then((items: budgetItem[]) => {
      if (!items || items.length === 0){
        return null;
      }

      let newItems: budgetItem[] = [];

      for (let i of items){
        if (i.id === item.id){
          newItems.push(item);
        } else{
          newItems.push(i);
        }
      }

      return this.storage.set(ITEMS_KEY, newItems);
    });
  }

  // Delete
  deleteBudgetItems(id: number): Promise<budgetItem>{
    return this.storage.get(ITEMS_KEY).then((items: budgetItem[]) => {
      if (!items || items.length === 0){
        return null;
      }

      let toKeep: budgetItem[] = [];

      for(let i of items){
        if (i.id !== id){
          toKeep.push(i);
        }
      }

      return this.storage.set(ITEMS_KEY, toKeep);
    });
  }

  async init(){
    await this.storage.create();
  }
}
