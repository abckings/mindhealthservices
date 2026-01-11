import Image from "next/image";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export default function BoardOfTrustees() {
  const trustees = [
    {
      name: "Mrs. Sumathi Sivakumar",
      title: "Managing Trustee",
      qualification: "M.Sc (Psychology), MFCC",
      image: "/images/tru1.png",
      description: (
        <>
          <p className="mb-4">
            Mrs. Sumathi Sivakumar is the Managing Trustee of <strong className="text-brand-orange">Raj Foundation</strong> - a charitable trust that works for the cause of the identification and remediation with regards to specific disability and psychological needs of School Children.
          </p>
          <p className="mb-4">
            She is a Post Graduate in Psychology from the Madras University with 15 years of total professional experience at different capacities in Chennai, Hyderabad, Germany & U.S.A. Her specialization in Psychology has Certification in Marriage, Family and Child Counselling under renowned ACE Program of The Chennai Counselor&apos;s Foundation. Her certifications also include Couple Therapy, Counselling in Educational Institutions, Corporate Counselling, Hypnotherapy, Career Guidance, Transactional Analysis, Psychometric Assessments etc.
          </p>
          <p className="mb-4">
            She has also completed her Teacher Training Program at the LMOIS and had intensive hands on training on Handling Children with Specific Disability - Dyslexia at the <strong className="text-brand-sage">MDA</strong> with experience in handling such children at a renowned school at Kunrathur, Chennai.
          </p>
          <p className="mb-4">
            Her vast professional experience includes handling teachers, students and the parents at The PSBB Millennium School, GST & Gerugambakkam in various capacities since the inception of the school and also adolescent Counselling sessions/experiences at New Jersey USA.
          </p>
          <p className="mb-4">
            Mrs. Sumathi Sivakumar is also the Founder Director of <strong className="text-brand-orange">Raj Mind Health Services</strong>, a centre for Special Education, Counselling Services, Career Guidance, Assessments and Training.
          </p>
          <p className="mb-4">
            She is an active member in The Chennai Counselor&apos;s Foundation. Also, she is a member in TA 101 Study Circle (Madras) and in Association of Indian Psychologists. She is also a trained Stress Management Professional (ISMA Australia).
          </p>
        </>
      ),
    },
    {
      name: "Mrs. Saroja Venugopal",
      title: "Trustee",
      qualification: "",
      image: "/images/tru2.png",
      description: (
        <>
          <p className="mb-4">
            <strong>Mrs. Saroja Venugopal</strong> excels in the development of academic and career curriculum and has a proven track record of guiding and mentoring students. She is a strong education consulting professional with passion to work for the cause of delivering quality education with her 40 Years of Experience in handling Children of various levels of Students at Government School.
          </p>
          <p>
            She is a Trained Secondary Grade Teacher, Expert in handling and differentiating slow learners and Children with Learning Disabilities. She is an active Volunteer in Imparting YOGA for Children in Government Schools.
          </p>
        </>
      ),
    },
    {
      name: "Lioness Mrs. Lakshmi Nagarajan",
      title: "Trustee",
      qualification: "",
      image: "/images/tru4.png",
      description: (
        <>
          <p className="mb-4">
            <strong>Mrs. Lakshmi Nagarajan</strong> is an active Social Worker. She is an Expert in organizing and coordinating various activities like Health Camp, Dental Camp, Eye screening camp, blood donation camp etc. She is a Commerce graduate with 35 Years of Experience in Setting up of Company, Accounting, Auditing and Handling Cash. She had worked in different capacities in both public and private sectors.
          </p>
          <p className="mb-4">
            She is an Active Volunteer- Working for the betterment of Mentally Retarded Children for a Home at St. Thomas Mount and also for various Old Age Homes.
          </p>
          <p>
            <strong>Lioness Mrs. Lakshmi Nagarajan</strong> was a former President of Lioness Club of Nandambakkam and She Serves as a Present Secretary in Lions Club of Shruthi.
          </p>
        </>
      ),
    },
    {
      name: "Mr. Venugopal",
      title: "Trustee",
      qualification: "M.A., M.Ed",
      image: "/images/tru3.png",
      description: (
        <>
          <p className="mb-4">
            <strong>Mr. Venugopal</strong> is a renowned Tamil Pandit, highly experienced and meticulous Curriculum Developer with vast experience working with a variety of children communities. He is an expert in developing academics and career plans in tune with the needs of students from a variety of academic and socio economic backgrounds.
          </p>
          <p className="mb-4">
            He has 40 Years of Experience in handling Children of various levels in Government Schools. He started his career as a SGT and Retired as a Headmaster in Government School. He is an Active Volunteer in training intelligent but underprivileged Children at Vallalar Siruvar Illam, Kanchipuram.
          </p>
          <p>
            He is an Active Member in Thiruvalluvar Arakattalai, Kanyakumari since 2000 & in Thiruvalluvar Vazhviyal Mandram since 2005. He is also a Working Committee Member in TamilNadu Literary Association.
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
          <h1 className="text-4xl font-bold mb-4">Board of Trustees</h1>
          <p className="text-xl text-brand-mint/80">
            The guiding force behind Raj Mind Health Services.
          </p>
        </div>
      </section>

      {/* Breadcrumb / Back */}
      <div className="container mx-auto px-4 py-6">
        <Link href="/whoweare" className="inline-flex items-center text-brand-sage hover:text-brand-orange transition font-semibold">
           <ArrowLeft className="w-4 h-4 mr-2" /> Back to Who We Are
        </Link>
      </div>

      {/* Trustees List */}
      <section className="pb-16">
        <div className="container mx-auto px-4 space-y-12">
          {trustees.map((person, index) => (
            <div key={index} className="bg-white rounded-2xl shadow-lg overflow-hidden border-t-4 border-brand-sage hover:shadow-xl transition duration-300">
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
