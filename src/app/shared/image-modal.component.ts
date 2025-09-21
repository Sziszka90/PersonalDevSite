import { Component, inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-image-modal',
  templateUrl: './image-modal.component.html',
  styleUrls: ['./image-modal.component.scss']
})
export class ImageModalComponent {
  public data: { imageSrc: string; alt?: string } = inject(MAT_DIALOG_DATA);
  private dialogRef = inject(MatDialogRef<ImageModalComponent>);
  public zoomed = false;
  public zoomOrigin = 'left top';

  public onClose(): void {
    this.dialogRef.close();
    this.zoomed = false;
  }

  public toggleZoom(event: MouseEvent): void {
    if (!this.zoomed) {
      const img = event.target as HTMLImageElement;
      const rect = img.getBoundingClientRect();
      const x = event.clientX - rect.left;
      const y = event.clientY - rect.top;
      const percentX = (x / rect.width) * 100;
      const percentY = (y / rect.height) * 100;
      this.zoomOrigin = `${percentX}% ${percentY}%`;
    }
    this.zoomed = !this.zoomed;
  }
}
