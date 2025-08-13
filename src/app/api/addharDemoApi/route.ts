import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { addhar_Number, addhar_Name } = body;

    console.log("Received from frontend:", addhar_Number, addhar_Name);

    // Generate a random 6-digit OTP
    const otp = Math.floor(100000 + Math.random() * 900000);

    // Return OTP to frontend
    return NextResponse.json({
      success: true,
      message: "Data received successfully",
      otp: otp
    });
  } catch (error) {
    console.error("Error in API:", error);
    return NextResponse.json(
      { success: false, message: "Error processing request" },
      { status: 500 }
    ); 
  }
}
