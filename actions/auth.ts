"use server";

import { signIn } from "@/auth";
import { getUserByEmail } from "@/data/user";
import { prisma } from "@/lib/db";
import { sendEmail } from "@/lib/mail";
import { generateOTP } from "@/lib/utils";
import { SignInFormSchema, SignInFormSchemaType, SignUpFormSchema, SignUpFormSchemaType } from "@/schemas";
import bcrypt from "bcryptjs";
import { AuthError } from "next-auth";

export const signUpWithCredentials = async (data: SignUpFormSchemaType) => {
  const isValid = SignUpFormSchema.parse(data);

  if (isValid) {
    const existingUser = await prisma.user.findFirst({
      where: {
        email: data.email,
      },
    });

    if (existingUser) {
      return { error: "Email already exists!" };
    }

    const hashedPassword = await bcrypt.hash(data.password, 10);

    try {
      const newUser = await prisma.user.create({
        data: {
          email: data.email,
          password: hashedPassword,
        },
      });

      if (newUser) {
        const otp = generateOTP();

        console.log(otp);

        await prisma.oTP.create({
          data: {
            userid: newUser.id,
            otp: otp,
            expires: new Date(Date.now() + 600000 * 3), // 30 minutes expiry time
          },
        });

        // Send OTP to User's Email
        sendEmail(newUser?.email!, "Verify your email", otp);

        return { success: "An OTP Sent to your Email.", user: newUser };
      }
    } catch (error) {
      console.log("Error In SignIn Action: ", error);
      return { error: "An error occurred while signing in!" };
    }
  }
};


export const signInWithCredentials = async (data: SignInFormSchemaType) => {
  const validatedFields = SignInFormSchema.safeParse(data);

  if (!validatedFields.success) {
    return { error: "Invalid fields" };
  }

  const { email, password } = validatedFields.data;

  const res = await getUserByEmail(email);

  if (!res.user || !res.user.email || !res.user.password) {
    return { error: "Invalid credentials" };
  }

  const isPasswordMatched = await bcrypt.compare( password, res.user.password)
  if(!isPasswordMatched) return { error: "Invalid credentials" };

  try {

    let redirectUrl = `/setup-profile`

    if(res.user.username){
      redirectUrl = `/`
    }
    await signIn("credentials", {
      email,
      password,
      redirectTo: redirectUrl,
    });
  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case "CredentialsSignin":
          return { error: "Invalid email or password" };
        default:
          return { error: "Something went wrong" };
      }
    }

    throw error
  }


}

export const verifyOTP = async (otp: string, id: string) => {
  try {
    if (otp === "") return { error: "Please enter a valid OTP" };

    // if ((!isNaN(parseInt(otp)) && parseInt(otp).toString() === otp))
    //   return { error: "OTP only contains numbers. Please check your email" };

    const user = await prisma.user.findUnique({
      where: {
        id: id,
      },
    });

    if (!user) return { error: "User not found" };

    const otpRecord = await prisma.oTP.findUnique({
      where: {
        userid: user.id,
      },
    });

    if (!otpRecord || otpRecord.otp !== otp) return { error: "Invalid OTP" };
    if (otpRecord.expires < new Date()) return { error: "OTP expired" };

    await prisma.user.update({
      where: {
        id: user.id,
      },
      data: {
        emailVerified: true,
      },
    });

    await prisma.oTP.delete({
      where: {
        userid: user.id,
      },
    });

    return { success: "Email verified successfully!" };
  } catch (error) {
    console.log("Error In Verify OTP Action: ", error);
    return { error: "An error occurred while verifying OTP!" };
  }
};
