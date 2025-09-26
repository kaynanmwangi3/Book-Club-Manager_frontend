import { useState, useEffect } from 'react';
import { fetchBooks } from '../utils/api';
import { useLocation } from 'react-router-dom';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { addBook, addBookOwnership } from '../utils/api';
import './DashBoard.css';
import BookDetails from './BookDetails.jsx'

const BookSchema = Yup.object().shape({
  title: Yup.string().required('Title is required'),
  author: Yup.string().required('Author is required'),
  description: Yup.string(),
  publish_year: Yup.number().integer().min(1000).max(2025).required('Publish year is required'),
  genre: Yup.string(),
  rating: Yup.number().min(0).max(5),
  reviews: Yup.string(),
  image_url: Yup.string().url('Must be a valid URL').required('Image URL is required'),
});

function Bookshelf({user}) {
  const [books, setBooks] = useState([]);
  const [filteredBooks, setFilteredBooks] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [showForm, setShowForm] = useState(false);
  const location = useLocation();

  const [toast, setToast] = useState(null);
  
  function showToast(message, type = "error", ms = 3000) {
    setToast({ message, type });
    setTimeout(() => setToast(null), ms);
  }
  

  useEffect(() => {
    const loadBooks = async () => {
      const data = await fetchBooks();
      setBooks(data.books || []);
      setFilteredBooks(data.books || []);
    };
    loadBooks();
  }, []);

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const term = params.get('search') || '';
    setSearchTerm(term);

    const filtered = books.filter(book =>
      book.title.toLowerCase().includes(term.toLowerCase()) ||
      (book.genre && book.genre.toLowerCase().includes(term.toLowerCase()))
    );
    setFilteredBooks(filtered);
  }, [location.search, books]);

  const handleAddBook = async (values, { resetForm }) => {
    try {
      const response = await addBook(values);
      if (response.success) {
        const newBook = response.book;
        setBooks([...books, newBook]);
        setFilteredBooks([...filteredBooks, newBook]);
        await addBookOwnership(newBook.id, user.id); // Associate with current user
        showToast('Book added successfully', 'success');
        resetForm();
        setShowForm(false);
      } else {
        showToast('Failed to add book: ' + response.message);
      }
    } catch (error) {
      showToast('Error adding book: ' + error.message);
    }
  };

  return (
    <div className="bookshelf-page">
      <h1>Bookshelf</h1>
      <button  className="addbook-btn" onClick={() => setShowForm(true)}>Add Book</button>
      {showForm && (
        <Formik
          initialValues={{ title: '', author: '', description: '', publish_year: '', genre: '', rating: '', reviews: '', image_url: '' }}
          validationSchema={BookSchema}
          onSubmit={handleAddBook}
        >
          {({ isSubmitting }) => (
            <Form>
              <div>
                <Field name="title" placeholder="Title" />
                <ErrorMessage name="title" component="div" className="error" />
              </div>
              <div>
                <Field name="author" placeholder="Author" />
                <ErrorMessage name="author" component="div" className="error" />
              </div>
              <div>
                <Field name="description" placeholder="Description" />
              </div>
              <div>
                <Field name="publish_year" type="number" placeholder="Publish Year" />
                <ErrorMessage name="publish_year" component="div" className="error" />
              </div>
              <div>
                <Field name="genre" placeholder="Genre" />
              </div>
              <div>
                <Field name="rating" type="number" placeholder="Rating (0-5)" />
                <ErrorMessage name="rating" component="div" className="error" />
              </div>
              <div>
                <Field name="reviews" placeholder="Reviews" />
              </div>
              <div>
                <Field name="image_url" placeholder="Image URL (e.g., https://example.com/image.jpg)" />
                <ErrorMessage name="image_url" component="div" className="error" />
              </div>
              <button className="final-btns" type="submit" disabled={isSubmitting}>Add Book</button>
              <button  className="final-btns" type="button" onClick={() => setShowForm(false)}>Cancel</button>
            </Form>
          )}
        </Formik>
      )}
      <ul>
        {filteredBooks.map(book => (
          <li key={book.id}><BookDetails book={book} /></li>
        ))}
      </ul>
      {/* Toast */}
      {toast && (
        <div className={`toast ${toast.type === "error" ? "error" : "success"}`}>
          {toast.message}
        </div>
      )}

    </div>
  );
}

export default Bookshelf;