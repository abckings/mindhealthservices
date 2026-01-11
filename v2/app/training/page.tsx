import Link from "next/link";
import Image from "next/image";
import { ArrowLeft } from "lucide-react";

export default function Training() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Service",
    "name": "Training and Workshops",
    "provider": {
      "@type": "MedicalBusiness",
      "name": "Raj Mind Health Services"
    },
    "description": "Customized training workshops for schools, colleges, and organizations covering topics like parenting, stress management, and soft skills.",
    "areaServed": "Chennai, India",
    "hasOfferCatalog": {
      "@type": "OfferCatalog",
      "name": "Training Programs",
      "itemListElement": [
        { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Positive Parenting Workshop" } },
        { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Stress Management Workshop" } },
        { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Teacher Training" } },
        { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Soft Skills Development" } }
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
          <h1 className="text-4xl font-bold">Training & Workshops</h1>
        </div>
      </section>

      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-12 items-start">
             <div className="relative h-[300px] md:h-[400px] rounded-2xl overflow-hidden shadow-lg bg-brand-mint">
                <Image src="/images/training.png" alt="Training Session" fill className="object-contain p-4" />
             </div>

             <div className="prose prose-lg max-w-none text-gray-700">
                <p className="lead">
                  Training is an educational process involving the sharpening of skills, concepts, changing of attitudes, and gaining more knowledge to enhance performance.
                </p>
                <p>
                  <strong className="text-brand-orange">MHS</strong> offers unique workshop packages custom-made as per the requirement of Institutions, Schools, Colleges, and Organizations. Guest lectures by our technical experts and advisory board members enhance these workshops.
                </p>

                <h3 className="text-brand-teal font-bold mt-6 mb-3">Workshop Topics</h3>

                <div className="grid md:grid-cols-2 gap-4">
                    <ul className="list-disc pl-5 space-y-2">
                        <li>Career Guidance & Counselling</li>
                        <li>Positive & Responsible Parenting</li>
                        <li>Understanding Children & Adolescents</li>
                        <li>Stress Management</li>
                        <li>Work-Life Balance</li>
                        <li>Time & Conflict Management</li>
                        <li>Building Memory & Study Skills</li>
                    </ul>
                    <ul className="list-disc pl-5 space-y-2">
                        <li>Self-Esteem & Self-Awareness</li>
                        <li>Interpersonal Skills</li>
                        <li>Emotional Intelligence</li>
                        <li>Anger Management</li>
                        <li>Problem Solving Skills</li>
                        <li>Activity Based Learning</li>
                        <li>Personality Development & Leadership</li>
                    </ul>
                </div>
             </div>
          </div>
        </div>
      </section>

      <section className="py-12 bg-brand-mint/30 text-center">
         <div className="container mx-auto px-4">
            <h2 className="text-2xl font-bold text-brand-teal mb-4">Organize a workshop for your institution</h2>
            <Link href="/contactus" className="bg-brand-orange text-white px-8 py-3 rounded-full font-bold hover:bg-brand-teal transition shadow-md">
                Enquire Now
            </Link>
         </div>
      </section>
    </div>
  );
}
