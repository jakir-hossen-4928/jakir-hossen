import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Share2, Trash, QrCode, Eye } from "lucide-react";
import { QRCodeSVG } from "qrcode.react";
import { toast } from "sonner";

export const BookCard = ({ book, onDelete, onViewDetails }) => {
  const handleShare = () => {
    toast.success("Sharing options coming soon!");
  };

  return (
    <Card className="h-full flex flex-col">
      <CardHeader>
        <div className="aspect-[3/4] relative mb-4">
          <img
            src={book.coverUrl}
            alt={book.title}
            className="rounded-lg object-cover w-full h-full"
          />
        </div>
        <CardTitle className="line-clamp-2">{book.title}</CardTitle>
      </CardHeader>
      <CardContent className="flex-1 flex flex-col">
        <div className="space-y-2 flex-1">
          <p className="text-sm text-muted-foreground">Author: {book.author}</p>
          <p className="text-sm text-muted-foreground">Category: {book.category}</p>
          {book.description && (
            <p className="text-sm text-muted-foreground line-clamp-3">
              {book.description}
            </p>
          )}
          <div className="mt-4 flex flex-wrap gap-2">
            <Button variant="outline" size="sm" onClick={handleShare}>
              <Share2 className="h-4 w-4" />
            </Button>
            <Button variant="outline" size="sm" onClick={() => onDelete(book.id)}>
              <Trash className="h-4 w-4" />
            </Button>
            <Button variant="outline" size="sm" onClick={() => onViewDetails(book)}>
              <Eye className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
