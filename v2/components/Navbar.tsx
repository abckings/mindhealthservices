"use client";

import { useState } from "react";
import Link from "next/link";
import { Menu, X, Phone, Mail } from "lucide-react";
import Image from "next/image";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="bg-neutral-900 text-white shadow-lg sticky top-0 z-50">
      {/* Top Bar - Contact Info */}
      <div className="bg-neutral-950 border-b border-neutral-800 py-2 hidden md:block">
        <div className="container mx-auto px-4 flex justify-end items-center space-x-6 text-sm text-neutral-400 font-medium">
          <a href="tel:+916383376668" className="flex items-center hover:text-white transition">
            <Phone className="w-4 h-4 mr-2" />
            +91 63833 76668
          </a>
          <a href="mailto:info@mindhealthservices.org" className="flex items-center hover:text-white transition">
            <Mail className="w-4 h-4 mr-2" />
            info@mindhealthservices.org
          </a>
        </div>
      </div>

      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center py-4">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2">
            <div className="relative w-12 h-12 bg-white rounded-full p-1">
              <Image src="/images/logo.png" alt="Raj Mind Health Services" fill className="object-contain p-1" />
            </div>
            <div className="leading-tight">
              <span className="block text-xl font-bold tracking-wide">RAJ MIND HEALTH</span>
              <span className="block text-xs text-neutral-400 font-medium tracking-widest">SERVICES</span>
            </div>
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex space-x-8 font-medium items-center">
            <Link href="/" className="hover:text-neutral-300 transition">Home</Link>
            <Link href="/whoweare" className="hover:text-neutral-300 transition">About Us</Link>
            <Link href="/services" className="hover:text-neutral-300 transition">Services</Link>
            <Link href="/gallery" className="hover:text-neutral-300 transition">Gallery</Link>
            <Link href="/dashboard" className="text-white font-bold hover:text-neutral-300 transition">Dashboard</Link>
            <Link href="/contactus" className="bg-white text-neutral-900 px-5 py-2 rounded-full hover:bg-neutral-200 transition shadow-md">
              Contact Us
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden focus:outline-none text-white"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? <X className="w-8 h-8" /> : <Menu className="w-8 h-8" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-neutral-900 border-t border-neutral-800">
          <div className="flex flex-col space-y-4 p-6 text-center text-lg font-medium">
            <Link href="/" onClick={() => setIsOpen(false)} className="hover:text-neutral-300 transition">Home</Link>
            <Link href="/whoweare" onClick={() => setIsOpen(false)} className="hover:text-neutral-300 transition">About Us</Link>
            <Link href="/services" onClick={() => setIsOpen(false)} className="hover:text-neutral-300 transition">Services</Link>
            <Link href="/gallery" onClick={() => setIsOpen(false)} className="hover:text-neutral-300 transition">Gallery</Link>
            <Link href="/dashboard" onClick={() => setIsOpen(false)} className="hover:text-neutral-300 transition font-semibold">Dashboard</Link>
            <Link href="/contactus" onClick={() => setIsOpen(false)} className="text-white font-bold">Contact Us</Link>
            <div className="pt-4 flex flex-col items-center space-y-3 text-base text-neutral-400">
              <a href="tel:+916383376668" className="flex items-center"><Phone className="w-4 h-4 mr-2" /> +91 63833 76668</a>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
