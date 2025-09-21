import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { FloatInOnScrollDirective } from '../directives/float-in.directive';
import { ImageModalComponent } from '../shared/image-modal.component';

@Component({
  selector: 'app-portfolio',
  standalone: true,
  imports: [CommonModule, MatCardModule, FloatInOnScrollDirective, MatDialogModule],
  templateUrl: './portfolio.component.html',
  styleUrls: ['./portfolio.component.scss']
})
export class PortfolioComponent {
  private matDialog = inject(MatDialog);

  openImageModal(imageSrc: string, alt: string = '') {
    this.matDialog.open(ImageModalComponent, {
      data: { imageSrc, alt },
      width: '90vw',
      height: '90vh',
      autoFocus: false,
      restoreFocus: false
    });
  }
}
