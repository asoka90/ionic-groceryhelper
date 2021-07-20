import { Component, OnInit } from '@angular/core';
import { ModalController, ToastController } from '@ionic/angular';
import { AddNewTaskPage as AddNewItemPage } from '../add-new-item/add-new-task.page';
import { checklistItem, ChecklistService } from 'src/app/services/checklist.service';
import { UpdateListPage } from '../update-list/update-list.page';

@Component({
  selector: 'app-checklist',
  templateUrl: './checklist.page.html',
  styleUrls: ['./checklist.page.scss'],
})
export class ChecklistPage implements OnInit {
  checkList: checklistItem[] = [];

  constructor(public modalCtrl:ModalController, public checklistService:ChecklistService, private toast : ToastController) {
    this.getAllItem();
   }

   ngOnInit() {}

  async addItem(){
    const modal = await this.modalCtrl.create({
      component: AddNewItemPage,
    })
    modal.onDidDismiss().then(newItem =>{
      this.getAllItem()
    })
    return await modal.present()
  }

  getAllItem(){
    this.checklistService.getAllItems().then(items => {
      this.checkList = items;
    });

    console.log(this.checkList);
  }

  delete(item){
    this.checklistService.deleteItem(item.id).then(item => {
      this.showToast('To-do list removed!');
      this.getAllItem();
    })
    
  }

  async update(selectedItem){
    const modal = await this.modalCtrl.create({
      component: UpdateListPage,
      componentProps: {
        item: selectedItem,
        'itemName': selectedItem.name,
        'itemPriority': selectedItem.priority,
        'itemCategory': selectedItem.category
      }
    })
    
    modal.onDidDismiss().then(()=>{
      this.getAllItem()
    })
    console.log(selectedItem);
    return await modal.present()
  }

   // Toast
   async showToast(msg){
    const toast = await this.toast.create({
      message: msg,
      duration: 2000
    });
    toast.present();
  }
  
}
