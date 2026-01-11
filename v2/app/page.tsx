export default function Home() {
  return (
    <div className="min-h-screen bg-brand-cream">
      {/* Header / Navbar Mockup */}
      <header className="bg-brand-teal text-white py-4 shadow-md">
        <div className="container mx-auto px-4 flex justify-between items-center">
          <div className="text-2xl font-bold">RAJ MIND HEALTH SERVICES</div>
          <nav className="hidden md:flex space-x-6">
            <a href="#" className="hover:text-brand-sage transition">Home</a>
            <a href="#" className="hover:text-brand-sage transition">About Us</a>
            <a href="#" className="hover:text-brand-sage transition">Services</a>
            <a href="#" className="hover:text-brand-sage transition">Contact</a>
          </nav>
        </div>
      </header>

      {/* Hero Section */}
      <section className="bg-brand-mint py-16">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-brand-teal mb-6">
            ONE TO ONE COUNSELLING SERVICES
          </h1>
          <p className="text-xl text-gray-700 max-w-2xl mx-auto mb-8">
            Special Education, Remediation services, Career Guidance, Training, Assessment, Yoga Coaching, Chess Training
          </p>
          <div className="flex justify-center gap-4">
            <button className="bg-brand-sage text-white px-8 py-3 rounded-full font-bold hover:bg-brand-orange transition duration-300">
              Our Services
            </button>
            <button className="border-2 border-brand-teal text-brand-teal px-8 py-3 rounded-full font-bold hover:bg-brand-teal hover:text-white transition duration-300">
              Contact Us
            </button>
          </div>
        </div>
      </section>

      {/* Welcome Content (Facelifted from index.html) */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4 grid md:grid-cols-2 gap-8 items-center">
          <div>
            <h2 className="text-3xl font-bold text-brand-teal mb-6">Welcome to Raj Mind Health Services</h2>
            <p className="text-lg text-gray-700 mb-4 italic">
              &quot;If a Child can&apos;t learn the way we teach, maybe we should teach the way they learn.&quot; - Ignacio Estrada
            </p>
            <p className="text-gray-700 mb-4 leading-relaxed">
              We at <strong className="text-brand-orange">MHS</strong>, in collaboration with <strong className="text-brand-sage">MDA</strong> (Madras Dyslexia Association), offer a conducive and necessary environment for those children with Specific Learning Disability (Dyslexia) to overcome their difficulty.
            </p>
            <p className="text-gray-700 mb-4 leading-relaxed">
              One to one attention is given by a trained special educator with Individualised Educational Plan and Unique Lesson Plan. Each and every step of the child&apos;s progress is monitored very closely.
            </p>
          </div>
          <div className="bg-brand-mint p-8 rounded-2xl shadow-lg">
             {/* Placeholder for Image */}
             <div className="w-full h-64 bg-brand-sage/20 rounded-xl flex items-center justify-center text-brand-teal">
                <span className="font-semibold">Image Placeholder</span>
             </div>
          </div>
        </div>
      </section>

      {/* Services Grid Preview */}
      <section className="py-16 bg-brand-cream">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition">
              <h3 className="text-xl font-bold text-brand-teal mb-3">Who We Are?</h3>
              <p className="text-gray-600 mb-4">
                Mrs. Sumathi Sivakumar, the founder Director of Raj Mind Health Services is a Post Graduate in Psychology from the Madras University...
              </p>
              <a href="#" className="text-brand-sage font-bold hover:text-brand-orange">More Details →</a>
            </div>
            <div className="bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition">
              <h3 className="text-xl font-bold text-brand-teal mb-3">What We Do?</h3>
              <p className="text-gray-600 mb-4">
                Raj MIND HEALTH SERVICES is a centre for Special Education, Counselling Services, Career Guidance, Assessments and Training.
              </p>
              <a href="#" className="text-brand-sage font-bold hover:text-brand-orange">More Details →</a>
            </div>
            <div className="bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition">
              <h3 className="text-xl font-bold text-brand-teal mb-3">Our Services</h3>
              <ul className="space-y-2 text-gray-600">
                <li>• Special Education</li>
                <li>• Career Guidance</li>
                <li>• Counselling</li>
                <li>• Assessment</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-brand-teal text-brand-mint py-8">
        <div className="container mx-auto px-4 text-center">
          <p className="mb-2">© 2024 Raj Mind Health Services. All rights reserved.</p>
          <p className="text-sm opacity-75">Designed for Empathy, Trust, and Growth.</p>
        </div>
      </footer>
    </div>
  );
}
