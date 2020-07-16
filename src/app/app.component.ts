import { Component, NgZone, HostListener, ViewChild, ElementRef } from '@angular/core';
import { ElectronService } from './core/services';
import { TranslateService } from '@ngx-translate/core';
import { MatIconRegistry } from '@angular/material/icon';
import { DomSanitizer } from '@angular/platform-browser';
import { Observable, BehaviorSubject } from 'rxjs';
import { MatMenuTrigger } from '@angular/material/menu';
import { AboutService } from './about';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  @ViewChild('menuContainer') menuContainer: ElementRef<HTMLElement>;

  private maximizeIconSub = new BehaviorSubject<string>(this.isMaximized ? 'win-max' : 'win-unmax');
  private prevMenuTrigger: MatMenuTrigger | null = null;

  constructor(
    private matIconRegistry: MatIconRegistry,
    private domSanitizer: DomSanitizer,
    private electronService: ElectronService,
    private translate: TranslateService,
    private aboutService: AboutService,
    private zone: NgZone
  ) {
    this.translate.setDefaultLang('en');

    const winMaxIconUrl = this.domSanitizer.bypassSecurityTrustResourceUrl('assets/svg-icons/win-max.svg');
    const winUnmaxIconUrl = this.domSanitizer.bypassSecurityTrustResourceUrl('assets/svg-icons/win-unmax.svg');

    this.matIconRegistry.addSvgIcon("win-max", winMaxIconUrl);
    this.matIconRegistry.addSvgIcon("win-unmax", winUnmaxIconUrl);
  }

  ngOnInit(): void {
    this.currentWindow.on('close', () => this.currentWindow.destroy());
    this.currentWindow.on('unmaximize', () => this.zone.run(() => this.maximizeIconSub.next('win-unmax')));
    this.currentWindow.on('maximize', () => this.zone.run(() => this.maximizeIconSub.next('win-max')));
  }

  @HostListener('click', ['$event.target'])
  private hostClick(target: HTMLElement) {
    if(!this.menuContainer.nativeElement.contains(target) && !!this.prevMenuTrigger) {
      this.prevMenuTrigger.closeMenu();
    }
  }

  public get currentWindow() : Electron.BrowserWindow {
    return this.electronService.remote.getCurrentWindow();
  }
  
  public get isMaximized() : boolean {
    return this.currentWindow.isMaximized();
  }
  
  public get maximizeIcon$() : Observable<string> {
    return this.maximizeIconSub.asObservable();
  }
  
  minimizeApp(): void {
    this.currentWindow.minimize();
  }

  maximizeApp(): void {
    if(this.isMaximized) {
      this.currentWindow.unmaximize();
    } else {
      this.currentWindow.maximize();
    }
  }

  closeApp(): void {
    this.currentWindow.close();
  }

  toggleDevTools(): void {
    const webContents = this.currentWindow.webContents;
    if(webContents.isDevToolsOpened()) {
      this.currentWindow.webContents.closeDevTools();
    } else {
      this.currentWindow.webContents.openDevTools();
    }
  }

  buttonMenuEnter(trigger: MatMenuTrigger): void {
    if(!!this.prevMenuTrigger && this.prevMenuTrigger != trigger){
      this.prevMenuTrigger.closeMenu();
      trigger.openMenu();
    }
  }

  menuOpened(trigger: MatMenuTrigger): void {
    this.prevMenuTrigger = trigger;
  }

  menuClosed(): void {
    this.prevMenuTrigger = null;
  }

  openAboutWindow(): void {
    this.aboutService.showWindow();
  }
}
