import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { AlertController, ModalController, ToastController } from '@ionic/angular';
import { BudgetModalComponent } from 'src/app/components/budget-modal/budget-modal.component';
import { budgetItem, budgetStorageService } from 'src/app/services/budgetStorage.service';
import { expensesItem, ExpensesStorageService } from 'src/app/services/expenses-storage.service';
import { Chart, registerables } from 'chart.js';
import { BudgetUpdateModalComponent } from 'src/app/components/budget-update-modal/budget-update-modal.component';
Chart.register(...registerables);

@Component({
  selector: 'app-budget',
  templateUrl: './budget.page.html',
  styleUrls: ['./budget.page.scss'],
})
export class BudgetPage implements OnInit {
  budgetitems: budgetItem[] = [];
  expensesItems: expensesItem[] = [];
  totalBudget: number = 0;
  totalExpenses: number = 0;

  @ViewChild('circleCanvas') public circleCanvas: ElementRef;

  private doughnutChart: Chart;

  constructor(public alert : AlertController, private modalCtrl : ModalController, private budgetStorageService : budgetStorageService, private expensesStorageService : ExpensesStorageService, private toast : ToastController) {}
  
  ngOnInit(){
  }

  ionViewDidEnter(){
    this.loadItems();
    setTimeout(() => {
      this.doughnutChartMethod();
    }, 100)
    
  }

  ionViewWillLeave(){
    this.doughnutChart.destroy();
  }
  
  // Doughnut Chart
  doughnutChartMethod() {
    console.log(this.budgetitems);
    this.doughnutChart = new Chart(this.circleCanvas.nativeElement, {
      type: "doughnut",
      data: {
        labels: ["Total Budget", "Total Expenses"],
        datasets: [
          {
            data: [this.totalBudget, this.totalExpenses],
            backgroundColor: [
              "rgba(255, 99, 132, 1)",
              "rgba(54, 162, 235, 1)"
            ],
            hoverBackgroundColor: ["#FF6384", "#36A2EB"]
          }
        ]
      }
    });
  }

  // Read
  loadItems(){
    this.budgetStorageService.getBudgetItems().then(items => {
      this.budgetitems = items;
      this.totalBudget = 0;
      for(let i of this.budgetitems){
        this.totalBudget = this.totalBudget + i.amount;
      }

      console.log("Total Budget: " + this.totalBudget);
      
    });

    this.expensesStorageService.getExpenseItems().then(items => {
      this.expensesItems = items;
      this.totalExpenses = 0;
      for(let i of this.expensesItems){
        this.totalExpenses = this.totalExpenses + i.amount;
      }

      console.log("Total Expenses: " + this.totalExpenses);
      if(this.totalExpenses > this.totalBudget){
        this.alertBudget();
      } else{
        console.log("Everything is under Budget");
      }
    })

    
  }

  //  Delete
  deleteItem( item: budgetItem){
    this.budgetStorageService.deleteBudgetItems(item.id).then(item => {
      this.showToast('Item Removed!');
      this.loadItems();
    })
    
  }

  // Reload Graph and load data
  reload(){
    this.loadItems();
    this.doughnutChart.destroy();
    setTimeout(() => {
      this.doughnutChartMethod();
    }, 100);
    
  }
  
  // Open Modal
   async openModal(){
    let modal = await this.modalCtrl.create({
      component : BudgetModalComponent
    });
    
    modal.onDidDismiss().then(()=>{
      this.reload();
    });

    return await modal.present();
  }
  
  // Update
  async openUpdateModal(i){
    let modal = await this.modalCtrl.create({
      component : BudgetUpdateModalComponent,
      componentProps: {
        'budgetID': i.id,
        'budgetName': i.name,
        'budgetAmount': i.amount
      }
    });
    
    modal.onDidDismiss().then(()=>{
      this.reload();
    });

    return await modal.present();
  }

  // Alert Dialog
  delete(i){
    this.alert.create({
      header: 'Delete',
      message: 'Are you sure you want to delete this?',
      buttons: [
        {
          text: 'No',
          handler: () => {
            console.log('No');
          }
        },
        {
          text: 'Yes',
          handler: () => {
            this.deleteItem(i);
            this.reload();
          }
        }
    ]
    }).then(res => {
      res.present();
    });
  }

  // Dialog Overbudget
  alertBudget(){
    this.alert.create({
      header: "Over the budget!",
      message: "You are spending above the overall budget",
      buttons: [
        {
          text: "Ok"
        }
      ]
    }).then(res => {
      res.present();
    });
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
