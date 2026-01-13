import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import Navbar from "../components/Navbar";
import ConditionalFooter from "../components/ConditionalFooter";
import ScrollToTop from "@/components/ScrollToTop";
import "./globals.css";
import { SessionProvider } from "next-auth/react";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Raj Mind Health Services - Special Education & Counselling",
  description: "Offering a conducive environment for children with learning disabilities and professional mental health services.",
  keywords: ["Counselling", "Special Education", "Dyslexia", "Career Guidance", "Chennai", "Psychology"],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "MedicalBusiness",
    "name": "Raj Mind Health Services",
    "image": "https://www.mindhealthservices.org/images/logo.png",
    "@id": "https://www.mindhealthservices.org",
    "url": "https://www.mindhealthservices.org",
    "telephone": "+916383376668",
    "email": "info@mindhealthservices.org",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "304-B, Block II, Alaka Palazzo, 4/219 Poonamallee High Road, Kattupakkam",
      "addressLocality": "Chennai",
      "postalCode": "600056",
      "addressCountry": "IN"
    },
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": 13.0474087,
      "longitude": 80.1203722
    },
    "openingHoursSpecification": {
      "@type": "OpeningHoursSpecification",
      "dayOfWeek": [
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday"
      ],
      "opens": "09:00",
      "closes": "18:00"
    },
    "sameAs": [
      "https://www.facebook.com/",
      "https://twitter.com/"
    ],
    "medicalSpecialty": [
      "Psychology",
      "Special Education",
      "Counselling"
    ]
  };

  return (
    <html lang="en">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased flex flex-col min-h-screen bg-brand-cream text-foreground`}
      >
        <SessionProvider>
          <Navbar />
          <main id="main-content" className="flex-grow" tabIndex={-1}>
            {children}
          </main>
          <ConditionalFooter />
          <ScrollToTop />
        </SessionProvider>
      </body>
    </html>
  );
}
