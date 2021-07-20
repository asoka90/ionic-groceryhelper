import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FabhideDirective } from 'src/app/directive/fabhide.directive';



@NgModule({
  declarations: [FabhideDirective],
  exports:[FabhideDirective]
})
export class GlobaldirModule { }
