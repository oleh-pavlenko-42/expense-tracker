import { Component } from '@angular/core';
import { AddTransactionComponent } from './add-transaction/add-transaction.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [AddTransactionComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {}
