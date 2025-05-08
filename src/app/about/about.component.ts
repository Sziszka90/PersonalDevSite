import { Component, OnInit } from '@angular/core';
import { TypingAnimationDirective } from '../../directives/typewriter/typing-animation.directive';
import { interval } from 'rxjs';
import { FloatInOnScrollDirective } from '../directives/float-in.directive';

@Component({
  selector: 'app-about',
  standalone: true,
  imports: [TypingAnimationDirective, FloatInOnScrollDirective],
  templateUrl: './about.component.html',
  styleUrl: './about.component.scss',
})
export class AboutComponent implements OnInit {
  start: boolean = false;

  ngOnInit() {
    interval(5000).subscribe(() => this.start = !this.start);
  }
}
