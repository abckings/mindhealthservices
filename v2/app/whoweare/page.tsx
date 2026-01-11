import Image from "next/image";
import Link from "next/link";
import { Award, BookOpen, Users } from "lucide-react";

export default function WhoWeAre() {
  return (
    <div className="bg-brand-cream min-h-screen">
      {/* Header */}
      <section className="bg-brand-teal text-white py-16">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl font-bold mb-4">Who We Are</h1>
          <p className="text-xl text-brand-mint/80">Meet the dedicated team behind Raj Mind Health Services.</p>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
            <div className="grid md:grid-cols-12 gap-0">
              {/* Image Section */}
              <div className="md:col-span-4 bg-brand-mint relative min-h-[400px]">
                 {/* Placeholder for Director's Image if available, otherwise a generic professional image */}
                 <div className="absolute inset-0 flex items-center justify-center text-brand-teal/20">
                    <Users className="w-32 h-32" />
                 </div>
                 {/* <Image src="/images/director.jpg" alt="Mrs. Sumathi Sivakumar" fill className="object-cover" /> */}
              </div>

              {/* Content Section */}
              <div className="md:col-span-8 p-8 md:p-12">
                <h2 className="text-3xl font-bold text-brand-teal mb-2">Mrs. Sumathi Sivakumar</h2>
                <p className="text-brand-sage font-bold mb-6">Founder Director & Psychologist</p>

                <div className="prose max-w-none text-gray-700 space-y-4 leading-relaxed">
                  <p>
                    The founder Director of <strong className="text-brand-orange">Raj Mind Health Services</strong> is a Post Graduate in Psychology from the Madras University with 15 years of total professional experience at different capacities in Chennai, Hyderabad, Germany & U.S.A.
                  </p>
                  <p>
                    Her specialisation in Psychology includes Certification in Marriage, Family and Child Counselling under the renowned ACE Program of The Chennai Counselor&apos;s Foundation. Her certifications also include Couple Therapy, Counselling in Educational Institutions, Corporate Counselling, Hypnotherapy, Career Guidance, Transactional Analysis, and Psychometric Assessments.
                  </p>
                  <p>
                    She has also completed her Teacher Training Program at the LMOIS and had intensive hands-on training on Handling Children with Specific Disability - Dyslexia at the <strong className="text-brand-sage">MDA (Madras Dyslexia Association)</strong> with experience in handling such children at a renowned school at Kunrathur, Chennai.
                  </p>
                  <p>
                    Her vast professional experience includes handling teachers, students, and parents at The PSBB Millennium School, GST & Gerugambakkam in various capacities since the inception of the school, and also adolescent counselling sessions/experiences in New Jersey, USA.
                  </p>

                  <h3 className="text-xl font-bold text-brand-teal mt-8 mb-4 flex items-center">
                    <Award className="w-6 h-6 mr-2 text-brand-orange" /> Professional Affiliations
                  </h3>
                  <ul className="list-disc pl-5 space-y-2">
                    <li>Managing Trustee of <strong className="text-brand-orange">RAJ Foundation</strong>, a charitable trust for children with specific disabilities.</li>
                    <li>Active member of The Chennai Counselor&apos;s Foundation.</li>
                    <li>Member of TA 101 Study Circle (Madras).</li>
                    <li>Member of Association of Indian Psychologists.</li>
                    <li>International Stress Management Professional (ISMA Australia).</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Team Links */}
      <section className="py-12 bg-white border-t border-brand-sage/10">
        <div className="container mx-auto px-4 text-center">
           <h3 className="text-2xl font-bold text-brand-teal mb-8">Our Team Structure</h3>
           <div className="grid md:grid-cols-3 gap-6">
              <div className="p-6 border border-brand-sage/20 rounded-xl hover:shadow-md transition">
                 <h4 className="font-bold text-lg mb-2">Board of Trustees</h4>
                 <p className="text-sm text-gray-600 mb-4">Guiding the vision and mission.</p>
                 {/* Link to specific page if needed later */}
                 <span className="text-brand-sage font-semibold">Learn More</span>
              </div>
              <div className="p-6 border border-brand-sage/20 rounded-xl hover:shadow-md transition">
                 <h4 className="font-bold text-lg mb-2">Advisory Board</h4>
                 <p className="text-sm text-gray-600 mb-4">Providing expert counsel and direction.</p>
                 <span className="text-brand-sage font-semibold">Learn More</span>
              </div>
              <div className="p-6 border border-brand-sage/20 rounded-xl hover:shadow-md transition">
                 <h4 className="font-bold text-lg mb-2">Technical Support Team</h4>
                 <p className="text-sm text-gray-600 mb-4">Ensuring seamless operations.</p>
                 <span className="text-brand-sage font-semibold">Learn More</span>
              </div>
           </div>
        </div>
      </section>
    </div>
  );
}
