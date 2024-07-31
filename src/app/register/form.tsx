"use client";

import { useForm, SubmitHandler } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormItem,
  FormLabel,
  FormControl,
  FormDescription,
  FormMessage,
  FormField,
} from "@/components/ui/form";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import Link from "next/link";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

// Define zod schema
const RegisterSchema = z.object({
  username: z.string().min(3, "Username must be at least 3 characters"),
  email: z.string().email("Invalid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
  phone: z.string().optional(),
});

type FormValues = z.infer<typeof RegisterSchema>;

export default function RegisterForm() {
  const router = useRouter();

  const methods = useForm<FormValues>({
    resolver: zodResolver(RegisterSchema),
  });
  const {
    handleSubmit,
    formState: { errors },
  } = methods;

  const onSubmit: SubmitHandler<FormValues> = async (data) => {
    // Show loading toast
    const toastId = toast.loading("Registering...");
    
    const response = await fetch(`/api/auth/register`, {
      method: "POST",
      body: JSON.stringify(data),
    });

    if (response.ok) {
      toast.success("Registration successful", { id: toastId });
      router.push("/login");
    } else {
      toast.error("Registration failed", { id: toastId });
    }
  };

  return (
    <Card className="w-full border-orange-600 md:w-6/12 lg:w-5/12 xl:w-3/12">
      <CardHeader><CardTitle className="text-center text-orange-600">Register</CardTitle></CardHeader>
      <CardContent>
        <Form {...methods}>
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="flex flex-col gap-2 mx-auto max-w-md"
          >
            <FormField
              name="username"
              control={methods.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Username</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      className="border border-black text-black"
                      type="text"
                      placeholder="Username"
                    />
                  </FormControl>
                  {errors.username && (
                    <FormMessage>{errors.username.message}</FormMessage>
                  )}
                </FormItem>
              )}
            />
            <FormField
              name="email"
              control={methods.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      className="border border-black text-black"
                      type="email"
                      placeholder="Email"
                    />
                  </FormControl>
                  {errors.email && (
                    <FormMessage>{errors.email.message}</FormMessage>
                  )}
                </FormItem>
              )}
            />
            <FormField
              name="password"
              control={methods.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      className="border border-black text-black"
                      type="password"
                      placeholder="Password"
                    />
                  </FormControl>
                  {errors.password && (
                    <FormMessage>{errors.password.message}</FormMessage>
                  )}
                </FormItem>
              )}
            />
            <FormField
              name="phone"
              control={methods.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Phone</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      className="border border-black text-black"
                      type="text"
                      placeholder="Phone"
                    />
                  </FormControl>
                  {errors.phone && (
                    <FormMessage>{errors.phone.message}</FormMessage>
                  )}
                </FormItem>
              )}
            />
            <Button type="submit">Register</Button>
          </form>
        </Form>
        <p className="text-center mt-4">
          Have an account? <Link href="/login" className="text-orange-600">Login</Link>
        </p>
      </CardContent>
    </Card>
  );
}
