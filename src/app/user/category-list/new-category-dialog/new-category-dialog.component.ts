import { Component, Inject } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Validators } from 'ngx-editor';

@Component({
  selector: 'app-new-category-dialog',
  templateUrl: './new-category-dialog.component.html',
  styleUrl: './new-category-dialog.component.scss',
})
export class NewCategoryDialogComponent {
  public categoryControl = new FormControl<string>('', [Validators.required()]);

  constructor(
    public dialogRef: MatDialogRef<NewCategoryDialogComponent, string>,
    @Inject(MAT_DIALOG_DATA) public data: string[],
  ) {

    console.log('todo walidacja zeby nie dodac 2 tych samych kategorii', this.data);
   }

  public save(): void {
    if (!this.categoryControl.invalid) {
      this.dialogRef.close(<string>this.categoryControl.value)
    }
  }

  public close(): void {
    this.dialogRef.close();
  }
}
