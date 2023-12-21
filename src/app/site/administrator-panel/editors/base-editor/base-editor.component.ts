import { Component, Input, OnInit, OnDestroy } from '@angular/core';
import { IBaseComponent } from 'src/app/shared/models/site.model';
import { FormControl, FormGroup } from '@angular/forms';
import { Subject, distinctUntilChanged, takeUntil } from 'rxjs';
import { BLACK_COLOR, BorderStyle, WHITE_COLOR } from 'src/app/shared/models/app.model';
import { BackgroundPattern } from '../../../../shared/models/app.model';

@Component({
  selector: 'app-base-editor',
  templateUrl: './base-editor.component.html',
  styleUrls: ['./base-editor.component.scss'],
})
export class BaseEditorComponent implements OnInit, OnDestroy {
  public borderStyles = BorderStyle;
  public backgroundPatterns = BackgroundPattern;
  public minPercentage = 0;
  public maxPercentage = 100;

  private _value!: IBaseComponent;
  private destroy$ = new Subject<void>();

  @Input()
  public set value(value: IBaseComponent) {
    this._value = value;
    this.refreshForm(value);
  }

  public get value(): IBaseComponent {
    return this._value;
  }

  public form = new FormGroup({
    marginTop: new FormControl(0),
    marginRight: new FormControl(0),
    marginBottom: new FormControl(0),
    marginLeft: new FormControl(0),
    paddingTop: new FormControl(0),
    paddingRight: new FormControl(0),
    paddingBottom: new FormControl(0),
    paddingLeft: new FormControl(0),
    enableBackgroundColor: new FormControl(false),
    backgroundColor: new FormControl(WHITE_COLOR),
    enableBackgroundPattern: new FormControl(false),
    backgroundPattern: new FormControl(''),
    borderWidth: new FormControl(0),
    borderStyle: new FormControl('solid'),
    borderColor: new FormControl(BLACK_COLOR),
    borderRadius: new FormControl(0),
    width: new FormControl(0),
    height: new FormControl(0),
  });

  public ngOnInit(): void {
    this.form.valueChanges.pipe(
      distinctUntilChanged(),
      takeUntil(this.destroy$),
    ).subscribe(form => {
      this.value.marginTop = form.marginTop ?? 0;
      this.value.marginRight = form.marginRight ?? 0;
      this.value.marginBottom = form.marginBottom ?? 0;
      this.value.marginLeft = form.marginLeft ?? 0;
      this.value.paddingTop = form.paddingTop ?? 0;
      this.value.paddingRight = form.paddingRight ?? 0;
      this.value.paddingBottom = form.paddingBottom ?? 0;
      this.value.paddingLeft = form.paddingLeft ?? 0;
      this.value.enableBackgroundColor = form.enableBackgroundColor ?? false;
      this.value.backgroundColor = form.backgroundColor ?? WHITE_COLOR;
      this.value.enableBackgroundPattern = form.enableBackgroundPattern ?? false;
      this.value.backgroundPattern = form.backgroundPattern ?? '';
      this.value.borderWidth = form.borderWidth ?? 0;
      this.value.borderStyle = form.borderStyle ?? 'solid';
      this.value.borderColor = form.borderColor ?? BLACK_COLOR;
      this.value.borderRadius = form.borderRadius ?? 0;
      this.value.width = form.width ?? 0;
      this.value.height = form.height ?? 0;
    });
  }

  public ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  private refreshForm(value: IBaseComponent) {
    this.form.patchValue({
      marginTop: value.marginTop ?? 0,
      marginRight: value.marginRight ?? 0,
      marginBottom: value.marginBottom ?? 0,
      marginLeft: value.marginLeft ?? 0,
      paddingTop: value.paddingTop ?? 0,
      paddingRight: value.paddingRight ?? 0,
      paddingBottom: value.paddingBottom ?? 0,
      paddingLeft: value.paddingLeft ?? 0,
      enableBackgroundColor: value.enableBackgroundColor ?? false,
      backgroundColor: value.backgroundColor ?? WHITE_COLOR,
      enableBackgroundPattern: value.enableBackgroundPattern ?? false,
      backgroundPattern: value.backgroundPattern ?? '',
      borderWidth: value.borderWidth ?? 0,
      borderStyle: value.borderStyle ?? 'solid',
      borderColor: value.borderColor ?? BLACK_COLOR,
      borderRadius: value.borderRadius ?? 0,
      width: value.width ?? 0,
      height: value.height ?? 0,
    });
  }
}
