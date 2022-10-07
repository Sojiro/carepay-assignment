import { HttpClient } from '@angular/common/http';
import { TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { Treatment } from '../model/treatment.model';
import { TreatmentsService } from './treatments.service';

const treatment = {
    patient: 'Sojiro',
    treatmentCode: 'TEN-12223-AAA',
    treatmentDate: new Date(),
};
describe('TreatmentsService', () => {
    let httpClientSpy: jasmine.SpyObj<HttpClient>;
    let service: TreatmentsService;
    const treatments: Treatment[] = [treatment];
    beforeEach(() => {
        httpClientSpy = jasmine.createSpyObj('HttpClient', ['get']);

        TestBed.configureTestingModule({
            providers: [
                TreatmentsService,
                {
                    provide: HttpClient,
                    useValue: httpClientSpy,
                },
            ],
        });
        service = TestBed.get(TreatmentsService);
        httpClientSpy.get.and.returnValue(of(treatments));
    });

    it('should be created', () => {
        expect(service).toBeTruthy();
    });

    it('can search by treatment code', done => {
        service.searchBy('AAA').subscribe(data => {
            expect(data).toBe(treatments);
            expect(httpClientSpy.get).toHaveBeenCalled();
            expect(httpClientSpy.get.calls.mostRecent().args[0]).toContain(
                '?treatmentCode_like=AAA'
            );
            done();
        });
    });
});
