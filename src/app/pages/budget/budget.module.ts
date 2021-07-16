import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { BudgetPageRoutingModule } from './budget-routing.module';

import { BudgetPage } from './budget.page';
import { BudgetModalComponent } from 'src/app/components/budget-modal/budget-modal.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    BudgetPageRoutingModule
  ],
  declarations: [BudgetPage, BudgetModalComponent],
  entryComponents: [BudgetModalComponent]
})
export class BudgetPageModule {}
