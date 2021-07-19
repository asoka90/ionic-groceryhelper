import { Component, Input, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { checklistItem, ChecklistService } from 'src/app/services/checklist.service';

export interface Item{
  name: string,
  priority: string,
  category: string
}

@Component({
  selector: 'app-update-list',
  templateUrl: './update-list.page.html',
  styleUrls: ['./update-list.page.scss'],
})
export class UpdateListPage implements OnInit {
  @Input() itemName: string;
  @Input() itemPriority: string;
  categories =[]
  categorySelectedCategory
  
  newItemObj: any[] = [];

  constructor(public modalCtlr:ModalController, public checklistService:ChecklistService) { }

  ngOnInit() {
    this.categories.push('Alcoholic Beverages')
    this.categories.push('Beverages')
    this.categories.push('Cleaning Supplies')
    this.categories.push('Food')
    this.categories.push('Hygiene')
    this.categories.push('Pharmaceutical')
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
  }
}
