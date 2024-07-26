import { Component, inject } from '@angular/core';
import {
  MatDialogActions,
  MatDialogClose,
  MatDialogContent,
  MatDialogRef,
} from '@angular/material/dialog';

@Component({
  selector: 'app-comfirm',
  standalone: true,
  imports: [MatDialogContent, MatDialogActions, MatDialogClose],
  templateUrl: './comfirm.component.html',
  styleUrl: './comfirm.component.scss',
})
export class ComfirmComponent {
  readonly dialogRef = inject(MatDialogRef<ComfirmComponent>);

  onNoClick(): void {
    this.dialogRef.close(false);
  }
  onYesClick(): void {
    this.dialogRef.close(true);
  }
}
