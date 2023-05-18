import brcypt from "bcrypt"
import NextAuth from "next-auth/next"
import { AuthOptions } from "next-auth"
import CredentialsProvider  from "next-auth/providers/credentials"
import GoogleProvider from "next-auth/providers/google"
import GithubProvider from "next-auth/providers/github"
import { PrismaAdapter } from "@next-auth/prisma-adapter"
import prisma from "@/lib/prismadb"


const authOptions: AuthOptions = {
    adapter: PrismaAdapter(prisma),
    providers: [
        GoogleProvider({
          clientId: process.env.GOOGLE_CLIENT_ID as string,
          clientSecret: process.env.GOOGLE_SECRET as string
        }),
        GithubProvider({
          clientId: process.env.GITHUB_CLIENT_ID as string,
          clientSecret: process.env.GITHUB_SECRET as string
        }),
        CredentialsProvider({
            name: "credentials",
            credentials: {
                 email: {label: "email", type: "email"},
                 password: {label: "password", type: "password"}
            },
           async authorize(credentials){
                
              if(!credentials?.email || !credentials?.password) {
                throw new Error("Invalid Credentials") 
              }

              const user = await prisma?.user.findUnique({
                where: {email: credentials.email}
              })
              console.log(user)

                if(!user){
                  throw new Error("Invalid User")
            }

            const isCorrectPassword = await brcypt.compare(credentials.password,user.hashedPassword!)

            if(!isCorrectPassword){
                throw new Error("Invalid Password")
            }

            return user
        }})
    ],
    pages: {
      signIn: "/",
    }
    ,
    debug: process.env.NODE_ENV === "development",
    session: {
        strategy: "jwt"
    },
    secret: process.env.NEXTAUTH_SECRET,
    
}

const handler = NextAuth(authOptions)

export {handler as GET, handler as POST}