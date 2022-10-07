import {
  animate,
  group,
  style,
  transition,
  trigger
} from '@angular/animations';
import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  Input,
  NgModule,
  OnInit,
  ViewChild
} from '@angular/core';
import {
  MatSort,
  MatSortModule,
  MatTableDataSource,
  MatTableModule
} from '@angular/material';
import { Treatment } from '../model/treatment.model';

@Component({
    selector: 'carepay-treatments-table',
    templateUrl: './treatments-table.component.html',
    styleUrls: ['./treatments-table.component.scss'],
    animations: [
        trigger('animateRows', [
            transition(':enter', [
                style({
                    height: '0px',
                    opacity: '0',
                    overflow: 'hidden',
                }),
                group([
                    animate(
                        '350ms ease-out',
                        style({ height: '!', opacity: '!', overflow: '!' })
                    ),
                ]),
            ]),
        ]),
    ],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TreatmentsTableComponent implements OnInit {
    columns = ['patient', 'treatmentCode', 'treatmentDate'];

    treatmentsDataSource = new MatTableDataSource<Treatment>();

    @ViewChild(MatSort) sort: MatSort;

    @Input()
    set treatments(treatments: Treatment[]) {
        this.treatmentsDataSource.data = treatments;
    }

    ngOnInit(): void {
        this.treatmentsDataSource.data = [];
        this.treatmentsDataSource.sort = this.sort;
    }
}

@NgModule({
    imports: [CommonModule, MatTableModule, MatSortModule],
    exports: [TreatmentsTableComponent],
    declarations: [TreatmentsTableComponent],
})
export class TreatmentsTableModule {}
