import { Component } from '@angular/core';
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
  ],
  templateUrl: './add-transaction.component.html',
  styleUrl: './add-transaction.component.scss',
})
export class AddTransactionComponent {
  categories = [Category.Entertainment, Category.Groceries, Category.Salary];
  form = new FormGroup({
    name: new FormControl('', Validators.required),
    amount: new FormControl('', [Validators.required, Validators.min(0.01)]),
    transactionType: new FormControl(TransactionType.Income),
    category: new FormControl('', Validators.required),
    transactionDate: new FormControl(new Date()),
  });

  onSubmit(): void {
    console.log(this.form.value);
  }
}
