import { Component, OnInit, ViewChild } from '@angular/core';
import { AlertController, IonList, ModalController, Platform, ToastController } from '@ionic/angular';
import { ExpensesModalComponent } from 'src/app/components/expenses-modal/expenses-modal.component';
import { expensesItem, ExpensesStorageService } from 'src/app/services/expenses-storage.service';
import { Storage } from '@ionic/storage';
import { ExpensesUpdateModalComponent } from 'src/app/components/expenses-update-modal/expenses-update-modal.component';
@Component({
  selector: 'app-expenses',
  templateUrl: './expenses.page.html',
  styleUrls: ['./expenses.page.scss'],
})
export class ExpensesPage implements OnInit {
  items: expensesItem[] = [];

  @ViewChild('mylist')mylist: IonList;

  constructor(private alert : AlertController, private modalCtrl : ModalController, private storageService : ExpensesStorageService, private pltform : Platform, private toast : ToastController, private storage : Storage) { 
    this.pltform.ready().then(() => {
      this.loadItems();
    })
  }

  async ngOnInit() {
    await this.storage.create();
  }

  // Read
  loadItems(){
    this.storageService.getExpenseItems().then(items => {
      this.items = items;
    })
  }

  //  Delete
  deleteItem( item: expensesItem){
    this.storageService.deleteExpenseItems(item.id).then(item => {
      this.showToast('Item Removed!');
      // this.mylist.closeSlidingItems();
      this.loadItems();
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

  // Open Modal
  async openModal(){
    const modal = await this.modalCtrl.create({
      component : ExpensesModalComponent
    });

    await modal.present();

    modal.onDidDismiss().then(()=>{
      this.loadItems();
    });
  }
  
  // Update
  async openUpdateModal(i){
    let modal = await this.modalCtrl.create({
      component : ExpensesUpdateModalComponent,
      componentProps: {
        'expensesID': i.id,
        'expensesName': i.name,
        'expensesAmount': i.amount,
        'expensesNote': i.note,
        'expensesDate': i.date
      }
    });
    
    modal.onDidDismiss().then(()=>{
      this.loadItems();
    });

    return await modal.present();
  }

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
