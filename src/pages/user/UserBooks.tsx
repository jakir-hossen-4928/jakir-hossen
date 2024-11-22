import { useState } from "react";
import { BookCard } from "@/components/books/BookCard";
import { mockBooks } from "@/data/mockBooks";
import { BookDetailsModal } from "@/components/books/BookDetailsModal";
import { Book } from "@/types/books";

const UserBooks = () => {
  const [selectedBook, setSelectedBook] = useState<Book | null>(null);
  const [books] = useState<Book[]>(mockBooks);

  return (
    <div className="space-y-8">
      <h1 className="text-3xl font-bold">Available Books</h1>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {books.map((book) => (
          <BookCard
            key={book.id}
            book={book}
            onDelete={() => {}}
            onViewDetails={setSelectedBook}
          />
        ))}
      </div>

      <BookDetailsModal
        book={selectedBook}
        isOpen={!!selectedBook}
        onClose={() => setSelectedBook(null)}
      />
    </div>
  );
};

export default UserBooks;