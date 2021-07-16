import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-expenses-modal',
  templateUrl: './expenses-modal.component.html',
  styleUrls: ['./expenses-modal.component.scss'],
})
export class ExpensesModalComponent implements OnInit {
  public expensesForm : FormGroup;
  constructor(private modalCtrl : ModalController, private formBuilder : FormBuilder) { 

    this.expensesForm = formBuilder.group({
      expensesName: ['', Validators.required],
      expensesBudget: ['', Validators.required],
      expensesAmount: ['', Validators.required],
      expensesNote: ['', Validators.required],
      expensesDate: ['', Validators.required]
      // Add Receipt
    });

  }

  ngOnInit() {}

  dismissModal(){
    this.modalCtrl.dismiss();
  }

  // Get Value from formGroup
  get name(): string{
    return this.expensesForm.value['expensesName'];
  }

  get budget(): string{
    return this.expensesForm.value['expensesBudget'];
  }

  get amount(): number{
    return this.expensesForm.value['expensesAmount'];
  }

  get note(): string{
    return this.expensesForm.value['expensesNote'];
  }

  get date(): string{
    return this.expensesForm.value['expensesDate'];
  }

  // Submit Expenses
  submitExpenses(){
    console.log(this.name + "\n" + this.budget + "\n" + this.amount + "\n" + this.note + "\n" + this.date);
  }
}
