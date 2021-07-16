import { Component, OnInit } from '@angular/core';
import { AlertController, ModalController } from '@ionic/angular';
import { BudgetModalComponent } from 'src/app/components/budget-modal/budget-modal.component';

@Component({
  selector: 'app-budget',
  templateUrl: './budget.page.html',
  styleUrls: ['./budget.page.scss'],
})
export class BudgetPage implements OnInit {
  inputBudget: any [] = [];
  
  constructor(public alert : AlertController, private modalCtrl : ModalController) { }

  ngOnInit() {
  }

  customTB(index, item){
    return '${index}-${item.id}';
  }

  test(){
    alert("hey");
  }

  // Open Modal
  async openModal(){
    const modal = await this.modalCtrl.create({
      component : BudgetModalComponent
    });

    await modal.present();
  }
  // 

  // Alert Dialog
  delete(i){
    this.alert.create({
      header: 'Delete',
      message: 'Are you sure you want to delete this?',
      buttons: [
        {
          text: 'No',
          handler: () => {
            console.log('I care about humanity');
          }
        },
        {
          text: 'Yes',
          handler: () => {
            this.inputBudget.splice(i, 1);
          }
        }
    ]
    }).then(res => {
      res.present();
    });
  }
  // 
}
