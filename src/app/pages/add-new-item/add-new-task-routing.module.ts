import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AddNewTaskPage as AddNewItemPage } from './add-new-task.page';

const routes: Routes = [
  {
    path: '',
    component: AddNewItemPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AddNewTaskPageRoutingModule {}
