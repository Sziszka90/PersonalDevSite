import { Component, OnInit } from '@angular/core';
import { TypingAnimationDirective } from '../../directives/typewriter/typing-animation.directive';
import { interval } from 'rxjs';

@Component({
  selector: 'app-about',
  standalone: true,
  imports: [TypingAnimationDirective],
  templateUrl: './about.component.html',
  styleUrl: './about.component.scss',
})
export class AboutComponent implements OnInit {
  start: boolean = false;

  ngOnInit() {
    interval(5000).subscribe(() => this.start = !this.start);
  }
}
