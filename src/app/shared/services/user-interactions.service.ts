import { Injectable } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { DialogComponent } from '../components/dialog/dialog.component';
import { DialogQuestionComponent } from '../components/dialog-question/dialog-question.component';
import { ComponentType } from '@angular/cdk/overlay';

export interface IBaseDialogData {
  title: string;
}

export interface IBaseQuestionDialogData {
  question: string;
}

@Injectable({
  providedIn: 'root'
})
export class UserInteractionsService {

  constructor(
    private dialog: MatDialog,
  ) { }

  public openDialog<T extends IBaseDialogData, R>(data: T) {
    return this.dialog.open<DialogComponent, T, R>(DialogComponent, {
      data: data,
    });
  }

  public openQuestionDialog(data: IBaseQuestionDialogData) {
    return this.dialog.open<DialogQuestionComponent, IBaseQuestionDialogData, boolean>(DialogQuestionComponent, {
      data: data,
    });
  }

  public openCustomPopup<C, T, R>(component: ComponentType<C>, data: T) {
    return this.dialog.open<C, T, R>(component, {
      data: data,
    });
  }
}
