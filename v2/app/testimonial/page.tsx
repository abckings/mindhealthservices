import Link from "next/link";
import { ArrowLeft, Quote } from "lucide-react";

export default function Testimonial() {
  const testimonials = [
    {
      quote: "Thanks to Sumathi Mam for clearing all my doubts to choose my career.",
      author: "Kabeer",
      detail: "Class X (2017-18)"
    },
    {
      quote: "I had a clear explanation of all my positives and negatives with regard to choosing my career. Thank you Raj MHS!",
      author: "Ayushi",
      detail: "Class XI (2017-18)"
    },
    {
      quote: "My Children had a good exposure to their abilities and the opportunities available to choose their career. Overall a very good interactive session.",
      author: "Vasantha Devi",
      detail: "St. Paul's School, Hyderabad"
    },
    {
      quote: "I was able to choose my college studies clearly after having a Career Guidance Session at RAJ MHS. Now, Each day of Learning passby enjoyably. Thanks a Ton!!",
      author: "Latha",
      detail: "Class XII (2017-18)"
    }
  ];

  return (
    <div className="bg-brand-cream min-h-screen">
      <section className="bg-brand-teal text-white py-12">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl font-bold text-center">Testimonials</h1>
          <p className="text-xl text-center text-brand-mint/80 mt-2">What our clients say about us.</p>
        </div>
      </section>

      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-8">
            {testimonials.map((testimonial, index) => (
              <div key={index} className="bg-white p-8 rounded-2xl shadow-md border-l-4 border-brand-sage relative">
                <Quote className="absolute top-4 right-4 text-brand-mint w-12 h-12 rotate-180" />
                <p className="text-gray-700 text-lg italic mb-6 relative z-10">
                   &quot;{testimonial.quote}&quot;
                </p>
                <div>
                   <h4 className="font-bold text-brand-teal text-lg">{testimonial.author}</h4>
                   <p className="text-sm text-gray-500">{testimonial.detail}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-12 bg-brand-mint/30 text-center">
         <div className="container mx-auto px-4">
            <h2 className="text-2xl font-bold text-brand-teal mb-4">Share your experience with us</h2>
            <Link href="/contactus" className="bg-brand-orange text-white px-8 py-3 rounded-full font-bold hover:bg-brand-teal transition shadow-md">
                Contact Us
            </Link>
         </div>
      </section>
    </div>
  );
}
