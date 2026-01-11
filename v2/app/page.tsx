import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Star, Heart, Brain, BookOpen } from "lucide-react";

export default function Home() {
  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="relative bg-brand-mint overflow-hidden">
        <div className="absolute inset-0 z-0 opacity-10">
           {/* Abstract Pattern or subtle bg image could go here */}
           <Image src="/images/slide02.jpg" alt="Background" fill className="object-cover" priority />
        </div>
        <div className="container mx-auto px-4 py-20 md:py-32 relative z-10">
          <div className="max-w-3xl">
            <h1 className="text-4xl md:text-6xl font-bold text-brand-teal mb-6 leading-tight">
              Empowering Minds, <br/>
              <span className="text-brand-sage">Enabling Growth.</span>
            </h1>
            <p className="text-xl md:text-2xl text-gray-700 mb-8 leading-relaxed">
              We provide a supportive environment for children with learning disabilities and offer professional mental health services with a human touch.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link href="/services" className="bg-brand-sage text-white px-8 py-4 rounded-full font-bold text-lg hover:bg-brand-orange transition shadow-lg text-center flex items-center justify-center">
                Explore Our Services <ArrowRight className="ml-2 w-5 h-5" />
              </Link>
              <Link href="/contactus" className="bg-white text-brand-teal border-2 border-brand-teal px-8 py-4 rounded-full font-bold text-lg hover:bg-brand-teal hover:text-white transition shadow-md text-center">
                Book an Appointment
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Intro / Welcome Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4 grid md:grid-cols-2 gap-12 items-center">
          <div className="relative h-[400px] rounded-2xl overflow-hidden shadow-xl">
             <Image src="/images/home01.png" alt="Counseling Session" fill className="object-cover" />
          </div>
          <div>
            <h2 className="text-3xl md:text-4xl font-bold text-brand-teal mb-6">Welcome to Raj Mind Health Services</h2>
            <blockquote className="border-l-4 border-brand-orange pl-4 italic text-gray-600 mb-6 text-lg">
              &quot;If a Child can&apos;t learn the way we teach, maybe we should teach the way they learn.&quot; <br/>
              <span className="text-sm font-semibold not-italic text-brand-sage">- Ignacio Estrada</span>
            </blockquote>
            <p className="text-gray-700 mb-4 leading-relaxed">
              We at <strong className="text-brand-orange">MHS</strong>, in collaboration with <strong className="text-brand-sage">MDA</strong> (Madras Dyslexia Association), offer a conducive and necessary environment for those children with Specific Learning Disability (Dyslexia) to overcome their difficulty.
            </p>
            <p className="text-gray-700 mb-6 leading-relaxed">
              One to one attention is given by a trained special educator with Individualised Educational Plan and Unique Lesson Plan. Each and every step of the child&apos;s progress is monitored very closely.
            </p>
            <Link href="/whoweare" className="text-brand-sage font-bold hover:text-brand-orange inline-flex items-center">
              Learn More About Us <ArrowRight className="ml-1 w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* Services Highlight */}
      <section className="py-20 bg-brand-cream">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-brand-teal mb-4">Our Core Services</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Comprehensive support tailored to individual needs, from special education to career guidance.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {/* Service 1 */}
            <div className="bg-white p-8 rounded-xl shadow-md hover:shadow-xl transition duration-300 border-t-4 border-brand-sage">
              <div className="w-14 h-14 bg-brand-mint rounded-full flex items-center justify-center text-brand-sage mb-6">
                <Brain className="w-8 h-8" />
              </div>
              <h3 className="text-xl font-bold text-brand-teal mb-3">One to One Counselling</h3>
              <p className="text-gray-600 mb-6">
                Relieve stress, reduce anxiety, and regain emotional balance with our personalized counselling sessions.
              </p>
              <Link href="/counselling" className="text-brand-sage font-semibold hover:text-brand-orange">Read More →</Link>
            </div>

            {/* Service 2 */}
            <div className="bg-white p-8 rounded-xl shadow-md hover:shadow-xl transition duration-300 border-t-4 border-brand-orange">
              <div className="w-14 h-14 bg-brand-mint rounded-full flex items-center justify-center text-brand-orange mb-6">
                <BookOpen className="w-8 h-8" />
              </div>
              <h3 className="text-xl font-bold text-brand-teal mb-3">Special Education</h3>
              <p className="text-gray-600 mb-6">
                Specialized learning support for students with exceptional needs, including those with learning disabilities like dyslexia.
              </p>
               <Link href="/specialeducation" className="text-brand-sage font-semibold hover:text-brand-orange">Read More →</Link>
            </div>

            {/* Service 3 */}
            <div className="bg-white p-8 rounded-xl shadow-md hover:shadow-xl transition duration-300 border-t-4 border-brand-teal">
              <div className="w-14 h-14 bg-brand-mint rounded-full flex items-center justify-center text-brand-teal mb-6">
                <Star className="w-8 h-8" />
              </div>
              <h3 className="text-xl font-bold text-brand-teal mb-3">Career Guidance</h3>
              <p className="text-gray-600 mb-6">
                Expert guidance to help individuals identify their strengths and choose the right career path.
              </p>
               <Link href="/careerguidance" className="text-brand-sage font-semibold hover:text-brand-orange">Read More →</Link>
            </div>
          </div>

          <div className="text-center mt-12">
            <Link href="/services" className="inline-block border-2 border-brand-teal text-brand-teal px-8 py-3 rounded-full font-bold hover:bg-brand-teal hover:text-white transition">
                View All Services
            </Link>
          </div>
        </div>
      </section>

      {/* Who We Are & What We Do Preview */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
           <div className="grid md:grid-cols-2 gap-12">
               {/* Who We Are */}
               <div className="bg-brand-mint/30 p-8 rounded-2xl">
                   <h3 className="text-2xl font-bold text-brand-teal mb-4">Who We Are?</h3>
                   <p className="text-gray-700 mb-6">
                    <strong>Mrs. Sumathi Sivakumar</strong>, the founder Director of Raj Mind Health Services is a Post Graduate in Psychology from the Madras University with 15 years of total professional experience.
                   </p>
                   <Link href="/whoweare" className="text-white bg-brand-sage px-6 py-2 rounded-full hover:bg-brand-orange transition inline-block">More Details</Link>
               </div>

               {/* What We Do */}
               <div className="bg-brand-mint/30 p-8 rounded-2xl">
                   <h3 className="text-2xl font-bold text-brand-teal mb-4">What We Do?</h3>
                   <p className="text-gray-700 mb-6">
                    Raj MIND HEALTH SERVICES is a centre for Special Education, Counselling Services, Career Guidance, Assessments and Training. We focus on Overall Child Academic Development.
                   </p>
                   <Link href="/whatwedo" className="text-white bg-brand-sage px-6 py-2 rounded-full hover:bg-brand-orange transition inline-block">More Details</Link>
               </div>
           </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-brand-teal text-white">
        <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl font-bold mb-4">Ready to take the next step?</h2>
            <p className="text-brand-mint/80 mb-8 max-w-2xl mx-auto">
                Contact us today to schedule an appointment or learn more about how we can help.
            </p>
            <Link href="/contactus" className="bg-brand-orange text-white px-8 py-3 rounded-full font-bold hover:bg-white hover:text-brand-teal transition shadow-lg">
                Get in Touch
            </Link>
        </div>
      </section>
    </div>
  );
}
