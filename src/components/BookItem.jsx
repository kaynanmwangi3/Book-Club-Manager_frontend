import './BookItem.css';
function BookItem({ book }) {
  return (
    <div className="book-item">
      <img src={book.image_url} alt={book.title} /> 
      <div>
        <p>{book.title}</p>
        <small>{book.author}</small>
      </div>
    </div>
  );
}

export default BookItem;
