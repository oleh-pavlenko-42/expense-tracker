import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Transaction } from './transaction.model';

@Injectable({ providedIn: 'root' })
export class TransactionService {
  transactions: Transaction[] = [];
  transactionsSubject = new BehaviorSubject<Transaction[]>([]);

  constructor() {
    const transactionsItem = localStorage.getItem('transactions');
    if (transactionsItem) {
      this.transactions = JSON.parse(transactionsItem);
      this.transactionsSubject.next(this.transactions);
    } else {
      localStorage.setItem('transactions', JSON.stringify([]));
    }
  }

  getTransactions(): BehaviorSubject<Transaction[]> {
    return this.transactionsSubject;
  }

  addTransaction(transaction: Transaction): void {
    const newTransactions = [...this.transactions, transaction];
    this.transactions = newTransactions;
    localStorage.setItem('transactions', JSON.stringify(this.transactions));
    this.transactionsSubject.next(this.transactions);
  }
}
