"use client"
import Link from "next/link";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { z } from "zod";
import { toast, Toaster } from "react-hot-toast";

const formSchema = z.object({
  username: z.string().min(2, {
    message: "Username must be at least 2 characters.",
  }),
  email: z.string().min(2, { message: "Provide a valid email." }),
  password: z.string().min(4, { message: "Provide a valid password." }),
})

const page = () => {
  const router = useRouter();
  const [state, setState] = useState({
    isSubmitting: false  
  });
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: "",
      email: "",
      password: ""
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      setState((prev)=> ({ ...prev, isSubmitting: true }));
      const result = await axios.post('/api/v1/users/signup', values);
      if (result.status === 201) {
        toast.success('Sign up success');
      }
      router.push('/login')
    } catch (error: any) {
      toast.error(error.message);
    } finally {
      setState((prev)=> ({ ...prev, isSubmitting: false }));
    }
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <Toaster position="top-center" />
      <h1 className="text-3xl font-bold text-center mb-8">Create new account</h1>      
      <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="w-auto flex flex-col gap-4 justify-center items-center">
        <FormField
          control={form.control}
          name="username"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Username</FormLabel>
              <FormControl>
                <Input placeholder="Create a username" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input type="email" placeholder="Enter your email" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Create new password</FormLabel>
              <FormControl>
                <Input type="password" placeholder="Create a password" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit">Create Account</Button>
      </form>
      <FormDescription className="text-lg font-light text-center mt-4">
        Already have an account ? <Link href='/login' className="text-blue-600 font-bold">Login instead</Link>
      </FormDescription>
    </Form>
    </div>
  )
}

export default page
