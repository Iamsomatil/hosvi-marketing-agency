import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { authOptions } from "@/lib/auth";
import AdminClient from "@/components/AdminClient";

export default async function AdminPage() {
  console.log('Rendering AdminPage...');
  const session = await getServerSession(authOptions);
  
  // Debug session info
  console.log('Admin page session:', {
    hasSession: !!session,
    userId: session?.user?.id,
    userRole: session?.user?.role,
    isAdmin: session?.user?.role === 'ADMIN'
  });

  if (!session) {
    console.log('No session, redirecting to admin login');
    return redirect("/admin/login?callbackUrl=/admin");
  }

  if (session.user?.role !== 'ADMIN') {
    console.log(`User with role '${session.user?.role}' is not an admin, redirecting to dashboard`);
    return redirect("/dashboard");
  }

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-900">
      <AdminClient />
    </div>
  );
}