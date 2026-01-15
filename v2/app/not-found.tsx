import Link from "next/link";
import { Frown } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[70vh] px-4 text-center">
      <div className="bg-brand-mint/20 p-8 rounded-full mb-6">
        <Frown className="w-24 h-24 text-brand-teal" />
      </div>
      <h1 className="text-4xl md:text-6xl font-bold text-brand-teal mb-4">404</h1>
      <h2 className="text-2xl font-semibold text-brand-sage mb-6">Page Not Found</h2>
      <p className="text-gray-600 max-w-md mb-8">
        Oops! The page you are looking for doesn&apos;t exist or has been moved.
        Let&apos;s get you back on track.
      </p>
      <Button asChild size="lg" className="bg-brand-sage hover:bg-brand-orange text-white rounded-full">
        <Link href="/">
          Return Home
        </Link>
      </Button>
    </div>
  );
}
