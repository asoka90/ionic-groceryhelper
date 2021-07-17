import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';

export interface expensesItem{
  id: number,
  name: string,
  budget: string,
  amount: number,
  note: string,
  date: string
}

const ITEMS_KEY = 'my-items-expenses';

@Injectable({
  providedIn: 'root'
})
export class ExpensesStorageService {

  constructor(private storage : Storage) { }

  // Create
  addExpenseItems(item: expensesItem): Promise<any>{
    return this.storage.get(ITEMS_KEY).then((items: expensesItem[]) => {
      if (items){
        items.push(item);
        return this.storage.set(ITEMS_KEY, items);
      } else{
        return this.storage.set(ITEMS_KEY, [item]);
      }
    });
  }

  // Read
  getExpenseItems(): Promise<expensesItem[]>{
    return this.storage.get(ITEMS_KEY);
  }

  // Update
  updateExpenseItems(item: expensesItem): Promise<any>{
    return this.storage.get(ITEMS_KEY).then((items: expensesItem[]) => {
      if (!items || items.length === 0){
        return null;
      }

      let newItems: expensesItem[] = [];

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
  deleteExpenseItems(id: number): Promise<expensesItem>{
    return this.storage.get(ITEMS_KEY).then((items: expensesItem[]) => {
      if (!items || items.length === 0){
        return null;
      }

      let toKeep: expensesItem[] = [];

      for(let i of items){
        if (i.id !== id){
          toKeep.push(i);
        }
      }

      return this.storage.set(ITEMS_KEY, toKeep);
    });
  }
}
