import SignInForm from "@/components/auth/SignInForm";
import Image from "next/image";
import Link from "next/link";
import React from "react";

type Props = {};

const page = (props: Props) => {
  return (
    <div className="w-full h-screen flex items-center justify-center">
      <div className="flex flex-col gap-7 items-center bg-foreground py-5 px-4 sm:px-8 rounded-lg w-[400px] mx-10">
        <div className="flex flex-col items-center gap-2">
          <div className="flex items-center gap-2">
            <Image src="/assets/logo.svg" alt="logo" width={50} height={50} />
            <h1 className="font-black text-3xl">Hi</h1>
          </div>
          <span className="font-semibold text-lg">Welcome Back!</span>
        </div>
        <SignInForm />
        <div className="flex flex-col items-center gap-4">
          <p className="text-sm text-gray-500 text-center text-pretty">
            Don't have an account?{" "}
            <Link href="/sign-up" className="text-blue-500 underline">
              Create one
            </Link>
          </p>

          <div>
            <p className="text-xs text-gray-500 text-center text-pretty">
              By continuing, you agree to our{" "}
              <span className="text-blue-500 underline">Terms of Service</span>{" "}
              and{" "}
              <span className="text-blue-500 underline">Privacy Policy</span>.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default page;
