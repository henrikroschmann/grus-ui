export interface Income {
  id: string;
  source: string;
  amount: number;
}

export enum ExpenseCategory {
  ESSENTIAL = 'Essential expense',
  NON_ESSENTIAL = 'Non-essential expense',
}

export interface Expense {
  id: string;
  category: ExpenseCategory;
  description: string;
  amount: number;
  recurring: boolean;
}

export interface Saving {
  id: string;
  name: string;    
  amount: number;    
}

export interface Budget {
  id: string;
  name: string;
  date: Date;
  incomes: Income[];
  expenses: Expense[];
  savings: Saving[];
}

export interface UserProfile {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  budgets: Budget[];
}

export interface Query {
  userProfile: UserProfile;
  getUserProfile: UserProfile;
}

export interface Mutation {
}
