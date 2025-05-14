import { Routes } from '@angular/router';
import { AboutComponent } from './about/about.component';
import { ExperiencesComponent } from './experiences/experiences.component';
import { ContactComponent } from './contact/contact.component';

export const routes: Routes = [
    { path: 'about', component: AboutComponent },
    { path: 'resume', component: ExperiencesComponent },
    { path: 'contact', component: ContactComponent },
];
