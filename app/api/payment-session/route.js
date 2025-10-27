import Stripe from "stripe";
import { getServerSession } from "next-auth";
import { cookies } from "next/headers";
import { authOptions } from "../auth/[...nextauth]/route";
import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import { connectDB } from "@/lib/mongodb";
import paymentSchema from "@/models/PaymentSchema";

const stripe = new Stripe(process.env.STRIPE_PAY_SECRET_KEY);

export async function GET(req) {
  const cookiess = cookies();
  const token = cookiess.get("authToken");

  if (!cookiess) {
    return NextResponse.json({ success: false, error: "Missing cookies" });
  }

  let sessionAuth;
  if (token) {
    try {
      const decoded = jwt.verify(token.value, process.env.JWT_SECRET);
      sessionAuth = decoded;
    } catch (err) {
      return NextResponse.json({ success: false, error: "Invalid token" });
    }
  } else {
    sessionAuth = await getServerSession(authOptions);
  }

  const userNamee =
    sessionAuth?.user?.userName || sessionAuth?.user?.name || "UnknownUser";

  try {
    await connectDB();
  } catch {
    return NextResponse.json({ success: false, error: "Failed to connect DB" });
  }

  try {
    const { searchParams } = new URL(req.url);
    const session_id = searchParams.get("session_id");
    const ttuserName = searchParams.get("tuserName");
    const commentss = searchParams.get("comments");

    if (!session_id) {
      return NextResponse.json({ success: false, error: "No session_id provided" });
    }

    const session = await stripe.checkout.sessions.retrieve(session_id);

    if (!session) {
      return NextResponse.json({ success: false, error: "Session not found" });
    }

    await paymentSchema.create({
      fuserName: userNamee,
      tuserName: ttuserName,
      amount: session.amount_total / 100,
      sessionId: session.id,
      currency: session.currency.toUpperCase(),
      comments: commentss,
    });

    return NextResponse.json({ success: true, session });
  } catch (err) {
    console.error("Stripe or DB error:", err);
    return NextResponse.json({ success: false, error: err.message });
  }
}
