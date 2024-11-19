"use server";

import { prisma } from "@/lib/db";

export const getUserById = async (id: string) => {
  try {
    const user = await prisma.user.findUnique({
      where: {
        id: id,
      },
    });

    if (user) {
      return { success: "user found", user: user };
    }

    return { error: "user not found" };
  } catch (error) {
    console.log(error);
    return { error: "Something went wrong" };
  }
};

export const getUserByEmail = async (email: string) => {
  try {
    const user = await prisma.user.findUnique({
      where: {
        email: email,
      },
    });

    if (user) {
      return { success: "user found", user: user };
    }

    return { error: "user not found" };
  } catch (error) {
    console.log(error);
    return { error: "Something went wrong" };
  }
};




