'use client';

import { useParams } from 'next/navigation';
import rehypeStringify from 'rehype-stringify';
import remarkParse from 'remark-parse';
import remarkRehype from 'remark-rehype';
import { unified } from 'unified';
import CodeMirror from '@uiw/react-codemirror';
import { markdown, markdownLanguage } from '@codemirror/lang-markdown';
import { languages } from '@codemirror/language-data';
import { aura } from '@uiw/codemirror-theme-aura';
import { useEffect, useState } from 'react';
import { useDebounce } from 'use-debounce';
import { useAtomValue } from 'jotai';
import { editPostContentAtom } from '@/state/post-state';

const PostEditorPage = () => {
  const params = useParams();
  const { id } = params;

  const { mutate } = useAtomValue(editPostContentAtom);

  const [text, setText] = useState<string>('');
  const [htmlPreview, setHtmlPreview] = useState<string>('');

  const [debouncedText] = useDebounce(text, 1000); // Debounce by 2 seconds

  /**
   * Set up processor for markdown to html conversion
   */
  const processor = unified()
    .use(remarkParse)
    .use(remarkRehype, { allowDangerousHtml: true })
    .use(rehypeStringify);

  /**
   * Convert Markdown to HTML
   */
  useEffect(() => {
    try {
      const processed = processor.processSync(text);
      setHtmlPreview(String(processed));
    } catch (error) {
      console.error('Error processing markdown:', error);
      setHtmlPreview('<p>Error rendering Markdown</p>');
    }
  }, [text]);

  /**
   * Trigger Mutation on Debounced Text
   */
  useEffect(() => {
    if (debouncedText) {
      mutate({
        postId: id as unknown as number, // works for now
        content: debouncedText,
      });
    }
  }, [debouncedText]);

  return (
    <div className="flex h-screen">
      {/* Editor Panel */}
      <div className="w-1/2 p-4 border-r">
        <CodeMirror
          value={text}
          height="820px"
          extensions={[
            markdown({ base: markdownLanguage, codeLanguages: languages }),
          ]}
          theme={aura}
          onChange={setText}
        />
      </div>

      {/* Preview Panel */}
      <div className="w-1/2 p-4 bg-gray-50 overflow-auto">
        <div
          className="prose max-w-none"
          dangerouslySetInnerHTML={{ __html: htmlPreview }}
        />
      </div>
    </div>
  );
};

export default PostEditorPage;
