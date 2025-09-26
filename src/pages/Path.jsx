import { useState, useEffect } from 'react';
import './DashBoard.css';
import { fetchBooks } from '../utils/api';

function Path() {
  const [books, setBooks] = useState([]);

  useEffect(() => {
    const loadBooks = async () => {
      const data = await fetchBooks();
      setBooks(data.books || []);
    };
    loadBooks();
  }, []);

  return (
    <div className="path-page">
      <h1>Book Reviews</h1>
      <div className="review-cards">
        {books.map(book => (
          book.reviews && (
            <div key={book.id} className="review-card">
              <h3>Title: {book.title}</h3>
              <p><strong>Author:</strong> {book.author}</p>
              <p><strong>Review:</strong> {book.reviews}</p>
            </div>
          )
        ))}
      </div>
    </div>
  );
}

export default Path;