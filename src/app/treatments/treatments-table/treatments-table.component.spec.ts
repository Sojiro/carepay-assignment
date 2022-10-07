import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatSortModule, MatTableModule } from '@angular/material';
import { By } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { TreatmentsTableComponent } from './treatments-table.component';

describe(TreatmentsTableComponent.name, () => {
    let component: TreatmentsTableComponent;
    let fixture: ComponentFixture<TreatmentsTableComponent>;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [MatTableModule, MatSortModule, BrowserAnimationsModule],
            declarations: [TreatmentsTableComponent],
        }).compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(TreatmentsTableComponent);
        component = fixture.componentInstance;
    });

    it('should be created', () => {
        expect(component).toBeTruthy();

        component.ngOnInit();

        const table = fixture.debugElement.query(By.css('table'));

      expect(table).toBeDefined();
      expect(component.treatmentsDataSource.data).toEqual([]);
    });
});
