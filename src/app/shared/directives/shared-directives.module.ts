import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ShowInEditModeDirective } from './show-in-edit-mode.directive';



@NgModule({
  declarations: [
    ShowInEditModeDirective,
  ],
  exports: [
    ShowInEditModeDirective,
  ],
  imports: [
    CommonModule
  ]
})
export class SharedDirectivesModule { }
