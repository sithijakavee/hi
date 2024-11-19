import Credentials from "next-auth/providers/credentials";
import { SignInFormSchema } from "./schemas";
import { getUserByEmail } from "./data/user";
import bcrypt from "bcryptjs"


export const authConfig = {
    providers: [
        Credentials({
          async authorize(credentials){
              const validatedFields = SignInFormSchema.safeParse(credentials)
    
              if(validatedFields.success){
                  const {email, password} = validatedFields.data
    
                  const res = await getUserByEmail(email)
                  if(!res.user || !res.user.password) return null
    
                  const passwordMatched = await bcrypt.compare(password, res.user.password)
    
                  if(passwordMatched) return res.user
    
              }
    
              return null
          }
      }),
      ],
};
