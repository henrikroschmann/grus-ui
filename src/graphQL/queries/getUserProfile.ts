import { gql } from "@apollo/client";

export const GET_USER_PROFILE = gql`
  query GetUserProfile {
    userProfile {
      id
      firstName
      lastName
      email
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
  }
`;
