import { gql } from "@apollo/client";

export const UPDATE_BUDGET = gql`
mutation updateBudget($id: String!, $updatedBudget: UpdateBudgetInput!) {
  updateBudget(id: $id, updatedBudget: $updatedBudget) {
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
