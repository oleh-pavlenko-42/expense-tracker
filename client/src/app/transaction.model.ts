export type Transaction = {
  name: string;
  amount: number;
  type: 'Income' | 'Expense';
  category: string;
  date: Date;
};
