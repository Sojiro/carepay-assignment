import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatIconModule, MatIconRegistry } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import { DomSanitizer } from '@angular/platform-browser';

@NgModule({
    declarations: [],
    imports: [CommonModule],
    exports: [MatToolbarModule, MatIconModule],
})
export class MaterialModule {
    constructor(iconRegistry: MatIconRegistry, sanitizer: DomSanitizer) {
        ['logo_with_name'].forEach(iconName =>
            iconRegistry.addSvgIcon(
                iconName,
                sanitizer.bypassSecurityTrustResourceUrl(
                    `assets/${iconName}.svg`
                )
            )
        );
    }
}
