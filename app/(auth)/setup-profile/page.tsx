import SetupProfileForm from '@/components/auth/SetupProfileForm'
import Image from 'next/image'
import React from 'react'

type Props = {}

const page = (props: Props) => {
  return (
    <div className="w-full h-screen flex items-center justify-center">
      <div className="flex flex-col gap-7 items-center bg-foreground py-5 px-4 sm:px-8 rounded-lg w-[300px] mx-10">
        <div className="flex flex-col items-center gap-2">
          <div className="flex items-center gap-2">
            <Image src="/assets/logo.svg" alt="logo" width={50} height={50} />
            <h1 className="font-black text-3xl">Hi</h1>
          </div>
          {/* <span className="font-semibold text-lg">Setup your Profile</span> */}
        </div>

        <SetupProfileForm/>
    
      </div>
    </div>
  )
}

export default page