"use client";
import { useEffect, useState } from "react";

export default function Page() {
  const [session, setSession] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const sessionId = params.get("session_id");
    const tuserName  = params.get("tuserName")
    const comments = params.get("comments")
    console.log(comments , "comments from fornt jend ")
    console.log(tuserName )
    if (!sessionId) {
      setError("No session_id found in URL");
      setLoading(false);
      return;
    }

    // Call your backend API to fetch Stripe session
    fetch(`/api/payment-session?session_id=${sessionId}&tuserName=${encodeURIComponent(tuserName)}&comments=${encodeURI(comments)}`)
      .then((res) => res.json())
      .then((data) => {
        setSession(data.session);
        setLoading(false); 
      })
      .catch((err) => {
        console.error(err);
        setError("Failed to fetch payment session");
        setLoading(false);
      });
  }, []);

  if (loading) return <div className="flex justify-center items-center w-screen h-[90vh] overflow-hidden bg-black/30">
          <div className="w-[250px] h-[250px] rounded-full border-8 border-t-transparent border-blue-500 animate-spin"></div>
        </div>;
  if (error) return <div className="p-5 text-center text-red-500">{error}</div>;

  return (
    <div className="max-w-md mx-auto mt-10 p-5 border rounded-lg shadow-lg text-center bg-white">
      <h1 className="text-2xl font-bold mb-4 text-green-600">Payment Successful!</h1>
      <p className="mb-2 text-black">Thank you</p>
      <p className="mb-2 text-black">Email: {session.customer_details?.email}</p>
      <p className="mb-2 text-black">Amount Paid: {(session.amount_total / 100)} {session.currency.toUpperCase()}</p>
      <p className="text-sm text-gray-500 mt-4">Session ID: {session.id}</p>
    </div>
  );
}
