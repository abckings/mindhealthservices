"use client";

import Link from "next/link";
import { ArrowRight, Brain, BookOpen, Star, Users, CheckCircle, Activity } from "lucide-react";

export default function Services() {
  const services = [
    {
      title: "One to One Counselling",
      description: "Relieve stress, reduce anxiety, and regain emotional balance with personalized counselling sessions.",
      icon: Brain,
      link: "/counselling",
      colorClass: "text-brand-teal"
    },
    {
      title: "Special Education",
      description: "Specialized learning support for students with exceptional needs, including those with learning disabilities.",
      icon: BookOpen,
      link: "/specialeducation",
      colorClass: "text-brand-orange"
    },
    {
      title: "Career Guidance",
      description: "Expert guidance to help individuals identify their strengths and choose the right career path.",
      icon: Star,
      link: "/careerguidance",
      colorClass: "text-brand-sage"
    },
    {
      title: "Training",
      description: "Workshops and training programs for teachers, students, and organizations on various psychological topics.",
      icon: Users,
      link: "/training",
      colorClass: "text-brand-teal"
    },
    {
      title: "Assessment",
      description: "Psychometric assessments to identify IQ, learning disabilities, ADHD, and other developmental needs.",
      icon: CheckCircle,
      link: "/assessment",
      colorClass: "text-brand-orange"
    },
    {
      title: "Other Services",
      description: "Chess training for brain stimulation, Yoga for well-being, and other psychological services.",
      icon: Activity,
      link: "/otherservices",
      colorClass: "text-brand-sage"
    }
  ];

  return (
    <div className="bg-brand-cream min-h-screen">
      {/* Header */}
      <section className="bg-brand-teal text-white py-16">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl font-bold mb-4">Our Services</h1>
          <p className="text-xl text-brand-mint/80">Comprehensive mental health and educational support for all ages.</p>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service, index) => (
              <Link href={service.link} key={index} className="group">
                <div className="bg-white p-8 rounded-xl shadow-md hover:shadow-xl transition duration-300 h-full flex flex-col border-t-4 border-brand-sage hover:border-brand-orange">
                  <div className={`w-14 h-14 rounded-full flex items-center justify-center mb-6 bg-brand-mint ${service.colorClass}`}>
                    <service.icon className="w-8 h-8" />
                  </div>
                  <h3 className="text-xl font-bold text-brand-teal mb-3 group-hover:text-brand-orange transition">{service.title}</h3>
                  <p className="text-gray-600 mb-6 flex-grow">
                    {service.description}
                  </p>
                  <div className="flex items-center text-brand-sage font-semibold group-hover:text-brand-orange transition">
                    Read More <ArrowRight className="ml-2 w-4 h-4" />
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
