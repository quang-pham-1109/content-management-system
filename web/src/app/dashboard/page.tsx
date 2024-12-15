'use client';

import { AppSidebar } from '@/components/dashboard/app-sidebar';
import PostCard from '@/components/dashboard/post-card';
import { useAtomValue } from 'jotai';
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
} from '@/components/ui/breadcrumb';
import { Separator } from '@/components/ui/separator';
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from '@/components/ui/sidebar';
import { getAllPostsAtom } from '@/state/post-state';

const DashboardPage = () => {
  const { data } = useAtomValue(getAllPostsAtom);

  return (
    <SidebarProvider>
      <AppSidebar />

      <SidebarInset>
        {/* Header Section */}
        <header className="flex h-16 shrink-0 items-center gap-2 border-b px-4">
          <SidebarTrigger className="-ml-1" />
          <Separator orientation="vertical" className="mr-2 h-4" />
          <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem className="hidden md:block">
                <BreadcrumbLink href="#my-posts">CMS Dashboard</BreadcrumbLink>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </header>

        {/* Content Section */}
        <div className="flex flex-wrap flex-1 m-6">
          {data?.map((post) => <PostCard key={post.id} post={post} />)}
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
};

export default DashboardPage;
