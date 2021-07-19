import { Component, Input, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { ChecklistService } from 'src/app/services/checklist.service';

@Component({
  selector: 'app-update-list',
  templateUrl: './update-list.page.html',
  styleUrls: ['./update-list.page.scss'],
})
export class UpdateListPage implements OnInit {
  @Input() item;
  categories =[]
  categorySelectedCategory
  
  newItemObj = {}
  itemName
  itemPriority
  itemCategory

  constructor(public modalCtlr:ModalController, public checklistService:ChecklistService) { }

  ngOnInit() {
    this.categories.push('Alcoholic Beverages')
    this.categories.push('Beverages')
    this.categories.push('Cleaning Supplies')
    this.categories.push('Food')
    this.categories.push('Hygiene')
    this.categories.push('Pharmaceutical')

    this.itemName = this.item.value.itemName
    this.itemPriority = this.item.value.itemPriority
    this.categorySelectedCategory = this.item.value.itemCategory
  }

  selectCategory(index){
    this.categorySelectedCategory = this.categories[index]
    console.log(this.categorySelectedCategory);
  }

  async dismis(){
    await this.modalCtlr.dismiss()
  }

  async update(){
    this.newItemObj = ({itemName:this.itemName, 
      itemPriority:this.itemPriority, 
      itemCategory:this.categorySelectedCategory})
      let uid = this.item.key
      await this.checklistService.updateItem(uid,this.newItemObj)
      this.dismis()
  }
}
