import { gql } from '@apollo/client';

export const CREATE_BUDGET = gql`
mutation createBudget($input: CreateBudgetInput!) {
  createBudget(input: $input) {
    id
    name
    date
    incomes {
      id
      source
      amount
    }
    expenses {
      id
      category
      description
      amount
      recurring
    }
    savings {
      id
      name
      amount
    }
  }
}

`;
