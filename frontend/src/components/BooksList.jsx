import React, { useEffect, useState } from "react";
import axios from "axios";

const BookListPage = () => {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBooks = async () => {
      const token = localStorage.getItem("token");

      if (!token) {
        alert("No token found. Please log in.");
        window.location.href = "/";
        return;
      }

      try {
        const response = await axios.get("http://localhost:5000/books", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        setBooks(response.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching books", error);
        alert("Failed to fetch books. Unauthorized.");
      }
    };

    fetchBooks();
  }, []);

  if (loading) return <div>Loading...</div>;

  return (
    <div className="p-8">
      <h1 className="text-2xl font-semibold mb-4">Books List</h1>
      <ul>
        {books.length > 0 ? (
          books.map((book) => (
            <li key={book._id}>
              <strong>Title:</strong> {book.title} | <strong>Author:</strong> {book.author}
            </li>
          ))
        ) : (
          <li>No books available</li>
        )}
      </ul>
    </div>
  );
};

export default BookListPage;
