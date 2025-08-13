import { NextResponse } from "next/server";
import bcrypt from "bcryptjs"
import { PrismaClient } from "@prisma/client";// adjust path if needed

const prisma = new PrismaClient;
export async function POST(req: Request) {
  try {
    const { username, number, password } = await req.json();

    // Validate input
    if (!username || !number || !password) {
      return NextResponse.json(
        { message: "All fields are required" },
        { status: 400 }
      );
    }

    if (String(number).length !== 10) {
      return NextResponse.json(
        { message: "Number must be 10 digits" },
        { status: 400 }
      );
    }

    // Check if user already exists
    const existingUser = await prisma.user.findUnique({
      where: { number: String(number) },
    });

    if (existingUser) {
      return NextResponse.json(
        { message: "User already exists" },
        { status: 400 }
      );
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create user
    const newUser = await prisma.user.create({
      data: {
        username,
        number: String(number),
        password: hashedPassword,
      },
    });

    return NextResponse.json(
      { message: "Signed up successfully", user: newUser },
      { status: 200 }
    );
  } catch (error) {
    console.error("Signup error:", error);
    return NextResponse.json(
      { message: "Server error" },
      { status: 500 }
    );
  }
}
