import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DialogComponent } from './dialog/dialog.component';
import { DialogQuestionComponent } from './dialog-question/dialog-question.component';
import { ComponentType } from '@angular/cdk/overlay';
import { IBaseDialogData, IBaseQuestionDialogData } from '../models/app.model';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserInteractionsService {
  public isLoading = new BehaviorSubject<boolean>(false);

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

  public openCustomPopup<C, T, R=void>(component: ComponentType<C>, data: T) {
    return this.dialog.open<C, T, R>(component, {
      data: data,
    });
  }
}
