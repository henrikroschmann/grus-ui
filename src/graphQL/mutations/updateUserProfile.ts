import { gql } from "@apollo/client";

export const UPDATE_USER_PROFILE = gql`
  mutation UpdateUserProfile($firstName: String!, $lastName: String!, $email: String!) {
    updateUserProfile(input: { firstName: $firstName, lastName: $lastName, email: $email }) {
      id
      firstName
      lastName
      email
      # ... other profile information you want to return
    }
  }
`;
