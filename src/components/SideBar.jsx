import { useState, useEffect } from 'react';
import BookItem from './BookItem';
import './SideBar.css';
import { fetchBooks } from '../utils/api'; 

function SideBar() {
  const [books, setBooks] = useState([]);
  const [popularBooks, setPopularBooks] = useState([]);
  const [recentBook, setRecentBook] = useState(null);


  useEffect(() => {
    const loadBooks = async () => {
      const data = await fetchBooks();
      setBooks(data.books || []);
      setPopularBooks(data.books?.slice(2, 6) || []); 
    };
    loadBooks();
  }, []);

  useEffect(() => {
    const loadBooks = async () => {
      const data = await fetchBooks();
      setBooks(data.books || []);
      setRecentBook(data.books?.[data.books.length - 1] || null);
    };
    loadBooks();
  }, []);


  return (
    <aside className="sidebar">
      <h2>Popular Choices</h2>
      {popularBooks ? (
        <div className="current-book popular-books">
          {popularBooks.map(popularBook => (
            <BookItem book={popularBook} />
          ))}
        </div>
      ) : (
        <p>No current book</p>
      )}
      <h2>Most Recent</h2>
      {recentBook ? (
        <div className="current-book">
          <BookItem book={recentBook} />
        </div>
      ) : (
        <p>No current book</p>
      )}
    </aside>
  );
}

export default SideBar;
