// mock-data.ts
import { faker } from "@faker-js/faker";
import {
  Income,
  Expense,
  Saving,
  Budget,
  UserProfile,
  ExpenseCategory,
} from "../types/gql-types";

function generateMockIncome(): Income {
  return {
    id: faker.datatype.uuid(),
    source: faker.company.companyName(),
    amount: parseFloat(faker.finance.amount()),
  };
}

function generateMockExpense(): Expense {
  return {
    id: faker.datatype.uuid(),
    category: faker.helpers.arrayElement(Object.values(ExpenseCategory)),
    description: faker.commerce.productName(),
    amount: parseFloat(faker.finance.amount()),
    recurring: faker.datatype.boolean(),
  };
}

function generateMockSavings(): Saving {
  return {
    id: faker.datatype.uuid(),
    name: faker.commerce.productName(),
    amount: parseFloat(faker.finance.amount()),
  };
}

function generateMockBudget(): Budget {
  return {
    id: faker.datatype.uuid(),
    name: faker.lorem.words(3),
    date: new Date(faker.date.past(1).toISOString()), // Convert the ISO string back to a Date object
    incomes: Array.from({ length: 3 }, () => generateMockIncome()),
    expenses: Array.from({ length: 5 }, () => generateMockExpense()),
    savings: Array.from({ length: 2 }, () => generateMockSavings()),
  };
}

export function generateMockUserProfile(): UserProfile {
  return {
    id: faker.datatype.uuid(),
    firstName: faker.name.firstName(),
    lastName: faker.name.lastName(),
    email: faker.internet.email(),
    budgets: Array.from({ length: 5 }, () => generateMockBudget()),
  };
}
