import './BookDetails.css';
function BookDetails({ book }) {
  return (
    <div className="book-item">
      <img src={book.image_url} alt={book.title} /> {/* Placeholder; use real cover URLs */}
      <div>
        <p> Title: {book.title}</p>
        <small>Author: {book.author}</small>
        <p>Description: {book.description}</p>
        <small>Published: {book.publish_year}</small>
        <p>Genre: {book.genre}</p>
      </div>
    </div>
  );
}

export default BookDetails;