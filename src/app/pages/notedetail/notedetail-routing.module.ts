import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { NotedetailPage } from './notedetail.page';

const routes: Routes = [
  {
    path: '',
    component: NotedetailPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class NotedetailPageRoutingModule {}
