import { gql } from '@apollo/client';

export const GET_BUDGETS = gql`
  query getBudgets {
    budgets {
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
