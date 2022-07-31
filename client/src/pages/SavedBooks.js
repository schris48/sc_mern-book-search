import React, { useState, useEffect } from 'react';
import { Jumbotron, Container, CardColumns, Card, Button } from 'react-bootstrap';
import { deleteBookId } from '../utils/mutations';
import { REMOVE_BOOK } from '../utils/queries';
import { GET_USER } from '../utils/mutations';
import { useQuery, useMutation } from '@apollo/react-hooks';
import { getMe, deleteBook } from '../utils/API';
import Auth from '../utils/auth';
import { removeBookId } from '../utils/localStorage';

const SavedBooks = () => {
  // const [userData, setUserData] = useState({});
  const [deleteBook, { error }] = useMutation(REMOVE_BOOK);
  const userData = data?.me || {};

  const handleDeleteBook = async (bookId) => {
    const token = Auth.loggedIn() ? Auth.getToken() : null;

    if (!token) {
        return false;
    }

    try {
        const { response } = await deleteBook({
            variables: { bookId }
        });

        if (error) {
            throw new Error('Failed to delete book!');
        }

        deleteBookId(bookId);
    } catch (err) {
        console.error(err);
    }
};

if (loading) {
    return <h2>LOADING...</h2>;
}

return (
  <>
    <Jumbotron fluid className='text-light bg-dark'>
      <Container>
        <h1>Viewing saved books!</h1>
      </Container>
    </Jumbotron>

    <Container>
      <h2>
        {userData.savedBooks.length
          ? `Viewing ${userData.savedBooks.length} saved ${userData.savedBooks.length === 1 ? 'book' : 'books'}:`
          : 'You have no saved books!'}
      </h2>
      <CardColumns>
        {userData.savedBooks.map((book) => {
          return (
            <Card key={book.bookId} border='dark'>
              {book.image ? <Card.Img src={book.image} alt={`The cover for ${book.title}`} variant='top' /> : null}
                <Card.Body>
                  <Card.Title>{book.title}</Card.Title>
                  <p className='small'>Authors: {book.authors}</p>
                  <Card.Text>{book.description}</Card.Text>
                  <Button className='btn-block btn-danger' onClick={() => handleDeleteBook(book.bookId)}>
                    Delete book!
                  </Button>
                </Card.Body>
            </Card>
            );
          })}
        </CardColumns>
      </Container>
    </>
  );
};

export default SavedBooks;
