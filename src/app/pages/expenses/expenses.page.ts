import { Component, OnInit } from '@angular/core';
import { AlertController, ModalController } from '@ionic/angular';
import { ExpensesModalComponent } from 'src/app/components/expenses-modal/expenses-modal.component';

@Component({
  selector: 'app-expenses',
  templateUrl: './expenses.page.html',
  styleUrls: ['./expenses.page.scss'],
})
export class ExpensesPage implements OnInit {
  inputExpenses: any [] = [];

  constructor(private alert : AlertController, private modalCtrl : ModalController) { }

  ngOnInit() {
  }

  customTB(index, item){
    return '${index}-${item.id}';
  }

  test(){
    alert("Hey");
  }

  // Open Modal
  async openModal(){
    const modal = await this.modalCtrl.create({
      component : ExpensesModalComponent
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
            this.inputExpenses.splice(i, 1);
          }
        }
    ]
    }).then(res => {
      res.present();
    });
  }
}
