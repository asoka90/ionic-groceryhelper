import { Component, OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-budget',
  templateUrl: './budget.page.html',
  styleUrls: ['./budget.page.scss'],
})
export class BudgetPage implements OnInit {
  items: any [] = [];
  
  constructor(public alert : AlertController) { }

  ngOnInit() {
  }

  customTB(index, item){
    return '${index}-${item.id}';
  }

  test(){
    alert("hey");
  }

  // Alert Dialog
  add(){
    this.alert.create({
      header: "Add",
      inputs: [
        {
          name: 'expensess',
          type: 'text',
          placeholder: 'Title'
        }
      ],
      buttons: [
        {
            text: 'No',
            handler: () => {
              console.log('I care about humanity');
          }
        },
        {
          text: 'Yes',
          handler: (alertData) => {
            this.items.push(alertData.expensess);
            console.log(this.items);
          }
        } 
      ]
    }).then(res => {
      res.present();
    });
  }

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
            this.items.splice(i, 1);
          }
        }
    ]
    }).then(res => {
      res.present();
    });
  }
  // 
}
