import { Component, inject, OnInit } from '@angular/core';
import { TypingAnimationDirective } from '../../directives/typewriter/typing-animation.directive';
import { FloatInOnScrollDirective } from '../directives/float-in.directive';
import { TelemetryService } from '../telemetry.service';

import { interval } from 'rxjs';

@Component({
  selector: 'app-about',
  standalone: true,
  imports: [TypingAnimationDirective, FloatInOnScrollDirective],
  templateUrl: './about.component.html',
  styleUrl: './about.component.scss',
})
export class AboutComponent implements OnInit {
  private readonly telemetry = inject(TelemetryService);

  start: boolean = false;

  // Controls disabled state of the CV download button
  cvDisabled = false;

  ngOnInit() {
    interval(5000).subscribe(() => this.start = !this.start);
  }

  trackCvDownload(): void {
    this.telemetry.trackEvent('cv_download');
  }

  trackLinkedInClick(): void {
    this.telemetry.trackEvent('linkedin_click');
  }

  downloadCv() {
    if (this.cvDisabled) return;
    this.cvDisabled = true;
    try {
      const link = document.createElement('a');
      link.href = 'assets/Szilard_Ferencz_CV.pdf';
      link.download = 'SzilardFerencz-CV';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } finally {
      // Small delay for UI feedback; adjust or remove as desired
      setTimeout(() => { this.cvDisabled = false; }, 500);
    }
  }
}
