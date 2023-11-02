import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DragDropModule } from '@angular/cdk/drag-drop';

@NgModule({
  imports: [
    DragDropModule,
    CommonModule,
  ],
  exports: [
    DragDropModule,
  ]
})
export class MaterialModule { }
