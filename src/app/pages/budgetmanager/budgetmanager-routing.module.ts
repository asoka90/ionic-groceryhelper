import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { BudgetmanagerPage } from './budgetmanager.page';

const routes: Routes = [
  {
    path: '',
    component: BudgetmanagerPage,
    children: [
      {
        path: 'budget',
        children:[
          {
            path:'',
            loadChildren: () => import('../budget/budget.module').then( m => m.BudgetPageModule)
          }
        ]
      },
      {
        path: 'expenses',
        children:[
          {
            path:'',
            loadChildren: () => import('../expenses/expenses.module').then( m => m.ExpensesPageModule)
          }
        ]
      },
      {
        path: '',
        redirectTo: 'budget',
        pathMatch: 'full'
      }
    ]
  },
  {
    path: '',
    redirectTo: 'budget',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class BudgetmanagerPageRoutingModule {}
