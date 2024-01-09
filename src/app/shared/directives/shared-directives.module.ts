import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ShowInEditModeDirective } from './show-in-edit-mode.directive';
import { HideInEditModeDirective } from './hide-in-edit-mode.directive';
import { ShowIfUserLogged } from './show-if-user-logged.directive';

@NgModule({
  declarations: [
    ShowInEditModeDirective,
    HideInEditModeDirective,
    ShowIfUserLogged,
  ],
  exports: [
    ShowInEditModeDirective,
    HideInEditModeDirective,
    ShowIfUserLogged,
  ],
  imports: [
    CommonModule
  ]
})
export class SharedDirectivesModule { }
