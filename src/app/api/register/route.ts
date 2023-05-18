import bcrypt from "bcrypt"
import { NextResponse } from "next/server"
import prisma from "@/lib/prismadb"

export async function POST(request: Request) {
    const {name,email,password} = await request.json()

    if(!name || !email || !password) {
        return new Response("Invaild details",{
            status: 400
        })
    }

    console.log(name,email,password)

    const hashedPassword = await bcrypt.hash(password,12)

    const user = await prisma?.user.create({
       data: {name,email,hashedPassword}
    })

    console.log(user)

    return  NextResponse.json(user)
}