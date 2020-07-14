import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ElectronService } from './services';

@NgModule({
  imports: [
    CommonModule
  ],
  providers: [ElectronService]
})
export class CoreModule { }
