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
import { Form, FormField, FormItem } from '@/components/ui/form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { useAtomValue } from 'jotai';
import { editPostAtom, postAtom } from '@/state/post-state';
import { getAllCategoriesAtom } from '@/state/category-state';

const categorySchema = z.object({
  categoryId: z.number().nonnegative(),
});

type CategorySchema = z.infer<typeof categorySchema>;

const CategorySelect = () => {
  const { mutate } = useAtomValue(editPostAtom);

  const { data } = useAtomValue(getAllCategoriesAtom);

  const mappedCategories =
    data?.map((category) => ({
      label: category.name,
      value: category.id.toString(),
    })) || [];

  const post = useAtomValue(postAtom);

  const form = useForm<z.infer<typeof categorySchema>>({
    resolver: zodResolver(categorySchema),
    defaultValues: {
      categoryId: post?.categoryId || 0,
    },
  });

  const onSubmit = (value: CategorySchema) => {
    mutate({
      postId: post?.id as number,
      categoryId: value.categoryId,
    });
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <FormField
          control={form.control}
          name="categoryId"
          render={({ field }) => (
            <FormItem>
              <Select
                onValueChange={(value: string) => {
                  field.onChange(Number(value)); // Convert the selected value back to a number
                  form.handleSubmit(onSubmit)();
                }}
                defaultValue={String(field.value)} // Ensure default value is a string
              >
                <SelectTrigger className="w-[150px]">
                  <SelectValue>
                    {mappedCategories.find(
                      (category) => category.value === String(field.value),
                    )?.label || 'Select Category'}
                  </SelectValue>
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectLabel>Category</SelectLabel>
                    {mappedCategories.map((category) => (
                      <SelectItem key={category.value} value={category.value}>
                        {category.label}
                      </SelectItem>
                    ))}
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

export default CategorySelect;
