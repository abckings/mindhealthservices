"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Home, AlertCircle } from "lucide-react";

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] text-center px-4 py-16 bg-brand-cream/30">
      <div className="bg-brand-teal/5 p-4 rounded-full mb-6">
        <AlertCircle className="w-16 h-16 text-brand-teal" />
      </div>
      <h1 className="text-6xl font-bold text-brand-teal mb-4">404</h1>
      <h2 className="text-2xl font-semibold text-brand-teal mb-6">Page Not Found</h2>
      <p className="text-gray-600 mb-8 max-w-md text-lg">
        We couldn&apos;t find the page you&apos;re looking for. It might have been moved or doesn&apos;t exist.
      </p>
      <Button asChild className="bg-brand-teal hover:bg-brand-sage text-white px-8 py-6 text-lg rounded-full shadow-lg hover:shadow-xl transition-all">
        <Link href="/">
          <Home className="mr-2 h-5 w-5" />
          Back to Home
        </Link>
      </Button>
    </div>
  );
}
