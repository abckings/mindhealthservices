"use client";

import { MapPin, Phone, Mail } from "lucide-react";
import { useState } from "react";
import Script from "next/script";

export default function ContactUs() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [message, setMessage] = useState("");

  const handleWhatsApp = () => {
    const text = `Name: ${name}\nEmail: ${email}\nPhone: ${phone}\nMessage: ${message}`;
    const url = `https://wa.me/916383376668?text=${encodeURIComponent(text)}`;
    window.open(url, '_blank');
  };

  const handleEmail = () => {
    const subject = "Enquiry from Website";
    const body = `Name: ${name}\nEmail: ${email}\nPhone: ${phone}\nMessage: ${message}`;
    const url = `mailto:info@mindhealthservices.org?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    window.location.href = url;
  };

  const jsonLd = {
      "@context": "https://schema.org",
      "@type": "ContactPage",
      "mainEntity": {
        "@type": "MedicalBusiness",
        "name": "Raj Mind Health Services",
        "telephone": "+916383376668",
        "email": "info@mindhealthservices.org",
        "address": {
          "@type": "PostalAddress",
          "streetAddress": "304-B, Block II, Alaka Palazzo, 4/219 Poonamallee High Road, Kattupakkam",
          "addressLocality": "Chennai",
          "postalCode": "600056",
          "addressCountry": "IN"
        },
        "contactPoint": {
          "@type": "ContactPoint",
          "telephone": "+916383376668",
          "contactType": "customer service",
          "areaServed": "IN",
          "availableLanguage": ["English", "Tamil"]
        }
      }
  };

  return (
    <div className="bg-brand-cream min-h-screen">
      <Script id="contact-jsonld" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      {/* Header */}
      <section className="bg-brand-teal text-white py-16">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl font-bold mb-4">Contact Us</h1>
          <p className="text-xl text-brand-mint/80">Get in touch with us for appointments and enquiries.</p>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-12">

            {/* Contact Info & Map */}
            <div className="space-y-8">
              <div className="bg-white p-8 rounded-2xl shadow-md">
                <h2 className="text-2xl font-bold text-brand-teal mb-6">Contact Information</h2>
                <div className="space-y-6">
                  <div className="flex items-start">
                    <MapPin className="w-6 h-6 text-brand-sage mr-4 mt-1 flex-shrink-0" />
                    <div>
                      <h3 className="font-bold text-brand-teal">Address</h3>
                      <p className="text-gray-600">
                        304-B, Block II, Alaka Palazzo,<br />
                        4/219 Poonamallee High Road,<br />
                        Kattupakkam, Chennai 56.
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start">
                    <Phone className="w-6 h-6 text-brand-sage mr-4 mt-1 flex-shrink-0" />
                    <div>
                      <h3 className="font-bold text-brand-teal">Phone</h3>
                      <p className="text-gray-600">
                        <a href="tel:+916383376668" className="hover:text-brand-orange transition">+91 63833 76668</a> <br />
                        <a href="tel:+919789086096" className="hover:text-brand-orange transition">+91 97890 86096</a>
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start">
                    <Mail className="w-6 h-6 text-brand-sage mr-4 mt-1 flex-shrink-0" />
                    <div>
                      <h3 className="font-bold text-brand-teal">Email</h3>
                      <p className="text-gray-600">
                        <a href="mailto:info@mindhealthservices.org" className="hover:text-brand-orange transition">info@mindhealthservices.org</a>
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Map */}
              <div className="bg-white p-2 rounded-2xl shadow-md h-[350px] overflow-hidden">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1743.9258290527407!2d80.12037219422015!3d13.047408695393889!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3a5261be2c301ed7%3A0x35cae9ee5db5336b!2sColive%20Alaka%20Palazzo!5e0!3m2!1sen!2sin!4v1613635682445!5m2!1sen!2sin"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  title="Google Maps Location"
                ></iframe>
              </div>
            </div>

            {/* Enquiry Form */}
            <div className="bg-white p-8 rounded-2xl shadow-md">
              <h2 className="text-2xl font-bold text-brand-teal mb-2">Quick Enquiry</h2>
              <p className="text-gray-600 mb-6">Send us a message via WhatsApp or Email.</p>

              <div className="space-y-4">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">Your Name</label>
                  <input
                    type="text"
                    id="name"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-sage focus:border-transparent outline-none transition"
                    placeholder="Enter your full name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                </div>

                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">Your Email</label>
                  <input
                    type="email"
                    id="email"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-sage focus:border-transparent outline-none transition"
                    placeholder="Enter your email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>

                <div>
                  <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">Phone Number</label>
                  <input
                    type="tel"
                    id="phone"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-sage focus:border-transparent outline-none transition"
                    placeholder="Enter your phone number"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                  />
                </div>

                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">Message</label>
                  <textarea
                    id="message"
                    rows={4}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-sage focus:border-transparent outline-none transition"
                    placeholder="How can we help you?"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                  ></textarea>
                </div>

                <div className="grid grid-cols-2 gap-4 pt-4">
                  <button
                    onClick={handleWhatsApp}
                    className="flex items-center justify-center bg-[#25D366] text-white px-4 py-3 rounded-lg font-bold hover:bg-[#20bd5a] transition"
                  >
                     WhatsApp
                  </button>
                  <button
                    onClick={handleEmail}
                    className="flex items-center justify-center bg-brand-teal text-white px-4 py-3 rounded-lg font-bold hover:bg-brand-sage transition"
                  >
                     Send Email
                  </button>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>
    </div>
  );
}
