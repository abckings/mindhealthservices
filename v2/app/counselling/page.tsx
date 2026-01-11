import Link from "next/link";
import Image from "next/image";
import { ArrowLeft } from "lucide-react";

export default function Counselling() {
  return (
    <div className="bg-brand-cream min-h-screen">
      <section className="bg-brand-teal text-white py-12">
        <div className="container mx-auto px-4">
            <Link href="/services" className="inline-flex items-center text-brand-mint hover:text-white mb-4 transition">
                <ArrowLeft className="w-4 h-4 mr-2" /> Back to Services
            </Link>
          <h1 className="text-4xl font-bold">One to One Counselling</h1>
        </div>
      </section>

      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-12 items-start">
             <div className="relative h-[300px] md:h-[400px] rounded-2xl overflow-hidden shadow-lg bg-brand-mint">
                <Image src="/images/counselling.png" alt="Counselling Session" fill className="object-contain p-4" />
             </div>

             <div className="prose prose-lg max-w-none text-gray-700">
                <p className="lead">
                  Counselling helps an individual to relieve stress, reduce anxiety, increase assertiveness skills, have a greater self-confidence, regain emotional balance, enhance the ability to set boundaries, and maintain better relationships.
                </p>

                <h3 className="text-brand-teal font-bold mt-6 mb-3">Our Approach</h3>
                <p>
                   On appointments, we offer one-to-one counselling services on all psychological needs including:
                </p>
                <ul className="list-disc pl-5 space-y-2 mb-6">
                    <li>Adolescent Counselling</li>
                    <li>Student Counselling</li>
                    <li>Pre-marital & Marital Counselling</li>
                    <li>Handling Stress, Anger, Anxiety, Depression</li>
                    <li>Work-Life Balance</li>
                    <li>Time Management & Skills Building</li>
                </ul>

                <h3 className="text-brand-teal font-bold mt-6 mb-3">Therapies & Techniques</h3>
                <p>
                    We utilize evidence-based therapies and techniques tailored to each individual, such as:
                </p>
                <ul className="list-disc pl-5 space-y-2">
                    <li>Cognitive Behavioral Therapy (CBT)</li>
                    <li>Solution-Focused Brief Therapy (SFBT)</li>
                    <li>Behavior Modification Therapy (BMT)</li>
                    <li>Transactional Analysis (TA)</li>
                    <li>Reality Therapy</li>
                    <li>Hypnotherapy</li>
                    <li>Relaxation Techniques</li>
                </ul>
             </div>
          </div>
        </div>
      </section>

      <section className="py-12 bg-brand-mint/30 text-center">
         <div className="container mx-auto px-4">
            <h2 className="text-2xl font-bold text-brand-teal mb-4">Need professional support?</h2>
            <Link href="/contactus" className="bg-brand-orange text-white px-8 py-3 rounded-full font-bold hover:bg-brand-teal transition shadow-md">
                Book an Appointment
            </Link>
         </div>
      </section>
    </div>
  );
}
