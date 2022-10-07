import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

const VALID_CODE_LENGTH = 3;

function parse(treatmentCode: string) {
    const matches = treatmentCode
        .split('')
        .sort()
        .join('')
        .match(/(.)\1+/g);
    return matches || [];
}

function isValid(treatmentCode: string) {
    return (
        treatmentCode.length === 0 ||
        (treatmentCode.length >= VALID_CODE_LENGTH &&
            Math.max(...parse(treatmentCode).map(a => a.length)) >=
                VALID_CODE_LENGTH)
    );
}

export function treatmentCodeValidator(): ValidatorFn {
    return ({ value }: AbstractControl): ValidationErrors | null => {
        if (isValid(value)) {
            return null;
        }
        return { invalid: true };
    };
}
