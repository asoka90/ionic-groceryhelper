import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ModalController, Platform, ToastController } from '@ionic/angular';
import { budgetItem, budgetStorageService } from 'src/app/services/budgetStorage.service';
import { Storage } from '@ionic/storage';
@Component({
  selector: 'app-budget-modal',
  templateUrl: './budget-modal.component.html',
  styleUrls: ['./budget-modal.component.scss'],
})
export class BudgetModalComponent implements OnInit {
  newItem: budgetItem = <budgetItem>{};
  public budgetForm : FormGroup;

  constructor(private modalCtrl : ModalController, private formBuilder : FormBuilder, private storageService : budgetStorageService, private pltform : Platform, private toast : ToastController, private storage : Storage) { 
    this.budgetForm = formBuilder.group({
      budgetName: ['', Validators.required],
      budgetAmount: ['', Validators.required]
    });
  }

  async ngOnInit() {
    await this.storage.create();
  }

  dismissModal(){
    this.modalCtrl.dismiss();
  }

  // Get Value from formGroup
  get name(): string{
    return this.budgetForm.value['budgetName']
  }

  get amount(): number{
    return this.budgetForm.value['budgetAmount']
  }

  // Submit
  submitBudget(){
    this.newItem.id = Date.now();
    this.newItem.name = this.name;
    this.newItem.amount = this.amount;
    this.storageService.addBudgetItems(this.newItem).then(item => {
      this.newItem = <budgetItem>{};
      this.showToast('Item added');
    })
    this.dismissModal();
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
