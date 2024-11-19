"use client";
import Image from "next/image";
import React, { useEffect, useRef, useState } from "react";
import { MoonLoader } from "react-spinners";
import { Button } from "../ui/button";
import { useForm } from "react-hook-form";
import { SetupProfileFormSchema, SetupProfileFormSchemaType } from "@/schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { imageUpload } from "@/lib/cloudinaryUpload";
type Props = {};

const SetupProfileForm = (props: Props) => {



  const [file, setFile] = useState(null);
  const [filename, setFilename] = useState("");
  const [preview, setPreview] = useState("");

  const fileRef = useRef<HTMLInputElement | null>(null);

  const handleFileChange = (event: any) => {
    if (event.target.files.length > 0) {
      setFile(event.target.files[0]);
      setFilename(event.target.files[0].name);
    }
  };

  useEffect(() => {
    if (file) {
      const objectUrl = URL.createObjectURL(file);
      setPreview(objectUrl);
      console.log(objectUrl);
    }
  }, [file]);

  const onSubmit = async (data: SetupProfileFormSchemaType) => {
    try {
        let image;
      if (file) {
        const res = await imageUpload(file);
        if(res){
            image = res.data.secure_url
            console.log(image);
        }
      }

    //   await prisma.user.update({
    //     where
    //   })


    } catch (error) {
        console.error(error);
    }

    console.log(data);
  };

  const {
    handleSubmit,
    register,
    formState: { errors, isSubmitting },
  } = useForm<SetupProfileFormSchemaType>({
    resolver: zodResolver(SetupProfileFormSchema),
  });

  return (
    <form className="w-full" onSubmit={handleSubmit(onSubmit)}>
      <div className="w-full flex flex-col items-center gap-3">
        <div
          className="flex items-center flex-col gap-2  cursor-pointer"
          onClick={() => fileRef.current?.click()}
        >
          <input
            type="file"
            ref={fileRef}
            onChange={handleFileChange}
            className="hidden"
          />
          <Image
            src={!preview ? "/assets/pp.svg" : preview}
            alt="Add a profile picture"
            width={60}
            height={60}
            className="rounded-full aspect-square object-cover border"
          />
          <span className="text-sm text-gray-500 flex gap-px">
            Edit Profile Picture
          </span>
        </div>
        <div className="w-full flex flex-col gap-1">
          <div className="w-full py-3 px-4 rounded-full text-sm bg-background flex items-center justify-between">
            <span>@</span>
            <input
              type="text"
              placeholder="username"
              className="focus:outline-none bg-transparent w-full"
              {...register("username")}
            />
          </div>
          {errors.username?.message && (
            <span className="text-sm ml-3 text-red-500">
              {errors.username.message.toString()}
            </span>
          )}
        </div>
        <div className="w-full flex flex-col gap-1">
          <div className="w-full py-3 px-4 rounded-md text-sm bg-background relative">
            <textarea
              className="focus:outline-none bg-transparent w-full resize-none h-20"
              placeholder="Bio(optional)"
              {...register("bio")}
            />
            <span className="absolute bottom-1 right-2 text-xs">max: 255</span>
          </div>
          {errors.bio?.message && (
            <span className="text-sm ml-3 text-red-500">
              {errors.bio.message.toString()}
            </span>
          )}
        </div>

        <Button type="submit" className="w-full rounded-full">
          Submit
          {isSubmitting && <MoonLoader color={"#000"} size={15} />}
        </Button>
      </div>
    </form>
  );
};

export default SetupProfileForm;
