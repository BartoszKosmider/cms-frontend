import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EditButtonComponent } from './edit-button/edit-button.component';
import { DeleteButtonComponent } from './delete-button/delete-button.component';
import { SharedDirectivesModule } from '../directives/shared-directives.module';
import { MaterialModule } from '../modules/material.module';
import { DialogComponent } from './dialog/dialog.component';
import { DialogQuestionComponent } from './dialog-question/dialog-question.component';

const sharedComponenets = [
  EditButtonComponent,
  DeleteButtonComponent,
  DialogComponent,
  DialogQuestionComponent,
];

@NgModule({
  declarations: sharedComponenets,
  exports: sharedComponenets,
  imports: [
    CommonModule,
    SharedDirectivesModule,
    MaterialModule,
  ]
})
export class SharedComponentsModule { }
