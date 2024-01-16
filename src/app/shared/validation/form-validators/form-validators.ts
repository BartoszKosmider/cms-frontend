import { ValidatorFn, AbstractControl, ValidationErrors } from "@angular/forms";

export function duplicateNameValidator(data: string[]): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    return data.includes(control.value) ? { duplicate: { value: control.value } } : null;
  };
}
