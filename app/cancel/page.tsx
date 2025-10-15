import Link from "next/link";

export default function CancelPage() {
  return (
    <div className="min-h-[60vh] flex items-center justify-center px-4">
      <div className="max-w-lg w-full text-center">
        <h1 className="text-2xl font-bold mb-3">Checkout canceled</h1>
        <p className="text-slate-600 mb-6">
          No charges were made. You can try again or contact support if you need
          help.
        </p>
        <div className="flex justify-center gap-3">
          <Link
            href="/#pricing"
            className="px-4 py-2 bg-indigo-600 text-white rounded"
          >
            Return to Pricing
          </Link>
          <Link href="/" className="px-4 py-2 border rounded">
            Home
          </Link>
        </div>
      </div>
    </div>
  );
}
