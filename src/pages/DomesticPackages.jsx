import { useState } from 'react';
import { Search, Filter, MapPin, Calendar, Users, Star } from 'lucide-react';
import PackageDetailsModal from '../components/PackageDetailsModal';
import './DomesticPackages.css';

function DomesticPackages() {
  const [activeFilter, setActiveFilter] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedPackage, setSelectedPackage] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [sortBy, setSortBy] = useState('name');
  
  const packages = [
    {
      id: 1,
      title: 'Shimla Manali Adventure',
      description: 'Explore the beauty of Himachal Pradesh with this 6-day tour of Shimla and Manali.',
      price: 25999,
      originalPrice: 29999,
      duration: '6 Days / 5 Nights',
      category: 'mountain',
      difficulty: 'Easy',
      groupSize: '2-12 people',
      rating: 4.8,
      reviews: 156,
      image: 'https://images.unsplash.com/photo-1626621331169-5f11fbd7d49a?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&q=80',
      highlights: ['Mountain Views', 'Adventure Sports', 'Local Culture', 'Scenic Drives'],
      itinerary: [
        'Day 1: Arrival in Shimla, Check-in & Local Sightseeing',
        'Day 2: Shimla - Kufri - Shimla',
        'Day 3: Shimla to Manali via Kullu Valley',
        'Day 4: Manali Local Sightseeing',
        'Day 5: Solang Valley Adventure',
        'Day 6: Departure'
      ],
      inclusions: ['Hotel Accommodation', 'Meals (Breakfast & Dinner)', 'Transport', 'Guide Services'],
      exclusions: ['Airfare', 'Personal Expenses', 'Optional Activities']
    },
    {
      id: 2,
      title: 'Golden Triangle Tour',
      description: 'Experience the rich culture and history of Delhi, Agra, and Jaipur.',
      price: 32999,
      originalPrice: 37999,
      duration: '7 Days / 6 Nights',
      category: 'culture',
      difficulty: 'Easy',
      groupSize: '2-15 people',
      rating: 4.9,
      reviews: 203,
      image: 'https://images.unsplash.com/photo-1524492412937-b28074a5d7da?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&q=80',
      highlights: ['Taj Mahal', 'Historical Monuments', 'Cultural Heritage', 'Local Markets'],
      itinerary: [
        'Day 1: Arrival in Delhi',
        'Day 2: Delhi Sightseeing',
        'Day 3: Delhi to Agra',
        'Day 4: Agra Sightseeing',
        'Day 5: Agra to Jaipur',
        'Day 6: Jaipur Sightseeing',
        'Day 7: Departure'
      ],
      inclusions: ['Hotel Accommodation', 'Meals (Breakfast & Dinner)', 'Transport', 'Guide Services'],
      exclusions: ['Airfare', 'Personal Expenses', 'Monument Entry Fees']
    },
    {
      id: 3,
      title: 'Kerala Backwaters',
      description: 'Relax and rejuvenate with a tour of God\'s own country - Kerala.',
      price: 28999,
      originalPrice: 32999,
      duration: '5 Days / 4 Nights',
      category: 'beach',
      difficulty: 'Easy',
      groupSize: '2-8 people',
      rating: 4.7,
      reviews: 98,
      image: 'https://images.unsplash.com/photo-1602216056096-3b40fd0d9fbd?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&q=80',
      highlights: ['Houseboat Experience', 'Ayurveda', 'Beach Relaxation', 'Local Cuisine'],
      itinerary: [
        'Day 1: Arrival in Cochin',
        'Day 2: Cochin to Alleppey',
        'Day 3: Backwater Cruise',
        'Day 4: Kumarakom & Varkala',
        'Day 5: Departure'
      ],
      inclusions: ['Houseboat Stay', 'Meals (All)', 'Transport', 'Guide Services'],
      exclusions: ['Airfare', 'Personal Expenses', 'Optional Activities']
    },
    {
      id: 4,
      title: 'Goa Beach Escape',
      description: 'Enjoy the sun, sand, and vibrant nightlife of Goa\'s beautiful beaches.',
      price: 15999,
      originalPrice: 18999,
      duration: '4 Days / 3 Nights',
      category: 'beach',
      difficulty: 'Easy',
      groupSize: '2-10 people',
      rating: 4.6,
      reviews: 134,
      image: 'https://images.unsplash.com/photo-1580253466313-6c8a875bd90f?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&q=80',
      highlights: ['Beach Activities', 'Water Sports', 'Nightlife', 'Portuguese Heritage'],
      itinerary: [
        'Day 1: Arrival in Goa',
        'Day 2: North Goa Beaches',
        'Day 3: South Goa & Old Goa',
        'Day 4: Departure'
      ],
      inclusions: ['Hotel Accommodation', 'Meals (Breakfast)', 'Transport', 'Guide Services'],
      exclusions: ['Airfare', 'Personal Expenses', 'Water Sports']
    },
    {
      id: 5,
      title: 'Ladakh Adventure',
      description: 'Discover the stunning landscapes and rich Buddhist culture of Ladakh.',
      price: 38999,
      originalPrice: 44999,
      duration: '7 Days / 6 Nights',
      category: 'mountain',
      difficulty: 'Moderate',
      groupSize: '2-8 people',
      rating: 4.9,
      reviews: 87,
      image: 'https://images.unsplash.com/photo-1607923432780-7a9c30adcb83?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&q=80',
      highlights: ['High Altitude', 'Buddhist Monasteries', 'Adventure Sports', 'Stunning Landscapes'],
      itinerary: [
        'Day 1: Arrival in Leh',
        'Day 2: Leh Acclimatization',
        'Day 3: Leh Local Sightseeing',
        'Day 4: Khardungla Pass',
        'Day 5: Pangong Lake',
        'Day 6: Nubra Valley',
        'Day 7: Departure'
      ],
      inclusions: ['Hotel Accommodation', 'Meals (All)', 'Transport', 'Guide Services', 'Oxygen Support'],
      exclusions: ['Airfare', 'Personal Expenses', 'Optional Activities']
    },
    {
      id: 6,
      title: 'Andaman Island Getaway',
      description: 'Experience crystal clear waters and pristine beaches in the Andaman Islands.',
      price: 42999,
      originalPrice: 47999,
      duration: '6 Days / 5 Nights',
      category: 'beach',
      difficulty: 'Easy',
      groupSize: '2-12 people',
      rating: 4.8,
      reviews: 112,
      image: 'https://images.unsplash.com/photo-1589179447676-9ea643c58471?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&q=80',
      highlights: ['Island Hopping', 'Water Sports', 'Coral Reefs', 'Beach Relaxation'],
      itinerary: [
        'Day 1: Arrival in Port Blair',
        'Day 2: Port Blair Sightseeing',
        'Day 3: Havelock Island',
        'Day 4: Neil Island',
        'Day 5: Return to Port Blair',
        'Day 6: Departure'
      ],
      inclusions: ['Hotel Accommodation', 'Meals (Breakfast & Dinner)', 'Transport', 'Guide Services', 'Ferry Tickets'],
      exclusions: ['Airfare', 'Personal Expenses', 'Water Sports']
    }
  ];
  
  // Filter and search packages
  const filteredPackages = packages
    .filter(pkg => {
      const matchesCategory = activeFilter === 'all' || pkg.category === activeFilter;
      const matchesSearch = pkg.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                           pkg.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
                           pkg.highlights.some(h => h.toLowerCase().includes(searchQuery.toLowerCase()));
      return matchesCategory && matchesSearch;
    })
    .sort((a, b) => {
      switch (sortBy) {
        case 'price-low':
          return a.price - b.price;
        case 'price-high':
          return b.price - a.price;
        case 'rating':
          return b.rating - a.rating;
        case 'duration':
          return a.duration.split(' ')[0] - b.duration.split(' ')[0];
        default:
          return a.title.localeCompare(b.title);
      }
    });
  
  const handlePackageClick = (pkg) => {
    setSelectedPackage(pkg);
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setSelectedPackage(null);
  };

  const formatPrice = (price) => {
    return `₹${price.toLocaleString()}`;
  };

  return (
    <div className="packages-page">
      <section className="packages-hero" style={{backgroundImage: "linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url('https://images.unsplash.com/photo-1503265192943-9d7eea6fc77a?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1200&q=80')"}}>
        <div className="packages-hero-content">
          <h1>Domestic Tour Packages</h1>
          <p>Explore the incredible diversity of India with our curated packages</p>
        </div>
      </section>
      
      <section className="packages-section">
        <div className="packages-container">
          {/* Search and Filter Bar */}
          <div className="search-filter-bar">
            <div className="search-box">
              <Search className="search-icon" />
              <input
                type="text"
                placeholder="Search packages, destinations, or activities..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="search-input"
              />
            </div>
            
            <div className="filter-controls">
              <div className="filter-group">
                <Filter className="filter-icon" />
                <select 
                  value={sortBy} 
                  onChange={(e) => setSortBy(e.target.value)}
                  className="sort-select"
                >
                  <option value="name">Sort by Name</option>
                  <option value="price-low">Price: Low to High</option>
                  <option value="price-high">Price: High to Low</option>
                  <option value="rating">Highest Rated</option>
                  <option value="duration">Shortest Duration</option>
                </select>
              </div>
            </div>
          </div>

          {/* Category Filters */}
          <div className="packages-filter">
            <button 
              className={`filter-btn ${activeFilter === 'all' ? 'active' : ''}`}
              onClick={() => setActiveFilter('all')}
            >
              All Packages ({packages.length})
            </button>
            <button 
              className={`filter-btn ${activeFilter === 'mountain' ? 'active' : ''}`}
              onClick={() => setActiveFilter('mountain')}
            >
              Mountain Getaways ({packages.filter(p => p.category === 'mountain').length})
            </button>
            <button 
              className={`filter-btn ${activeFilter === 'beach' ? 'active' : ''}`}
              onClick={() => setActiveFilter('beach')}
            >
              Beach Holidays ({packages.filter(p => p.category === 'beach').length})
            </button>
            <button 
              className={`filter-btn ${activeFilter === 'culture' ? 'active' : ''}`}
              onClick={() => setActiveFilter('culture')}
            >
              Cultural Tours ({packages.filter(p => p.category === 'culture').length})
            </button>
          </div>
          
          {/* Results Count */}
          <div className="results-info">
            <p>Showing {filteredPackages.length} of {packages.length} packages</p>
          </div>
          
          {/* Packages Grid */}
          <div className="packages-grid">
            {filteredPackages.map(pkg => (
              <div className="package-card" key={pkg.id} onClick={() => handlePackageClick(pkg)}>
                <div className="package-image">
                  <img src={pkg.image} alt={pkg.title} />
                  <span className="package-price">{formatPrice(pkg.price)}</span>
                  {pkg.originalPrice > pkg.price && (
                    <span className="package-discount">
                      {Math.round(((pkg.originalPrice - pkg.price) / pkg.originalPrice) * 100)}% OFF
                    </span>
                  )}
                  <div className="package-rating">
                    <Star className="star-icon" fill="currentColor" />
                    <span>{pkg.rating}</span>
                    <span className="reviews">({pkg.reviews})</span>
                  </div>
                </div>
                <div className="package-content">
                  <h3>{pkg.title}</h3>
                  <p className="package-duration">
                    <Calendar className="icon" />
                    {pkg.duration}
                  </p>
                  <p className="package-description">{pkg.description}</p>
                  
                  <div className="package-highlights">
                    {pkg.highlights.slice(0, 3).map((highlight, index) => (
                      <span key={index} className="highlight-tag">{highlight}</span>
                    ))}
                  </div>
                  
                  <div className="package-meta">
                    <span className="difficulty">
                      <Users className="icon" />
                      {pkg.difficulty}
                    </span>
                    <span className="group-size">
                      <Users className="icon" />
                      {pkg.groupSize}
                    </span>
                  </div>
                  
                  <div className="package-footer">
                    <div className="price-info">
                      {pkg.originalPrice > pkg.price && (
                        <span className="original-price">{formatPrice(pkg.originalPrice)}</span>
                      )}
                      <span className="current-price">{formatPrice(pkg.price)}</span>
                    </div>
                    <button className="btn view-details-btn">View Details</button>
                  </div>
                </div>
              </div>
            ))}
          </div>
          
          {filteredPackages.length === 0 && (
            <div className="no-results">
              <h3>No packages found</h3>
              <p>Try adjusting your search criteria or filters</p>
            </div>
          )}
        </div>
      </section>
      
      <section className="packages-cta">
        <div className="cta-content">
          <h2>Can't Find What You're Looking For?</h2>
          <p>We can create a custom package tailored to your preferences and budget.</p>
          <button className="btn">Request Custom Package</button>
        </div>
      </section>

      {/* Package Details Modal */}
      {showModal && selectedPackage && (
        <PackageDetailsModal
          package={selectedPackage}
          onClose={closeModal}
        />
      )}
    </div>
  );
}

export default DomesticPackages;
