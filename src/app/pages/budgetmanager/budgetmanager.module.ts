import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { BudgetmanagerPageRoutingModule } from './budgetmanager-routing.module';

import { BudgetmanagerPage } from './budgetmanager.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    BudgetmanagerPageRoutingModule
  ],
  declarations: [BudgetmanagerPage]
})
export class BudgetmanagerPageModule {}
