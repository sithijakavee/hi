"use client";

import { EyeIcon } from "lucide-react";
import { Button } from "../ui/button";
import SocialAuth from "./SocialAuth";
import Divider from "./Divider";
import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { SignUpFormSchema, SignUpFormSchemaType } from "@/schemas";
import { z } from "zod";
import { signInWithCredentials, signUpWithCredentials } from "@/actions/auth";
import { MoonLoader } from "react-spinners";
import { useToast } from "@/hooks/use-toast";
import { useRouter } from "next/navigation";



const SignUpForm = () => {
  const { toast } = useToast();
  const router = useRouter()

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<SignUpFormSchemaType>({
    resolver: zodResolver(SignUpFormSchema),
  });

  const onSubmit = async (data: z.infer<typeof SignUpFormSchema>) => {
    const res = await signUpWithCredentials(data);
    if (res?.error) {
      toast({
        title: res.error,
        variant: "destructive",
      });
    } else if (res?.success) {
      toast({
        title: res.success
      });

      router.push(`${window.location.origin}/verify?t=${res.user.id}`)
    }
    console.log(res);
  };

  return (
    <form className="w-full" onSubmit={handleSubmit(onSubmit)}>
      <div className="w-full flex flex-col items-center gap-3">
        <div className="w-full flex flex-col gap-1">
          <input
            type="text"
            placeholder="Email"
            className="w-full py-3 focus:outline-none px-4 rounded-full text-sm bg-background"
            {...register("email")}
          />
          {errors.email?.message && (
            <span className="text-sm ml-3 text-red-500">
              {errors.email.message.toString()}
            </span>
          )}
        </div>
        <div className="w-full flex flex-col gap-1">
          <div className="w-full py-3 px-4 rounded-full text-sm bg-background flex items-center justify-between">
            <input
              type="password"
              placeholder="Password"
              className="focus:outline-none bg-transparent w-full"
              {...register("password")}
            />
            <EyeIcon className="size-[18px] cursor-pointer text-black/40" />
          </div>
          {errors.password?.message && (
            <span className="text-sm ml-3 text-red-500">
              {errors.password.message.toString()}
            </span>
          )}
        </div>

        <div className="w-full flex flex-col gap-1">
          <div className="w-full py-3 px-4 rounded-full text-sm bg-background flex items-center justify-between">
            <input
              type="password"
              placeholder="Confirm Password"
              className="focus:outline-none bg-transparent w-full"
              {...register("confirmPassword")}
            />
            <EyeIcon className="size-[18px] cursor-pointer text-black/40" />
          </div>
          {errors.confirmPassword?.message && (
            <span className="text-sm ml-3 text-red-500">
              {errors.confirmPassword.message.toString()}
            </span>
          )}
        </div>

        <Button
          type="submit"
          className="w-full rounded-full font-semibold"
          disabled={isSubmitting}
        >
          Continue
          <MoonLoader color={"#000"} loading={isSubmitting} size={15} />
        </Button>
        <Divider />

        <SocialAuth btnText={"Continue with Google"} />
      </div>
    </form>
  );
};

export default SignUpForm;
