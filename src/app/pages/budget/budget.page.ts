import { Component, ElementRef, HostListener, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { AlertController, IonList, ModalController, Platform, ToastController } from '@ionic/angular';
import { BudgetModalComponent } from 'src/app/components/budget-modal/budget-modal.component';
import { budgetItem, budgetStorageService } from 'src/app/services/budgetStorage.service';
import { Storage } from '@ionic/storage';
import { expensesItem, ExpensesStorageService } from 'src/app/services/expenses-storage.service';
import { Chart, registerables } from 'chart.js';
Chart.register(...registerables);

@Component({
  selector: 'app-budget',
  templateUrl: './budget.page.html',
  styleUrls: ['./budget.page.scss'],
})
export class BudgetPage implements OnInit, OnDestroy {
  budgetitems: budgetItem[] = [];
  expensesItems: expensesItem[] = [];
  totalBudget: number = 0;
  totalExpenses: number = 0;

  @ViewChild('mylist')mylist: IonList;
  @ViewChild('circleCanvas') public circleCanvas: ElementRef;

  private doughnutChart: Chart;

  constructor(public alert : AlertController, private modalCtrl : ModalController, private budgetStorageService : budgetStorageService, private expensesStorageService : ExpensesStorageService, private pltform : Platform, private toast : ToastController, private storage : Storage) {
    this.pltform.ready().then(() => {
      this.loadBudgetItems();
      this.loadExpensesItems();
    })
   }
  
  async ngOnInit() {
    await this.storage.create();
  }
  
  ionViewWillEnter(){
    console.log("Entering");
  }

  ionViewDidEnter(){
    console.log("Entered");
    this.doughnutChartMethod();
  }

  ionViewWillLeave(){
    console.log("Leaving");
    this.doughnutChart.destroy();
  }

  ionViewDidLeave(){
    console.log("Leave");
    // this.doughnutChart.destroy();
  }

  @HostListener('unloaded')
  ngOnDestroy(){
    console.log("desto");
  }

  doughnutChartMethod() {
    // Doughnut Chart
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
  loadBudgetItems(){
    this.budgetStorageService.getBudgetItems().then(items => {
      this.budgetitems = items;
      this.totalBudget = 0;
      for(let i of this.budgetitems){
        this.totalBudget = this.totalBudget + i.amount;
      }

      console.log("Total Budget: " + this.totalBudget);
        
      });
  }

  loadExpensesItems(){
    this.expensesStorageService.getExpenseItems().then(items => {
      this.expensesItems = items;
      this.totalExpenses = 0;
      for(let i of this.expensesItems){
        this.totalExpenses = this.totalExpenses + i.amount;
      }

      console.log("Total Expenses: " + this.totalExpenses);
    })
  }

  // Update
  updateBudget(){

  }

  //  Delete
  deleteItem( item: budgetItem){
    this.budgetStorageService.deleteBudgetItems(item.id).then(item => {
      this.showToast('Item Removed!');
      // this.mylist.closeSlidingItems();
      this.loadBudgetItems();
      this.loadExpensesItems();
    })
  }

  // Toast
  async showToast(msg){
    const toast = await this.toast.create({
      message: msg,
      duration: 2000
    });
    toast.present();
  }

  reload(){
    this.loadBudgetItems();
    this.loadExpensesItems();
    this.doughnutChart.destroy();
    this.doughnutChartMethod();
  }

  // Open Modal
   async openModal(){
    let modal = await this.modalCtrl.create({
      component : BudgetModalComponent
    });
    
    await modal.present();

    modal.onDidDismiss().then(()=>{
      this.loadBudgetItems();
      this.loadExpensesItems();
    });
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
            console.log('No');
          }
        },
        {
          text: 'Yes',
          handler: () => {
            this.deleteItem(i);
          }
        }
    ]
    }).then(res => {
      res.present();
    });
  }

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
}
