import { DatePipe } from '@angular/common';
import {
  Component,
  DestroyRef,
  inject,
  OnInit,
  viewChild,
} from '@angular/core';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { TransactionService } from '../transaction.service';
import { Transaction } from '../transaction.model';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule, NgForm } from '@angular/forms';
import { MatSelectModule } from '@angular/material/select';
import { CATEGORIES } from '../categories';

@Component({
  selector: 'app-transactions-list',
  imports: [
    MatTableModule,
    MatSortModule,
    MatFormFieldModule,
    MatSelectModule,
    FormsModule,
    DatePipe,
  ],
  standalone: true,
  templateUrl: './transactions-list.component.html',
  styleUrl: './transactions-list.component.scss',
})
export class TransactionsListComponent implements OnInit {
  private transactionService = inject(TransactionService);
  private destroyRef = inject(DestroyRef);

  filterForm = viewChild<NgForm>('filterForm');
  transactionsDataSource!: MatTableDataSource<Transaction>;
  displayedColumns = ['name', 'amount', 'category', 'date'];
  matSort = viewChild<MatSort>(MatSort);
  categories = CATEGORIES;

  ngOnInit(): void {
    const transactionsSub = this.transactionService
      .getTransactions()
      .subscribe((transactions) => {
        this.transactionsDataSource = new MatTableDataSource(transactions);
        this.transactionsDataSource.sort = this.matSort()!;
      });
    this.transactionsDataSource.filterPredicate = (
      data: Transaction,
      filter: string
    ) => {
      const filterObject = JSON.parse(filter);
      if (filterObject.type && filterObject.category) {
        return (
          data.type === filterObject.type &&
          data.category === filterObject.category
        );
      } else if (filterObject.type) {
        return data.type === filterObject.type;
      } else if (filterObject.category) {
        return data.category === filterObject.category;
      } else {
        return true;
      }
    };
    const timeout = setTimeout(() => {
      this.filterForm()?.setValue({ type: 'all', category: 'all' });
    }, 0);
    const filterFormSub = this.filterForm()?.valueChanges?.subscribe(
      (formValue) => {
        let filterObject;
        if (
          formValue.type &&
          formValue.type !== 'all' &&
          formValue.category &&
          formValue.category !== 'all'
        ) {
          filterObject = { type: formValue.type, category: formValue.category };
        } else if (formValue.type && formValue.type !== 'all') {
          filterObject = { type: formValue.type };
        } else if (formValue.category && formValue.category !== 'all') {
          filterObject = { category: formValue.category };
        }
        this.transactionsDataSource.filter = JSON.stringify(filterObject);
      }
    );

    this.destroyRef.onDestroy(() => {
      transactionsSub.unsubscribe();
      filterFormSub?.unsubscribe();
      clearTimeout(timeout);
    });
  }
}
