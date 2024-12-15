import { Card } from '@/components/ui/card';
import { formatDistanceToNow, parseISO } from 'date-fns';
import { useRouter } from 'next/navigation';

interface PostCardProps {
  id: number;
  title: string;
  updatedAt: string;
}

const PostCard = ({ id, title, updatedAt }: PostCardProps) => {
  const router = useRouter();

  const relativeUpdatedAt = formatDistanceToNow(parseISO(updatedAt), {
    addSuffix: true,
  });

  return (
    <Card
      className="w-80 h-24 m-3 cursor-pointer border hover:bg-slate-200 transition-colors"
      onClick={() => router.push(`/dashboard/posts/${id}`)}
    >
      <div className="p-4 flex flex-col gap-1 content-center">
        <p className="font-semibold text-base">{title}</p>
        <p className="text-sm text-gray-500">Updated {relativeUpdatedAt}</p>
      </div>
    </Card>
  );
};

export default PostCard;
