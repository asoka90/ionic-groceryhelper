import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { BudgetPageRoutingModule } from './budget-routing.module';

import { BudgetPage } from './budget.page';
import { BudgetModalComponent } from 'src/app/components/budget-modal/budget-modal.component';
import { BudgetUpdateModalComponent } from 'src/app/components/budget-update-modal/budget-update-modal.component';
import { GlobaldirModule } from 'src/app/modules/globaldir/globaldir.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    GlobaldirModule,
    BudgetPageRoutingModule
  ],
  declarations: [BudgetPage, BudgetModalComponent, BudgetUpdateModalComponent],
  entryComponents: [BudgetModalComponent, BudgetUpdateModalComponent]
})
export class BudgetPageModule {}
