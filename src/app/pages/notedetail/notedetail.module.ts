import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { NotedetailPageRoutingModule } from './notedetail-routing.module';

import { NotedetailPage } from './notedetail.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    NotedetailPageRoutingModule
  ],
  declarations: [NotedetailPage]
})
export class NotedetailPageModule {}
