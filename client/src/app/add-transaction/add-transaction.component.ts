import { Component, inject } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatButton } from '@angular/material/button';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { TransactionService } from '../transaction.service';
import {
  MatDialogActions,
  MatDialogContent,
  MatDialogRef,
  MatDialogTitle,
} from '@angular/material/dialog';

enum TransactionType {
  Income = 'Income',
  Expense = 'Expense',
}

export enum Category {
  Entertainment = 'Entertainment',
  Groceries = 'Groceries',
  Salary = 'Salary',
}

@Component({
  selector: 'app-add-expense',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonToggleModule,
    MatSelectModule,
    MatDatepickerModule,
    MatButton,
    MatDialogTitle,
    MatDialogContent,
    MatDialogActions,
  ],
  templateUrl: './add-transaction.component.html',
  styleUrl: './add-transaction.component.scss',
})
export class AddTransactionComponent {
  private transactionService = inject(TransactionService);
  private dialogRef = inject(MatDialogRef<AddTransactionComponent>);

  categories = [Category.Entertainment, Category.Groceries, Category.Salary];
  form = new FormGroup({
    name: new FormControl('', Validators.required),
    amount: new FormControl('', [Validators.required, Validators.min(0.01)]),
    transactionType: new FormControl(TransactionType.Income),
    category: new FormControl('', Validators.required),
    transactionDate: new FormControl(new Date()),
  });

  onCancel(): void {
    this.dialogRef.close();
  }

  onSubmit(): void {
    if (
      this.form.value.name &&
      this.form.value.amount &&
      this.form.value.transactionType &&
      this.form.value.category &&
      this.form.value.transactionDate
    ) {
      const transaction = {
        name: this.form.value.name,
        amount: +this.form.value.amount,
        type: this.form.value.transactionType,
        category: this.form.value.category,
        date: this.form.value.transactionDate,
      };
      this.transactionService.addTransaction(transaction);
      this.form.reset();
      this.dialogRef.close();
    }
  }
}
