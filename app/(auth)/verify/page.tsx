


import VerifyForm from "@/components/auth/VerifyForm";
import Image from "next/image";

const VerifyPage = () => {


  return (
    <div className="w-full h-screen flex items-center justify-center">
      <div className="flex flex-col gap-7 items-center bg-foreground py-5 px-4 sm:px-8 rounded-lg w-[400px] mx-10">
        <div className="flex flex-col items-center gap-2">
          <div className="flex items-center gap-2">
            <Image src="/assets/logo.svg" alt="logo" width={50} height={50} />
            <h1 className="font-black text-3xl">Hi</h1>
          </div>
          <span className="font-semibold text-lg">Verfy your Account.</span>
        </div>

        <VerifyForm />
      </div>
    </div>
  );
};

export default VerifyPage;
