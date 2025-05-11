import { Routes } from '@angular/router';
import { AboutComponent } from './about/about.component';
import { SkillsComponent } from './skills/skills.component';
import { ContactComponent } from './contact/contact.component';

export const routes: Routes = [
    { path: 'about', component: AboutComponent },
    { path: 'resume', component: SkillsComponent },
    { path: 'contact', component: ContactComponent },
];
