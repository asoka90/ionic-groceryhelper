import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { ChecklistService } from '../../services/checklist.service';

@Component({
  selector: 'app-add-new-task',
  templateUrl: './add-new-task.page.html',
  styleUrls: ['./add-new-task.page.scss'],
})
export class AddNewTaskPage implements OnInit {
  categories =[]
  categorySelectedCategory
  
  newItemObj = {}
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

  async add(){
    this.newItemObj = ({itemName:this.itemName, 
                        itemPriority:this.itemPriority, 
                        itemCategory:this.categorySelectedCategory})
    console.log(this.newItemObj);
    let uid = this.itemName

    if(uid){
      await this.checklistService.addItem(uid,this.newItemObj)
    }else{
      console.log("Can't save an empty list");
    }

    this.dismis()
  }

  selectCategory(index){
    this.categorySelectedCategory = this.categories[index]
    console.log(this.categorySelectedCategory);
  }

  async dismis(){
    await this.modalCtrl.dismiss(this.newItemObj)
}
}
