"use server";
import { NextResponse } from "next/server";
import paymentSchema from "@/models/PaymentSchema";
import { connectDB } from "@/lib/mongodb";
import { convertSegmentPathToStaticExportFilename } from "next/dist/shared/lib/segment-cache/segment-value-encoding";
export async function GET(req) {
  const { searchParams } = new URL(req.url);
  console.log(searchParams);
  const userNamee = searchParams.get("userName");
  console.log(userNamee, "search param suerName");
  try {
    await connectDB();
    console.log("db connected");
  } catch (err) {
    return NextResponse.json({
      success: false,
      error: "Failed in connecting in Patment get in connecting db",
    });
  }
  try {
    console.log("finding started cna ber finding problem");
    const user = await paymentSchema.find({
      tuserName: userNamee,
    });
    console.log(user, "iits our schema finding");

    return NextResponse.json({ success: true, res: user });
  } catch (err) {
    ``;
    return NextResponse.json({
      success: false,
      error: "some error while entered the function get some unknown error",
    });
  }
}
