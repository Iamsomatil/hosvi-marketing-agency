"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";

export default function SuccessPage() {
  const params = useSearchParams();
  const sessionId = params.get("session_id");

  return (
    <div className="min-h-[60vh] flex items-center justify-center px-4">
      <div className="max-w-lg w-full text-center">
        <h1 className="text-2xl font-bold mb-3">Payment successful</h1>
        <p className="text-slate-600 mb-6">
          Thank you! Your subscription is being activated. You can close this
          page or return to your dashboard.
        </p>
        {sessionId && (
          <p className="text-xs text-slate-500 mb-6">Session: {sessionId}</p>
        )}
        <div className="flex justify-center gap-3">
          <Link
            href="/dashboard"
            className="px-4 py-2 bg-indigo-600 text-white rounded"
          >
            Go to Dashboard
          </Link>
          <Link href="/" className="px-4 py-2 border rounded">
            Home
          </Link>
        </div>
      </div>
    </div>
  );
}
