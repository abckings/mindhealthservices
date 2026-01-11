import Image from "next/image";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export default function AdvisoryBoard() {
  const advisors = [
    {
      name: "Mrs. Rukmani Mothilal",
      title: "Advisor",
      qualification: "M.A., B.Ed (Former Advisor - The PSBB Millennium Group of Schools)",
      image: "/images/adv1.png",
      description: (
        <>
          <p className="mb-4">
            <strong>Mrs. Rukmani Mothilal</strong> is a Subject Expert in English. She provides intellectual learning experiences that allow children to be independent, make hardcore decisions, and uphold sound initiative. Being an Excellent Motivator and Teacher&apos;s favourite Counsellor she is focused on developing learning and training solutions for schools to stimulate learning development.
          </p>
          <p className="mb-4">
             She has 50 Years of Intensive Experience in the Field of Education and has vast experience in setting up of CBSE Schools. She has 30 Years of exclusive Experience in handling all levels of Students in PSBB. She is the Founder Principal of Vels Vidhyashram & The PSBB Millennium School.
          </p>
          <p>
             She is also the Founder of Shiksha Kendra - Nursery Teacher Training Wing and Bharathiya Sanskriti - the Cultural Wing of The PSBB Millennium School, GST Road, Chennai. She recently Retired as Advisor of The PSBB Millennium Group of Schools.
          </p>
        </>
      ),
    },
    {
      name: "Mrs. Sita Umamaheswaran",
      title: "Advisor",
      qualification: "M.A., M. Phil., PGDBA (Former Director - Training, The PSBB Millennium School)",
      image: "/images/adv2.png",
      description: (
        <>
          <p className="mb-4">
            <strong>Mrs. Sita Umamaheswaran</strong> had started her career as a Nursery Teacher Trainee at PSBB, She Worked as a Primary and Middle School English Teacher for 10 years at PSBB. Being a Subject Expert in English Language and experienced educationist with natural ability to develop, she reinforced the teaching-learning process focused on pupils, community, and society at large.
          </p>
          <p className="mb-4">
            She is Well-versed in educational startup to bring a proactive change in student cognitive and psycho-motor domain. She has a 30 Years of Rich Experience in the field of Education. She served as a Principal of The PSBB Millennium School, at GST & GBKM for 10 Years.
          </p>
          <p>
            She is an Excellent teacher trainer. She conducted numerous Workshops, represented the School at Cape Town, Prague and Washington DC at Microsoft Global Leaders Forum & also served as a Regional Director for the Intel Teach Future Program.
          </p>
        </>
      ),
    },
    {
      name: "Mr. Sivakumar Venugopal",
      title: "Advisor",
      qualification: "M.C.A., PMP",
      image: "/images/adv3.png",
      description: (
        <>
          <p className="mb-4">
            <strong>Mr. Sivakumar Venugopal</strong> has 25 Years of Vast Experience in the field of Information Technology. He has been consistently recognized for outstanding contributions and commended for teaching and learning efficiency, community development, and prioritizing Management Skills.
          </p>
          <p className="mb-4">
            He is a self-driven individual who works to satisfy educational needs and well-being of the students. He is an Expert in Mentoring and Coaching People, travelled various parts of the World in Training and Mentoring on Time Management and Personality Development.
          </p>
          <p>
            He is also an Active Volunteer on Social Service Activities and good at Coordinating with Charitable Institutions. He was the main Man Behind the successful Creation of <strong className="text-brand-orange">Raj Mind Health Services</strong> and <strong className="text-brand-orange">Raj Foundation</strong>.
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
          <h1 className="text-4xl font-bold mb-4">Advisory Board</h1>
          <p className="text-xl text-brand-mint/80">
            Providing expert counsel and direction.
          </p>
        </div>
      </section>

      {/* Breadcrumb / Back */}
      <div className="container mx-auto px-4 py-6">
        <Link href="/whoweare" className="inline-flex items-center text-brand-sage hover:text-brand-orange transition font-semibold">
           <ArrowLeft className="w-4 h-4 mr-2" /> Back to Who We Are
        </Link>
      </div>

      {/* Advisors List */}
      <section className="pb-16">
        <div className="container mx-auto px-4 space-y-12">
          {advisors.map((person, index) => (
            <div key={index} className="bg-white rounded-2xl shadow-lg overflow-hidden border-t-4 border-brand-orange hover:shadow-xl transition duration-300">
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
