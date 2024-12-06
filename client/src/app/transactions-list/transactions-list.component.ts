import { AsyncPipe, DatePipe } from '@angular/common';
import {
  AfterViewInit,
  Component,
  inject,
  OnInit,
  viewChild,
} from '@angular/core';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { TransactionService } from '../transaction.service';
import { Transaction } from '../transaction.model';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { DataSource } from '@angular/cdk/collections';
import { BehaviorSubject } from 'rxjs';

@Component({
  selector: 'app-transactions-list',
  imports: [MatTableModule, MatSortModule, DatePipe],
  standalone: true,
  templateUrl: './transactions-list.component.html',
  styleUrl: './transactions-list.component.scss',
})
export class TransactionsListComponent implements OnInit, AfterViewInit {
  private transactionService = inject(TransactionService);

  transactionsDataSource!: MatTableDataSource<Transaction>;
  displayedColumns = ['name', 'amount', 'category', 'date'];
  matSort = viewChild<MatSort>(MatSort);

  ngOnInit(): void {
    this.transactionService.getTransactions().subscribe((transactions) => {
      this.transactionsDataSource = new MatTableDataSource(transactions);
    });
  }

  ngAfterViewInit(): void {
    this.transactionsDataSource.sort = this.matSort()!;
  }
}
