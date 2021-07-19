import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { checklistItem, ChecklistService } from '../../services/checklist.service';

@Component({
  selector: 'app-add-new-task',
  templateUrl: './add-new-task.page.html',
  styleUrls: ['./add-new-task.page.scss'],
})
export class AddNewTaskPage implements OnInit {
  categories =[]
  categorySelectedCategory
  
  newItemObj: checklistItem= <checklistItem>{};
  itemName
  itemPriority
  itemCategory

  constructor(public modalCtrl:ModalController, public checklistService:ChecklistService) { }

  ngOnInit() {
    this.categories.push('Alcoholic Beverages')
    this.categories.push('Beverages')
    this.categories.push('Cleaning Supplies')
    this.categories.push('Food')
    this.categories.push('Hygiene')
    this.categories.push('Pharmaceutical')
    
  }

  add(){
    console.log(this.newItemObj.category);
    this.newItemObj.id = Date.now();
    this.newItemObj.name = this.itemName;
    this.newItemObj.priority = this.itemPriority;
    this.newItemObj.category = this.categorySelectedCategory;
    this.checklistService.addItems(this.newItemObj).then(item => {
      this.newItemObj = <checklistItem>{};
      // this.showToast('Item added');
    })

    this.dismis()
  }

  selectCategory(index){
    this.categorySelectedCategory = this.categories[index]
    console.log("Category",this.categorySelectedCategory);
  }

  async dismis(){
    await this.modalCtrl.dismiss(this.newItemObj)
}
}
