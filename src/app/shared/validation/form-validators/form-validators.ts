import { ValidatorFn, AbstractControl, ValidationErrors } from "@angular/forms";

export function duplicateNameValidator(data: string[]): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    return data.includes(control.value) ? { duplicate: { value: control.value } } : null;
  };
}

export function specialCharacterRequired(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const regexp = new RegExp(/[#?!@$%^&*-]/);

    return regexp.test(control.value) ? null : { specialCharacter: { value: true } };
  };
}

export function lowerCharacterRequired(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const regexp = new RegExp(/[a-z]/);

    return regexp.test(control.value) ? null : { lowerCharacter: { value: true } };
  };
}

export function upperCharacterRequired(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const regexp = new RegExp(/[A-Z]/);

    return regexp.test(control.value) ? null : { upperCharacter: { value: true } };
  };
}

export function digitCharacterRequired(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const regexp = new RegExp(/[0-9]/);

    return regexp.test(control.value) ? null : { digit: { value: true } };
  };
}

