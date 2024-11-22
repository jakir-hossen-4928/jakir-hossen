import { useState } from "react";
import { BookCard } from "@/components/books/BookCard";
import { mockBooks } from "@/data/mockBooks";
import { BookDetailsModal } from "@/components/books/BookDetailsModal";
import { Book } from "@/types/books";
import { SearchBar } from "@/components/SearchBar";

const UserBooks = () => {
  const [selectedBook, setSelectedBook] = useState<Book | null>(null);
  const [books] = useState<Book[]>(mockBooks);
  const [searchQuery, setSearchQuery] = useState("");

  const filteredBooks = books.filter(book =>
    book.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    book.author.toLowerCase().includes(searchQuery.toLowerCase()) ||
    book.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
    (book.description && book.description.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  return (
    <div className="space-y-8">
      <h1 className="text-3xl font-bold">Available Books</h1>

      <SearchBar 
        value={searchQuery}
        onChange={setSearchQuery}
        placeholder="Search books..."
      />

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {filteredBooks.map((book) => (
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