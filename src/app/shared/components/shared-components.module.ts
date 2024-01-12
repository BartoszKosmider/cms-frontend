import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EditButtonComponent } from './edit-button/edit-button.component';
import { DeleteButtonComponent } from './delete-button/delete-button.component';
import { SharedDirectivesModule } from '../directives/shared-directives.module';
import { MaterialModule } from '../modules/material.module';
import { DialogComponent } from '../user-interactions/dialog/dialog.component';
import { DialogQuestionComponent } from '../user-interactions/dialog-question/dialog-question.component';
import { DialogImageComponent } from '../user-interactions/dialog-image/dialog-image.component';
import { CopyButtonComponent } from './copy-button/copy-button.component';

const sharedComponenets = [
  EditButtonComponent,
  DeleteButtonComponent,
  DialogComponent,
  DialogQuestionComponent,
  DialogImageComponent,
  CopyButtonComponent,
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
