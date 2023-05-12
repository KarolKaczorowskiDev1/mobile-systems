import { ChangeDetectionStrategy, Component, Inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MAT_DIALOG_DATA, MatDialogModule } from '@angular/material/dialog';
import { MatSelectModule } from '@angular/material/select';
import { Product } from 'src/app/products/model/product';
import { Size } from 'src/app/products/model/enums/size';
import { MatButtonModule } from '@angular/material/button';
import { FormsModule } from '@angular/forms';
import { DialogRef } from '@angular/cdk/dialog';

@Component({
  selector: 'app-select-size-modal',
  standalone: true,
  imports: [CommonModule, MatDialogModule, MatSelectModule, MatButtonModule, FormsModule],
  templateUrl: './select-size-modal.component.html',
  styleUrls: ['./select-size-modal.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SelectSizeModalComponent {

  selectedSize?: Size;

  constructor(@Inject(MAT_DIALOG_DATA) public product: Product, private dialogRef: DialogRef<Size>) {}
}
