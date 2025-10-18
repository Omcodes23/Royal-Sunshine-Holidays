import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Phone } from 'lucide-react';
import './Navbar.css';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu when route changes
  useEffect(() => {
    setIsOpen(false);
  }, [location.pathname]);

  // Close mobile menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (isOpen && !event.target.closest('nav')) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener('click', handleClickOutside);
      document.body.style.overflow = 'hidden'; // Prevent background scrolling
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.removeEventListener('click', handleClickOutside);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  const navLinks = [
    { path: '/', label: 'Home' },
    { path: '/dmc', label: 'DMC' },
    { path: '/about', label: 'About' },
    { path: '/contact', label: 'Contact us' },
    { path: '/packages', label: 'Our Offerings' }
  ];

  const closeMenu = () => setIsOpen(false);

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      isScrolled 
        ? 'bg-white/95 backdrop-blur-md shadow-lg border-b border-gray-200' 
        : 'bg-white/95 backdrop-blur-md shadow-lg border-b border-gray-200'
    }`}>
      <div className="container-custom">
        <div className="flex items-center justify-between h-16 lg:h-20">
           {/* Logo */}
           <Link to="/" className="flex items-center space-x-3 group" onClick={closeMenu}>
             <div className="relative">
               <img 
                 src="/assets/logo.png" 
                 alt="Royal Sunshine Logo" 
                 className="w-14 h-14 lg:w-16 lg:h-16 transform group-hover:scale-110 transition-transform duration-300"
               />
             </div>
             <div className="hidden sm:block">
               <h1 className="text-xl lg:text-2xl font-bold text-gray-900 transition-colors duration-300">
                 Royal <span className="text-primary-500">Sunshine</span>
               </h1>
               <p className="text-xs text-gray-600 transition-colors duration-300">Travel & Tourism</p>
             </div>
           </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-6 xl:space-x-8">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`relative text-sm xl:text-base font-medium transition-colors duration-200 hover:text-primary-500 ${
                  location.pathname === link.path 
                    ? 'text-primary-500'
                    : 'text-gray-700'
                }`}
                onClick={closeMenu}
              >
                {link.label}
                {location.pathname === link.path && (
                  <div className="absolute -bottom-1 left-0 right-0 h-0.5 bg-primary-500"></div>
                )}
              </Link>
            ))}
          </div>

          {/* Right side - Contact */}
          <div className="flex items-center space-x-4">
            {/* Contact Button */}
            <a 
              href="tel:+919876543210" 
              className="hidden sm:flex items-center space-x-2 px-3 py-2 lg:px-4 lg:py-2 bg-primary-500 text-white rounded-lg hover:bg-primary-600 transition-colors duration-200 transform hover:scale-105 shadow-md"
            >
              <Phone className="w-4 h-4" />
              <span className="text-xs lg:text-sm font-medium">Call Now</span>
            </a>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="lg:hidden p-3 rounded-lg text-gray-700 hover:bg-gray-100 transition-colors duration-200 border border-gray-300 bg-white shadow-sm"
              aria-label="Toggle mobile menu"
            >
              {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <div className="lg:hidden bg-white border-t border-gray-200 shadow-lg">
            <div className="py-4 space-y-1">
              {navLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  className={`block px-4 py-3 text-sm font-medium rounded-lg transition-colors duration-200 ${
                    location.pathname === link.path
                      ? 'bg-primary-100 text-primary-600'
                      : 'text-gray-700 hover:bg-gray-100'
                  }`}
                  onClick={closeMenu}
                >
                  {link.label}
                </Link>
              ))}
              
              {/* Mobile Contact Button */}
              <a 
                href="tel:+919876543210" 
                className="flex items-center justify-center space-x-2 mx-4 mt-3 px-4 py-3 bg-primary-500 text-white rounded-lg hover:bg-primary-600 transition-colors duration-200 shadow-md"
                onClick={closeMenu}
              >
                <Phone className="w-4 h-4" />
                <span className="text-sm font-medium">Call Now</span>
              </a>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
