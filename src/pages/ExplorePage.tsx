import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowRight, TrendingUp, Award, Gem, Star } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const ExplorePage: React.FC = () => {
  const heroRef = useRef<HTMLDivElement>(null);
  const storiesRef = useRef<HTMLDivElement>(null);
  const featuredRef = useRef<HTMLDivElement>(null);

  const stories = [
    {
      title: 'L\'Art de l\'Artisanat',
      subtitle: 'Derrière les bijoux',
      description: 'Chaque pièce est méticuleusement façonnée à la main par nos maîtres artisans burkinabè, alliant des techniques ancestrales à l\'innovation moderne.',
      image: '/story-hands.jpg',
    },
    {
      title: 'Sourcing Éthique',
      subtitle: 'Notre engagement',
      description: 'Nous collaborons avec des mines responsables pour garantir que chaque pierre précieuse répond à nos normes éthiques strictes.',
      image: '/featured-ring.jpg',
    },
    {
      title: 'Design Intemporel',
      subtitle: 'Collection Héritage',
      description: 'Inspirée par l\'élégance classique africaine, notre Collection Héritage est conçue pour être transmise de génération en génération.',
      image: '/detail-ring-1.jpg',
    },
  ];

  useEffect(() => {
    const heroCtx = gsap.context(() => {
      gsap.to('.explore-hero-bg', {
        yPercent: 30,
        ease: 'none',
        scrollTrigger: {
          trigger: heroRef.current,
          start: 'top top',
          end: 'bottom top',
          scrub: true,
        },
      });
    }, heroRef);

    gsap.fromTo('.story-card',
      { y: 80, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        stagger: 0.2,
        duration: 0.8,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: storiesRef.current,
          start: 'top 80%',
        },
      }
    );

    gsap.fromTo('.featured-item',
      { x: -60, opacity: 0 },
      {
        x: 0,
        opacity: 1,
        stagger: 0.15,
        duration: 0.7,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: featuredRef.current,
          start: 'top 75%',
        },
      }
    );

    return () => {
      heroCtx.revert();
    };
  }, []);

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <div ref={heroRef} className="relative h-[85vh] sm:h-screen overflow-hidden">
        <div className="explore-hero-bg absolute inset-0">
          <img 
            src="/hero-model.jpg" 
            alt="Explore"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/20 to-cora-white" />
        </div>
        
        <div className="relative h-full flex items-center justify-center text-center px-4 safe-area-inset">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-1.5 sm:gap-2 px-3 sm:px-4 py-1.5 sm:py-2 bg-white/10 backdrop-blur-sm border border-white/20 mb-4 sm:mb-6">
              <span className="text-cora-red text-xs">✦</span>
              <span className="text-white text-xs sm:text-sm uppercase tracking-widest">Découvrez l'Excellence</span>
            </div>
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-serif font-semibold text-white mb-4 sm:mb-6 leading-tight">
              Explorez le<br />Monde de Cora
            </h1>
            <p className="text-white/80 text-base sm:text-lg md:text-xl max-w-lg mx-auto mb-6 sm:mb-8 px-4">
              Un voyage à travers nos collections, nos histoires et l'artisanat derrière chaque pièce
            </p>
            <button className="bg-cora-red text-white px-6 sm:px-8 py-3 sm:py-4 rounded-none font-medium uppercase tracking-widest hover:bg-cora-black transition-colors flex items-center gap-2 mx-auto group touch-target text-xs sm:text-sm">
              Commencer
              <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5 transition-transform group-hover:translate-x-1" />
            </button>
          </div>
        </div>
        
        <div className="absolute bottom-6 sm:bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1.5 sm:gap-2">
          <span className="text-white/60 text-xs uppercase tracking-widest">Défiler</span>
          <div className="w-px h-10 sm:h-14 bg-white/30 relative overflow-hidden">
            <div className="w-full h-1/2 bg-white/80 animate-bounce absolute" />
          </div>
        </div>
      </div>

      {/* Stats Section */}
      <div className="py-8 sm:py-16 px-4 sm:px-[7vw] -mt-12 sm:-mt-20 relative z-10 safe-area-x">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-2 sm:gap-4">
          {[
            { icon: Gem, value: '500+', label: 'Designs Uniques' },
            { icon: Award, value: '25', label: 'Années d\'Excellence' },
            { icon: TrendingUp, value: '50K+', label: 'Clientes Satisfaites' },
            { icon: Star, value: '100%', label: 'Fait Main' },
          ].map(({ icon: Icon, value, label }) => (
            <div 
              key={label}
              className="bg-white rounded-none rounded-none rounded-none p-4 sm:p-6 md:p-8 shadow-none text-center group hover:shadow-none transition-all duration-300 hover:-translate-y-1"
            >
              <div className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 mx-auto mb-2 sm:mb-3 md:mb-4 rounded-none bg-cora-cream border border-cora-black/8 flex items-center justify-center group-hover:bg-cora-red group-hover:text-white group-hover:border-cora-red transition-colors">
                <Icon className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6" />
              </div>
              <p className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-serif font-bold text-cora-black mb-0.5 sm:mb-1">
                {value}
              </p>
              <p className="text-cora-gray text-xs sm:text-sm">{label}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Stories Section */}
      <div ref={storiesRef} className="py-8 sm:py-16 px-4 sm:px-[7vw] safe-area-x">
        <div className="text-center mb-8 sm:mb-12">
          <span className="cora-label mb-2 sm:mb-4 block">Nos Histoires</span>
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-serif font-semibold mb-3 sm:mb-4">
            Façonné avec Passion
          </h2>
          <p className="text-cora-gray max-w-xl mx-auto text-sm sm:text-base px-4">
            Découvrez les histoires derrière nos pièces les plus iconiques et les artisans qui les créent
          </p>
        </div>

        <div className="space-y-6 sm:space-y-8">
          {stories.map((story, index) => (
            <div 
              key={story.title}
              className={`story-card flex flex-col ${index % 2 === 0 ? 'lg:flex-row' : 'lg:flex-row-reverse'} gap-4 sm:gap-6 lg:gap-8 items-center`}
            >
              <div className="flex-1 relative aspect-[4/3] rounded-none rounded-none rounded-none overflow-hidden group w-full">
                <img 
                  src={story.image} 
                  alt={story.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
              </div>
              
              <div className="flex-1 space-y-2 sm:space-y-4 px-2 sm:px-0">
                <span className="text-cora-red text-xs sm:text-sm font-medium uppercase tracking-wider">
                  {story.subtitle}
                </span>
                <h3 className="text-xl sm:text-2xl md:text-3xl font-serif font-semibold">
                  {story.title}
                </h3>
                <p className="text-cora-gray leading-relaxed text-sm sm:text-base">
                  {story.description}
                </p>
                <button className="flex items-center gap-1.5 sm:gap-2 text-cora-black font-medium group/btn text-sm sm:text-base touch-target">
                  Lire la suite
                  <ArrowRight className="w-4 h-4 transition-transform group-hover/btn:translate-x-1" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Featured Collections */}
      <div ref={featuredRef} className="py-8 sm:py-16 px-4 sm:px-[7vw] bg-cora-cream/50 safe-area-x">
        <div className="text-center mb-8 sm:mb-12">
          <span className="cora-label mb-2 sm:mb-4 block">Collections</span>
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-serif font-semibold mb-3 sm:mb-4">
            Curated Pour Vous
          </h2>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4 md:gap-6">
          {[
            { name: 'Fleur du Sahel', image: '/collection-rings.jpg', count: 12 },
            { name: 'Rubis de Minuit', image: '/collection-earrings.jpg', count: 8 },
            { name: 'Heure Dorée', image: '/collection-necklaces.jpg', count: 15 },
            { name: 'Héritage Royal', image: '/collection-bracelets.jpg', count: 10 },
            { name: 'Moderne Classique', image: '/collection-watches.jpg', count: 6 },
            { name: 'Coffrets Cadeaux', image: '/collection-gifts.jpg', count: 20 },
          ].map((collection) => (
            <div 
              key={collection.name}
              className="featured-item group relative aspect-[4/5] rounded-none rounded-none rounded-none overflow-hidden cursor-pointer"
            >
              <img 
                src={collection.image} 
                alt={collection.name}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
              
              <div className="absolute bottom-0 left-0 right-0 p-3 sm:p-4 md:p-6">
                <h3 className="text-white text-base sm:text-lg md:text-xl font-serif font-semibold mb-0.5 sm:mb-1">
                  {collection.name}
                </h3>
                <p className="text-white/70 text-xs sm:text-sm">{collection.count} pièces</p>
              </div>
              
              <div className="absolute top-2 sm:top-3 right-2 sm:right-3 md:top-4 md:right-4 w-8 h-8 sm:w-10 sm:h-10 rounded-none bg-white/20 backdrop-blur-sm border border-white/30 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 translate-y-2 group-hover:translate-y-0">
                <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Newsletter */}
      <div className="py-8 sm:py-16 px-4 sm:px-[7vw] safe-area-x">
        <div className="relative overflow-hidden bg-cora-black text-white p-8 sm:p-12 md:p-16 text-center">
          {/* Background texture */}
          <div className="absolute inset-0 opacity-15">
            <img 
              src="/detail-ring-3.jpg" 
              alt=""
              className="w-full h-full object-cover"
            />
          </div>

          {/* Grain overlay for Pinterest depth effect */}
          <div className="absolute inset-0 opacity-[0.04]" style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`
          }} />
          
          <div className="relative z-10 max-w-lg mx-auto">

            {/* letter.png icon — replaces the sparkles */}
            <div className="flex justify-center mb-5 sm:mb-7">
              <img
                src="/letter.png"
                alt="Newsletter"
                className="w-16 h-16 sm:w-20 sm:h-20 object-contain drop-shadow-[0_4px_24px_rgba(216,27,46,0.35)]"
                style={{ filter: 'drop-shadow(0 2px 12px rgba(216,27,46,0.25))' }}
              />
            </div>

            {/* Trending Pinterest/Canva typo:
                — eyebrow: ultra-spaced tracking, tiny caps
                — headline: romantic italic serif, no bold
                — sub: featherweight sans, wide letter-spacing */}
            <p className="text-cora-red text-[10px] sm:text-xs uppercase tracking-[0.35em] mb-3 font-light">
              Accès Exclusif
            </p>

            <h2
              className="mb-4 sm:mb-5 leading-tight"
              style={{
                fontFamily: "'Cormorant Garamond', serif",
                fontSize: 'clamp(1.75rem, 5vw, 3rem)',
                fontWeight: 300,
                fontStyle: 'italic',
                letterSpacing: '-0.01em',
              }}
            >
              Rejoignez le<br />
              <span style={{ fontWeight: 500, fontStyle: 'normal' }}>Cercle Privilégié</span>
            </h2>

            <p
              className="text-white/55 mb-8 sm:mb-10 px-2"
              style={{
                fontFamily: "'Outfit', sans-serif",
                fontWeight: 300,
                fontSize: 'clamp(0.75rem, 2vw, 0.9rem)',
                letterSpacing: '0.04em',
                lineHeight: 1.8,
              }}
            >
              Collections en avant-première · Offres réservées aux membres<br className="hidden sm:inline" />
              et contenus inspirants livrés dans votre boîte mail
            </p>
            
            {/* Input row */}
            <div className="flex flex-col sm:flex-row gap-0 max-w-md mx-auto">
              <input 
                type="email"
                placeholder="votre@email.com"
                className="flex-1 px-5 py-3.5 bg-white/8 border border-white/15 text-white placeholder:text-white/30 focus:outline-none focus:border-cora-red transition-colors text-sm tracking-wide"
                style={{ fontFamily: "'Outfit', sans-serif", fontWeight: 300 }}
              />
              <button
                className="px-7 py-3.5 bg-cora-red text-white text-[11px] uppercase tracking-[0.2em] font-medium hover:bg-white hover:text-cora-red transition-all duration-300"
                style={{ fontFamily: "'Outfit', sans-serif" }}
              >
                S'abonner
              </button>
            </div>

            {/* Social proof micro-copy */}
            <p className="mt-4 text-white/25 text-[10px] tracking-widest uppercase">
              +2 400 membres · Sans spam · Désabonnement libre
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ExplorePage;
