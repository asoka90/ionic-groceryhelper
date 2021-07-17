import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { AddNewTaskPage as AddNewTaskPage } from 'src/app/add-new-task/add-new-task.page';

@Component({
  selector: 'app-checklist',
  templateUrl: './checklist.page.html',
  styleUrls: ['./checklist.page.scss'],
})
export class ChecklistPage implements OnInit {

  todoList = []

  today : number = Date.now()

  constructor(public modalCtrl:ModalController) { }

  async addItem(){
    const modal = await this.modalCtrl.create({
      component: AddNewTaskPage
    })

    modal.onDidDismiss().then(newItemObj =>{
      console.log(newItemObj.data);
      this.todoList.push(newItemObj.data)

    })

    return await modal.present()
  }

  delete(index){
    this.todoList.splice(index,1)
  }

  ngOnInit() {
  }
}
