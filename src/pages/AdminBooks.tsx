import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Plus } from "lucide-react";
import { toast } from "sonner";
import { BookCard } from "@/components/books/BookCard";
import { BookDetailsModal } from "@/components/books/BookDetailsModal";
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

// Authors from your list
const authors = [
  "জিম ভানভীর",
  "ইমাম ইবনুল জাওজি (রাহিমাহুল্লাহা)",
  "ডঃ খন্দকার আব্দুল্লাহ জাহাঙ্গীর (রাহিমাহুল্লাহ)",
  "এলিফ শাফাক",
  // ... Add all other authors from your list
];

const AdminBooks = () => {
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [selectedBook, setSelectedBook] = useState<Book | null>(null);
  const [books, setBooks] = useState<Book[]>(mockBooks);
  const [newBook, setNewBook] = useState<Omit<Book, "id">>({
    title: "",
    author: "",
    category: "",
    coverUrl: "",
    description: "",
  });

  const handleAddBook = () => {
    if (!newBook.title || !newBook.author || !newBook.category) {
      toast.error("Please fill in all required fields");
      return;
    }

    const book: Book = {
      id: Date.now().toString(),
      ...newBook,
    };

    setBooks([book, ...books]);
    setNewBook({
      title: "",
      author: "",
      category: "",
      coverUrl: "",
      description: "",
    });
    setIsAddDialogOpen(false);
    toast.success("Book added successfully!");
  };

  const handleDelete = (bookId: string) => {
    setBooks(books.filter((book) => book.id !== bookId));
    toast.success("Book deleted successfully!");
  };

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">My Books</h1>
        <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="mr-2 h-4 w-4" />
              Add Book
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[600px]">
            <DialogHeader>
              <DialogTitle>Add New Book</DialogTitle>
            </DialogHeader>
            <div className="space-y-4 py-4">
              <div className="space-y-2">
                <label htmlFor="title">Title</label>
                <Input
                  id="title"
                  value={newBook.title}
                  onChange={(e) =>
                    setNewBook({ ...newBook, title: e.target.value })
                  }
                  placeholder="Enter book title"
                />
              </div>

              <div className="space-y-2">
                <label htmlFor="author">Author</label>
                <Select
                  value={newBook.author}
                  onValueChange={(value) =>
                    setNewBook({ ...newBook, author: value })
                  }
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select author" />
                  </SelectTrigger>
                  <SelectContent>
                    {authors.map((author) => (
                      <SelectItem key={author} value={author}>
                        {author}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <label htmlFor="category">Category</label>
                <Select
                  value={newBook.category}
                  onValueChange={(value) =>
                    setNewBook({ ...newBook, category: value })
                  }
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select category" />
                  </SelectTrigger>
                  <SelectContent>
                    {categories.map((category) => (
                      <SelectItem key={category} value={category}>
                        {category}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <label htmlFor="coverUrl">Cover Image URL</label>
                <Input
                  id="coverUrl"
                  value={newBook.coverUrl}
                  onChange={(e) =>
                    setNewBook({ ...newBook, coverUrl: e.target.value })
                  }
                  placeholder="Enter cover image URL"
                />
              </div>

              <div className="space-y-2">
                <label htmlFor="description">Description</label>
                <Textarea
                  id="description"
                  value={newBook.description}
                  onChange={(e) =>
                    setNewBook({ ...newBook, description: e.target.value })
                  }
                  placeholder="Enter book description"
                />
              </div>

              <Button onClick={handleAddBook} className="w-full">
                Add Book
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {books.map((book) => (
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