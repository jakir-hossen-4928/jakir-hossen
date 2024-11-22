import { useState } from "react";
import { Plus } from "lucide-react";
import { toast } from "sonner";
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
import { Book } from "@/types/books";

interface AddBookDialogProps {
  onAddBook: (book: Book) => void;
  authors: string[];
  categories: string[];
}

export const AddBookDialog = ({ onAddBook, authors, categories }: AddBookDialogProps) => {
  const [isOpen, setIsOpen] = useState(false);
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

    onAddBook(book);
    setNewBook({
      title: "",
      author: "",
      category: "",
      coverUrl: "",
      description: "",
    });
    setIsOpen(false);
    toast.success("Book added successfully!");
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
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
  );
};