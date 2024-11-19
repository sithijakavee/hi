import { prisma } from "./lib/db"

const BASE_URL = 'http://localhost:3000'

export const PUBLIC_ROUTES= ["/marketplace"]

export const AUTH_ROUTES= [
    "/sign-in",
    "/sign-up",
    "/verify"
]