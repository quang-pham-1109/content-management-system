'use client';

import { memo } from 'react';
import {
  Dialog,
  DialogHeader,
  DialogTitle,
  DialogContent,
} from '../../ui/dialog';
import { CreatePostForm } from './form';

interface DialogCreatePostProps {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
}

const DialogCreatePost = ({ isOpen, setIsOpen }: DialogCreatePostProps) => {
  return (
    <Dialog onOpenChange={setIsOpen} open={isOpen}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Create A New Post</DialogTitle>
          <CreatePostForm />
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
};

export default memo(DialogCreatePost);
