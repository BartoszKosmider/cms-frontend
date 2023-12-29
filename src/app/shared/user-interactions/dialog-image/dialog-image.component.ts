import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { IImageDialogData } from '../../models/app.model';
import { DialogComponent } from '../dialog/dialog.component';

@Component({
  selector: 'app-dialog-image',
  templateUrl: './dialog-image.component.html',
  styleUrl: './dialog-image.component.scss',
})
export class DialogImageComponent {
  constructor(
    public dialogRef: MatDialogRef<DialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: IImageDialogData,
  ) { }
}
