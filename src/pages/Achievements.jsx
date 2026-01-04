import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { motion } from 'framer-motion';
import { CardBody, CardContainer, CardItem } from '../components/ui/3d-card';
import './Achievements.css';

gsap.registerPlugin(ScrollTrigger);

function Achievements() {
  const heroRef = useRef(null);
  const awardsRef = useRef(null);

  useEffect(() => {
    // Hero animation
    const heroTl = gsap.timeline();
    heroTl
      .fromTo(heroRef.current, 
        { opacity: 0, y: 50 }, 
        { opacity: 1, y: 0, duration: 1, ease: "power2.out" }
      )
      .fromTo('.achievements-hero-title', 
        { opacity: 0, y: 30 }, 
        { opacity: 1, y: 0, duration: 0.8, ease: "power2.out" }, "-=0.5"
      )
      .fromTo('.achievements-hero-subtitle', 
        { opacity: 0, y: 20 }, 
        { opacity: 1, y: 0, duration: 0.8, ease: "power2.out" }, "-=0.6"
      );

    // Awards animation
    gsap.fromTo('.award-card', 
      { opacity: 0, y: 60, scale: 0.9 }, 
      { 
        opacity: 1, 
        y: 0, 
        scale: 1, 
        duration: 0.8, 
        stagger: 0.15,
        ease: "power2.out",
        scrollTrigger: {
          trigger: awardsRef.current,
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

  const achievements = [
    {
      image: "/assets/awards/best seller1.png",
      title: "Best Seller",
      year: "2023-2024",
      description: "Recognized for excellence in travel services and Best seller Since 3 Years",
      badge: "Best Seller"
    },
    {
      image: "/assets/awards/best seller2.png",
      title: "Best Seller Award",
      year: "2023-2024",
      description: "Celebrated for outstanding service quality, ensuring memorable experiences for all travelers and Best Seller in 2023 - 2024.",
      badge: "Best Seller"
    },
    {
      image: "/assets/awards/trusted-provider.png",
      title: "Trusted Provider",
      year: "2024",
      description: "Acknowledged for commitment to integrity and dependability in Outstanding arrangements and sales in Whishling Pines resort and Spa.",
      badge: "Trusted Provider"
    },
    {
      image: "/assets/awards/excellent performance.png",
      title: "Excellence Performance",
      year: "2025-2026",
      description: "Recognized for excellence in travel services and rapid growth within the industry.",
      badge: "Excellent Performance"
    },
    {
      image: "/assets/awards/best b2b and dmc vadodara.png",
      title: "Best B2B & DMC",
      year: "2024",
      description: "Best B2B and DMC in Vadodara at 1st VTAA Awards",
      badge: "Best B2B & DMC"
    },
    {
      image: "/assets/awards/best seller himalaian heights.png",
      title: "Best Seller",
      year: "2023-2024",
      description: "Best seller at Himalayan Heights Groups",
      badge: "Best Seller"
    },
    {
      image: "/assets/awards/best b2b.png",
      title: "Best B2B & DMC",
      year: "2024",
      description: "Celebrated for outstanding service quality, as Best B2B and DMC in Vadodara.",
      badge: "Best B2B & DMC"
    },
    {
      image: "/assets/awards/trusted provier 3.png",
      title: "Trusted Provider",
      year: "2024",
      description: "Acknowledged for commitment to integrity and dependability in travel arrangements and support.",
      badge: "Trusted Provider"
    }
  ];

  return (
    <div className="achievements-page -mt-20 pt-20">
      {/* Hero Section */}
      <section ref={heroRef} className="relative min-h-[60vh] flex items-center justify-center overflow-hidden bg-gradient-to-br from-primary-600 to-primary-800">
        <div className="absolute inset-0 bg-black/10 z-0"></div>
        
        <div className="text-center text-white px-4 max-w-4xl mx-auto relative z-10">
          <motion.h1 
            className="achievements-hero-title text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-4 sm:mb-6 leading-tight"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            Our <span className="text-yellow-300">Achievements</span>
          </motion.h1>
          
          <motion.p 
            className="achievements-hero-subtitle text-base sm:text-lg md:text-xl mb-6 sm:mb-8 text-gray-100 max-w-3xl mx-auto leading-relaxed px-2"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            Celebrating our journey of excellence in the travel and tourism industry. 
            These awards represent our commitment to providing exceptional experiences to our valued customers.
          </motion.p>
        </div>
      </section>

      {/* Awards Section */}
      <section ref={awardsRef} className="py-12 sm:py-16 lg:py-20 bg-white">
        <div className="container-custom">
          <motion.div 
            className="text-center mb-12 sm:mb-16 lg:mb-20"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
              Awards & <span className="text-primary-500">Recognition</span>
            </h2>
            <p className="text-base sm:text-lg text-gray-600 max-w-3xl mx-auto">
              Our dedication to excellence has been recognized by industry leaders and satisfied customers worldwide.
            </p>
          </motion.div>
          
          <div className="grid sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-6 sm:gap-8 lg:gap-10">
            {achievements.map((achievement, index) => (
              <motion.div
                key={index}
                className="award-card group"
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ y: -15, scale: 1.02 }}
              >
                <CardContainer className="inter-var">
                  <CardBody className="bg-white relative group/card hover:shadow-2xl hover:shadow-primary-500/[0.12] border-black/[0.08] w-auto h-auto rounded-3xl p-6 sm:p-7 border transition-all duration-500 hover:border-primary-500/25">
                    {/* Badge */}
                    <div className="absolute -top-3 -right-3 bg-primary-600 text-white px-3 py-1 rounded-full text-xs font-bold shadow-lg z-10">
                      {achievement.badge}
                    </div>

                    {/* Award Image */}
                    <CardItem 
                      translateZ="100" 
                      className="w-full mb-5"
                    >
                      <div className="relative w-full h-60 sm:h-72 overflow-hidden rounded-2xl group-hover:shadow-xl transition-all duration-300">
                        <img 
                          src={achievement.image} 
                          alt={achievement.title}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                      </div>
                    </CardItem>

                    {/* Title */}
                    <CardItem
                      translateZ="50"
                      className="text-xl sm:text-2xl font-bold text-gray-900 mb-2 text-center group-hover:text-primary-600 transition-colors duration-300"
                    >
                      {achievement.title}
                    </CardItem>
                    
                    {/* Year */}
                    <CardItem
                      translateZ="40"
                      className="text-sm sm:text-base text-primary-600 font-semibold mb-3 text-center"
                    >
                      {achievement.year}
                    </CardItem>
                    
                    {/* Description */}
                    <CardItem
                      as="p"
                      translateZ="60"
                      className="text-gray-600 text-xs sm:text-sm leading-relaxed text-center group-hover:text-gray-700 transition-colors duration-300"
                    >
                      {achievement.description}
                    </CardItem>
                    
                    {/* Floating elements for extra interactivity */}
                    <div className="absolute -top-2 -left-2 w-4 h-4 bg-yellow-400 rounded-full opacity-0 group-hover:opacity-100 transition-all duration-500 group-hover:animate-pulse"></div>
                    <div className="absolute -bottom-2 -right-2 w-3 h-3 bg-yellow-300 rounded-full opacity-0 group-hover:opacity-100 transition-all duration-500 delay-100 group-hover:animate-bounce"></div>
                  </CardBody>
                </CardContainer>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

export default Achievements;
