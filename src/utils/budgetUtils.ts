import { Budget } from "../types/gql-types";

export function processBudgets(budgets: Budget[]) {
    return budgets.map((budget) => {
      const totalIncome = budget.incomes.reduce(
        (total, income) => total + income.amount,
        0
      );
      const totalExpense = budget.expenses.reduce(
        (total, expense) => total + expense.amount,
        0
      );
      const totalSavings = budget.savings.reduce(
        (total, savings) => total + savings.amount,
        0
      );
  
      return {
        key: budget.id,
        name: budget.name,
        date: budget.date,
        income: totalIncome,
        expense: totalExpense,
        savings: totalSavings,
      };
    });
  }