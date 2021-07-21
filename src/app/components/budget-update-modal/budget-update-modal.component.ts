import { Component, ElementRef, Input, OnInit, Renderer2 } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ModalController, ToastController } from '@ionic/angular';
import { budgetItem, budgetStorageService } from 'src/app/services/budgetStorage.service';

export interface Item{
  id: string,
  name: string,
  amount: number
}

@Component({
  selector: 'app-budget-update-modal',
  templateUrl: './budget-update-modal.component.html',
  styleUrls: ['./budget-update-modal.component.scss'],
})
export class BudgetUpdateModalComponent implements OnInit {
  budgetItem: any[] = [];
  checker:boolean = true;
  public updateBudgetForm: FormGroup;

  @Input() budgetID: string;
  @Input() budgetName: string;
  @Input() budgetAmount: number;

  constructor(private modalCtrl : ModalController, private frmBuilder : FormBuilder, private budgetStorageService : budgetStorageService, private toast : ToastController) { 
    this.updateBudgetForm = frmBuilder.group({
      budgetName: ['', Validators.required],
      budgetAmount: ['', Validators.required]
    })
  }
  
  ngOnInit() {
    let item = {} as Item;
    item.id = this.budgetID;
    item.name = this.budgetName;
    item.amount = this.budgetAmount;
    this.budgetItem.push(item);

    this.updateBudgetForm.setValue({
      budgetName: this.budgetName,
      budgetAmount: this.budgetAmount
    })
  }

  // Get Value from formGroup
  get name(): string{
    return this.updateBudgetForm.value['budgetName']
  }

  get amount(): number{
    return this.updateBudgetForm.value['budgetAmount']
  }

  dismissModal(){
    this.modalCtrl.dismiss();
  }

  // Update
  submitUpdateBudget(item: budgetItem){
    item.name = this.name;
    item.amount = this.amount;
    this.budgetStorageService.updateBudgetItems(item).then(() => {
      this.showToast('Item Updated');
    })
    this.dismissModal();
  }

  gotChar(eve) {
    console.log(this.checker);
    this.checker = eve.target.value > '0' ? true : false ;
    if(eve.target.value < '1'){
      this.showToast("Insufficient amount");
      // this.render.setStyle()
    }
    
  }

  gotChange(eve) {
    console.log(this.checker);
    this.checker = eve.target.value < '0' ? true : false;
    if(eve.target.value < '1'){
      this.showToast("Insufficient amount");
    }
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
