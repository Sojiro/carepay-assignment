import { treatmentCodeValidator } from './treatment-code.validator';

describe('Treatment Code Validator', () => {
    const VALID_CODES = ['aaa', 'aa2a', 'zz222z'];
    const INVALID_CODE_MATCHING_REGEX = 'aabbcc';
    const INVALID_CODE_WITH_UNIQUE_CHARS = 'abcABC';
    const validator = treatmentCodeValidator();

    it('should return null on valid codes', () => {
        VALID_CODES.forEach(code => {
            expect(validator({ value: code } as any)).toBeNull();
        });
    });

    describe('should return error', () => {
        it('on invalid code matching regex', () => {
            const error = validator({
                value: INVALID_CODE_MATCHING_REGEX,
            } as any);
            expect(error.invalid).toBeTruthy();
        });
        it('on invalid code not matching regex', () => {
            const error = validator({
                value: INVALID_CODE_WITH_UNIQUE_CHARS,
            } as any);
            expect(error.invalid).toBeTruthy();
        });
    });
});
