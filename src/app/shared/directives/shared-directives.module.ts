import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ShowInEditModeDirective } from './show-in-edit-mode.directive';
import { HideInEditModeDirective } from './hide-in-edit-mode.directive';

@NgModule({
  declarations: [
    ShowInEditModeDirective,
    HideInEditModeDirective,
  ],
  exports: [
    ShowInEditModeDirective,
    HideInEditModeDirective,
  ],
  imports: [
    CommonModule
  ]
})
export class SharedDirectivesModule { }
