'use client';

import { Separator } from '@/components/ui/separator';
import { useAtomValue } from 'jotai';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { getAllPostsAtom } from '@/state/post-state';
import { getAllCategoriesAtom } from '@/state/category-state';

const BlogPage = () => {
  const router = useRouter();

  const { data: posts } = useAtomValue(getAllPostsAtom);
  const { data: categories } = useAtomValue(getAllCategoriesAtom);

  const mappedCategories =
    categories?.map((category) => ({
      label: category.name,
      value: category.id,
    })) || [];

  const [currentTab, setCurrentTab] = useState<number | null>(
    mappedCategories[0]?.value || null,
  );

  // Filter posts based on the selected tab (categoryId) or show all if no tab is selected
  const filteredPosts =
    currentTab === null
      ? posts
      : posts?.filter((post) => post.categoryId === currentTab);

  // Handle tab selection or deselection (on double-click)
  const handleTabClick = (categoryId: number) => {
    if (currentTab === categoryId) {
      // Deselect tab if it's clicked again
      setCurrentTab(null);
    } else {
      // Set tab to the clicked category
      setCurrentTab(categoryId);
    }
  };

  return (
    <div className="p-10">
      <h1 className="text-3xl font-bold mb-5">All Blog Posts</h1>

      {/* Tab Navigation */}
      <div className="flex h-5 items-center space-x-7 text-sm">
        {mappedCategories.map((category) => (
          <div
            key={category.value}
            className={`cursor-pointer ${
              currentTab === category.value
                ? 'text-primary font-semibold'
                : 'text-gray-500'
            }`}
            onClick={() => handleTabClick(category.value)}
          >
            {category.label}
          </div>
        ))}
      </div>

      <Separator className="mt-4 mb-14" />

      {/* Post Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 rounded-lg">
        {filteredPosts?.map((post) => (
          <div
            key={post.id}
            className="p-4 border rounded-md shadow hover:shadow-lg hover:bg-gray-100 transition cursor-pointer"
            onClick={() => router.push(`/posts/${post.id}`)}
          >
            <h2 className="font-semibold text-lg">{post.title}</h2>
            <p className="text-sm text-gray-500">
              Updated {new Date(post.updatedAt).toLocaleDateString()}
            </p>
          </div>
        ))}

        {/* No posts fallback */}
        {filteredPosts?.length === 0 && (
          <p className="text-gray-500 col-span-full">
            No posts available for this category.
          </p>
        )}
      </div>
    </div>
  );
};

export default BlogPage;
