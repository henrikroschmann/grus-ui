import { gql } from '@apollo/client';

export const DELETE_BUDGET = gql`
  mutation deleteBudget($budgetId: ID!) {
    deleteBudget(budgetId: $budgetId)
  }
`;
