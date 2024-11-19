import { NextRequest, NextResponse } from "next/server";
import { AUTH_ROUTES, PUBLIC_ROUTES } from "./routes";
import { getUserById } from "./data/user";
import NextAuth from "next-auth";
import { authConfig } from "./auth.config";

const {auth} = NextAuth(authConfig)


export async function middleware(request: NextRequest){
    const session = await auth()


    if(session?.user){
        if(AUTH_ROUTES.includes(request.nextUrl.pathname) || PUBLIC_ROUTES.includes(request.nextUrl.pathname)){
            return NextResponse.redirect(new URL("/", request.nextUrl.origin))
        }

        return
    }
    else{

        if(AUTH_ROUTES.includes(request.nextUrl.pathname) || PUBLIC_ROUTES.includes(request.nextUrl.pathname)){
            return 
        }
        
        return NextResponse.redirect(new URL("/sign-in", request.nextUrl.origin))
        
    }
    
    

    // return NextResponse.redirect(new URL("/test", request.url))
}

export const config = {
    matcher: [
        // Skip Next.js internals and all static files, unless found in search params
      '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
      // Always run for API routes
      '/(api|trpc)(.*)',
      ],
}
