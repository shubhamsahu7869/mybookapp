import React, { useState } from "react";
import { ToastContainer, toast } from "react-toastify";

const AddBooks = () => {
  const [book, setBook] = useState({
    image: "",
    name: "",
    author: "",
    description: "",
  });

  const changeHandler = (e) => {
    let { name, value } = e.target;
    setBook({
      ...book,
      [name]: value,
    });
  };

  const changeImageHandler = (e) => {
    const file = e.target.files[0];

    if (file) {
      const readFile = new FileReader();

      readFile.onloadend = () => {
        setBook((prev) => ({
          ...prev,
          image: readFile.result,
        }));
      };
      readFile.readAsDataURL(file);
    }
  };

  const submitHandler = (e) => {
    e.preventDefault();

    if (!book.image || !book.name || !book.author || !book.description) {
      toast.error("All Fields Are Required");
      return;
    }

    const newBook = { ...book, id: Date.now() };
    const bookExisted = JSON.parse(localStorage.getItem("book-data")) || [];
    bookExisted.push(newBook);
    localStorage.setItem("book-data", JSON.stringify(bookExisted));
    toast.success("Book Added Successfully");
    setBook({
      image: "",
      name: "",
      author: "",
      description: "",
    });
  };

  let styles = {
    form: {
      width: "400px",
      margin: "50px auto",
      border: "1px solid white",
      padding: "20px",
      borderRadius: "10px",
      boxShadow: "0px 0px 3px black",
    },

    input: {
      width: "100%",
      padding: "8px",
      marginBottom: "10px",
    },

    textarea: {
      width: "100%",
      padding: "8px",
      marginBottom: "10px",
    },
    button: {
      padding: "10px 20px",
      width: "100%",
      color: "white",
      backgroundColor: "black",
      border: "none",
      borderRadius: "5px",
      fontSize: "18px",
    },
    h2: {
      textAlign: "center",
      color: "red",
    },
  };

  return (
    <form onSubmit={submitHandler} style={styles.form}>
      <h2 style={styles.h2}>Add Books</h2>

      <label htmlFor="book-image">Book Image: </label>
      <input
        type="file"
        accept="image/*"
        id="book-image"
        onChange={changeImageHandler}
      />

      <label htmlFor="book-name">Book Name:</label>
      <input
        type="text"
        name="name"
        placeholder="Enter Book Name"
        id="book-name"
        style={styles.input}
        value={book.name}
        onChange={changeHandler}
      />

      <label htmlFor="author-name">Author Name:</label>
      <input
        type="text"
        name="author"
        placeholder="Enter Book Name"
        id="author-name"
        style={styles.input}
        value={book.author}
        onChange={changeHandler}
      />

      <label htmlFor="book-description">Book Description:</label>
      <textarea
        name="description"
        id="book-description"
        placeholder="Enter Book Description"
        style={styles.textarea}
        value={book.description}
        onChange={changeHandler}
      ></textarea>

      <button type="submit" style={styles.button}>
        Add Book
      </button>

      <ToastContainer autoClose={2000} position="top-center" />
    </form>
  );
};

export default AddBooks;
