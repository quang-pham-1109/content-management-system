import { Card } from '@/components/ui/card';
import { formatDistanceToNow, parseISO } from 'date-fns';
import { useRouter } from 'next/navigation';
import { useSetAtom } from 'jotai';
import { postAtom } from '@/state/post-state';
import { Post } from '@/types/post';

interface PostCardProps {
  post: Post;
}

const PostCard = ({ post }: PostCardProps) => {
  const router = useRouter();

  const setPost = useSetAtom(postAtom);

  const relativeUpdatedAt = formatDistanceToNow(parseISO(post.updatedAt), {
    addSuffix: true,
  });

  return (
    <Card
      className="w-80 h-24 m-3 cursor-pointer border hover:bg-slate-200 transition-colors"
      onClick={() => {
        router.push(`/dashboard/posts/${post.id}`);
        setPost(post);
      }}
    >
      <div className="p-4 flex flex-col gap-1 content-center">
        <p className="font-semibold text-base">{post.title}</p>
        <p className="text-sm text-gray-500">Updated {relativeUpdatedAt}</p>
      </div>
    </Card>
  );
};

export default PostCard;
