import { CommonModule } from '@angular/common';
import { Component, Input, NgModule } from '@angular/core';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

@Component({
    selector: 'carepay-spinner',
    templateUrl: './spinner.component.html',
    styleUrls: ['./spinner.component.scss'],
})
export class SpinnerComponent {
    @Input()
    show: boolean;
}

@NgModule({
    imports: [CommonModule, MatProgressSpinnerModule],
    exports: [SpinnerComponent],
    declarations: [SpinnerComponent],
})
export class SpinnerComponentModule {}
