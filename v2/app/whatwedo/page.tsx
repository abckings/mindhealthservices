import Link from "next/link";
import { CheckCircle } from "lucide-react";

export default function WhatWeDo() {
  return (
    <div className="bg-brand-cream min-h-screen">
      {/* Header */}
      <section className="bg-brand-teal text-white py-16">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl font-bold mb-4">What We Do</h1>
          <p className="text-xl text-brand-mint/80">Our mission and approach to mental health and education.</p>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
             <div className="prose prose-lg max-w-none text-gray-700">
                <p className="lead text-xl leading-relaxed mb-8">
                  <strong className="text-brand-orange">Raj MIND HEALTH SERVICES</strong> is a centre for Special Education, Counselling Services, Career Guidance, Assessments, and Training.
                </p>

                <div className="bg-brand-mint/30 p-8 rounded-2xl mb-12">
                   <h3 className="text-2xl font-bold text-brand-teal mb-4">Our Focus</h3>
                   <p className="mb-4">
                     We focus on <strong>Overall Child Academic Development</strong>, especially for Children with Specific Learning Disability (Dyslexia).
                   </p>
                   <blockquote className="border-l-4 border-brand-sage pl-4 italic bg-white p-4 rounded-r-lg shadow-sm">
                     &quot;A Child with Dyslexia is only one part of him/her, it does not define the child.&quot;
                   </blockquote>
                </div>

                <h3 className="text-2xl font-bold text-brand-teal mb-6">Services Offered</h3>

                <div className="grid md:grid-cols-2 gap-6 mb-12">
                    <div className="flex items-start">
                        <CheckCircle className="w-6 h-6 text-brand-sage mr-3 mt-1 flex-shrink-0" />
                        <div>
                            <h4 className="font-bold text-lg text-brand-teal">Counselling Services</h4>
                            <p className="text-sm text-gray-600">Issues related to childhood, Adolescence, Behavioural Problems, Parenting, Premarital, Marital, and Work-Life Balance.</p>
                        </div>
                    </div>
                    <div className="flex items-start">
                        <CheckCircle className="w-6 h-6 text-brand-sage mr-3 mt-1 flex-shrink-0" />
                        <div>
                            <h4 className="font-bold text-lg text-brand-teal">Assessments</h4>
                            <p className="text-sm text-gray-600">Identifying IQ, ADHD symptoms, Autism, Hyperactivity, Anxiety Disorders, etc.</p>
                        </div>
                    </div>
                    <div className="flex items-start">
                        <CheckCircle className="w-6 h-6 text-brand-sage mr-3 mt-1 flex-shrink-0" />
                        <div>
                            <h4 className="font-bold text-lg text-brand-teal">Training</h4>
                            <p className="text-sm text-gray-600">Empowering teachers on handling Dyslexic children, Stress Management, Career Guidance, and Soft Skills.</p>
                        </div>
                    </div>
                    <div className="flex items-start">
                        <CheckCircle className="w-6 h-6 text-brand-sage mr-3 mt-1 flex-shrink-0" />
                        <div>
                            <h4 className="font-bold text-lg text-brand-teal">Career Guidance</h4>
                            <p className="text-sm text-gray-600">Helping individuals choose the right path based on their strengths.</p>
                        </div>
                    </div>
                </div>

                <div className="text-center">
                    <Link href="/services" className="inline-block bg-brand-sage text-white px-8 py-3 rounded-full font-bold hover:bg-brand-orange transition shadow-md">
                        View Detailed Services
                    </Link>
                </div>
             </div>
          </div>
        </div>
      </section>
    </div>
  );
}
