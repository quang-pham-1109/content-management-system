import { z } from 'zod';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { useAtomValue } from 'jotai';
import { editPostAtom, postAtom } from '@/state/post-state';

const statusSchema = z.object({
  status: z.string(),
});

type StatusSchema = z.infer<typeof statusSchema>;

const StatusSelect = () => {
  const { mutate } = useAtomValue(editPostAtom);

  const post = useAtomValue(postAtom);

  const form = useForm<z.infer<typeof statusSchema>>({
    resolver: zodResolver(statusSchema),
    defaultValues: {
      status: post?.status || 'draft',
    },
  });

  const onSubmit = (value: StatusSchema) => {
    mutate({
      postId: post?.id as number,
      status: value.status,
    });
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <FormField
          control={form.control}
          name="status"
          render={({ field }) => (
            <FormItem>
              <Select
                onValueChange={(value: string) => {
                  field.onChange(value);
                  form.handleSubmit(onSubmit)();
                }}
                defaultValue={field.value}
              >
                <SelectTrigger className="w-[150px]">
                  <SelectValue placeholder="Select Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectLabel>Status</SelectLabel>
                    <SelectItem value="draft">Draft</SelectItem>
                    <SelectItem value="archive">Archive</SelectItem>
                    <SelectItem value="published">Published</SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
            </FormItem>
          )}
        />
      </form>
    </Form>
  );
};

export default StatusSelect;
