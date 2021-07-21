import { Component, Input, OnInit } from '@angular/core';
import { ModalController, ToastController } from '@ionic/angular';
import { checklistItem, ChecklistService } from 'src/app/services/checklist.service';

@Component({
  selector: 'app-update-list',
  templateUrl: './update-list.page.html',
  styleUrls: ['./update-list.page.scss'],
})
export class UpdateListPage implements OnInit {
  @Input() item;
  categories =[]
  categorySelectedCategory
  
  newItemObj: any[] = [];
  @Input() itemName: string;
  @Input() itemPriority: string;
  @Input() itemCategory: string;

  constructor(public modalCtlr:ModalController, public checklistService:ChecklistService, public toast : ToastController) { }

  ngOnInit() {
    this.categories.push('Alcoholic Beverages')
    this.categories.push('Beverages')
    this.categories.push('Cleaning Supplies')
    this.categories.push('Food')
    this.categories.push('Hygiene')
    this.categories.push('Pharmaceutical')

    this.categorySelectedCategory = this.item.category;
  }

  selectCategory(index){
    this.categorySelectedCategory = this.categories[index]
    console.log(this.categorySelectedCategory);
  }

  async dismis(){
    await this.modalCtlr.dismiss()
  }

  update(item: checklistItem){
      item.name = this.itemName;
      item.priority = this.itemPriority;
      item.category = this.categorySelectedCategory;

      
      this.checklistService.updateItems(item).then(() => {
        // this.showToast('Item Updated');
      })
      this.dismis();

      this.showToast("To-do list updated!");
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
