import Image from "next/image";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export default function TechnicalTeam() {
  const team = [
    {
      name: "Dr. Sumathi Narayanan",
      title: "Corporate Trainer and Counsellor",
      qualification: "",
      image: "/images/tec1.png",
      description: (
        <>
          <p className="mb-4">
            <strong>Dr. Sumathi Narayanan</strong> has a Ph.D in Human Development. Her professional experience spans over four decades in designing and conducting training programs for public, in house companies and educational institutions.
          </p>
          <p className="mb-4">
             She is a trainer for Certification for Basic and Master Practitioner in NLP for NFNLP, USA. She is also a Counsellor and Life coach. She is the President of Creative Communication and Management Center and Secretary of Chennai Counselor&apos;s Foundation.
          </p>
        </>
      ),
    },
    {
      name: "Mrs. Rajani Nandakumar",
      title: "Relationship Counsellor",
      qualification: "",
      image: "/images/tec2.png",
      description: (
        <>
          <p className="mb-4">
            <strong>Mrs. Rajani Nandakumar</strong> is a practicing Relationship/Counselling Psychologist in Chennai having more than 10 years of experience. She has a Masters degree in Applied Psychology and a Diploma in Counselling.
          </p>
          <p className="mb-4">
            She was a Consultant for Matrimony.Com (Bharatmatrimony) for 8 years, where she handled pre-marital and marital issues. She is a motivational speaker at Rotary Clubs and NGOs. She also worked as a Student Counsellor at a Maritime University and has a private practice. She is fluent in Tamil, English, Hindi, and Malayalam and knows Kannada.
          </p>
        </>
      ),
    },
    {
      name: "Psy. Karthik Lakshmanan",
      title: "Career Guidance Specialist",
      qualification: "",
      image: "/images/tec3.png",
      description: (
        <>
          <p className="mb-4">
            <strong>Psy. Karthik Lakshmanan</strong> has a Masters in Counselling Psychology and M. Phil in Psycho-oncology with 8 Years of Experience. Karthik Lakshmanan is a Specialist in Career Guidance. He currently serves as a Visiting Counsellor to IIT- Madras and worked as Assistant Professor of Counselling Psychology in MSSW, Chennai.
          </p>
          <p className="mb-4">
             His Experience includes Corporate Counselling, Student Counselling too. He has written Text Books on Counselling Psychology, Psychological Testing and Biological Psychology for Tamil University, Thanjavur.
          </p>
          <p>
             He has written a self help book on Smoking Cessation and his introductory book on Counselling is published at Amazon.in. He has appeared in many TV Channels such as Puthiya Thalaimurai, Sun News, Jaya TV, Thanthi TV as an expert in Counselling.
          </p>
        </>
      ),
    },
  ];

  return (
    <div className="bg-brand-cream min-h-screen">
      {/* Header */}
      <section className="bg-brand-teal text-white py-16">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl font-bold mb-4">Technical Support Team</h1>
          <p className="text-xl text-brand-mint/80">
            The practicing psychologists who are the pillars of technical strength.
          </p>
        </div>
      </section>

      {/* Breadcrumb / Back */}
      <div className="container mx-auto px-4 py-6">
        <Link href="/whoweare" className="inline-flex items-center text-brand-sage hover:text-brand-orange transition font-semibold">
           <ArrowLeft className="w-4 h-4 mr-2" /> Back to Who We Are
        </Link>
      </div>

      {/* Team List */}
      <section className="pb-16">
        <div className="container mx-auto px-4 space-y-12">
          {team.map((person, index) => (
            <div key={index} className="bg-white rounded-2xl shadow-lg overflow-hidden border-t-4 border-brand-teal hover:shadow-xl transition duration-300">
              <div className="grid md:grid-cols-12 gap-0">
                {/* Image Section */}
                <div className="md:col-span-3 bg-brand-mint/20 p-8 flex items-center justify-center">
                   <div className="relative w-48 h-48 rounded-full overflow-hidden border-4 border-brand-teal/20 shadow-inner">
                      <Image
                        src={person.image}
                        alt={person.name}
                        fill
                        className="object-cover"
                         sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      />
                   </div>
                </div>

                {/* Content Section */}
                <div className="md:col-span-9 p-8 md:p-10 flex flex-col justify-center">
                  <h2 className="text-2xl font-bold text-brand-teal mb-1">{person.name}</h2>
                  <div className="text-brand-orange font-bold text-lg mb-1">{person.title}</div>
                   {person.qualification && (
                    <div className="text-brand-sage font-semibold mb-4 text-sm">{person.qualification}</div>
                  )}

                  <div className="text-gray-700 leading-relaxed">
                    {person.description}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
