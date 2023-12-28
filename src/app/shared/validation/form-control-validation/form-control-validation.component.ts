import { Component, Input, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, ValidationErrors } from '@angular/forms';
import * as _ from 'lodash';
import { Subject, distinctUntilChanged, takeUntil } from 'rxjs';

@Component({
  selector: 'app-form-control-validation',
  templateUrl: './form-control-validation.component.html',
  styleUrl: './form-control-validation.component.scss',
})
export class FormControlValidationComponent implements OnInit, OnDestroy {
  public errorMessage?: string;

  private destroy$ = new Subject<void>();

  @Input()
  public controlRef!: HTMLInputElement;

  @Input()
  public form!: FormGroup;

  @Input()
  public controlName!: string;

  public ngOnInit(): void {
    const control = this.form.controls[this.controlName];
    if (_.isNil(control)) {
      throw new Error('Control not found!!!');
    }

    control.statusChanges.pipe(
      takeUntil(this.destroy$),
    ).subscribe(status => {
      if (status === 'INVALID') {
        this.controlRef.classList.add('is-invalid');
        this.getErrorMessage(<ValidationErrors>control.errors);
      } else {
        this.controlRef.classList.remove('is-invalid');
        this.errorMessage = undefined;
      }
    });
  }

  public ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  public getErrorMessage(errors: ValidationErrors): void {
    if (errors['min']) {
      this.errorMessage = 'Value can not be lower than ' + errors['min'].min;
    }
    if (errors['max']) {
      this.errorMessage = 'Value can not be higher than ' + errors['max'].max;
    }
    if (errors['required']) {
      this.errorMessage = 'Field is required';
    }
    if (errors['email']) {
      this.errorMessage = 'E-mail is invalid';
    }
  }
}
