import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ModalController, ToastController } from '@ionic/angular';
import { expensesItem, ExpensesStorageService } from 'src/app/services/expenses-storage.service';

export interface Item{
  id: string,
  name: string,
  amount: number,
  note: string,
  date: string
}

@Component({
  selector: 'app-expenses-update-modal',
  templateUrl: './expenses-update-modal.component.html',
  styleUrls: ['./expenses-update-modal.component.scss'],
})
export class ExpensesUpdateModalComponent implements OnInit {
  expensesItem: any [] = [];

  public expenseUpdateForm: FormGroup;

  @Input() expensesID: string;
  @Input() expensesName: string;
  @Input() expensesAmount: number;
  @Input() expensesNote: string;
  @Input() expensesDate: string;

  constructor(private modalCtrl : ModalController, private frmBuilder : FormBuilder, private expensesStorageService : ExpensesStorageService, private toast : ToastController) { 
    this.expenseUpdateForm = frmBuilder.group({
      expensesName: ['', Validators.required],
      expensesAmount: ['', Validators.required],
      expensesNote: ['', Validators.required],
      expensesDate: ['', Validators.required]
    })
  }

  ngOnInit() {
    let item = {} as Item;
    item.id = this.expensesID;
    item.name = this.expensesName;
    item.amount = this.expensesAmount;
    item.note = this.expensesNote;
    item.date = this.expensesDate;
    this.expensesItem.push(item);

    this.expenseUpdateForm.setValue({
      expensesName: this.expensesName,
      expensesAmount: this.expensesAmount,
      expensesNote: this.expensesNote,
      expensesDate: this.expensesDate
    });
  }

  dismissModal(){
    this.modalCtrl.dismiss();
  }

  get Name(): string{
    return this.expenseUpdateForm.value['expensesName']
  }

  get Amount(): number{
    return this.expenseUpdateForm.value['expensesAmount']
  }

  get Note(): string{
    return this.expenseUpdateForm.value['expensesNote']
  }

  get Date(): string{
    return this.expenseUpdateForm.value['expensesDate']
  }

  // Update
  submitUpdateExpenses(item: expensesItem){
    item.name = this.Name;
    item.amount = this.Amount;
    item.note = this.Note;
    item.date = this.Date;

    this.expensesStorageService.updateExpenseItems(item).then(() => {
      this.showToast('Item Updated');
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
