"use client";

import LayoutPage from "@/components/layout/page";
import { usePathname } from "next/navigation";
import React, { ReactNode } from "react";

interface LandingPageProps {
  children: ReactNode;
}

const LandingPage = ({ children }: LandingPageProps) => {
  const pathname = usePathname();
    const isHide = pathname === "/login" || pathname === "/register";
  return (
    <div>
        {isHide ? (
            <>{children}</>
        ) : (
            <>{children}</>
        )}
    </div>
  );
};

export default LandingPage;
