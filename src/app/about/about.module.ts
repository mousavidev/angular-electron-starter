import { NgModule } from "@angular/core";
import { CommonModule } from '@angular/common';

import { SharedModule } from '../shared/shared.module';

import { AboutMaterialModule } from "./about-material.module";
import { AboutComponent } from "./about.component";
import { AboutService } from "./about.service";

@NgModule({
    declarations: [AboutComponent],
    entryComponents: [AboutComponent],
    imports: [
        CommonModule,
        SharedModule,
        AboutMaterialModule
    ],
    providers: [AboutService]
})
export class AboutModule {}
