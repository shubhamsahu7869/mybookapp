import React, { useState } from "react";
import { toast, ToastContainer } from "react-toastify";

function Home() {
  let bookStored = JSON.parse(localStorage.getItem("book-data")) || [];

  let favBook = JSON.parse(localStorage.getItem("fav-books")) || [];

  const [books, setBooks] = useState(bookStored);

  // Remove Books
  const removeHandler = (bookName) => {
    const bookLeft = books.filter((b) => b.name !== bookName);
    setBooks(bookLeft);
    localStorage.setItem("book-data", JSON.stringify(bookLeft));
  };

  // Add Fav Books
  const favHandler = (book) => {
    const isAlreadyFav = favBook.find((b) => b.name === book.name);
    if (isAlreadyFav) {
      toast.warning("Already in Fav");
      return
    } 
      const updatedFavBook = [...favBook, book];
      localStorage.setItem("fav-books", JSON.stringify(updatedFavBook));
      toast.success("Book Added To Fav");
    
  };

  return (
    <div>
      <h2>Book Collections</h2>
      {books.length === 0 ? (
        <p> No Books Added Yet....</p>
      ) : (
        <div>
          {books.map((bookData) => (
            <div key={bookData.id}>
              <img src={bookData.image} alt={bookData.name} />
              <h2>{bookData.name}</h2>
              <p>{bookData.author}</p>
              <p>{bookData.description}</p>
              <button>Update Book</button>
              <button onClick={() => removeHandler(bookData.name)}>
                Remove Book
              </button>

              <button onClick={() => favHandler(bookData)}>Add To Fav</button>
            </div>
          ))}
        </div>
      )}

      <ToastContainer position="top-center" autoClose={2000} />
    </div>
  );
}

export default Home;
