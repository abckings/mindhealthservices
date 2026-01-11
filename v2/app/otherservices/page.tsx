import Link from "next/link";
import Image from "next/image";
import { ArrowLeft } from "lucide-react";

export default function OtherServices() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Service",
    "name": "Holistic Mind Services",
    "provider": {
      "@type": "MedicalBusiness",
      "name": "Raj Mind Health Services"
    },
    "description": "Additional services including Chess Training for cognitive development and Yoga for mental well-being.",
    "areaServed": "Chennai, India",
    "hasOfferCatalog": {
      "@type": "OfferCatalog",
      "name": "Other Services",
      "itemListElement": [
        { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Chess Training" } },
        { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Yoga Classes" } }
      ]
    }
  };

  return (
    <div className="bg-brand-cream min-h-screen">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <section className="bg-brand-teal text-white py-12">
        <div className="container mx-auto px-4">
            <Link href="/services" className="inline-flex items-center text-brand-mint hover:text-white mb-4 transition">
                <ArrowLeft className="w-4 h-4 mr-2" /> Back to Services
            </Link>
          <h1 className="text-4xl font-bold">Other Services</h1>
        </div>
      </section>

      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-12 items-start">
             <div className="relative h-[300px] md:h-[400px] rounded-2xl overflow-hidden shadow-lg bg-brand-mint">
                <Image src="/images/otherservices.png" alt="Other Services" fill className="object-contain p-4" />
             </div>

             <div className="prose prose-lg max-w-none text-gray-700">
                <p className="lead">
                  We offer a wide range of psychological and developmental services based on the specific needs of our clients.
                </p>

                <h3 className="text-brand-teal font-bold mt-6 mb-3">Chess Training</h3>
                <p className="mb-6">
                   We encourage young minds to learn <strong>CHESS</strong> to stimulate their brain activity and enhance their thinking, strategic, and problem-solving skills.
                </p>

                <h3 className="text-brand-teal font-bold mt-6 mb-3">Yoga</h3>
                <p className="mb-6">
                   <strong>Yoga</strong> classes are offered for women of all ages to promote physical and mental well-being, reduce stress, and improve overall health.
                </p>

                <p>
                   At <strong className="text-brand-orange">MHS</strong>, we make sure that we utilize every single opportunity to offer all possible creative and mind-related services for all ages to create a strong and healthy community.
                </p>
             </div>
          </div>
        </div>
      </section>

      <section className="py-12 bg-brand-mint/30 text-center">
         <div className="container mx-auto px-4">
            <h2 className="text-2xl font-bold text-brand-teal mb-4">Explore our holistic programs</h2>
            <Link href="/contactus" className="bg-brand-orange text-white px-8 py-3 rounded-full font-bold hover:bg-brand-teal transition shadow-md">
                Find Out More
            </Link>
         </div>
      </section>
    </div>
  );
}
