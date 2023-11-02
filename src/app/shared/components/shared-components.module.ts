import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EditButtonComponent } from './edit-button/edit-button.component';
import { DeleteButtonComponent } from './delete-button/delete-button.component';
import { SharedDirectivesModule } from '../directives/shared-directives.module';

const sharedComponenets = [
  EditButtonComponent,
  DeleteButtonComponent,
];

@NgModule({
  declarations: sharedComponenets,
  exports: sharedComponenets,
  imports: [
    CommonModule,
    SharedDirectivesModule,
  ]
})
export class SharedComponentsModule { }
