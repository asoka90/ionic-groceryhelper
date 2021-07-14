import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { BudgetmanagerPage } from './budgetmanager.page';

const routes: Routes = [
  {
    path: '',
    component: BudgetmanagerPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class BudgetmanagerPageRoutingModule {}
