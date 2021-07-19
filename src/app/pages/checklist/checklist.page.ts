import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { AddNewTaskPage as AddNewItemPage } from 'src/app/pages/add-new-item/add-new-task.page';
import { ChecklistService } from 'src/app/services/checklist.service';
import { UpdateListPage } from '../update-list/update-list.page';

@Component({
  selector: 'app-checklist',
  templateUrl: './checklist.page.html',
  styleUrls: ['./checklist.page.scss'],
})
export class ChecklistPage implements OnInit {

checkList = []

  today : number = Date.now()

  constructor(public modalCtrl:ModalController, public checklistService:ChecklistService) {
    this.getAllItem()
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
    this.checkList = this.checklistService.getAllItems()
    console.log(this.checklistService.getAllItems());

  }

  delete(key){
    this.checklistService.deleteItem(key)
    this.getAllItem()
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

  ngOnInit() {
  }
}
