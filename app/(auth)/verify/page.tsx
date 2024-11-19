"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { toast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import { useCallback, useEffect, useState } from "react";
import { notFound, useRouter, useSearchParams } from "next/navigation";
import { getUserById } from "@/data/user";
import Image from "next/image";
import { User } from "@prisma/client";
import { verifyOTP } from "@/actions/auth";
import { MoonLoader } from "react-spinners";

const FormSchema = z.object({
  pin: z.string().min(4, {
    message: "Your one-time password must be 4 characters.",
  }),
});

const VerifyPage = () => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const t = searchParams.get("t");
  const [error, setError] = useState("");
  const [user, setUser] = useState<User>();

  if (!t) return notFound();

  const getUser = useCallback(async () => {
    const res = await getUserById(t);

    if (!res.user) return notFound();

    if (res.user.emailVerified) {
      router.push("/");
    }
    setUser(res.user);
  }, []);

  useEffect(() => {
    getUser();
  }, [getUser]);

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      pin: "",
    },
  });

  async function onSubmit(data: z.infer<typeof FormSchema>) {
    try {
      if (data.pin === "") {
        setError("Please enter a valid one-time password.");
        return;
      }

     

      const res = await verifyOTP(data.pin, user?.id!);

      if (res.error) {
        setError(res.error);
        return;
      }

      toast({
        title: res.success,
        description: "Please login to continue"
      });

      router.push("/sign-in");

      console.log(data);
    } catch (error) {
      setError("Something went wrong! Please try again!");
      console.log(error);
    }
  }

  return (
    <div className="w-full h-screen flex items-center justify-center">
      <div className="flex flex-col gap-7 items-center bg-foreground py-5 px-4 sm:px-8 rounded-lg w-[400px] mx-10">
        <div className="flex flex-col items-center gap-2">
          <div className="flex items-center gap-2">
            <Image src="/assets/logo.svg" alt="logo" width={50} height={50} />
            <h1 className="font-black text-3xl">Hi</h1>
          </div>
          <span className="font-semibold text-lg">Verfy your Account.</span>
          <span className="font-normal text-sm">{user?.email}</span>
        </div>

        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="w-2/3 space-y-6"
          >
            <FormField
              control={form.control}
              name="pin"
              render={({ field }) => (
                <FormItem className="flex flex-col items-center justify-center">
                  <FormLabel>One-Time Password</FormLabel>
                  <FormControl>
                    <InputOTP maxLength={4} {...field}>
                      <InputOTPGroup className="gap-2">
                        <InputOTPSlot index={0} className="rounded-full" />
                        <InputOTPSlot index={1} className="rounded-full" />
                        <InputOTPSlot index={2} className="rounded-full" />
                        <InputOTPSlot index={3} className="rounded-full" />
                      </InputOTPGroup>
                    </InputOTP>
                  </FormControl>
                  <FormDescription>
                    Did't receive the code?
                    <Button variant="link" className="text-blue-600">
                      Resend
                    </Button>
                  </FormDescription>
                  <FormMessage className="text-sm text-red-500 text-center" />
                  <span className="text-sm text-red-500 text-center">
                    {error}
                  </span>
                </FormItem>
              )}
            />

            <Button type="submit" className="w-full rounded-full" disabled={form.formState.isSubmitting}>
              Submit
              {
                form.formState.isSubmitting && (
                  <MoonLoader color={"#000"} loading={form.formState.isSubmitting} size={15} />
                )
              }
            </Button>
          </form>
        </Form>
      </div>
    </div>
  );
};

export default VerifyPage;
