'use client';

import { useEffect, useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';

const About = () => {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    // Ensure video plays when component mounts
    if (videoRef.current) {
      videoRef.current.play().catch(error => {
        console.log("Video autoplay prevented:", error);
      });
    }
  }, []);

  return (
    <div className="pt-24 bg-white">
      {/* Hero Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-6">
          <div className="flex flex-col items-center text-center">
            <h1 className="text-5xl md:text-6xl font-bold mb-6 text-gray-900">About Uruyange Coffee</h1>
            <p className="text-xl md:text-2xl leading-relaxed text-gray-700 max-w-4xl mb-8">
              Where passion meets excellence in every cup, bringing the finest flavors from Rwanda to your table.
            </p>
          </div>
        </div>
      </section>

      {/* Video Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-6">
          <div className="flex flex-col md:flex-row items-center gap-12">
            <div className="w-full md:w-1/2">
              <div className="rounded-lg shadow-xl overflow-hidden">
                <video 
                  ref={videoRef}
                  className="w-full h-[500px] object-cover" 
                  autoPlay 
                  muted 
                  loop 
                  playsInline
                >
                  <source src="/images/vidvim.mp4" type="video/mp4" />
                  Your browser does not support the video tag.
                </video>
              </div>
            </div>
            <div className="w-full md:w-1/2">
              <h2 className="text-4xl font-bold text-gray-900 mb-6">About Uruyange Coffee</h2>
              <p className="text-lg text-gray-700 mb-6">
                We are passionate about bringing you the finest coffee from
                the heart of Rwanda. Our beans are carefully selected from the pristine hills of the Kivu
                region, where perfect growing conditions create exceptional flavors.
              </p>
              <p className="text-lg text-gray-700 mb-8">
                Every cup tells a story of dedication, from our skilled
                farmers to our expert roasters, ensuring you experience coffee at its absolute best.
              </p>
              <Link href="/about" className="bg-yellow-500 hover:bg-yellow-600 text-white font-bold py-3 px-6 rounded shadow transition-colors">
                Learn More About Us
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Our Story Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-6">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-4xl font-bold text-yellow-600 mb-6">Our Story</h2>
              <p className="text-gray-600 mb-4">
                Founded in partnership with Mubuga Coffee, Uruyange Coffee emerged
                from a profound appreciation for the art of coffee cultivation. Our journey began in the rich
                soils of Rwanda, specifically from the KIVU showers, where nature crafts some of the world's
                finest coffee beans.
              </p>
              <p className="text-gray-600">
                We're more than just coffee suppliers—we're custodians of quality, offering
                premium varieties including Anaerobic, Natural, and Fully Washed coffee to meet the
                sophisticated needs of home brewers, café owners, and specialty coffee roasters alike.
              </p>
            </div>
            <div className="relative h-[400px] rounded-lg overflow-hidden shadow-xl">
              <Image 
                src="/images/1.8.jpg" 
                alt="Coffee plantation" 
                fill
                style={{objectFit: 'cover'}}
                className="rounded-lg"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-6">
          <h2 className="text-4xl font-bold text-center text-yellow-600 mb-12">Why Choose Uruyange Coffee?</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center p-6 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow">
              <div className="text-4xl mb-4 text-yellow-600">✨</div>
              <h3 className="text-xl font-bold mb-2 text-gray-800">Exceptional Quality</h3>
              <p className="text-gray-600">Finest beans, carefully processed to preserve unique taste profiles.</p>
            </div>
            <div className="text-center p-6 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow">
              <div className="text-4xl mb-4 text-yellow-600">🌱</div>
              <h3 className="text-xl font-bold mb-2 text-gray-800">Sustainability & Ethics</h3>
              <p className="text-gray-600">Supporting fair trade and eco-friendly farming practices.</p>
            </div>
            <div className="text-center p-6 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow">
              <div className="text-4xl mb-4 text-yellow-600">🌍</div>
              <h3 className="text-xl font-bold mb-2 text-gray-800">Worldwide Shipping</h3>
              <p className="text-gray-600">Fresh coffee delivered to your doorstep, wherever you are.</p>
            </div>
            <div className="text-center p-6 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow">
              <div className="text-4xl mb-4 text-yellow-600">💝</div>
              <h3 className="text-xl font-bold mb-2 text-gray-800">Passion for Coffee</h3>
              <p className="text-gray-600">Dedicated to providing the best coffee experience.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Our Coffee Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-6">
          <h2 className="text-4xl font-bold text-center text-yellow-600 mb-12">Our Coffee Selection</h2>
          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-white p-8 rounded-lg shadow-md hover:shadow-lg transition-shadow">
              <h3 className="text-2xl font-bold text-yellow-600 mb-4">Roasted Coffee</h3>
              <p className="text-gray-600">
                Expertly roasted beans that bring out the unique flavor profiles of our
                premium coffee selections, ready for your perfect brew.
              </p>
            </div>
            <div className="bg-white p-8 rounded-lg shadow-md hover:shadow-lg transition-shadow">
              <h3 className="text-2xl font-bold text-yellow-600 mb-4">Green Coffee</h3>
              <p className="text-gray-600">
                Raw, carefully selected beans for roasters who prefer to craft their own
                unique roasting profiles and flavors.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Our Process Section - Added Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-6">
          <h2 className="text-4xl font-bold text-center text-yellow-600 mb-12">Our Process</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white p-8 rounded-lg shadow-md hover:shadow-lg transition-shadow">
              <div className="flex items-center justify-center mb-6">
                <div className="w-16 h-16 bg-yellow-500 rounded-full flex items-center justify-center text-white text-2xl font-bold">1</div>
              </div>
              <h3 className="text-xl font-bold text-center text-gray-800 mb-4">Careful Selection</h3>
              <p className="text-gray-600 text-center">
                We meticulously select only the highest quality coffee cherries from our partner farms in Rwanda.
              </p>
            </div>
            <div className="bg-white p-8 rounded-lg shadow-md hover:shadow-lg transition-shadow">
              <div className="flex items-center justify-center mb-6">
                <div className="w-16 h-16 bg-yellow-500 rounded-full flex items-center justify-center text-white text-2xl font-bold">2</div>
              </div>
              <h3 className="text-xl font-bold text-center text-gray-800 mb-4">Expert Processing</h3>
              <p className="text-gray-600 text-center">
                Our experienced team processes the beans using traditional methods combined with modern techniques.
              </p>
            </div>
            <div className="bg-white p-8 rounded-lg shadow-md hover:shadow-lg transition-shadow">
              <div className="flex items-center justify-center mb-6">
                <div className="w-16 h-16 bg-yellow-500 rounded-full flex items-center justify-center text-white text-2xl font-bold">3</div>
              </div>
              <h3 className="text-xl font-bold text-center text-gray-800 mb-4">Artisanal Roasting</h3>
              <p className="text-gray-600 text-center">
                Each batch is roasted to perfection, bringing out the unique flavor profiles of our Rwandan beans.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Team Section - Added Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-6">
          <h2 className="text-4xl font-bold text-center text-yellow-600 mb-12">Meet Our Team</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="relative w-48 h-48 mx-auto mb-6 rounded-full overflow-hidden">
                <Image 
                  src="/images/person3.webp" 
                  alt="Team Member" 
                  fill
                  style={{objectFit: 'cover'}}
                  className="rounded-full"
                />
              </div>
              <h3 className="text-xl font-bold text-gray-800 mb-2">Sarah Johnson</h3>
              <p className="text-yellow-600 mb-4">Founder & Master Roaster</p>
              <p className="text-gray-600">
                With over 15 years of experience in coffee cultivation and roasting, Sarah leads our quality control team.
              </p>
            </div>
            <div className="text-center">
              <div className="relative w-48 h-48 mx-auto mb-6 rounded-full overflow-hidden">
                <Image 
                  src="/images/person1.webp" 
                  alt="Team Member" 
                  fill
                  style={{objectFit: 'cover'}}
                  className="rounded-full"
                />
              </div>
              <h3 className="text-xl font-bold text-gray-800 mb-2">Emmanuel Kagame</h3>
              <p className="text-yellow-600 mb-4">Head of Coffee Production</p>
              <p className="text-gray-600">
                Born and raised in Rwanda, Emmanuel brings authentic knowledge of local coffee traditions to our operations.
              </p>
            </div>
            <div className="text-center">
              <div className="relative w-48 h-48 mx-auto mb-6 rounded-full overflow-hidden">
                <Image 
                  src="/images/person2.webp" 
                  alt="Team Member" 
                  fill
                  style={{objectFit: 'cover'}}
                  className="rounded-full"
                />
              </div>
              <h3 className="text-xl font-bold text-gray-800 mb-2">Maria Santos</h3>
              <p className="text-yellow-600 mb-4">Coffee Sommelier</p>
              <p className="text-gray-600">
                A certified Q-grader with a refined palate, Maria ensures every batch meets our flavor standards.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-16 bg-gray-900 text-white">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-3xl font-bold mb-4">Join Us on This Coffee Journey</h2>
          <p className="mb-8 max-w-2xl mx-auto">
            At Uruyange Coffee, we believe that coffee is more than a beverage—it's an
            experience. Discover the perfect blend for your taste today.
          </p>
          <Link href="/ourcoffee" className="bg-yellow-500 hover:bg-yellow-600 text-white font-bold py-3 px-6 rounded shadow transition-colors">
            Explore Our Collection
          </Link>
        </div>
      </section>
    </div>
  );
};

export default About;