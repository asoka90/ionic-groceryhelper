import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-add-new-task',
  templateUrl: './add-new-task.page.html',
  styleUrls: ['./add-new-task.page.scss'],
})
export class AddNewTaskPage implements OnInit {
  categories = ['Alcoholic Beverages', 'Baby Products', 'Beverages', 'Cleaning Supplies', 'Food', 'Hygiene', 'Miscellaneous', 'Pet Care', 'Pharmacy']

  itemName
  itemPriority
  itemCategory

  itemObject
  constructor(public modalCtrl:ModalController) { }

  ngOnInit() {
  }

  async dismis(){
      await this.modalCtrl.dismiss(this.itemObject)
  }

  selectedCategory(index){
    this.itemCategory = this.categories[index]
  }

  AddItem(){
    this.itemObject = ({itemName:this.itemName, 
                        itemPriority:this.itemPriority, 
                        itemCategory:this.itemCategory})
    
    this.dismis()
  }
}
