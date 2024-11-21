import { useLexicalComposerContext } from '@lexical/react/LexicalComposerContext';
import { Button } from '@/components/ui/button';
import {
  Bold,
  Italic,
  Underline,
  List,
  ListOrdered,
  Quote,
  Heading1,
  Heading2,
  Code,
  Link,
  Table,
  CheckSquare,
} from 'lucide-react';
import { FORMAT_TEXT_COMMAND, UNDO_COMMAND, REDO_COMMAND } from 'lexical';
import {
  INSERT_ORDERED_LIST_COMMAND,
  INSERT_UNORDERED_LIST_COMMAND,
  INSERT_CHECK_LIST_COMMAND,
} from '@lexical/list';
import { INSERT_QUOTE_COMMAND } from '@lexical/rich-text';

const ToolbarPlugin = () => {
  const [editor] = useLexicalComposerContext();

  const formatHeading = (level: 1 | 2) => {
    editor.update(() => {
      const selection = editor.getSelection();
      if (selection) {
        editor.update(() => {
          const node = selection.getNodes()[0];
          if (node) {
            node.replace(`h${level}`);
          }
        });
      }
    });
  };

  return (
    <div className="flex flex-wrap gap-1 p-2 border-b">
      <Button
        variant="ghost"
        size="sm"
        onClick={() => editor.dispatchCommand(FORMAT_TEXT_COMMAND, 'bold')}
      >
        <Bold className="h-4 w-4" />
      </Button>
      <Button
        variant="ghost"
        size="sm"
        onClick={() => editor.dispatchCommand(FORMAT_TEXT_COMMAND, 'italic')}
      >
        <Italic className="h-4 w-4" />
      </Button>
      <Button
        variant="ghost"
        size="sm"
        onClick={() => editor.dispatchCommand(FORMAT_TEXT_COMMAND, 'underline')}
      >
        <Underline className="h-4 w-4" />
      </Button>
      <Button
        variant="ghost"
        size="sm"
        onClick={() => editor.dispatchCommand(INSERT_UNORDERED_LIST_COMMAND, undefined)}
      >
        <List className="h-4 w-4" />
      </Button>
      <Button
        variant="ghost"
        size="sm"
        onClick={() => editor.dispatchCommand(INSERT_ORDERED_LIST_COMMAND, undefined)}
      >
        <ListOrdered className="h-4 w-4" />
      </Button>
      <Button
        variant="ghost"
        size="sm"
        onClick={() => editor.dispatchCommand(INSERT_CHECK_LIST_COMMAND, undefined)}
      >
        <CheckSquare className="h-4 w-4" />
      </Button>
      <Button
        variant="ghost"
        size="sm"
        onClick={() => editor.dispatchCommand(INSERT_QUOTE_COMMAND, undefined)}
      >
        <Quote className="h-4 w-4" />
      </Button>
      <Button
        variant="ghost"
        size="sm"
        onClick={() => formatHeading(1)}
      >
        <Heading1 className="h-4 w-4" />
      </Button>
      <Button
        variant="ghost"
        size="sm"
        onClick={() => formatHeading(2)}
      >
        <Heading2 className="h-4 w-4" />
      </Button>
      <Button
        variant="ghost"
        size="sm"
        onClick={() => editor.dispatchCommand(FORMAT_TEXT_COMMAND, 'code')}
      >
        <Code className="h-4 w-4" />
      </Button>
      <Button
        variant="ghost"
        size="sm"
        onClick={() => {
          const url = window.prompt('Enter URL');
          if (url) {
            editor.dispatchCommand(FORMAT_TEXT_COMMAND, 'link');
          }
        }}
      >
        <Link className="h-4 w-4" />
      </Button>
      <Button
        variant="ghost"
        size="sm"
        onClick={() => {
          editor.update(() => {
            const table = editor.createNode('table');
            editor.getSelection()?.insertNodes([table]);
          });
        }}
      >
        <Table className="h-4 w-4" />
      </Button>
    </div>
  );
};

export default ToolbarPlugin;