import DashboardNav from "@/components/dashboard-nav";
import { ReactNode } from "react";
export default function DashboardLayout({ children }: { children: ReactNode }) {
  return (
    <div className="h-screen pt-20">
      <DashboardNav />
      {children}
    </div>
  );
}
