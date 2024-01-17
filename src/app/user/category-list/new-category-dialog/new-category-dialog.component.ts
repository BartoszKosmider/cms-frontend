import { Component, Inject } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Validators } from 'ngx-editor';
import { ICategory } from 'src/app/shared/models/category.model';
import { duplicateNameValidator } from 'src/app/shared/validation/form-validators/form-validators';

@Component({
  selector: 'app-new-category-dialog',
  templateUrl: './new-category-dialog.component.html',
  styleUrl: './new-category-dialog.component.scss',
})
export class NewCategoryDialogComponent {
  public categoryForm = new FormGroup({
    newCategory: new FormControl<string>('',
      [Validators.required(), duplicateNameValidator(this.data.map(c => c.category))]),
  });

  constructor(
    public dialogRef: MatDialogRef<NewCategoryDialogComponent, string>,
    @Inject(MAT_DIALOG_DATA) public data: ICategory[],
  ) { }

  public save(): void {
    this.categoryForm.markAllAsTouched();
    if (!this.categoryForm.invalid) {
      this.dialogRef.close(<string>this.categoryForm.controls.newCategory.value)
    }
  }

  public close(): void {
    this.dialogRef.close();
  }
}
