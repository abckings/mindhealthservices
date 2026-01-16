"use client";

import { useState } from "react";
import Link from "next/link";
import { Menu, X, Phone, Mail } from "lucide-react";
import Image from "next/image";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

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
            <Link href="/" className="hover:text-brand-sage transition rounded-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-sage">Home</Link>
            <Link href="/whoweare" className="hover:text-brand-sage transition rounded-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-sage">About Us</Link>
            <Link href="/services" className="hover:text-brand-sage transition rounded-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-sage">Services</Link>
            <Link href="/gallery" className="hover:text-brand-sage transition rounded-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-sage">Gallery</Link>
            <Link href="/dashboard" className="text-brand-orange font-bold hover:text-white transition rounded-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-sage">Dashboard</Link>
            <Link href="/contactus" className="bg-brand-sage text-white px-5 py-2 rounded-full hover:bg-brand-orange transition shadow-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white">
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
            <Link href="/" onClick={() => setIsOpen(false)} className="hover:text-brand-sage transition rounded-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-sage">Home</Link>
            <Link href="/whoweare" onClick={() => setIsOpen(false)} className="hover:text-brand-sage transition rounded-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-sage">About Us</Link>
            <Link href="/services" onClick={() => setIsOpen(false)} className="hover:text-brand-sage transition rounded-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-sage">Services</Link>
            <Link href="/gallery" onClick={() => setIsOpen(false)} className="hover:text-brand-sage transition rounded-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-sage">Gallery</Link>
            <Link href="/dashboard" onClick={() => setIsOpen(false)} className="hover:text-brand-sage transition font-semibold rounded-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-sage">Dashboard</Link>
            <Link href="/contactus" onClick={() => setIsOpen(false)} className="text-brand-sage font-bold rounded-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-sage">Contact Us</Link>
            <div className="pt-4 flex flex-col items-center space-y-3 text-base text-brand-mint/70">
              <a href="tel:+916383376668" className="flex items-center rounded-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-sage"><Phone className="w-4 h-4 mr-2" /> +91 63833 76668</a>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
