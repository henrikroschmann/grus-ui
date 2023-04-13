export interface Income {
    id: string;
    source: string;
    amount: number;
  }
  
  export interface Expense {
    id: string;
    category: string;
    description: string;
    amount: number;
    recurring: boolean;
  }
  
  export interface Savings {
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
    savings: Savings[];
  }
  
  export interface UserProfile {
    id: string;
    firstName: string;
    lastName: string;
    email: string;
    budgets: Budget[];
  }
  
  export interface Query {
    getUserProfile: UserProfile;
  }
  