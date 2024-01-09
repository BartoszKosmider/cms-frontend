import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatListModule } from '@angular/material/list';
import { MatDialogModule} from '@angular/material/dialog';
import { MatTableModule } from '@angular/material/table';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatPaginatorModule } from '@angular/material/paginator';

@NgModule({
  imports: [
    MatSidenavModule,
    MatFormFieldModule,
    MatSelectModule,
    MatButtonModule,
    DragDropModule,
    CommonModule,
    MatProgressSpinnerModule,
    MatAutocompleteModule,
    MatListModule,
    MatDialogModule,
    MatTableModule,
    MatCheckboxModule,
    MatProgressBarModule,
    MatTooltipModule,
    MatPaginatorModule,
  ],
  exports: [
    DragDropModule,
    MatSidenavModule,
    MatFormFieldModule,
    MatSelectModule,
    MatButtonModule,
    MatProgressSpinnerModule,
    MatAutocompleteModule,
    MatListModule,
    MatDialogModule,
    MatTableModule,
    MatCheckboxModule,
    MatProgressBarModule,
    MatTooltipModule,
    MatPaginatorModule,
  ]
})
export class MaterialModule { }
