'use server';

import React from 'react';
import Head from 'next/head';
import { unified } from 'unified';
import remarkParse from 'remark-parse';
import remarkRehype from 'remark-rehype';
import rehypeSlug from 'rehype-slug';
import rehypeStringify from 'rehype-stringify';
import rehypeAutolinkHeadings from 'rehype-autolink-headings';
import { rehypePrettyCode } from 'rehype-pretty-code';

interface BlogPageProps {
  params: { id: string };
}

export default async function PostPage({ params }: BlogPageProps) {
  const { id } = params;

  const data = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/posts/${id}`, {
    method: 'GET',
    cache: 'no-store',
  }).then((res) => {
    if (!res.ok) throw new Error('Failed to fetch post data');
    return res.json();
  });

  if (!data) {
    return <h1>Post Not Found</h1>; // Render fallback if no data is found
  }

  /**
   * Convert Markdown to HTML on the server
   */
  const processor = unified()
    .use(remarkParse)
    .use(remarkRehype)
    .use(rehypeSlug)
    .use(rehypeAutolinkHeadings)
    .use(rehypeStringify)
    .use(rehypePrettyCode, {
      theme: 'github-dark',
    });

  let htmlContent = '';
  try {
    const file = await processor.process(data.content);
    htmlContent = file.toString();
  } catch (error) {
    console.error('Error processing markdown:', error);
    return <h1>Error rendering Markdown</h1>; // Render fallback if error occurs
  }

  return (
    <>
      {/* SEO Metadata */}
      <Head>
        <title>{data.title}</title>
        <meta name="description" content={data.description || 'A blog post'} />
        <meta property="og:title" content={data.title} />
        <meta
          property="og:description"
          content={data.description || 'A blog post'}
        />
        <meta
          property="og:url"
          content={`${process.env.NEXT_PUBLIC_BASE_URL}/posts/${data.slug}`}
        />
        <meta property="og:type" content="article" />
        <link
          rel="canonical"
          href={`${process.env.NEXT_PUBLIC_BASE_URL}/posts/${data.slug}`}
        />
      </Head>
      <div className="flex p-4">
        {/* Main Content */}
        <div className="px-20">
          <h1 className="text-5xl font-bold text-gray-900 mt-6 mb-8">
            {data.title}
          </h1>
          <div
            className="prose max-w-none text-gray-800"
            dangerouslySetInnerHTML={{ __html: htmlContent }}
          />
        </div>

        {/* <Onthispage className="text-sm w-[50%]" htmlContent={htmlContent} /> */}
      </div>
    </>
  );
}
