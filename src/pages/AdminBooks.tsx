import { useState } from "react";
import { toast } from "sonner";
import { SearchBar } from "@/components/SearchBar";
import { BookCard } from "@/components/books/BookCard";
import { BookDetailsModal } from "@/components/books/BookDetailsModal";
import { AddBookDialog } from "@/components/books/AddBookDialog";
import { mockBooks } from "@/data/mockBooks";
import { Book } from "@/types/books";

// Book categories
const categories = [
  "Islamic",
  "Fiction",
  "Non-Fiction",
  "Poetry",
  "Science",
  "History",
  "Biography",
  "Self-Help",
  "Other",
];

// Authors list
const authors = [
  "জিম ভানভীর",
  "ইমাম ইবনুল জাওজি (রাহিমাহুল্লাহা)",
  "ডঃ খন্দকার আব্দুল্লাহ জাহাঙ্গীর (রাহিমাহুল্লাহ)",
  "এলিফ শাফাক",
];

const AdminBooks = () => {
  const [selectedBook, setSelectedBook] = useState<Book | null>(null);
  const [books, setBooks] = useState<Book[]>(mockBooks);
  const [searchQuery, setSearchQuery] = useState("");

  const handleAddBook = (book: Book) => {
    setBooks([book, ...books]);
  };

  const handleDelete = (bookId: string) => {
    setBooks(books.filter((book) => book.id !== bookId));
    toast.success("Book deleted successfully!");
  };

  const filteredBooks = books.filter(book =>
    book.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    book.author.toLowerCase().includes(searchQuery.toLowerCase()) ||
    book.category.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">My Books</h1>
        <AddBookDialog 
          onAddBook={handleAddBook}
          authors={authors}
          categories={categories}
        />
      </div>

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
            onDelete={handleDelete}
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

export default AdminBooks;