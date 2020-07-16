import { NgModule } from "@angular/core";
import { MatDialogModule } from "@angular/material/dialog";
import { MatButtonModule } from "@angular/material/button";
import {A11yModule} from '@angular/cdk/a11y';

const materialModules = [
    A11yModule,
    MatDialogModule,
    MatButtonModule
];

@NgModule({
    imports: materialModules,
    exports: materialModules
})
export class AboutMaterialModule {}
