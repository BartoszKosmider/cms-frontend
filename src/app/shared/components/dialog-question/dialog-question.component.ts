import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { IBaseQuestionDialogData } from '../../services/user-interactions.service';

@Component({
  selector: 'app-dialog-question',
  templateUrl: './dialog-question.component.html',
  styleUrl: './dialog-question.component.scss',
})
export class DialogQuestionComponent {

  constructor(
    public dialogRef: MatDialogRef<DialogQuestionComponent, boolean>,
    @Inject(MAT_DIALOG_DATA) public data: IBaseQuestionDialogData,
  ) {

  }

  public close(): void {
    this.dialogRef.close();
  }
}
