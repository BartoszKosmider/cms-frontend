import { Component, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';
import * as _ from 'lodash';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-form-control-validation',
  templateUrl: './form-control-validation.component.html',
  styleUrl: './form-control-validation.component.scss',
})
export class FormControlValidationComponent {
  @Input()
  public controlRef!: any;

  @Input()
  public form!: FormGroup;

  @Input()
  public controlName!: string;

  @Input()
  public triggerValidation$?: Subject<void>;

  public getErrorMessage(): string | undefined {
    this.controlRef.classList.remove('is-invalid');
    const control = this.form.get(this.controlName);
    const errors = control?.errors;

    if (_.isNil(errors) || !control?.touched) {
      return;
    }
    this.controlRef.classList.add('is-invalid');

    if (errors['min']) {
      return 'Value can not be lower than ' + errors['min'].min;
    }
    if (errors['max']) {
      return 'Value can not be higher than ' + errors['max'].max;
    }
    if (errors['required']) {
      return 'Field is required';
    }
    if (errors['email']) {
      return 'E-mail is invalid';
    }
    if (errors['duplicate']) {
      return 'Name: ' + errors['duplicate'].value + ' exists';
    }

    return;
  }
}
