'use client';

import { useParams, useRouter } from 'next/navigation';
import rehypeStringify from 'rehype-stringify';
import remarkParse from 'remark-parse';
import remarkRehype from 'remark-rehype';
import { unified } from 'unified';
import CodeMirror from '@uiw/react-codemirror';
import { markdown, markdownLanguage } from '@codemirror/lang-markdown';
import { languages } from '@codemirror/language-data';
import { aura } from '@uiw/codemirror-theme-aura';
import { useEffect, useState } from 'react';
import { ChevronLeft } from 'lucide-react';
import { useDebounce } from 'use-debounce';
import { useAtomValue } from 'jotai';
import { editPostAtom, postAtom } from '@/state/post-state';
import { Button } from '@/components/ui/button';
import StatusSelect from '@/components/post-action-bar/status-select';
import CategorySelect from '@/components/post-action-bar/category-select';
import { ScrollArea } from '@/components/ui/scroll-area';

const PostEditorPage = () => {
  const router = useRouter();

  const post = useAtomValue(postAtom);

  const { mutate } = useAtomValue(editPostAtom);

  const [text, setText] = useState<string>('');
  const [htmlPreview, setHtmlPreview] = useState<string>('');

  const [debouncedText] = useDebounce(text, 2000); // Debounce by 2 seconds

  /**
   * Set up processor for markdown to html conversion
   */
  const processor = unified()
    .use(remarkParse)
    .use(remarkRehype, { allowDangerousHtml: true })
    .use(rehypeStringify);

  /**
   * Redirect to Dashboard if `postAtom` is not found
   */
  useEffect(() => {
    if (post == null) {
      router.push('/dashboard');
    }

    setText(post?.content || '');
  }, [post]);

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
        postId: post?.id as number,
        content: debouncedText,
      });
    }
  }, [debouncedText]);

  return (
    <div className="flex flex-col h-screen">
      {/* Action Bar */}
      <div className="relative flex items-center justify-between p-2.5 border-b bg-gray-100">
        {/* Back Button */}
        <Button onClick={() => router.push('/dashboard')} variant="outline">
          <ChevronLeft /> Back to Dashboard
        </Button>

        {/* Post's Title */}
        <h1 className="absolute left-1/2 transform -translate-x-1/2 text-xl font-semibold">
          {post?.title}
        </h1>

        {/* Status and Category Dropdowns */}
        <div className="flex items-center gap-4">
          {/* Status Dropdown */}
          <StatusSelect />

          {/* Category Dropdown */}
          <CategorySelect />
        </div>
      </div>

      <div className="flex flex-row">
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
        <div className="w-1/2 h-[780px] p-4 bg-gray-50">
          <ScrollArea className="h-[780px] w-full">
            <div
              className="prose max-w-none"
              dangerouslySetInnerHTML={{ __html: htmlPreview }}
            />
          </ScrollArea>
        </div>
      </div>
    </div>
  );
};

export default PostEditorPage;
