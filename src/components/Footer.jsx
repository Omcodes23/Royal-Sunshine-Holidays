import { Link } from 'react-router-dom';
import { 
  Phone, 
  Mail, 
  Facebook, 
  Twitter, 
  Instagram, 
  Youtube,
  Heart,
  ArrowUp
} from 'lucide-react';
import { motion } from 'framer-motion';
import { PinContainer } from './ui/3d-pin';
import './Footer.css';

const Footer = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const footerLinks = {
    usefulLinks: [
      { name: 'Blog', path: '/blog' },
      { name: 'About Us', path: '/about' },
      { name: 'Contact Us', path: '/contact' },
      { name: 'Privacy Policy', path: '/privacy' }
    ]
  };

  const socialLinks = [
    { icon: Facebook, href: '#', label: 'Facebook' },
    { icon: Twitter, href: '#', label: 'Twitter' },
    { icon: Instagram, href: '#', label: 'Instagram' },
    { icon: Youtube, href: '#', label: 'YouTube' }
  ];

  return (
         <footer className="bg-gray-50 text-gray-800 relative overflow-hidden">
      
      <div className="container-custom relative z-10">
                          {/* Main Footer Content */}
         <div className="py-12 lg:py-16">
                                               <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
                                                            {/* Column 1 - Location with 3D Animated Pin */}
                 <div className="text-left">
                   <div className="flex justify-center">
                                          <PinContainer
                        title="View on Maps"
                        href="https://maps.google.com/?q=FF-110,+Yash+Complex,+Gotri,+Vadodara,+Gujarat,+India"
                      >
                                                                                                                                                                                                                                                                                                                                                                                    <div className="flex basis-full flex-col p-3 lg:p-4 tracking-tight text-gray-700 sm:basis-1/2 w-[14rem] h-[18rem] lg:w-[16rem] lg:h-[20rem]">
                            <h3 className="max-w-xs !pb-2 !m-0 font-bold text-lg text-gray-900">
                              Royal Sunshine
                            </h3>
                            <div className="text-base !m-0 !p-0 font-normal mb-4">
                              <span className="text-gray-600">
                                FF-110, Yash Complex, Gotri, Vadodara, Gujarat, India
                              </span>
                            </div>
                            <iframe 
                              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d59041.094283173334!2d73.10446864162786!3d22.351046287768057!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x395fc9c4df8bd3d9%3A0x2819c58babb24e43!2sRoyal%20Sunshine!5e0!3m2!1sen!2sin!4v1754751813090!5m2!1sen!2sin" 
                              width="100%" 
                              height="100%" 
                              style={{border:0}} 
                              allowFullScreen="" 
                              loading="lazy" 
                              referrerPolicy="no-referrer-when-downgrade"
                              className="w-full h-full rounded-lg"
                            />
                          </div>
                      </PinContainer>
                   </div>
                 </div>

               {/* Column 2 - Contact Information */}
               <div className="text-left">
                <h4 className="text-base lg:text-lg font-semibold mb-4 lg:mb-6 text-gray-900">
                  Contact Information
                </h4>
                <div className="space-y-2 lg:space-y-3">
                  <div className="text-gray-600 text-sm">
                    +91 63544 86936
                  </div>
                  <div className="text-gray-600 text-sm break-all">
                    b2b@royalsunshines.com
                  </div>
                  <div className="text-gray-600 text-sm break-all">
                    jay@royalsunshines.com
                  </div>
                </div>
              </div>

              {/* Column 3 - Useful Links */}
              <div className="text-left">
                <h4 className="text-base lg:text-lg font-semibold mb-4 lg:mb-6 text-gray-900">
                  Useful Links
                </h4>
                <ul className="space-y-2 lg:space-y-3">
                  {footerLinks.usefulLinks.map((link) => (
                    <li key={link.name}>
                      <Link 
                        to={link.path}
                        className="text-gray-600 hover:text-primary-600 transition-colors duration-200 text-sm"
                      >
                        {link.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Column 4 - Social Links */}
              <div className="text-left">
                <h4 className="text-base lg:text-lg font-semibold mb-4 lg:mb-6 text-gray-900">
                  Social with us
                </h4>
                <div className="flex items-center space-x-3 lg:space-x-4">
                  {socialLinks.map((social) => (
                    <motion.a
                      key={social.label}
                      href={social.href}
                      className="w-9 h-9 lg:w-10 lg:h-10 bg-primary-100 hover:bg-primary-200 rounded-full flex items-center justify-center text-primary-600 hover:text-primary-700 transition-all duration-200 transform hover:scale-110"
                      whileHover={{ y: -2 }}
                      aria-label={social.label}
                    >
                      <social.icon className="w-4 h-4 lg:w-5 lg:h-5" />
                    </motion.a>
                  ))}
                </div>
              </div>
            </div>
         </div>
       </div>

       {/* Copyright Section - Completely Separate */}
       <div className="bg-gray-100 border-t border-gray-200">
         <div className="container-custom py-3 lg:py-4">
           <div className="text-center">
             <p className="text-gray-600 text-xs lg:text-sm">
               © 2025 Royal Sunshine Holidays. All Rights Reserved
             </p>
           </div>
         </div>
       </div>

              {/* Scroll to Top Button */}
        <motion.button
          onClick={scrollToTop}
          className="fixed bottom-4 right-4 lg:bottom-6 lg:right-6 w-10 h-10 lg:w-12 lg:h-12 bg-primary-600 hover:bg-primary-700 text-white rounded-full shadow-lg flex items-center justify-center transition-all duration-200 z-50 cursor-pointer"
          whileHover={{ scale: 1.1, y: -2 }}
          whileTap={{ scale: 0.9 }}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1 }}
          aria-label="Scroll to top"
        >
          <ArrowUp className="w-5 h-5 lg:w-6 lg:h-6" />
        </motion.button>
     </footer>
  );
};

export default Footer;
