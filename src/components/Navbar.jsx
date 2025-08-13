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

  const navLinks = [
    { path: '/', label: 'Home' },
    { path: '/dmc', label: 'DMC' },
    { path: '/about', label: 'About' },
    { path: '/contact', label: 'Contact us' },
    { path: '/packages', label: 'Domestic packages' }
  ];

  const closeMenu = () => setIsOpen(false);

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      isScrolled 
        ? 'bg-white/95 backdrop-blur-md shadow-lg border-b border-gray-200' 
        : 'bg-transparent'
    }`}>
      <div className="container-custom">
        <div className="flex items-center justify-between h-16 lg:h-20">
                     {/* Logo */}
           <Link to="/" className="flex items-center space-x-3 group">
             <div className="relative">
               <img 
                 src="/assets/logo.png" 
                 alt="Royal Sunshine Logo" 
                 className="w-14 h-14 lg:w-16 lg:h-16 transform group-hover:scale-110 transition-transform duration-300"
               />
             </div>
             <div className="hidden sm:block">
               <h1 className={`text-xl lg:text-2xl font-bold transition-colors duration-300 ${
                 isScrolled ? 'text-gray-900' : 'text-white'
               }`}>
                 Royal <span className="text-primary-500">Sunshine</span>
               </h1>
               <p className={`text-xs transition-colors duration-300 ${
                 isScrolled ? 'text-gray-600' : 'text-white/80'
               }`}>Travel & Tourism</p>
             </div>
           </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-8">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                        className={`relative text-sm font-medium transition-colors duration-200 hover:text-primary-500 ${
          location.pathname === link.path 
            ? 'text-primary-500'
            : isScrolled ? 'text-gray-700' : 'text-white'
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
              className="hidden sm:flex items-center space-x-2 px-4 py-2 bg-primary-500 text-white rounded-lg hover:bg-primary-600 transition-colors duration-200 transform hover:scale-105 shadow-md"
            >
              <Phone className="w-4 h-4" />
              <span className="text-sm font-medium">Call Now</span>
            </a>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="lg:hidden p-2 rounded-lg text-gray-700 hover:bg-gray-100 transition-colors duration-200"
            >
              {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        <div className={`lg:hidden transition-all duration-300 ease-in-out ${
          isOpen 
            ? 'max-h-96 opacity-100 visible' 
            : 'max-h-0 opacity-0 invisible'
        }`}>
          <div className="py-4 space-y-2 border-t border-gray-200">
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
              className="flex items-center justify-center space-x-2 mx-4 px-4 py-3 bg-primary-500 text-white rounded-lg hover:bg-primary-600 transition-colors duration-200 shadow-md"
            >
              <Phone className="w-4 h-4" />
              <span className="text-sm font-medium">Call Now</span>
            </a>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
