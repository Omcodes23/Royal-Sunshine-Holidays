import { Link } from 'react-router-dom';
import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { motion } from 'framer-motion';
import { 
  MapPin, 
  Award, 
  Phone, 
  Calendar,
  ArrowRight,
  Shield,
  Heart
} from 'lucide-react';

import { CardBody, CardContainer, CardItem } from '../components/ui/3d-card';
import { Marquee } from '../components/magicui/marquee';
import { Particles } from '../components/magicui/particles';
import { ImageCursorTrail } from '../components/ui/image-cursortrail';
import { cn } from '../lib/utils';
import './Home.css';

// Travel images for cursor trail - Hotels and Mountains from Simla/Manali, India
const travelImages = [
  "https://images.unsplash.com/photo-1652501834567-937de29c4533?q=80&w=435&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  "https://media.istockphoto.com/id/1352885715/photo/key-monastery-in-lahaul-spiti-valley-india.webp?a=1&b=1&s=612x612&w=0&k=20&c=gAib9vCW-rTJaEWPDyj3fpILjdVDykvuB_SdDeiYpWU=",
  "https://media.istockphoto.com/id/1187136225/photo/houses-on-dharamshala-mountains-himachal-pradesh-india.webp?a=1&b=1&s=612x612&w=0&k=20&c=bIgxwT4fFBZpbOgoixQLErGu-HtX7skxyAoWh_1f2Xw=",
  "https://media.istockphoto.com/id/1091491850/photo/view-of-shimla-india.webp?a=1&b=1&s=612x612&w=0&k=20&c=N6BDcZrRroOPEG7vz0faxhpPmUb82pkYx8OERcJdEng=",
  "https://images.unsplash.com/photo-1706696435436-200ba23cda35?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Njh8fGhpbWFjaGFsJTIwcHJhZGVzaHxlbnwwfHwwfHx8MA%3D%3D",
  "https://images.unsplash.com/photo-1652501834567-937de29c4533?q=80&w=435&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  "https://images.unsplash.com/photo-1669362590089-b715e797c293?q=80&w=464&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  "https://images.unsplash.com/photo-1469474968028-56623f02e42e?q=80&w=2074&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?q=80&w=2560&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
];

// Register GSAP plugins
gsap.registerPlugin(ScrollTrigger);

function Home() {
  const heroRef = useRef(null);
  const featuresRef = useRef(null);
  const destinationsRef = useRef(null);
  const hotelsRef = useRef(null);

  useEffect(() => {
    // Hero animation
    const heroTl = gsap.timeline();
    heroTl
      .fromTo(heroRef.current, 
        { opacity: 0, y: 50 }, 
        { opacity: 1, y: 0, duration: 1, ease: "power2.out" }
      )
      .fromTo('.hero-title', 
        { opacity: 0, y: 30 }, 
        { opacity: 1, y: 0, duration: 0.8, ease: "power2.out" }, "-=0.5"
      )
      .fromTo('.hero-subtitle', 
        { opacity: 0, y: 20 }, 
        { opacity: 1, y: 0, duration: 0.8, ease: "power2.out" }, "-=0.6"
      )
      .fromTo('.hero-cta', 
        { opacity: 0, scale: 0.8 }, 
        { opacity: 1, scale: 1, duration: 0.6, ease: "back.out(1.7)" }, "-=0.4"
      );

    // Stats animation - removed since stats section doesn't exist in JSX
    
    // Features animation
    gsap.fromTo('.group', 
      { opacity: 0, y: 50, rotationY: 15 }, 
      { 
        opacity: 1, 
        y: 0, 
        rotationY: 0, 
        duration: 1, 
        stagger: 0.2,
        ease: "power2.out",
        scrollTrigger: {
          trigger: featuresRef.current,
          start: "top 80%",
          end: "bottom 20%",
          toggleActions: "play none none reverse"
        }
      }
    );

    // Destinations animation
    gsap.fromTo('.destination-card', 
      { opacity: 0, y: 60, scale: 0.9 }, 
      { 
        opacity: 1, 
        y: 0, 
        scale: 1, 
        duration: 0.8, 
        stagger: 0.15,
        ease: "power2.out",
        scrollTrigger: {
          trigger: destinationsRef.current,
          start: "top 80%",
          end: "bottom 20%",
          toggleActions: "play none none reverse"
        }
      }
    );

    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);



  const features = [
    {
      icon: Shield,
      title: "Safe & Secure",
      description: "Your safety is our top priority with comprehensive travel insurance and 24/7 support."
    },
    {
      icon: Heart,
      title: "Personalized Service",
      description: "We tailor each journey to your preferences and travel style for a unique experience."
    },
    {
      icon: Award,
      title: "Premium Quality",
      description: "Curated experiences with handpicked accommodations and expert local guides."
    }
  ];

  const destinations = [
    {
      name: "Himachal Pradesh",
      image: "https://s7ap1.scene7.com/is/image/incredibleindia/manu-temple-manali-1-city-hero?qlt=82&ts=1726731244457",
      description: "Land of snow-capped peaks, lush valleys, and ancient temples. Experience the magic of Shimla, Manali, and Dharamshala.",
      callToAction: "Explore Himachal",
      link: "/himachal-pradesh"
    },
    {
      name: "Uttarakhand",
      image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      description: "Dev Bhoomi - Land of Gods. Discover Rishikesh, Haridwar, and the sacred Char Dham pilgrimage sites.",
      callToAction: "Explore Uttarakhand",
      link: "/uttarakhand"
    }
  ];



  const affiliatedHotels = [
    {
      name: "Affiliated Hotel 1",
      logo: "/assets/affiliated/1.png",
      description: "Premium accommodation partner"
    },
    {
      name: "Affiliated Hotel 2",
      logo: "/assets/affiliated/2.png",
      description: "Luxury hospitality partner"
    },
    {
      name: "Affiliated Hotel 3",
      logo: "/assets/affiliated/3.png",
      description: "Exclusive stay partner"
    },
    {
      name: "Affiliated Hotel 4",
      logo: "/assets/affiliated/4.png",
      description: "Premium lodging partner"
    },
    {
      name: "Affiliated Hotel 5",
      logo: "/assets/affiliated/5.png",
      description: "Luxury accommodation partner"
    },
    {
      name: "Affiliated Hotel 6",
      logo: "/assets/affiliated/6.png",
      description: "Premium hospitality partner"
    },
    {
      name: "Affiliated Hotel 7",
      logo: "/assets/affiliated/7.png",
      description: "Exclusive accommodation partner"
    },
    {
      name: "Affiliated Hotel 8",
      logo: "/assets/affiliated/8.png",
      description: "Luxury stay partner"
    },
    {
      name: "Affiliated Hotel 9",
      logo: "/assets/affiliated/9.png",
      description: "Premium lodging partner"
    },
    {
      name: "Affiliated Hotel 10",
      logo: "/assets/affiliated/10.png",
      description: "Luxury accommodation partner"
    },
    {
      name: "Affiliated Hotel 11",
      logo: "/assets/affiliated/11.png",
      description: "Exclusive hospitality partner"
    },
    {
      name: "Affiliated Hotel 12",
      logo: "/assets/affiliated/12.png",
      description: "Premium stay partner"
    },
    {
      name: "Affiliated Hotel 13",
      logo: "/assets/affiliated/13.png",
      description: "Luxury lodging partner"
    },
    {
      name: "Affiliated Hotel 14",
      logo: "/assets/affiliated/14.png",
      description: "Exclusive accommodation partner"
    },
    {
      name: "Affiliated Hotel 15",
      logo: "/assets/affiliated/15.png",
      description: "Premium hospitality partner"
    },
    {
      name: "Affiliated Hotel 16",
      logo: "/assets/affiliated/16.png",
      description: "Luxury stay partner"
    },
    {
      name: "Affiliated Hotel 17",
      logo: "/assets/affiliated/17.png",
      description: "Exclusive lodging partner"
    },
    {
      name: "Affiliated Hotel 18",
      logo: "/assets/affiliated/18.png",
      description: "Premium accommodation partner"
    },
    {
      name: "Affiliated Hotel 19",
      logo: "/assets/affiliated/19.png",
      description: "Luxury hospitality partner"
    },
    {
      name: "Affiliated Hotel 20",
      logo: "/assets/affiliated/20.png",
      description: "Exclusive stay partner"
    },
    {
      name: "Affiliated Hotel 21",
      logo: "/assets/affiliated/21.png",
      description: "Premium lodging partner"
    },
    {
      name: "Affiliated Hotel 22",
      logo: "/assets/affiliated/22.png",
      description: "Luxury accommodation partner"
    },
    {
      name: "Affiliated Hotel 23",
      logo: "/assets/affiliated/23.png",
      description: "Exclusive hospitality partner"
    },
    {
      name: "Affiliated Hotel 24",
      logo: "/assets/affiliated/24.png",
      description: "Premium stay partner"
    },
    {
      name: "Affiliated Hotel 25",
      logo: "/assets/affiliated/25.png",
      description: "Luxury lodging partner"
    },
    {
      name: "Affiliated Hotel 26",
      logo: "/assets/affiliated/26.png",
      description: "Exclusive accommodation partner"
    },
    {
      name: "Affiliated Hotel 27",
      logo: "/assets/affiliated/27.png",
      description: "Premium hospitality partner"
    },
    {
      name: "Affiliated Hotel 28",
      logo: "/assets/affiliated/28.png",
      description: "Luxury stay partner"
    },
    {
      name: "Affiliated Hotel 29",
      logo: "/assets/affiliated/29.png",
      description: "Exclusive lodging partner"
    },
    {
      name: "Affiliated Hotel 30",
      logo: "/assets/affiliated/30.png",
      description: "Premium accommodation partner"
    },
    {
      name: "Affiliated Hotel 31",
      logo: "/assets/affiliated/31.png",
      description: "Luxury hospitality partner"
    },
    {
      name: "Affiliated Hotel 32",
      logo: "/assets/affiliated/32.png",
      description: "Exclusive stay partner"
    },
    {
      name: "Affiliated Hotel 33",
      logo: "/assets/affiliated/33.png",
      description: "Premium lodging partner"
    },
    {
      name: "Affiliated Hotel 34",
      logo: "/assets/affiliated/34.png",
      description: "Luxury accommodation partner"
    },
    {
      name: "Affiliated Hotel 35",
      logo: "/assets/affiliated/35.png",
      description: "Exclusive hospitality partner"
    },
    {
      name: "Affiliated Hotel 36",
      logo: "/assets/affiliated/36.png",
      description: "Premium stay partner"
    },
    {
      name: "Affiliated Hotel 37",
      logo: "/assets/affiliated/37.png",
      description: "Luxury lodging partner"
    }
  ];

  const firstRow = affiliatedHotels.slice(0, Math.ceil(affiliatedHotels.length / 2));
  const secondRow = affiliatedHotels.slice(Math.ceil(affiliatedHotels.length / 2));

  // Remove the duplicate image logic - just use the original arrays
  // The Marquee component will handle the infinite scroll internally

  const HotelCard = ({ logo, name, description }) => {
    return (
      <div className="mx-4 sm:mx-6 lg:mx-8">
        <div className="relative w-40 h-24 sm:w-48 sm:h-32 lg:w-56 lg:h-36 cursor-pointer overflow-visible rounded-2xl transition-all duration-300 hover:scale-105">
          <img 
            className="w-full h-full object-contain rounded-2xl" 
            alt={name} 
            src={logo} 
          />
        </div>
      </div>
    );
  };

  return (
    <div className="home-page pt-20">
      {/* Hero Section */}
      <section ref={heroRef} className="relative min-h-screen flex items-center justify-center overflow-hidden -mt-20 pt-20">
        <div className="absolute inset-0 bg-primary-900/10 z-0"></div>
        
        {/* Particles Background - Lowest z-index */}
        <div className="absolute inset-0 z-0">
          <Particles
            className="particles-canvas"
            quantity={300}
            ease={60}
            staticity={80}
            color="#0066cc"
            refresh
          />
        </div>
        
        {/* Image Cursor Trail - Behind the text */}
        <ImageCursorTrail
          items={travelImages}
          maxNumberOfImages={10}
          distance={25}
          imgClass="sm:w-40 w-28 sm:h-48 h-36"
          className="absolute inset-0 z-10 h-full w-full"
        >
          {/* Content overlay - Highest z-index */}
          <div className="text-center text-white px-4 max-w-4xl mx-auto relative z-[100] flex flex-col justify-center items-center h-full">
            <motion.h1 
              className="hero-title text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold mb-4 sm:mb-6 leading-tight drop-shadow-2xl"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              Discover India with{' '}
              <span className="text-primary-400">
                Royal Sunshine
              </span>
            </motion.h1>
            
            <motion.p 
              className="hero-subtitle text-base sm:text-lg md:text-xl lg:text-2xl mb-6 sm:mb-8 text-gray-200 max-w-3xl mx-auto leading-relaxed drop-shadow-lg px-2"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              Experience the magic of India through our curated travel packages. 
              From the majestic Himalayas to pristine beaches, we bring your dreams to life.
            </motion.p>
            
            <motion.div 
              className="hero-cta flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center items-center"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.6 }}
            >
              <Link to="/packages" className="btn bg-primary-500 hover:bg-primary-600 text-base sm:text-lg px-6 sm:px-8 py-3 sm:py-4 shadow-lg">
                Explore Packages
                <ArrowRight className="ml-2 w-4 h-4 sm:w-5 sm:h-5" />
              </Link>
              
            </motion.div>
          </div>
        </ImageCursorTrail>
      </section>

      {/* Features Section */}
      <section ref={featuresRef} className="py-12 sm:py-16 lg:py-20 bg-gray-50">
        <div className="container-custom">
          <motion.h2 
            className="section-title text-center mb-12 sm:mb-16 lg:mb-20"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            Why Choose <span className="text-primary-500">Royal Sunshine</span>?
          </motion.h2>
          
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 lg:gap-10">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                className="group"
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ y: -15, scale: 1.02 }}
              >
                <CardContainer className="inter-var">
                  <CardBody className="bg-white relative group/card hover:shadow-2xl hover:shadow-primary-500/[0.1] border-black/[0.1] w-auto h-auto rounded-2xl p-6 sm:p-8 border transition-all duration-500 hover:border-primary-500/20">
                    <CardItem
                      translateZ="50"
                      className="text-xl sm:text-2xl font-bold text-gray-900 mb-3 sm:mb-4 group-hover:text-primary-600 transition-colors duration-300"
                    >
                      {feature.title}
                    </CardItem>
                    
                    <CardItem
                      as="p"
                      translateZ="60"
                      className="text-gray-600 text-sm sm:text-base leading-relaxed mb-4 sm:mb-6 group-hover:text-gray-700 transition-colors duration-300"
                    >
                      {feature.description}
                    </CardItem>
                    
                    <CardItem 
                      translateZ="100" 
                      className="w-full mb-4 sm:mb-6"
                    >
                      <div className="w-20 h-20 sm:w-24 sm:h-24 mx-auto bg-gradient-to-br from-primary-500 to-primary-600 rounded-2xl flex items-center justify-center group-hover:scale-110 group-hover:rotate-3 transition-all duration-500 shadow-lg group-hover:shadow-primary-500/25">
                        <feature.icon className="w-10 h-10 sm:w-12 sm:h-12 text-white group-hover:scale-110 transition-transform duration-300" />
                      </div>
                    </CardItem>
                    
                    {/* Floating elements for extra interactivity */}
                    <div className="absolute -top-2 -right-2 w-4 h-4 bg-primary-400 rounded-full opacity-0 group-hover:opacity-100 transition-all duration-500 group-hover:animate-pulse"></div>
                    <div className="absolute -bottom-2 -left-2 w-3 h-3 bg-primary-300 rounded-full opacity-0 group-hover:opacity-100 transition-all duration-500 delay-100 group-hover:animate-bounce"></div>
                  </CardBody>
                </CardContainer>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Explore Our Destinations Section */}
      <section ref={destinationsRef} className="py-12 sm:py-16 lg:py-20 bg-white">
        <div className="container-custom">
          <motion.h2 
            className="section-title text-center mb-12 sm:mb-16 lg:mb-20"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            Explore Our <span className="text-primary-500">Destinations</span>
          </motion.h2>
          
          <div className="grid sm:grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-12 lg:gap-20 max-w-5xl mx-auto">
            {destinations.map((destination, index) => (
              <motion.div
                key={index}
                className="group cursor-pointer"
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ y: -15, scale: 1.02 }}
                onClick={() => window.location.href = '/packages'}
              >
                <CardContainer className="inter-var">
                  <CardBody className="bg-gray-50 relative group/card hover:shadow-2xl hover:shadow-primary-500/[0.1] border-black/[0.1] w-auto h-auto rounded-2xl p-6 sm:p-8 border transition-all duration-500 hover:border-primary-500/20">
                    <CardItem
                      translateZ="50"
                      className="text-lg sm:text-xl font-bold text-neutral-600 text-center group-hover:text-primary-600 transition-colors duration-300"
                    >
                      {destination.name}
                    </CardItem>
                    <CardItem
                      as="p"
                      translateZ="60"
                      className="text-neutral-500 text-sm max-w-sm mt-2 text-center group-hover:text-gray-700 transition-colors duration-300"
                    >
                      {destination.description}
                    </CardItem>
                    <CardItem translateZ="100" className="w-full mt-4">
                      <img
                        src={destination.image}
                        height="1000"
                        width="1000"
                        className="h-48 sm:h-60 w-full object-cover rounded-xl group-hover/card:shadow-xl transition-transform duration-300 group-hover:scale-105"
                        alt={destination.name} />
                    </CardItem>
                    
                    <div className="flex justify-center items-center mt-12 sm:mt-16 lg:mt-20">
                      <CardItem
                        translateZ={20}
                        className="px-4 sm:px-6 py-2 sm:py-3 rounded-xl text-xs sm:text-sm font-semibold text-white bg-primary-600 hover:bg-primary-700 transition-colors duration-300 cursor-pointer group-hover:scale-105">
                        Explore Now →
                      </CardItem>
                    </div>
                    
                    {/* Floating elements for extra interactivity */}
                    <div className="absolute -top-2 -right-2 w-4 h-4 bg-primary-400 rounded-full opacity-0 group-hover:opacity-100 transition-all duration-500 group-hover:animate-pulse"></div>
                    <div className="absolute -bottom-2 -left-2 w-3 h-3 bg-primary-300 rounded-full opacity-0 group-hover:opacity-100 transition-all duration-500 delay-100 group-hover:animate-bounce"></div>
                  </CardBody>
                </CardContainer>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      

      {/* Affiliated Hotels Section */}
      <section ref={hotelsRef} className="py-12 sm:py-16 lg:py-20 bg-gray-50 relative overflow-hidden affiliated-hotels-section">
        <div className="container-custom relative z-10">
          <motion.h2 
            className="section-title text-gray-900 text-center mb-12 sm:mb-16"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            Our <span className="text-primary-500">Affiliated Hotels</span>
          </motion.h2>
          
          <div className="relative flex w-full flex-col items-center justify-center">
            <div className="w-full mb-12 sm:mb-16 overflow-hidden marquee-container marquee-row">
              <Marquee key="first-marquee" pauseOnHover speed={25}>
                {firstRow.map((hotel, index) => (
                  <HotelCard key={`first-${index}`} {...hotel} />
                ))}
              </Marquee>
            </div>
            
            {/* CSS-based infinite scroll for second row */}
            <div className="w-full overflow-hidden marquee-container marquee-row">
              <div className="second-row-scroll">
                <div className="scroll-content">
                  {secondRow.map((hotel, index) => (
                    <HotelCard key={`second-${index}`} {...hotel} />
                  ))}
                  {/* Duplicate for seamless loop */}
                  {secondRow.map((hotel, index) => (
                    <HotelCard key={`second-duplicate-${index}`} {...hotel} />
                  ))}
                </div>
              </div>
            </div>
            
            <div className="pointer-events-none absolute inset-y-0 left-0 w-full bg-gradient-to-r from-gray-50 via-gray-50/95 via-gray-50/85 via-gray-50/75 via-gray-50/65 via-gray-50/55 via-gray-50/45 via-gray-50/35 via-gray-50/25 via-gray-50/15 via-gray-50/8 via-gray-50/4 to-transparent backdrop-blur-3xl"></div>
            <div className="pointer-events-none absolute inset-y-0 right-0 w-full bg-gradient-to-l from-gray-50 via-gray-50/95 via-gray-50/85 via-gray-50/75 via-gray-50/65 via-gray-50/55 via-gray-50/45 via-gray-50/35 via-gray-50/25 via-gray-50/15 via-gray-50/8 via-gray-50/4 to-transparent backdrop-blur-3xl"></div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-12 sm:py-16 lg:py-20 bg-white">
        <div className="container-custom text-center">
          <motion.div
            className="max-w-3xl mx-auto"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-4 sm:mb-6">
              Ready to Start Your <span className="text-primary-500">Adventure</span>?
            </h2>
            <p className="text-base sm:text-lg text-gray-600 mb-6 sm:mb-8 px-4">
              Contact us today to plan your dream vacation. Our travel experts are here to help you create unforgettable memories.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center items-center">
              <Link to="/contact" className="btn bg-primary-500 hover:bg-primary-600 text-base sm:text-lg px-6 sm:px-8 py-3 sm:py-4 shadow-lg">
                Get in Touch
                <ArrowRight className="ml-2 w-4 h-4 sm:w-5 sm:h-5" />
              </Link>
              
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}

export default Home;
