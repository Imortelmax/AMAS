import { auth } from "@/auth";
import { redirect } from "next/navigation";
import AdminSidebar from "./sidebar";

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await auth();

  if (!session) {
    redirect("/login");
  }

  return (
    <div className="flex min-h-screen bg-zinc-50">
      <AdminSidebar />
      <main className="flex-1 p-8 pt-12">
        <div className="max-w-6xl mx-auto">
          {children}
        </div>
      </main>
    </div>
  );
}