import { MatDialog } from "@angular/material/dialog";
import { AboutComponent } from "./about.component";
import { Injectable } from "@angular/core";

@Injectable()
export class AboutService {

    constructor(
        private dialog: MatDialog
    ) {}

    showWindow(): void {
        this.dialog.open(AboutComponent, { width: '400px' });
    }
}
