import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-budget-modal',
  templateUrl: './budget-modal.component.html',
  styleUrls: ['./budget-modal.component.scss'],
})
export class BudgetModalComponent implements OnInit {

  public budgetForm : FormGroup;

  constructor(private modalCtrl : ModalController, private formBuilder : FormBuilder) { 

    this.budgetForm = formBuilder.group({
      budgetName: ['', Validators.required],
      budgetAmount: ['', Validators.required]
    });

  }

  ngOnInit() {}

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
    console.log(this.name + "\n" + this.amount);
  }
  
}
