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
};

const editorConfig = {
  theme,
  onError(error: Error) {
    console.error(error);
  },
  nodes: [HeadingNode, QuoteNode, ListItemNode, ListNode],
};

interface RichTextEditorProps {
  onChange?: (content: string) => void;
  initialContent?: string;
}

export const RichTextEditor = ({ onChange, initialContent }: RichTextEditorProps) => {
  return (
    <LexicalComposer initialConfig={editorConfig}>
      <div className="relative min-h-[200px] w-full border rounded-md">
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
        <HistoryPlugin />
        <AutoFocusPlugin />
        <ListPlugin />
        <MarkdownShortcutPlugin transformers={TRANSFORMERS} />
      </div>
    </LexicalComposer>
  );
};