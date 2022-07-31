import gql from 'graphql-tag';

export const ADD_USER = graphql`
  mutation createUser($username: String!, $email: String!, $password: String!) {
    createUser(username: $username, email: $email, password: $password) {
      token
        user {
          _id
          username
          email
          bookCount
          savedBooks {
            bookId
            title
            description
            authors
            image
            link
          }
        }
    }
  }
`;

export const LOGIN_USER = graphql`
  mutation login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
        user {
          _id
          username
          email
          bookCount
          savedBooks {
            bookId
            title
            description
            authors
            image
            link
          }
        }
    
    }
  }
`;

export const SAVE_BOOK = graphql`
  mutation saveBook($input: bookInput!) {
    saveBook(input: $input) {
      _id
      username
      email
      savedBooks {
        bookId
        title
        description
        authors
        image
        link
      }
    }
  }
`;

export const DELETE_BOOK = graphql`
  mutation deleteBook($bookId: String!) {
    deleteBook(bookId: $bookId) {
      _id
      username
      email
      bookCount
      savedBooks {
        bookId
        title
        description
        authors
        image
        link
      }
    }
  }
`;