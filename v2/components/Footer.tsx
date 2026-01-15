import Link from "next/link";
import { Facebook, Twitter, Instagram, Mail, Phone, MapPin } from "lucide-react";
import Image from "next/image";

const Footer = () => {
  return (
    <footer className="bg-brand-teal text-white pt-16 pb-8">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-3 gap-12 mb-12">
          {/* Column 1: Brand & About */}
          <div>
            <div className="flex items-center space-x-2 mb-6">
                <div className="relative w-10 h-10 bg-white rounded-full p-1">
                     <Image src="/images/logo2.png" alt="Raj Mind Health Services" fill className="object-contain p-1" />
                </div>
                <h3 className="text-xl font-bold">RAJ MIND HEALTH SERVICES</h3>
            </div>
            <p className="text-brand-mint/80 leading-relaxed mb-6">
              In collaboration with MDA (Madras Dyslexia Association), we offer a conducive environment for children with Specific Learning Disabilities to overcome their difficulties.
            </p>
            <div className="flex space-x-4">
              <a href="#" aria-label="Visit our Facebook page" className="bg-brand-sage p-2 rounded-full hover:bg-brand-orange transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-orange"><Facebook className="w-5 h-5" /></a>
              <a href="#" aria-label="Visit our Twitter page" className="bg-brand-sage p-2 rounded-full hover:bg-brand-orange transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-orange"><Twitter className="w-5 h-5" /></a>
              <a href="#" aria-label="Visit our Instagram page" className="bg-brand-sage p-2 rounded-full hover:bg-brand-orange transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-orange"><Instagram className="w-5 h-5" /></a>
            </div>
          </div>

          {/* Column 2: Quick Links */}
          <div>
            <h4 className="text-xl font-bold mb-6 border-l-4 border-brand-sage pl-3">Quick Links</h4>
            <ul className="space-y-3 text-brand-mint/80">
              <li><Link href="/" className="hover:text-brand-sage transition rounded-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-orange">Home</Link></li>
              <li><Link href="/whoweare" className="hover:text-brand-sage transition rounded-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-orange">Who We Are</Link></li>
              <li><Link href="/whatwedo" className="hover:text-brand-sage transition rounded-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-orange">What We Do</Link></li>
              <li><Link href="/services" className="hover:text-brand-sage transition rounded-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-orange">Our Services</Link></li>
              <li><Link href="/contactus" className="hover:text-brand-sage transition rounded-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-orange">Contact Us</Link></li>
            </ul>
          </div>

          {/* Column 3: Contact Info */}
          <div>
            <h4 className="text-xl font-bold mb-6 border-l-4 border-brand-sage pl-3">Contact Us</h4>
            <ul className="space-y-4 text-brand-mint/80">
              <li className="flex items-start">
                <MapPin className="w-5 h-5 mr-3 mt-1 text-brand-sage" />
                <span>
                  304-B, Block II, Alaka Palazzo,<br />
                  4/219 Poonamallee High Road,<br />
                  Kattupakkam, Chennai 56.
                </span>
              </li>
              <li className="flex items-center">
                <Phone className="w-5 h-5 mr-3 text-brand-sage" />
                <a href="tel:+916383376668" className="hover:text-brand-sage rounded-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-orange">+91 63833 76668</a>
              </li>
              <li className="flex items-center">
                <Mail className="w-5 h-5 mr-3 text-brand-sage" />
                <a href="mailto:info@mindhealthservices.org" className="hover:text-brand-sage rounded-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-orange">info@mindhealthservices.org</a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-brand-sage/20 pt-8 text-center text-brand-mint/60 text-sm">
          <p>© {new Date().getFullYear()} Raj Mind Health Services. All rights reserved.</p>
          <p className="mt-2">Designed for Empathy, Trust, and Growth.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
