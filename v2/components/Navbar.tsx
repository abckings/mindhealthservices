"use client";

import { useState } from "react";
import Link from "next/link";
import { Menu, X, Phone, Mail, ChevronDown } from "lucide-react";
import Image from "next/image";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isServicesOpen, setIsServicesOpen] = useState(false);
  const [isAboutOpen, setIsAboutOpen] = useState(false);

  return (
    <nav className="bg-brand-teal text-white shadow-lg sticky top-0 z-50">
      {/* Top Bar - Contact Info */}
      <div className="bg-brand-teal/90 border-b border-brand-sage/20 py-2 hidden md:block">
        <div className="container mx-auto px-4 flex justify-end items-center space-x-6 text-sm text-brand-mint/80 font-medium">
          <a href="tel:+916383376668" className="flex items-center hover:text-brand-sage transition">
            <Phone className="w-4 h-4 mr-2" />
            +91 63833 76668
          </a>
          <a href="mailto:info@mindhealthservices.org" className="flex items-center hover:text-brand-sage transition">
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
              <span className="block text-xs text-brand-sage font-medium tracking-widest">SERVICES</span>
            </div>
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex space-x-8 font-medium items-center">
            <Link href="/" className="hover:text-brand-sage transition">Home</Link>

            {/* About Us Dropdown */}
            <div className="relative group">
              <Link href="/whoweare" className="hover:text-brand-sage transition flex items-center">
                About Us <ChevronDown className="w-4 h-4 ml-1" />
              </Link>
              <div className="absolute left-0 top-full pt-2 w-56 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 transform translate-y-2 group-hover:translate-y-0 z-50">
                <div className="bg-white rounded-xl shadow-xl border border-brand-sage/10 overflow-hidden py-2 text-sm text-gray-700">
                  <Link href="/whoweare" className="block px-4 py-2 hover:bg-brand-mint/30 hover:text-brand-teal transition">Who We Are</Link>
                  <Link href="/boardoftrustees" className="block px-4 py-2 hover:bg-brand-mint/30 hover:text-brand-teal transition">Board of Trustees</Link>
                  <Link href="/boardofadvisors" className="block px-4 py-2 hover:bg-brand-mint/30 hover:text-brand-teal transition">Advisory Board</Link>
                  <Link href="/technicalteam" className="block px-4 py-2 hover:bg-brand-mint/30 hover:text-brand-teal transition">Technical Support Team</Link>
                </div>
              </div>
            </div>

            <Link href="/services" className="hover:text-brand-sage transition">Services</Link>
            <Link href="/gallery" className="hover:text-brand-sage transition">Gallery</Link>
            <Link href="/contactus" className="bg-brand-sage text-white px-5 py-2 rounded-full hover:bg-brand-orange transition shadow-md">
              Contact Us
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden focus:outline-none text-brand-mint"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? <X className="w-8 h-8" /> : <Menu className="w-8 h-8" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-brand-teal/95 border-t border-brand-sage/20">
          <div className="flex flex-col space-y-4 p-6 text-center text-lg font-medium">
            <Link href="/" onClick={() => setIsOpen(false)} className="hover:text-brand-sage transition">Home</Link>

            <div className="flex flex-col items-center">
               <button onClick={() => setIsAboutOpen(!isAboutOpen)} className="flex items-center hover:text-brand-sage transition">
                  About Us <ChevronDown className={`w-4 h-4 ml-1 transition-transform ${isAboutOpen ? "rotate-180" : ""}`} />
               </button>
               {isAboutOpen && (
                 <div className="flex flex-col space-y-2 mt-2 text-base text-brand-mint/80 bg-brand-teal/50 w-full rounded-lg py-2">
                    <Link href="/whoweare" onClick={() => setIsOpen(false)} className="hover:text-white transition">Who We Are</Link>
                    <Link href="/boardoftrustees" onClick={() => setIsOpen(false)} className="hover:text-white transition">Board of Trustees</Link>
                    <Link href="/boardofadvisors" onClick={() => setIsOpen(false)} className="hover:text-white transition">Advisory Board</Link>
                    <Link href="/technicalteam" onClick={() => setIsOpen(false)} className="hover:text-white transition">Technical Support Team</Link>
                 </div>
               )}
            </div>

            <Link href="/services" onClick={() => setIsOpen(false)} className="hover:text-brand-sage transition">Services</Link>
             <Link href="/gallery" onClick={() => setIsOpen(false)} className="hover:text-brand-sage transition">Gallery</Link>
            <Link href="/contactus" onClick={() => setIsOpen(false)} className="text-brand-sage font-bold">Contact Us</Link>
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
