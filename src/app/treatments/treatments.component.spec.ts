import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { Treatment } from './model/treatment.model';
import { TreatmentsService } from './service/treatments.service';
import { TreatmentsComponent } from './treatments.component';

const VALID_CODES = ['aaa', 'aa2a', 'zz222z'];
const INVALID_CODE = 'aabbcc';
describe('TreatmentsComponent', () => {
    let component: TreatmentsComponent;
    let fixture: ComponentFixture<TreatmentsComponent>;
    let serviceSpy: jasmine.SpyObj<TreatmentsService>;
    const treatment = {
        patient: 'Sojiro',
        treatmentCode: 'TEN-12223-AAA',
        treatmentDate: new Date(),
    };
    const treatments: Treatment[] = [treatment];
    beforeEach(async(() => {
        serviceSpy = jasmine.createSpyObj('TreatmentsService', [
            'searchBy',
        ]);
        TestBed.configureTestingModule({
            declarations: [TreatmentsComponent],
            providers: [{ provide: TreatmentsService, useValue: serviceSpy }],
        })
            .overrideTemplate(TreatmentsComponent, '')
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(TreatmentsComponent);
        component = fixture.componentInstance;
        serviceSpy.searchBy.and.returnValue(of([]));

        fixture.detectChanges();
    });

    afterEach(() => {
        fixture.destroy();
    });

    describe('search by ', () => {
        describe('should only search', () => {
            it('on valid search input', done => {
                component.searchByCode = { valid: true } as any;
                const code = VALID_CODES[0];
                component.searchBy(code);

                component.treatments$.subscribe(() => {
                    component.searchBy(code);
                    expect(serviceSpy.searchBy).toHaveBeenCalledWith(code);
                    done();
                });
            });

            it('with the recently entered treatment code', done => {
                component.searchByCode = { valid: true } as any;
                VALID_CODES.forEach(code => {
                    component.searchBy(code);
                });

                component.treatments$.subscribe(() => {
                    VALID_CODES.filter(
                        c => c !== VALID_CODES[VALID_CODES.length - 1]
                    ).forEach(code =>
                        expect(serviceSpy.searchBy).not.toHaveBeenCalledWith(
                            code
                        )
                    );
                    expect(serviceSpy.searchBy).toHaveBeenCalledWith(
                        VALID_CODES[VALID_CODES.length - 1]
                    );
                    done();
                });
            });
        });

        it('should not search on invalid treatment code', done => {
            component.searchByCode = { valid: false } as any;
            component.searchBy(INVALID_CODE);

            component.treatments$.subscribe(() => {
                expect(serviceSpy.searchBy).not.toHaveBeenCalledWith(
                    INVALID_CODE
                );
                done();
            });
        });
    });
});
