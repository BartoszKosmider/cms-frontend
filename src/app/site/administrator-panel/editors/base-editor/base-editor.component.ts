import { Component, Input, OnInit } from '@angular/core';
import { IBaseComponent } from 'src/app/shared/models/site.model';
import { FormControl, FormGroup } from '@angular/forms';
import { distinctUntilChanged } from 'rxjs';
import { BLACK_COLOR, BorderStyle, WHITE_COLOR } from 'src/app/shared/models/app.model';

@Component({
  selector: 'app-base-editor',
  templateUrl: './base-editor.component.html',
  styleUrls: ['./base-editor.component.scss'],
})
export class BaseEditorComponent implements OnInit {
  public borderStyles = BorderStyle;
  private _value!: IBaseComponent;

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
    backgroundColor: new FormControl(WHITE_COLOR),
    borderWidth: new FormControl(0),
    borderStyle: new FormControl('solid'),
    borderColor: new FormControl(BLACK_COLOR),
    borderRadius: new FormControl(0),
  });

  public ngOnInit(): void {
    this.form.valueChanges.pipe(
      distinctUntilChanged(),
    ).subscribe(form => {
      this.value.marginTop = form.marginTop ?? 0;
      this.value.marginRight = form.marginRight ?? 0;
      this.value.marginBottom = form.marginBottom ?? 0;
      this.value.marginLeft = form.marginLeft ?? 0;
      this.value.paddingTop = form.paddingTop ?? 0;
      this.value.paddingRight = form.paddingRight ?? 0;
      this.value.paddingBottom = form.paddingBottom ?? 0;
      this.value.paddingLeft = form.paddingLeft ?? 0;
      this.value.backgroundColor = form.backgroundColor ?? WHITE_COLOR;
      this.value.borderWidth = form.borderWidth ?? 0;
      this.value.borderStyle = form.borderStyle ?? 'solid';
      this.value.borderColor = form.borderColor ?? BLACK_COLOR;
      this.value.borderRadius = form.borderRadius ?? 0;
    })
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
      backgroundColor: value.backgroundColor ?? WHITE_COLOR,
      borderWidth: value.borderWidth ?? 0,
      borderStyle: value.borderStyle ?? 'solid',
      borderColor: value.borderColor ?? BLACK_COLOR,
      borderRadius: value.borderRadius ?? 0,
    });
  }
}
