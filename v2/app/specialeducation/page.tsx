import Link from "next/link";
import Image from "next/image";
import { ArrowLeft } from "lucide-react";

export default function SpecialEducation() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Service",
    "name": "Special Education and Remediation",
    "provider": {
      "@type": "MedicalBusiness",
      "name": "Raj Mind Health Services"
    },
    "description": "Specialized learning support for students with exceptional needs, including those with learning disabilities like dyslexia, using Individualised Educational Plans (IEP).",
    "areaServed": "Chennai, India",
    "audience": {
      "@type": "Audience",
      "audienceType": "Children with Learning Disabilities"
    },
    "hasOfferCatalog": {
      "@type": "OfferCatalog",
      "name": "Special Education Services",
      "itemListElement": [
        { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Dyslexia Remediation" } },
        { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Individualised Educational Plan (IEP)" } },
        { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "One-to-One Special Education" } }
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
          <h1 className="text-4xl font-bold">Special Education / Remediation</h1>
        </div>
      </section>

      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-12 items-start">
             <div className="relative h-[300px] md:h-[400px] rounded-2xl overflow-hidden shadow-lg bg-brand-mint">
                <Image src="/images/special.png" alt="Special Education" fill className="object-contain p-4" />
             </div>

             <div className="prose prose-lg max-w-none text-gray-700">
                <p className="lead">
                  Special Education is a form of learning provided to students with exceptional needs, such as students with learning disabilities or mental challenges.
                </p>
                <p>
                  It involves individually planned and systematically monitored teaching procedures, adapted equipment and materials, and accessible settings. These interventions are designed to help individuals with special needs achieve a higher level of personal self-sufficiency and success in school and community.
                </p>

                <h3 className="text-brand-teal font-bold mt-6 mb-3">Our Methodology</h3>
                <p>
                   We at <strong className="text-brand-orange">MHS</strong>, in collaboration with <strong className="text-brand-sage">MDA (Madras Dyslexia Association)</strong>, offer a conducive environment for children with Specific Learning Disability (Dyslexia).
                </p>
                <ul className="list-disc pl-5 space-y-2 mb-6">
                    <li><strong>One-to-One Attention:</strong> Provided by trained special educators.</li>
                    <li><strong>IEP:</strong> Individualised Educational Plans tailored to each child.</li>
                    <li><strong>Unique Lesson Plans:</strong> Customized teaching strategies.</li>
                    <li><strong>Progress Monitoring:</strong> Close monitoring of every step of the child&apos;s progress.</li>
                    <li><strong>Holistic Support:</strong> Age-appropriate counselling and parental support.</li>
                </ul>

                <p>
                    Constant and systematic follow-up by our knowledge partner MDA adds more value and quality to the service rendered and the outcomes achieved.
                </p>
             </div>
          </div>
        </div>
      </section>

      <section className="py-12 bg-brand-mint/30 text-center">
         <div className="container mx-auto px-4">
            <h2 className="text-2xl font-bold text-brand-teal mb-4">Help your child overcome learning difficulties</h2>
            <Link href="/contactus" className="bg-brand-orange text-white px-8 py-3 rounded-full font-bold hover:bg-brand-teal transition shadow-md">
                Get in Touch
            </Link>
         </div>
      </section>
    </div>
  );
}
