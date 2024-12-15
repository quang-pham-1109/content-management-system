'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { loginAdminAtom } from '@/state/login-state';
import { useAtomValue } from 'jotai';

const adminLoginFormSchema = z.object({
  email: z.string().email({ message: 'Invalid email address' }).min(2, {
    message: 'Email must be at least 2 characters.',
  }),
  password: z.string().min(6, {
    message: 'Password must be at least 6 characters',
  }),
});

type AdminLoginForm = z.infer<typeof adminLoginFormSchema>;

const AdminForm = () => {
  const { mutate } = useAtomValue(loginAdminAtom);

  const adminLoginForm = useForm<AdminLoginForm>({
    resolver: zodResolver(adminLoginFormSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const onSubmit = (values: AdminLoginForm) => {
    mutate(values);
  };
  return (
    <Form {...adminLoginForm}>
      <form
        onSubmit={adminLoginForm.handleSubmit(onSubmit)}
        className="space-y-4"
      >
        <FormField
          control={adminLoginForm.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input placeholder="Your email" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={adminLoginForm.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Password</FormLabel>
              <FormControl>
                <Input type="password" placeholder="Your Password" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" className="w-full">
          Login
        </Button>
      </form>
    </Form>
  );
};

export default AdminForm;
