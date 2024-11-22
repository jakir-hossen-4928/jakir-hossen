import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Book } from "@/types/books";
import { QRCodeSVG } from "qrcode.react";

interface BookDetailsModalProps {
  book: Book | null;
  isOpen: boolean;
  onClose: () => void;
}

export const BookDetailsModal = ({ book, isOpen, onClose }: BookDetailsModalProps) => {
  if (!book) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>{book.title}</DialogTitle>
        </DialogHeader>
        <div className="grid gap-6 py-4 md:grid-cols-2">
          <div className="aspect-[3/4] relative">
            <img
              src={book.coverUrl}
              alt={book.title}
              className="rounded-lg object-cover w-full h-full"
            />
          </div>
          <div className="space-y-4">
            <div>
              <h4 className="font-medium">Author</h4>
              <p className="text-sm text-muted-foreground">{book.author}</p>
            </div>
            <div>
              <h4 className="font-medium">Category</h4>
              <p className="text-sm text-muted-foreground">{book.category}</p>
            </div>
            {book.description && (
              <div>
                <h4 className="font-medium">Description</h4>
                <p className="text-sm text-muted-foreground">{book.description}</p>
              </div>
            )}
            <div className="pt-4">
              <h4 className="font-medium mb-2">Book QR Code</h4>
              <QRCodeSVG
                value={`book:${book.id}`}
                size={128}
                level="H"
                includeMargin
                className="bg-white p-2 rounded"
              />
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};