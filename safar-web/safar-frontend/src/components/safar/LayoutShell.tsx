"use client";

import { usePathname } from "next/navigation";
import { Header } from "./Header";
import { BottomTabBar } from "./BottomTabBar";

const AUTH_PREFIXES = ["/login", "/signup", "/forgot", "/reset"];

export function LayoutShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isAuth = AUTH_PREFIXES.some((p) => pathname.startsWith(p));

  if (isAuth) {
    return <>{children}</>;
  }

  return (
    <>
      <Header />
      <main className="flex-1 pb-20 md:pb-0">{children}</main>
      <BottomTabBar />
    </>
  );
}
