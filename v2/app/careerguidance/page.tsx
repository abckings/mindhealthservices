import Link from "next/link";
import Image from "next/image";
import { ArrowLeft } from "lucide-react";

export default function CareerGuidance() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Service",
    "name": "Career Guidance and Counselling",
    "provider": {
      "@type": "MedicalBusiness",
      "name": "Raj Mind Health Services"
    },
    "description": "Expert career guidance helping students and professionals identify strengths and choose the right career path using standardized assessments like MCMF.",
    "areaServed": "Chennai, India",
    "audience": {
      "@type": "Audience",
      "audienceType": "Students and Professionals"
    },
    "hasOfferCatalog": {
      "@type": "OfferCatalog",
      "name": "Career Services",
      "itemListElement": [
        { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Career Assessment" } },
        { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "MCMF Tool Assessment" } },
        { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Career Path Counselling" } }
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
          <h1 className="text-4xl font-bold">Career Guidance</h1>
        </div>
      </section>

      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-12 items-start">
             <div className="relative h-[300px] md:h-[400px] rounded-2xl overflow-hidden shadow-lg bg-brand-mint">
                <Image src="/images/career.png" alt="Career Guidance" fill className="object-contain p-4" />
             </div>

             <div className="prose prose-lg max-w-none text-gray-700">
                <p className="lead">
                  Career Guidance and Counselling is a process that helps individuals understand themselves and the world of work to make informed career, educational, and life decisions.
                </p>
                <p>
                  Career development is a lifelong process. It&apos;s more than just deciding on a major or a job; it involves navigating changes in oneself and situations throughout life.
                </p>

                <h3 className="text-brand-teal font-bold mt-6 mb-3">Our Process</h3>
                <p>
                   Our Career Guidance test involves multiple questions dealing with future goals, strengths, weaknesses, and personal/professional aspects. Honest answers help us provide proper counselling.
                </p>
                <ul className="list-disc pl-5 space-y-2 mb-6">
                    <li><strong>Assessment:</strong> Analysis of interests, abilities, values, and personality.</li>
                    <li><strong>Recommendation:</strong> Suggesting suitable job profiles and career paths.</li>
                    <li><strong>Skill Building:</strong> Equipping clients with knowledge and skills for future decisions.</li>
                    <li><strong>Tools Used:</strong> We use exclusive guidance tests and the MCMF Tool developed by Pearson.</li>
                </ul>

                <p>
                    Our exclusive Career Guidance Test can be utilized for students from <strong>Class VIII onwards until Post Graduation</strong>.
                </p>
             </div>
          </div>
        </div>
      </section>

      <section className="py-12 bg-brand-mint/30 text-center">
         <div className="container mx-auto px-4">
            <h2 className="text-2xl font-bold text-brand-teal mb-4">Plan your future with confidence</h2>
            <Link href="/contactus" className="bg-brand-orange text-white px-8 py-3 rounded-full font-bold hover:bg-brand-teal transition shadow-md">
                Schedule a Session
            </Link>
         </div>
      </section>
    </div>
  );
}
