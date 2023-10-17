"use client";
import { UserButton } from "@clerk/nextjs";
import Link from "next/link";

export default function DashboardNav() {
  return (
    <div className="fixed top-0 w-full border-b border-gray-200">
      <nav className="h-14 px-4 w-full flex items-center justify-between mx-auto max-w-screen-xl">
        <Link href="/">
          <span>Logo</span>
        </Link>
        <UserButton />
      </nav>
    </div>
  );
}
