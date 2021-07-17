import { Component, OnInit, ViewChild } from '@angular/core';
import { AlertController, IonList, ModalController, Platform, ToastController } from '@ionic/angular';
import { BudgetModalComponent } from 'src/app/components/budget-modal/budget-modal.component';
import { budgetItem, budgetStorageService } from 'src/app/services/budgetStorage.service';
import { Storage } from '@ionic/storage';
import { expensesItem, ExpensesStorageService } from 'src/app/services/expenses-storage.service';
@Component({
  selector: 'app-budget',
  templateUrl: './budget.page.html',
  styleUrls: ['./budget.page.scss'],
})
export class BudgetPage implements OnInit {
  budgetitems: budgetItem[] = [];
  expensesItems: expensesItem[] = [];
  modifiedData: any[];
  @ViewChild('mylist')mylist: IonList;

  constructor(public alert : AlertController, private modalCtrl : ModalController, private budgetStorageService : budgetStorageService, private expensesStorageService : ExpensesStorageService, private pltform : Platform, private toast : ToastController, private storage : Storage) {
    this.pltform.ready().then(() => {
      this.loadBudgetItems();
      this.loadExpensesItems();
    })
   }

  async ngOnInit() {
    await this.storage.create();
  }

  // Read
  loadBudgetItems(){
    this.budgetStorageService.getBudgetItems().then(items => {
      this.budgetitems = items;
    })
  }

  loadExpensesItems(){
    this.expensesStorageService.getExpenseItems().then(items => {
      this.expensesItems = items;
    })
    this.modifiedData = JSON.parse(JSON.stringify(this.expensesItems));
  }

  //  Delete
  deleteItem( item: budgetItem){
    this.budgetStorageService.deleteBudgetItems(item.id).then(item => {
      this.showToast('Item Removed!');
      // this.mylist.closeSlidingItems();
      this.loadBudgetItems();
    })
  }

  // Toast
  async showToast(msg){
    const toast = await this.toast.create({
      message: msg,
      duration: 2000
    });
    toast.present();
  }

  test(){
    
  }

  // Open Modal
   async openModal(){
    let modal = await this.modalCtrl.create({
      component : BudgetModalComponent
    });
    
    await modal.present();

    modal.onDidDismiss().then(()=>{
      this.loadBudgetItems();
      this.loadExpensesItems();
    });
  }
  // 

  // Alert Dialog
  delete(i){
    this.alert.create({
      header: 'Delete',
      message: 'Are you sure you want to delete this?',
      buttons: [
        {
          text: 'No',
          handler: () => {
            console.log('No');
          }
        },
        {
          text: 'Yes',
          handler: () => {
            this.deleteItem(i);
          }
        }
    ]
    }).then(res => {
      res.present();
    });
  }
}
