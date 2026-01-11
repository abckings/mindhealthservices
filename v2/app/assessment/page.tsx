import Link from "next/link";
import Image from "next/image";
import { ArrowLeft } from "lucide-react";

export default function Assessment() {
  return (
    <div className="bg-brand-cream min-h-screen">
      <section className="bg-brand-teal text-white py-12">
        <div className="container mx-auto px-4">
            <Link href="/services" className="inline-flex items-center text-brand-mint hover:text-white mb-4 transition">
                <ArrowLeft className="w-4 h-4 mr-2" /> Back to Services
            </Link>
          <h1 className="text-4xl font-bold">Psychometric Assessment</h1>
        </div>
      </section>

      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-12 items-start">
             <div className="relative h-[300px] md:h-[400px] rounded-2xl overflow-hidden shadow-lg bg-brand-mint">
                <Image src="/images/assessment.png" alt="Assessment" fill className="object-contain p-4" />
             </div>

             <div className="prose prose-lg max-w-none text-gray-700">
                <p className="lead">
                  Assessment is an individualised ongoing process that provides feedback on positive areas and areas of development.
                </p>
                <p>
                  At <strong className="text-brand-orange">MHS</strong>, we organize regular visits of practising consultant psychologists and psychiatrists for consultation and psychometric assessments on appointment.
                </p>

                <h3 className="text-brand-teal font-bold mt-6 mb-3">We Assess For:</h3>
                <ul className="list-disc pl-5 space-y-2 mb-6">
                    <li>Intelligence Quotient (IQ)</li>
                    <li>Specific Learning Disabilities (e.g., Dyslexia)</li>
                    <li>Attention Deficit Hyperactivity Disorder (ADHD)</li>
                    <li>Autism Spectrum Disorders</li>
                    <li>Anxiety & Depression Levels</li>
                    <li>Personality Traits</li>
                </ul>

                <p>
                   Based on the assessment results, appropriate referrals and intervention plans are recommended to support the client&apos;s growth.
                </p>
             </div>
          </div>
        </div>
      </section>

      <section className="py-12 bg-brand-mint/30 text-center">
         <div className="container mx-auto px-4">
            <h2 className="text-2xl font-bold text-brand-teal mb-4">Schedule an assessment today</h2>
            <Link href="/contactus" className="bg-brand-orange text-white px-8 py-3 rounded-full font-bold hover:bg-brand-teal transition shadow-md">
                Contact Us
            </Link>
         </div>
      </section>
    </div>
  );
}
