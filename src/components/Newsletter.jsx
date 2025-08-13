import { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, CheckCircle, AlertCircle } from 'lucide-react';
import './Newsletter.css';

function Newsletter() {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState('idle'); // idle, loading, success, error
  const [message, setMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!email) {
      setStatus('error');
      setMessage('Please enter your email address');
      return;
    }

    // Basic email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setStatus('error');
      setMessage('Please enter a valid email address');
      return;
    }

    setStatus('loading');
    setMessage('');

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // In a real app, you would send this to your backend
      console.log('Subscribing email:', email);
      
      setStatus('success');
      setMessage('Thank you for subscribing! You\'ll receive our latest updates soon.');
      setEmail('');
      
      // Reset success message after 5 seconds
      setTimeout(() => {
        setStatus('idle');
        setMessage('');
      }, 5000);
      
    } catch (error) {
      setStatus('error');
      setMessage('Something went wrong. Please try again.');
    }
  };

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
    if (status === 'error') {
      setStatus('idle');
      setMessage('');
    }
  };

  return (
    <section className="newsletter-section">
      <div className="newsletter-container">
        <motion.div
          className="newsletter-content"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <div className="newsletter-icon">
            <Mail className="w-12 h-12" />
          </div>
          
          <h2>Stay Updated with Royal Sunshine</h2>
          <p>
            Subscribe to our newsletter and be the first to know about exclusive offers, 
            new destinations, and travel tips. No spam, just valuable content delivered to your inbox.
          </p>
          
          <form onSubmit={handleSubmit} className="newsletter-form">
            <div className="form-group">
              <input
                type="email"
                placeholder="Enter your email address"
                value={email}
                onChange={handleEmailChange}
                className={`email-input ${status === 'error' ? 'error' : ''}`}
                disabled={status === 'loading'}
              />
              <button
                type="submit"
                className={`subscribe-btn ${status === 'loading' ? 'loading' : ''}`}
                disabled={status === 'loading'}
              >
                {status === 'loading' ? (
                  <div className="loading-spinner">
                    <div className="spinner"></div>
                  </div>
                ) : (
                  'Subscribe'
                )}
              </button>
            </div>
            
            {status === 'success' && (
              <motion.div
                className="success-message"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.3 }}
              >
                <CheckCircle className="w-5 h-5" />
                <span>{message}</span>
              </motion.div>
            )}
            
            {status === 'error' && (
              <motion.div
                className="error-message"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.3 }}
              >
                <AlertCircle className="w-5 h-5" />
                <span>{message}</span>
              </motion.div>
            )}
          </form>
          
          <div className="newsletter-benefits">
            <div className="benefit-item">
              <div className="benefit-icon">🎯</div>
              <span>Exclusive Offers</span>
            </div>
            <div className="benefit-item">
              <div className="benefit-icon">🌍</div>
              <span>New Destinations</span>
            </div>
            <div className="benefit-item">
              <div className="benefit-icon">💡</div>
              <span>Travel Tips</span>
            </div>
            <div className="benefit-item">
              <div className="benefit-icon">🔒</div>
              <span>Privacy Protected</span>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

export default Newsletter;
