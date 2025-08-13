import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Calendar, MapPin, Users, Star, Heart, Share2, Phone, Mail } from 'lucide-react';
import './PackageDetailsModal.css';

function PackageDetailsModal({ package: pkg, onClose }) {
  const [selectedImage, setSelectedImage] = useState(0);
  const [isFavorite, setIsFavorite] = useState(false);
  const [activeTab, setActiveTab] = useState('overview');

  if (!pkg) return null;

  const images = [
    pkg.image,
    'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1469474968028-56623f02e42e?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
  ];

  const highlights = [
    'Professional Tour Guide',
    'Hotel Pickup & Drop',
    'All Transfers Included',
    'Meals as per itinerary',
    'Sightseeing as per itinerary',
    'All applicable taxes'
  ];

  const itinerary = [
    {
      day: 1,
      title: 'Arrival & Welcome',
      description: 'Arrive at destination, check-in to hotel, welcome dinner'
    },
    {
      day: 2,
      title: 'City Exploration',
      description: 'Full day city tour with local guide, visit major attractions'
    },
    {
      day: 3,
      title: 'Adventure Day',
      description: 'Optional adventure activities, free time for shopping'
    },
    {
      day: 4,
      title: 'Cultural Experience',
      description: 'Local cultural show, traditional dinner experience'
    },
    {
      day: 5,
      title: 'Departure',
      description: 'Check-out, transfer to airport/station'
    }
  ];

  const reviews = [
    {
      name: 'Rajesh Kumar',
      rating: 5,
      date: '2 weeks ago',
      comment: 'Excellent experience! The tour was well-organized and the guide was very knowledgeable.'
    },
    {
      name: 'Priya Sharma',
      rating: 4,
      date: '1 month ago',
      comment: 'Great value for money. Hotels were comfortable and locations were perfect.'
    },
    {
      name: 'Amit Patel',
      rating: 5,
      date: '3 weeks ago',
      comment: 'Amazing trip! Everything exceeded our expectations. Highly recommended!'
    }
  ];

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: pkg.title,
        text: pkg.description,
        url: window.location.href
      });
    } else {
      // Fallback for browsers that don't support Web Share API
      navigator.clipboard.writeText(window.location.href);
      alert('Link copied to clipboard!');
    }
  };

  return (
    <AnimatePresence>
      <motion.div
        className="modal-overlay"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
      >
          <motion.div
            className="modal-content"
            initial={{ scale: 0.8, opacity: 0, y: 50 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.8, opacity: 0, y: 50 }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="modal-header">
              <div className="header-content">
                <h2>{pkg.title}</h2>
                <div className="package-meta">
                  <span className="price">₹{pkg.price.toLocaleString()}</span>
                  <span className="duration">{pkg.duration}</span>
                </div>
              </div>
              <div className="header-actions">
                <button 
                  className={`favorite-btn ${isFavorite ? 'active' : ''}`}
                  onClick={() => setIsFavorite(!isFavorite)}
                >
                  <Heart className={isFavorite ? 'fill-current' : ''} />
                </button>
                <button className="share-btn" onClick={handleShare}>
                  <Share2 />
                </button>
                <button className="close-btn" onClick={onClose}>
                  <X />
                </button>
              </div>
            </div>

            {/* Image Gallery */}
            <div className="image-gallery">
              <div className="main-image">
                <img src={images[selectedImage]} alt={pkg.title} />
                <div className="image-overlay">
                  <div className="image-nav">
                    {images.map((_, index) => (
                      <button
                        key={index}
                        className={`nav-dot ${index === selectedImage ? 'active' : ''}`}
                        onClick={() => setSelectedImage(index)}
                      />
                    ))}
                  </div>
                </div>
              </div>
              <div className="thumbnail-grid">
                {images.map((image, index) => (
                  <img
                    key={index}
                    src={image}
                    alt={`${pkg.title} ${index + 1}`}
                    className={index === selectedImage ? 'active' : ''}
                    onClick={() => setSelectedImage(index)}
                  />
                ))}
              </div>
            </div>

            {/* Tabs */}
            <div className="tabs">
              <button
                className={`tab ${activeTab === 'overview' ? 'active' : ''}`}
                onClick={() => setActiveTab('overview')}
              >
                Overview
              </button>
              <button
                className={`tab ${activeTab === 'itinerary' ? 'active' : ''}`}
                onClick={() => setActiveTab('itinerary')}
              >
                Itinerary
              </button>
              <button
                className={`tab ${activeTab === 'inclusions' ? 'active' : ''}`}
                onClick={() => setActiveTab('inclusions')}
              >
                Inclusions
              </button>
              <button
                className={`tab ${activeTab === 'reviews' ? 'active' : ''}`}
                onClick={() => setActiveTab('reviews')}
              >
                Reviews
              </button>
            </div>

            {/* Tab Content */}
            <div className="tab-content">
              {activeTab === 'overview' && (
                <div className="overview-content">
                  <p className="description">{pkg.description}</p>
                  <div className="highlights">
                    <h4>Package Highlights</h4>
                    <ul>
                      {highlights.map((highlight, index) => (
                        <li key={index}>{highlight}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              )}

              {activeTab === 'itinerary' && (
                <div className="itinerary-content">
                  {itinerary.map((day) => (
                    <div key={day.day} className="day-item">
                      <div className="day-header">
                        <span className="day-number">Day {day.day}</span>
                        <h4>{day.title}</h4>
                      </div>
                      <p>{day.description}</p>
                    </div>
                  ))}
                </div>
              )}

              {activeTab === 'inclusions' && (
                <div className="inclusions-content">
                  <div className="inclusions-grid">
                    <div className="inclusion-category">
                      <h4>✅ What's Included</h4>
                      <ul>
                        <li>Hotel accommodation</li>
                        <li>Daily breakfast</li>
                        <li>All transfers</li>
                        <li>Professional guide</li>
                        <li>Entrance fees</li>
                      </ul>
                    </div>
                    <div className="inclusion-category">
                      <h4>❌ What's Not Included</h4>
                      <ul>
                        <li>International flights</li>
                        <li>Personal expenses</li>
                        <li>Travel insurance</li>
                        <li>Optional activities</li>
                        <li>Tips and gratuities</li>
                      </ul>
                    </div>
                  </div>
                </div>
              )}

              {activeTab === 'reviews' && (
                <div className="reviews-content">
                  <div className="reviews-summary">
                    <div className="rating-overview">
                      <div className="average-rating">
                        <span className="rating-number">4.7</span>
                        <div className="stars">
                          {[...Array(5)].map((_, i) => (
                            <Star key={i} className={i < 4 ? 'fill-current text-yellow-400' : 'text-gray-300'} />
                          ))}
                        </div>
                        <span className="total-reviews">Based on {reviews.length} reviews</span>
                      </div>
                    </div>
                  </div>
                  <div className="reviews-list">
                    {reviews.map((review, index) => (
                      <div key={index} className="review-item">
                        <div className="review-header">
                          <div className="reviewer-info">
                            <h4>{review.name}</h4>
                            <div className="stars">
                              {[...Array(5)].map((_, i) => (
                                <Star key={i} className={i < review.rating ? 'fill-current text-yellow-400' : 'text-gray-300'} />
                              ))}
                            </div>
                          </div>
                          <span className="review-date">{review.date}</span>
                        </div>
                        <p>{review.comment}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Footer Actions */}
            <div className="modal-footer">
              <div className="contact-info">
                <div className="contact-item">
                  <Phone className="w-4 h-4" />
                  <span>+91 98765 43210</span>
                </div>
                <div className="contact-item">
                  <Mail className="w-4 h-4" />
                  <span>info@royalsunshine.com</span>
                </div>
              </div>
              <div className="action-buttons">
                <button className="btn-secondary" onClick={onClose}>
                  Close
                </button>
                <button className="btn-primary">
                  Book Now
                </button>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </AnimatePresence>
  );
}

export default PackageDetailsModal;
