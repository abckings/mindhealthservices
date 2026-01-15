"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X, Phone, Mail } from "lucide-react";
import Image from "next/image";
import { cn } from "@/lib/utils";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();

  const isActive = (path: string) => path === "/" ? pathname === "/" : pathname.startsWith(path);

  return (
    <nav className="bg-brand-teal text-white shadow-lg sticky top-0 z-50">
      <a
        href="#main-content"
        className="fixed left-4 top-4 z-[100] -translate-y-[150%] bg-brand-orange text-white px-6 py-3 font-bold shadow-xl transition-transform focus:translate-y-0 rounded-md focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-white"
      >
        Skip to main content
      </a>
      {/* Top Bar - Contact Info */}
      <div className="bg-brand-teal/90 border-b border-brand-sage/20 py-2 hidden md:block">
        <div className="container mx-auto px-4 flex justify-end items-center space-x-6 text-sm text-brand-mint/80 font-medium">
          <a href="tel:+916383376668" className="flex items-center hover:text-brand-sage transition rounded-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-sage">
            <Phone className="w-4 h-4 mr-2" />
            +91 63833 76668
          </a>
          <a href="mailto:info@mindhealthservices.org" className="flex items-center hover:text-brand-sage transition rounded-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-sage">
            <Mail className="w-4 h-4 mr-2" />
            info@mindhealthservices.org
          </a>
        </div>
      </div>

      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center py-4">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2 rounded-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-sage">
            <div className="relative w-12 h-12 bg-white rounded-full p-1">
              <Image src="/images/logo.png" alt="Raj Mind Health Services" fill className="object-contain p-1" />
            </div>
            <div className="leading-tight">
              <span className="block text-xl font-bold tracking-wide">RAJ MIND HEALTH</span>
              <span className="block text-xs text-brand-sage font-medium tracking-widest">SERVICES</span>
            </div>
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex space-x-8 font-medium items-center">
            {[
              { path: "/", label: "Home" },
              { path: "/whoweare", label: "About Us" },
              { path: "/services", label: "Services" },
              { path: "/gallery", label: "Gallery" },
            ].map((link) => (
              <Link
                key={link.path}
                href={link.path}
                className={cn(
                  "transition rounded-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-sage",
                  isActive(link.path) ? "text-brand-orange font-bold" : "hover:text-brand-sage"
                )}
                aria-current={isActive(link.path) ? "page" : undefined}
              >
                {link.label}
              </Link>
            ))}

            <Link
              href="/dashboard"
              className={cn(
                "transition rounded-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-sage",
                isActive("/dashboard") ? "text-brand-orange font-bold" : "text-brand-orange hover:text-white"
              )}
              aria-current={isActive("/dashboard") ? "page" : undefined}
            >
              Dashboard
            </Link>

            <Link
              href="/contactus"
              className={cn(
                "px-5 py-2 rounded-full transition shadow-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white",
                isActive("/contactus")
                  ? "bg-brand-orange text-white"
                  : "bg-brand-sage text-white hover:bg-brand-orange"
              )}
              aria-current={isActive("/contactus") ? "page" : undefined}
            >
              Contact Us
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden text-brand-mint focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-sage rounded-sm"
            onClick={() => setIsOpen(!isOpen)}
            aria-label="Toggle mobile menu"
            aria-expanded={isOpen}
          >
            {isOpen ? <X className="w-8 h-8" /> : <Menu className="w-8 h-8" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-brand-teal/95 border-t border-brand-sage/20">
          <div className="flex flex-col space-y-4 p-6 text-center text-lg font-medium">
             {[
              { path: "/", label: "Home" },
              { path: "/whoweare", label: "About Us" },
              { path: "/services", label: "Services" },
              { path: "/gallery", label: "Gallery" },
              { path: "/dashboard", label: "Dashboard" },
              { path: "/contactus", label: "Contact Us" },
            ].map((link) => (
              <Link
                key={link.path}
                href={link.path}
                onClick={() => setIsOpen(false)}
                className={cn(
                  "transition",
                  isActive(link.path) ? "text-brand-orange font-bold" : "hover:text-brand-sage"
                )}
                aria-current={isActive(link.path) ? "page" : undefined}
              >
                {link.label}
              </Link>
            ))}
            <div className="pt-4 flex flex-col items-center space-y-3 text-base text-brand-mint/70">
              <a href="tel:+916383376668" className="flex items-center"><Phone className="w-4 h-4 mr-2" /> +91 63833 76668</a>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
