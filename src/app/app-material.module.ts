import { NgModule } from "@angular/core";

import { MatToolbarModule } from "@angular/material/toolbar";
import { MatMenuModule } from "@angular/material/menu";
import { MatButtonModule } from "@angular/material/button";
import { MatIconModule } from "@angular/material/icon";
import { MatDividerModule } from "@angular/material/divider";

const materialModules = [
    MatToolbarModule,
    MatMenuModule,
    MatButtonModule,
    MatIconModule,
    MatDividerModule
];

@NgModule({
    imports: materialModules,
    exports: materialModules
})
export class AppMaterialModule {}
