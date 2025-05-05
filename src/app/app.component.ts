import { Component } from '@angular/core';
import { NavBarComponent } from './nav-bar/nav-bar.component';
import { AboutComponent } from './about/about.component';
import { OdometerComponent } from './odometer/odometer.component';

@Component({
    selector: 'app-root',
    imports: [NavBarComponent, AboutComponent, OdometerComponent],
    standalone: true,
    templateUrl: './app.component.html',
    styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'Szilard Ferencz | Fullstack Engineer';
}
