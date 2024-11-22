import { LexicalComposer } from '@lexical/react/LexicalComposer';
import { RichTextPlugin } from '@lexical/react/LexicalRichTextPlugin';
import { ContentEditable } from '@lexical/react/LexicalContentEditable';
import { HistoryPlugin } from '@lexical/react/LexicalHistoryPlugin';
import { AutoFocusPlugin } from '@lexical/react/LexicalAutoFocusPlugin';
import LexicalErrorBoundary from '@lexical/react/LexicalErrorBoundary';
import { HeadingNode, QuoteNode } from '@lexical/rich-text';
import { ListItemNode, ListNode } from '@lexical/list';
import { ListPlugin } from '@lexical/react/LexicalListPlugin';
import { MarkdownShortcutPlugin } from '@lexical/react/LexicalMarkdownShortcutPlugin';
import { TRANSFORMERS } from '@lexical/markdown';
import { CodeNode, CodeHighlightNode } from '@lexical/code';
import { LinkNode } from '@lexical/link';
import { LinkPlugin } from '@lexical/react/LexicalLinkPlugin';
import { TableNode, TableCellNode, TableRowNode } from '@lexical/table';
import { TablePlugin } from '@lexical/react/LexicalTablePlugin';
import ToolbarPlugin from './plugins/ToolbarPlugin';

const theme = {
  paragraph: 'mb-2',
  heading: {
    h1: 'text-3xl font-bold mb-4',
    h2: 'text-2xl font-bold mb-3',
    h3: 'text-xl font-bold mb-2',
  },
  list: {
    ul: 'list-disc list-inside mb-4',
    ol: 'list-decimal list-inside mb-4',
  },
  quote: 'border-l-4 border-gray-200 pl-4 mb-4 italic',
  table: 'min-w-full border-collapse border border-gray-200',
  tableCell: 'border border-gray-200 px-4 py-2',
  tableRow: 'border-b border-gray-200',
  text: {
    bold: 'font-bold',
    italic: 'italic',
    underline: 'underline',
    code: 'font-mono bg-gray-100 rounded-md px-1',
  },
};

const editorConfig = {
  namespace: 'MyEditor',
  theme,
  onError(error) {
    console.error(error);
  },
  nodes: [
    HeadingNode,
    QuoteNode,
    ListItemNode,
    ListNode,
    CodeNode,
    CodeHighlightNode,
    LinkNode,
    TableNode,
    TableCellNode,
    TableRowNode,
  ],
};

export const RichTextEditor = ({ onChange, initialContent }) => {
  return (
    <LexicalComposer initialConfig={editorConfig}>
      <div className="relative border rounded-md">
        <ToolbarPlugin />
        <div className="relative min-h-[200px]">
          <RichTextPlugin
            contentEditable={
              <ContentEditable className="min-h-[200px] outline-none p-4" />
            }
            placeholder={
              <div className="absolute top-[15px] left-[15px] text-muted-foreground">
                Start typing...
              </div>
            }
            ErrorBoundary={LexicalErrorBoundary}
          />
        </div>
        <HistoryPlugin />
        <AutoFocusPlugin />
        <ListPlugin />
        <LinkPlugin />
        <TablePlugin />
        <MarkdownShortcutPlugin transformers={TRANSFORMERS} />
      </div>
    </LexicalComposer>
  );
};