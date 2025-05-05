import { AfterViewInit, Component } from '@angular/core';
import { Offcanvas } from 'bootstrap';


@Component({
    selector: 'app-nav-bar',
    imports: [],
    standalone: true,
    templateUrl: './nav-bar.component.html',
    styleUrl: './nav-bar.component.scss'
})
export class NavBarComponent implements AfterViewInit {
  private offcanvasElementInfo!: HTMLElement;
  private offcanvasInstanceInfo!: Offcanvas;

  private offcanvasElementMenu!: HTMLElement;
  private offcanvasInstanceMenu!: Offcanvas;

  ngAfterViewInit(): void {
    this.offcanvasElementInfo = document.getElementById('offcanvasInfo')!;
    this.offcanvasInstanceInfo = new Offcanvas(this.offcanvasElementInfo);

    this.offcanvasElementMenu = document.getElementById('offcanvasMenu')!;
    this.offcanvasInstanceMenu = new Offcanvas(this.offcanvasElementMenu);
  }

  openOffcanvas(): void {
    this.offcanvasInstanceInfo.show();
    this.offcanvasInstanceMenu.show();
  }

  closeOffcanvas(): void {
    this.offcanvasInstanceInfo.hide();
    this.offcanvasInstanceMenu.hide();
  }
}
