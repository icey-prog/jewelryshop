import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowRight, Award, Star, Check } from 'lucide-react';
import { brands } from '../data/products';

gsap.registerPlugin(ScrollTrigger);

const BrandsPage: React.FC = () => {
  const heroRef = useRef<HTMLDivElement>(null);
  const brandsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.fromTo('.brand-card',
      { y: 60, opacity: 0, scale: 0.95 },
      {
        y: 0,
        opacity: 1,
        scale: 1,
        stagger: 0.15,
        duration: 0.7,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: brandsRef.current,
          start: 'top 80%',
        },
      }
    );

    gsap.fromTo('.partner-logo',
      { opacity: 0, y: 20 },
      {
        opacity: 1,
        y: 0,
        stagger: 0.1,
        duration: 0.5,
        scrollTrigger: {
          trigger: '.partners-section',
          start: 'top 85%',
        },
      }
    );
  }, []);

  return (
    <div className="min-h-screen">
      {/* Hero */}
      <div ref={heroRef} className="relative h-[50vh] min-h-[400px] overflow-hidden">
        <img 
          src="/featured-ring.jpg" 
          alt="Brands"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/60 to-black/30" />
        
        <div className="absolute inset-0 flex items-center px-4 sm:px-[7vw]">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-sm border border-white/20 mb-6">
              <Award className="w-4 h-4 text-cora-red" />
              <span className="text-white text-xs uppercase tracking-widest">Premium Partners</span>
            </div>
            <h1 className="text-4xl sm:text-6xl font-serif font-semibold text-white mb-4 leading-tight">
              Our Curated<br />Brands
            </h1>
            <p className="text-white/80 text-lg max-w-lg">
              We partner with the world's finest jewelry houses to bring you exceptional craftsmanship
            </p>
          </div>
        </div>
      </div>

      {/* Featured Brands */}
      <div ref={brandsRef} className="py-16 px-4 sm:px-[7vw]">
        <div className="text-center mb-12">
          <span className="cora-label mb-4 block">Featured</span>
          <h2 className="text-4xl sm:text-5xl font-serif font-semibold mb-4">
            Partner Brands
          </h2>
          <p className="text-cora-gray max-w-xl mx-auto">
            Each brand in our collection represents the pinnacle of jewelry craftsmanship
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {brands.map((brand) => (
            <div 
              key={brand.name}
              className="brand-card group relative rounded-none rounded-none overflow-hidden cursor-pointer"
            >
              <div className="aspect-[16/10] overflow-hidden">
                <img 
                  src={brand.image} 
                  alt={brand.name}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
              </div>
              
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
              
              <div className="absolute bottom-0 left-0 right-0 p-6 sm:p-8">
                <div className="flex items-start justify-between">
                  <div>
                    <h3 className="text-white text-2xl sm:text-3xl font-serif font-semibold mb-2">
                      {brand.name}
                    </h3>
                    <p className="text-white/70">{brand.description}</p>
                  </div>
                  
                  <div className="w-12 h-12 rounded-none bg-white/20 backdrop-blur-sm border border-white/30 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 translate-x-4 group-hover:translate-x-0">
                    <ArrowRight className="w-6 h-6 text-white" />
                  </div>
                </div>
              </div>
              
              {/* Badge */}
              <div className="absolute top-4 left-4 px-3 py-1 bg-cora-red text-white text-xs font-medium uppercase tracking-widest rounded-none">
                Premium
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Why Choose Us */}
      <div className="py-16 px-4 sm:px-[7vw] bg-cora-cream/50">
        <div className="text-center mb-12">
          <span className="cora-label mb-4 block">Quality</span>
          <h2 className="text-4xl sm:text-5xl font-serif font-semibold mb-4">
            The Cora Standard
          </h2>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            { 
              title: 'Certified Authentic', 
              description: 'Every piece comes with a certificate of authenticity',
              icon: Check 
            },
            { 
              title: 'Lifetime Warranty', 
              description: 'We stand behind our craftsmanship forever',
              icon: Star 
            },
            { 
              title: 'Ethical Sourcing', 
              description: 'Conflict-free gemstones and recycled metals',
              icon: Check 
            },
            { 
              title: 'Expert Craftsmen', 
              description: '25+ years of experience in every piece',
              icon: Star 
            },
          ].map(({ title, description, icon: Icon }) => (
            <div 
              key={title}
              className="bg-white rounded-none p-6 text-center group hover:shadow-none transition-all duration-300 hover:-translate-y-1"
            >
              <div className="w-14 h-14 mx-auto mb-4 rounded-none bg-cora-cream border border-cora-black/8 flex items-center justify-center group-hover:bg-cora-red group-hover:text-white group-hover:border-cora-red transition-colors">
                <Icon className="w-6 h-6" />
              </div>
              <h3 className="font-serif font-semibold text-lg mb-2">{title}</h3>
              <p className="text-cora-gray text-sm">{description}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Partner Logos */}
      <div className="partners-section py-16 px-4 sm:px-[7vw]">
        <div className="text-center mb-12">
          <span className="cora-label mb-4 block">Collaborations</span>
          <h2 className="text-3xl sm:text-4xl font-serif font-semibold mb-4">
            Trusted By Industry Leaders
          </h2>
        </div>

        <div className="flex flex-wrap justify-center items-center gap-8 sm:gap-16">
          {['Tiffany & Co.', 'Cartier', 'Bvlgari', 'Van Cleef', 'Chopard'].map((brand) => (
            <div 
              key={brand}
              className="partner-logo text-2xl font-serif text-cora-gray/40 hover:text-cora-black transition-colors cursor-pointer"
            >
              {brand}
            </div>
          ))}
        </div>
      </div>

      {/* CTA */}
      <div className="py-16 px-4 sm:px-[7vw]">
        <div className="relative rounded-none overflow-hidden bg-cora-red text-white p-8 sm:p-16 text-center">
          <div className="relative z-10 max-w-2xl mx-auto">
            <h2 className="text-3xl sm:text-4xl font-serif font-semibold mb-4">
              Become a Partner
            </h2>
            <p className="text-white/80 mb-8">
              Are you a jewelry brand looking to reach discerning customers? Let's collaborate.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="bg-white text-cora-red px-8 py-4 rounded-none font-medium uppercase tracking-widest text-sm hover:bg-cora-black hover:text-white transition-colors">
                Apply Now
              </button>
              <button className="border border-white/40 text-white px-8 py-4 rounded-none font-medium uppercase tracking-widest text-sm hover:bg-white/10 transition-colors">
                Learn More
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BrandsPage;
