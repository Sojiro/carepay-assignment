import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, NgModule } from '@angular/core';
import { FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { RouterModule } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import {
  debounceTime,
  distinctUntilChanged,
  switchMap,
  tap
} from 'rxjs/operators';
import { SpinnerComponentModule } from '../shared/components/spinner/spinner.component';
import { TreatmentsService } from './service/treatments.service';
import { TreatmentsTableModule } from './treatments-table/treatments-table.component';
import { treatmentCodeValidator } from './validator/treatment-code.validator';

@Component({
    selector: 'carepay-treatments',
    templateUrl: './treatments.component.html',
    styleUrls: ['./treatments.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TreatmentsComponent {
    private treatmentCodeSubject = new BehaviorSubject<string>('');
    isLoading = true;
    searchByCode = new FormControl('', [
        Validators.minLength(3),
        treatmentCodeValidator(),
    ]);

    treatments$ = this.treatmentCodeSubject.asObservable().pipe(
        debounceTime(700), // User input delay.
        distinctUntilChanged(),
        switchMap(treatmentCode =>
            this.treatmentsService.searchBy(treatmentCode)
        ),
        tap(() => (this.isLoading = false))
    );

    constructor(private treatmentsService: TreatmentsService) {}

    searchBy(treatmentCode: string) {
        if (treatmentCode.length === 0 || this.searchByCode.valid) {
            this.treatmentCodeSubject.next(treatmentCode);
        }
    }
}

@NgModule({
    imports: [
        CommonModule,
        ReactiveFormsModule,
        MatFormFieldModule,
        MatInputModule,
        MatIconModule,
        MatCardModule,
        TreatmentsTableModule,
        SpinnerComponentModule,
        RouterModule.forChild([
            {
                path: '',
                component: TreatmentsComponent,
            },
        ]),
    ],
    exports: [TreatmentsComponent],
    declarations: [TreatmentsComponent],
    providers: [TreatmentsService],
})
export class TreatmentsComponentModule {}
