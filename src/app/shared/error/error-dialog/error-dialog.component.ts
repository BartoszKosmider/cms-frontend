import { Component, Inject, OnDestroy } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { IErrorDialogData } from '../../models/app.model';
import { HttpClient } from '@angular/common/http';
import { Subject, exhaustMap, of, takeUntil } from 'rxjs';

@Component({
  selector: 'app-error-dialog',
  templateUrl: './error-dialog.component.html',
  styleUrl: './error-dialog.component.scss',
})
export class ErrorDialogComponent implements OnDestroy {
  private destroy$ = new Subject<void>();

  constructor(
    public dialogRef: MatDialogRef<ErrorDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: IErrorDialogData,
    private http: HttpClient,
  ) { }

  public ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
