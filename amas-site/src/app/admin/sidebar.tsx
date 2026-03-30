"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { 
  LayoutDashboard, 
  Calendar, 
  Users, 
  FileText, 
  LogOut,
  UserCircle 
} from "lucide-react";
import { signOut } from "next-auth/react";

const menuItems = [
  { name: "Dashboard", href: "/admin/dashboard", icon: LayoutDashboard },
  { name: "Agenda", href: "/admin/agenda", icon: Calendar },
  { name: "Membres du Club", href: "/admin/membres", icon: Users },
  { name: "Articles", href: "/admin/articles", icon: FileText },
  { name: "Bureau", href: "/admin/bureau-manage", icon: UserCircle },
];

export default function AdminSidebar() {
  const pathname = usePathname();

  return (
    <aside className="w-72 bg-amas-orange text-black p-6 flex flex-col h-screen sticky top-0">
      <div className="mb-12 px-4">
        <h2 className="text-2xl font-black italic tracking-tighter">
          AMAS <span className="">ADMIN</span>
        </h2>
      </div>

      <nav className="flex-1 space-y-2">
        {menuItems.map((item) => {
          const isActive = pathname === item.href;
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center gap-4 px-4 py-4 rounded-2xl font-bold transition-all ${
                isActive 
                  ? "bg-navbar-bg text-white" 
                  : "hover:bg-zinc-900 hover:text-white"
              }`}
            >
              <item.icon size={22} />
              {item.name}
            </Link>
          );
        })}
      </nav>

      <button
        onClick={() => signOut({ callbackUrl: "/" })}
        className="flex items-center gap-4 px-4 py-4 rounded-2xl font-bold text-red-500 hover:bg-red-500/10 transition-all mt-auto"
      >
        <LogOut size={22} />
        Déconnexion
      </button>
    </aside>
  );
}