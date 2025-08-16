import { Component, OnInit } from '@angular/core';
import { TypingAnimationDirective } from '../../directives/typewriter/typing-animation.directive';
import { FloatInOnScrollDirective } from '../directives/float-in.directive';
import { CommonModule } from '@angular/common';
import { interval } from 'rxjs';

@Component({
  selector: 'app-about',
  standalone: true,
  imports: [CommonModule, TypingAnimationDirective, FloatInOnScrollDirective],
  templateUrl: './about.component.html',
  styleUrl: './about.component.scss',
})
export class AboutComponent implements OnInit {
  start: boolean = false;

  showLearn = false;
  showBuild = false;
  showDeploy = false;
  showDone = false;

  ngOnInit() {
    interval(5000).subscribe(() => this.start = !this.start);
    this.startAnimationFlow();
  }

  startAnimationFlow() {
    this.showLearn = true;
    this.showBuild = false;
    this.showDeploy = false;
    this.showDone = false;
    setTimeout(() => {
      this.showLearn = false;
      this.showBuild = true;
      setTimeout(() => {
        this.showBuild = false;
        this.showDeploy = true;
        setTimeout(() => {
          this.showDeploy = false;
          this.showDone = true;
          setTimeout(() => {
            this.showDone = false;
            this.startAnimationFlow();
          }, 3000);
        }, 2500);
      }, 2500);
    }, 2500);
  }
}
