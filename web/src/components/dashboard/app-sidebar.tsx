'use client';

import { ComponentProps, useState } from 'react';

import { SearchForm } from '@/components/dashboard/search-form';
import { VersionSwitcher } from '@/components/dashboard/version-switcher';
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
} from '@/components/ui/sidebar';
import { Button } from '../ui/button';
import { Plus } from 'lucide-react';
import DialogCreatePosts from './create-post/dialog';

// This is sample data.
const data = {
  versions: ['1.0.0', '1.1.0', '2.0.0-beta'],
  navMain: [
    {
      title: 'Your Content', // Default selected tab
      url: '#',
      items: [
        {
          title: 'My Posts',
          url: '#my-posts',
          isActive: true,
        },
        {
          title: 'Drafts',
          url: '#drafts',
        },
        {
          title: 'Published',
          url: '#published',
        },
        {
          title: 'Trash',
          url: '#trash',
        },
      ],
    },
    {
      title: 'Editor Features',
      url: '#',
      items: [
        {
          title: 'Markdown Syntax',
          url: '#markdown-syntax',
        },
        {
          title: 'Preview Mode',
          url: '#preview-mode',
        },
        {
          title: 'Export',
          url: '#export',
        },
        {
          title: 'Import',
          url: '#import',
        },
      ],
    },
    {
      title: 'Settings',
      url: '#',
      items: [
        {
          title: 'General Settings',
          url: '#general-settings',
        },
        {
          title: 'User Preferences',
          url: '#user-preferences',
        },
      ],
    },
  ],
};

export function AppSidebar({ ...props }: ComponentProps<typeof Sidebar>) {
  const [isShowDialogCreatePost, setIsShowDialogCreatePost] = useState(false);

  const handleCreateNewPost = () => {
    setIsShowDialogCreatePost(true);
  };

  return (
    <Sidebar {...props}>
      <SidebarHeader>
        {/* This should be updated to as a user info combobox */}
        <VersionSwitcher
          versions={data.versions}
          defaultVersion={data.versions[0]}
        />
        <SearchForm />
        <Button className="my-2 p-3" onClick={handleCreateNewPost}>
          <Plus /> New Page
        </Button>
      </SidebarHeader>

      <SidebarContent>
        {/* We create a SidebarGroup for each parent. */}
        {data.navMain.map((item) => (
          <SidebarGroup key={item.title}>
            <SidebarGroupLabel>{item.title}</SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                {item.items.map((item) => (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton asChild isActive={item.isActive}>
                      <a href={item.url}>{item.title}</a>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        ))}
      </SidebarContent>

      {isShowDialogCreatePost && (
        <DialogCreatePosts
          isOpen={isShowDialogCreatePost}
          setIsOpen={setIsShowDialogCreatePost}
        />
      )}
      <SidebarRail />
    </Sidebar>
  );
}
