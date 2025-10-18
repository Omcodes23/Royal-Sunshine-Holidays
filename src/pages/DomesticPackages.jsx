import { useState } from 'react';
import { Search, MapPin, Star, Hotel } from 'lucide-react';
import './DomesticPackages.css';

function DomesticPackages() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedDestination, setSelectedDestination] = useState('all');
  
  const hotelData = [
    {
      destination: 'Shimla',
      image: '/assets/hotelist/shimla.png',
      hotels: [
        { name: 'Hotel Shimla Greens', rating: 3 },
        { name: 'Hotel Nibaana Inn', rating: 3 },
        { name: 'Manaw Valley Resort', rating: 4 },
        { name: 'Kamna Hill Resort', rating: 4 },
        { name: 'The Nilaya Mashobra', rating: 4 },
        { name: 'The Retreat Mashobra', rating: 4 },
        { name: 'Chail Pine Tree Resort', rating: 4 }
      ]
    },
    {
      destination: 'Manali',
      image: 'https://images.unsplash.com/photo-1607923432780-7a9c30adcb83?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&q=80',
      hotels: [
        { name: 'Hotel Fyra', rating: 3 },
        { name: 'Rio Sol Resort', rating: 3 },
        { name: 'The Chamunda Heaven', rating: 3 },
        { name: 'Whistling Pines Resort', rating: 3 },
        { name: 'Hotel Vine Hills', rating: 3 },
        { name: 'The Whitestone Inn & Suites', rating: 4 },
        { name: 'Eco Eden Resort and Spa', rating: 4 },
        { name: 'Snow White Resort', rating: 4 },
        { name: 'Abhilashi Residency & Spa', rating: 4 },
        { name: 'Mastiff Grand Manali Resort', rating: 4 },
        { name: 'The Highland Park', rating: 4 },
        { name: 'Tiaraa Hotels & Resorts', rating: 5 }
      ]
    },
    {
      destination: 'Kasol',
      image: 'https://images.unsplash.com/photo-1580253466313-6c8a875bd90f?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&q=80',
      hotels: [
        { name: 'Hotel Hukam\'s Holiday Home', rating: 3 },
        { name: 'Hotel Royal Palace', rating: 4 },
        { name: 'Abhilashi Inn', rating: 4 }
      ]
    },
    {
      destination: 'Dharamshala',
      image: 'https://images.unsplash.com/photo-1626621331169-5f11fbd7d49a?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&q=80',
      hotels: [
        { name: 'Aliza Inn and Suites', rating: 3 },
        { name: 'Hotel AK Continental', rating: 3 },
        { name: 'Hotel 7 Days Inn', rating: 4 },
        { name: 'Jujurana Resort & Spa', rating: 4 },
        { name: 'Best Western Plus Revanta', rating: 4 },
        { name: 'Mastiff Select Mandavya Dharamkot', rating: 5 }
      ]
    },
    {
      destination: 'Dalhousie',
      image: 'https://images.unsplash.com/photo-1524492412937-b28074a5d7da?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&q=80',
      hotels: [
        { name: 'Hotel Bias Pushap', rating: 3 },
        { name: 'Hotel Dalhousie Delight', rating: 3 },
        { name: 'SS International', rating: 3 },
        { name: 'SS Resorts', rating: 4 },
        { name: 'Regenta Place Dalhousie', rating: 4 },
        { name: 'JK Clarks Exotica', rating: 4 }
      ]
    },
    {
      destination: 'Amritsar',
      image: 'https://images.unsplash.com/photo-1580253466313-6c8a875bd90f?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&q=80',
      hotels: [
        { name: 'The Posh', rating: 3 },
        { name: 'Regalia Grand', rating: 3 },
        { name: 'Hotel AK Continental', rating: 3 }
      ]
    },
    {
      destination: 'Chandigarh/Zirakpur',
      image: 'https://images.unsplash.com/photo-1602216056096-3b40fd0d9fbd?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&q=80',
      hotels: [
        { name: 'AK Continental', rating: 3 }
      ]
    },
    {
      destination: 'Nainital/Bhimtal',
      image: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&q=80',
      hotels: [
        { name: 'Hotel Himalayan Monk', rating: 3 },
        { name: 'Vaapi Comfort Inn - Naukuchiatal', rating: 3 },
        { name: 'Moonlight Lake Resort', rating: 3 },
        { name: 'Tiaraa Monolith Lake Resort', rating: 4 },
        { name: 'Seasons Hotels By Xperience', rating: 4 }
      ]
    },
    {
      destination: 'Corbett',
      image: 'https://images.unsplash.com/photo-1602216056096-3b40fd0d9fbd?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&q=80',
      hotels: [
        { name: 'Le Reserve Corbett', rating: 3 },
        { name: 'Vedikant Resorts The Mallard Corbett', rating: 3 },
        { name: 'Corbett Nirvana Resort', rating: 3 },
        { name: 'Green Retreat Resort', rating: 3 },
        { name: 'Ashoka Tiger Trail', rating: 3 },
        { name: 'Tiaraa Hotels & Resorts', rating: 4 },
        { name: 'The Maasai Mara Resort', rating: 4 }
      ]
    },
    {
      destination: 'Rishikesh',
      image: 'https://images.unsplash.com/photo-1602216056096-3b40fd0d9fbd?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&q=80',
      hotels: [
        { name: 'Indira Nikunj Rubystone Exotic', rating: 3 },
        { name: 'Tiaraa Lite - A Ganges Retreat', rating: 4 },
        { name: 'Antrix Resorts & Retreat', rating: 4 }
      ]
    },
    {
      destination: 'Mussoorie',
      image: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&q=80',
      hotels: [
        { name: 'Rubystone Mussoorie', rating: 3 },
        { name: 'The Nathuli Manor', rating: 3 },
        { name: 'Notting Hill', rating: 4 }
      ]
    }
  ];

  // Filter hotels based on search and destination
  const filteredData = hotelData.filter(dest => {
    const matchesDestination = selectedDestination === 'all' || dest.destination.toLowerCase().includes(selectedDestination.toLowerCase());
    const matchesSearch = searchQuery === '' || 
      dest.destination.toLowerCase().includes(searchQuery.toLowerCase()) ||
      dest.hotels.some(hotel => hotel.name.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesDestination && matchesSearch;
  });

  const renderStars = (rating) => {
    return Array.from({ length: 5 }, (_, index) => (
      <Star
        key={index}
        className={`star ${index < rating ? 'filled' : 'empty'}`}
        size={16}
        fill={index < rating ? 'currentColor' : 'none'}
      />
    ));
  };

  const getRatingText = (rating) => {
    return '*'.repeat(rating);
  };

  return (
    <div className="hotels-page">
      <section className="hotels-hero" style={{backgroundImage: "linear-gradient(rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.6)), url('https://images.unsplash.com/photo-1566073771259-6a8506099945?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1200&q=80')"}}>
        <div className="hotels-hero-content">
          <h1>Our Marketing Hotel List</h1>
          <p>Discover our carefully curated selection of premium hotels across India's most beautiful destinations</p>
        </div>
      </section>
      
      <section className="hotels-section">
        <div className="hotels-container">
          {/* Search and Filter Bar */}
          <div className="search-filter-bar">
            <div className="search-box">
              <Search className="search-icon" />
              <input
                type="text"
                placeholder="Search destinations or hotels..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="search-input"
              />
            </div>
            
            <div className="filter-controls">
              <div className="filter-group">
                <MapPin className="filter-icon" />
                <select 
                  value={selectedDestination} 
                  onChange={(e) => setSelectedDestination(e.target.value)}
                  className="filter-select"
                >
                  <option value="all">All Destinations</option>
                  {hotelData.map(dest => (
                    <option key={dest.destination} value={dest.destination}>
                      {dest.destination}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>

          
          {/* Hotels by Destination */}
          <div className="destinations-grid">
            {filteredData.map((destination, index) => (
              <div className="destination-card" key={index}>
                <div className="destination-image">
                  <img src={destination.image} alt={destination.destination} />
                  <div className="image-overlay">
                    <div className="destination-title">
                      <MapPin className="destination-icon" />
                      <h3>{destination.destination}</h3>
                    </div>
                    <span className="hotel-count">{destination.hotels.length} Hotels</span>
                  </div>
                </div>
                
                <div className="hotels-list">
                  {destination.hotels.map((hotel, hotelIndex) => (
                    <div className="hotel-item" key={hotelIndex}>
                      <div className="hotel-info">
                        <div className="hotel-name">
                          <Hotel className="hotel-icon" />
                          <span>{hotel.name}</span>
                        </div>
                        <div className="hotel-rating">
                          <div className="stars">
                            {renderStars(hotel.rating)}
                          </div>
                          <span className="rating-text">{getRatingText(hotel.rating)}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
          
          {filteredData.length === 0 && (
            <div className="no-results">
              <h3>No hotels found</h3>
              <p>Try adjusting your search criteria or destination filter</p>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}

export default DomesticPackages;