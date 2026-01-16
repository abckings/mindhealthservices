import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Frown } from "lucide-react";

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[70vh] px-4 text-center">
      <div className="bg-brand-mint/30 p-8 rounded-full mb-6">
        <Frown className="w-24 h-24 text-brand-teal" />
      </div>
      <h1 className="text-4xl font-bold text-brand-teal mb-4">Page Not Found</h1>
      <p className="text-xl text-gray-600 mb-8 max-w-md">
        Sorry, we couldn&apos;t find the page you&apos;re looking for. It might have been moved or deleted.
      </p>
      <Button asChild className="bg-brand-teal hover:bg-brand-sage text-white text-lg px-8 py-6 rounded-full shadow-lg transition-transform hover:scale-105">
        <Link href="/">
          Return Home
        </Link>
      </Button>
    </div>
  );
}
