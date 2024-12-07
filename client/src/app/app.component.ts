import { Component, inject } from '@angular/core';
import { AddTransactionComponent } from './add-transaction/add-transaction.component';
import { TransactionsListComponent } from './transactions-list/transactions-list.component';
import {
  MatDialog,
  MatDialogModule,
  MatDialogRef,
} from '@angular/material/dialog';
import { MatButton } from '@angular/material/button';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [TransactionsListComponent, MatDialogModule, MatButton],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  dialog = inject(MatDialog);

  openDialog() {
    const dialogRef = this.dialog.open(AddTransactionComponent);
  }
}
