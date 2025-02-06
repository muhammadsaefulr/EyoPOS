"use client";

import { useState, useEffect } from "react";
import { LoadingWithLogo } from "@/components/loading";

export default function ClientLayout({ children }: { children: React.ReactNode }) {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 3000); 
    return () => clearTimeout(timer); // Cleanup timer
  }, []);

  if (isLoading) {
    return <LoadingWithLogo />; 
  }

  return <>{children}</>; 
}
