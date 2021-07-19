import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { AddNewTaskPage as AddNewItemPage } from 'src/app/pages/add-new-item/add-new-task.page';
import { checklistItem, ChecklistService } from 'src/app/services/checklist.service';
import { UpdateListPage } from '../update-list/update-list.page';
// import { Storage } from '@ionic/storage';

@Component({
  selector: 'app-checklist',
  templateUrl: './checklist.page.html',
  styleUrls: ['./checklist.page.scss'],
})
export class ChecklistPage implements OnInit {
checkList: checklistItem[] = [];

  today : number = Date.now()

  constructor(public modalCtrl:ModalController, public checklistService:ChecklistService) {
    this.getAllItem();
    
   }

   ngOnInit() {
  }

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
      // this.showToast('Item Removed!');
      this.getAllItem();
    })
    
  }

  async update(selectedItem){
    const modal = await this.modalCtrl.create({
      component: UpdateListPage,
      componentProps: {item: selectedItem}
    })
    
    modal.onDidDismiss().then(()=>{
      this.getAllItem()
    })
    console.log(selectedItem);
    return await modal.present()
  }

  
}
