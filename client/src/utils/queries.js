import { gql } from '@apollo/client';

export const GET_ME = gql`
  query user($username: String!) {
    me {
      _id
      username
      email
      bookCount
      saveBooks {
        bookId
        authors
        title
        description
        image
        link
      }
    }
  }
`;