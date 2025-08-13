import { useState, useEffect, useRef } from 'react';
import './InteractiveMap.css';

function InteractiveMap() {
  const [activeRegion, setActiveRegion] = useState('himachal'); // Default to Himachal
  const [activeMarker, setActiveMarker] = useState(null);
  const [zoom, setZoom] = useState(true); // Start with zoom enabled
  const [zoomLevel, setZoomLevel] = useState(2); // Start with a higher zoom
  const [mapPosition, setMapPosition] = useState({ x: -35 + 50, y: -22 + 50 }); // Center on Himachal
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
  const mapContainerRef = useRef(null);
  
  // Define regions and their data - keeping only Himachal Pradesh active
  const regions = [
    { 
      id: 'himachal', 
      name: 'Himachal Pradesh', 
      coordinates: { x: 35, y: 22 }, 
      zoomCoordinates: { x: 50, y: 40, scale: 3 },
      description: 'Famous for its stunning mountain landscapes, scenic hill stations, and adventure tourism opportunities.'
    }
  ];
  
  // Define markers for each region
  const markers = {
    himachal: [
      { 
        id: 'shimla', 
        name: 'Shimla', 
        type: 'city', 
        coordinates: { x: 28, y: 27 },
        details: {
          description: 'Known as the Queen of Hill Stations, Shimla is the capital of Himachal Pradesh.',
          attractions: ['Christ Church', 'The Ridge', 'Mall Road', 'Jakhu Temple'],
          hotels: ['Radisson Jass Shimla', 'Wildflower Hall', 'The Oberoi Cecil'],
          image: 'https://images.unsplash.com/photo-1626621331169-5f11fbd7d49a?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&q=80'
        }
      },
      { 
        id: 'hotel_oberoi', 
        name: 'The Oberoi Cecil', 
        type: 'hotel', 
        coordinates: { x: 29, y: 28 },
        details: {
          description: 'A luxury heritage hotel from the days of the British Raj, offering colonial charm and modern amenities.',
          attractions: ['Heritage Architecture', 'Fine Dining', 'Spa Services', 'Mountain Views'],
          hotels: ['5-star accommodation'],
          image: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&q=80'
        }
      },
      { 
        id: 'jakhu_temple', 
        name: 'Jakhu Temple', 
        type: 'attraction', 
        coordinates: { x: 27, y: 26 },
        details: {
          description: 'An ancient temple dedicated to Lord Hanuman at the highest point in Shimla.',
          attractions: ['108-foot Hanuman Statue', 'Panoramic Views', 'Religious Significance'],
          hotels: ['Nearby: Hotel Willow Banks', 'The Oberoi Cecil', 'Radisson Jass Shimla'],
          image: 'https://images.unsplash.com/photo-1599030737678-bf9c9bdd3b7c?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&q=80'
        }
      },
      { 
        id: 'manali', 
        name: 'Manali', 
        type: 'city', 
        coordinates: { x: 32, y: 23 },
        details: {
          description: 'A resort town nestled in the mountains of Himachal Pradesh near the northern end of the Kullu Valley.',
          attractions: ['Hadimba Temple', 'Solang Valley', 'Rohtang Pass', 'Old Manali'],
          hotels: ['The Himalayan', 'Span Resort & Spa', 'Apple Country Resort'],
          image: 'https://images.unsplash.com/photo-1513023840371-dd774fcaee5b?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&q=80'
        }
      },
      { 
        id: 'kullu', 
        name: 'Kullu', 
        type: 'city', 
        coordinates: { x: 31, y: 25 },
        details: {
          description: 'A valley situated on the banks of the Beas River in Himachal Pradesh.',
          attractions: ['Raghunath Temple', 'Great Himalayan National Park', 'Bijli Mahadev Temple'],
          hotels: ['Royal Tulip Luxury Hotel', 'Kullu Valley Resort', 'Apple Valley Resort'],
          image: 'https://images.unsplash.com/photo-1559020529-2c866e529082?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&q=80'
        }
      },
      { 
        id: 'dalhousie', 
        name: 'Dalhousie', 
        type: 'city', 
        coordinates: { x: 25, y: 24 },
        details: {
          description: 'A hill station spread across 5 hills offering scenic views of the Himalayas.',
          attractions: ['Khajjiar Lake', 'St. John\'s Church', 'Dainkund Peak', 'Panchpula'],
          hotels: ['Grand View Hotel', 'JK Clarks Exotica', 'Hotel Mount View'],
          image: 'https://images.unsplash.com/photo-1626686390738-9d2735b0417d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&q=80'
        }
      }
    ]
  };

  // Handle marker click function
  const handleMarkerClick = (marker) => {
    setActiveMarker(marker);
  };

  // Handle close details function
  const handleCloseDetails = () => {
    setActiveMarker(null);
  };

  // Fix the transform application in the useEffect
  useEffect(() => {
    // Force re-render of the component to ensure map displays
    const timer = setTimeout(() => {
      // Apply initial transform
      if (mapContainerRef.current) {
        const initialZoomLevel = 2;
        setZoomLevel(initialZoomLevel);
        
        mapContainerRef.current.style.transition = 'none';
        mapContainerRef.current.style.transform = `scale(${initialZoomLevel}) translate(0%, 0%)`;
        
        // Force a repaint
        void mapContainerRef.current.offsetHeight;
        
        // Enable smooth transitions after initial render
        mapContainerRef.current.style.transition = 'transform 0.5s ease-in-out';
      }
    }, 300);
    
    return () => {
      clearTimeout(timer);
    };
  }, []);

  // Fix the mouse handlers to properly apply transform
  const handleMouseMove = (e) => {
    if (isDragging) {
      const dx = (e.clientX - dragStart.x) / zoomLevel / 5;
      const dy = (e.clientY - dragStart.y) / zoomLevel / 5;
      
      const newPosition = {
        x: mapPosition.x + dx,
        y: mapPosition.y + dy
      };
      
      setMapPosition(newPosition);
      setDragStart({
        x: e.clientX,
        y: e.clientY
      });
      
      // Apply the transform directly
      if (mapContainerRef.current) {
        mapContainerRef.current.style.transform = 
          `scale(${zoomLevel}) translate(${newPosition.x}%, ${newPosition.y}%)`;
      }
    }
  };

  // Handle region click function
  const handleRegionClick = (regionId) => {
    const region = regions.find(r => r.id === regionId);
    if (!region) return;
    
    setActiveRegion(regionId);
    setActiveMarker(null);
    
    // Apply transform immediately
    if (mapContainerRef.current) {
      const newZoomLevel = region.zoomCoordinates.scale;
      setZoomLevel(newZoomLevel);
      
      const newPosition = {
        x: -region.zoomCoordinates.x + 50,
        y: -region.zoomCoordinates.y + 50
      };
      setMapPosition(newPosition);
      
      mapContainerRef.current.style.transform = 
        `scale(${newZoomLevel}) translate(${newPosition.x}%, ${newPosition.y}%)`;
    }
  };

  // Enhanced zoom functions with proper transform application
  const zoomIn = () => {
    const newZoomLevel = Math.min(5, zoomLevel + 0.5);
    setZoomLevel(newZoomLevel);
    
    // Apply transform with new zoom level
    if (mapContainerRef.current) {
      mapContainerRef.current.style.transform = 
        `scale(${newZoomLevel}) translate(${mapPosition.x}%, ${mapPosition.y}%)`;
    }
    
    // Set zoom state if not already set
    if (!zoom) setZoom(true);
  };
  
  const zoomOut = () => {
    if (zoomLevel <= 1.2) {
      resetMap();
      return;
    }
    
    const newZoomLevel = Math.max(1, zoomLevel - 0.5);
    setZoomLevel(newZoomLevel);
    
    // Apply transform with new zoom level
    if (mapContainerRef.current) {
      mapContainerRef.current.style.transform = 
        `scale(${newZoomLevel}) translate(${mapPosition.x}%, ${mapPosition.y}%)`;
    }
  };
  
  const resetMap = () => {
    setZoom(false);
    setZoomLevel(1);
    setMapPosition({ x: 0, y: 0 });
    setActiveMarker(null);
    
    if (mapContainerRef.current) {
      mapContainerRef.current.style.transition = 'transform 0.5s ease-in-out';
      mapContainerRef.current.style.transform = 'scale(1) translate(0%, 0%)';
    }
  };

  const handleMouseDown = (e) => {
    setIsDragging(true);
    setDragStart({ x: e.clientX, y: e.clientY });
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const handleTouchStart = (e) => {
    setIsDragging(true);
    setDragStart({ x: e.touches[0].clientX, y: e.touches[0].clientY });
  };

  const handleTouchMove = (e) => {
    if (isDragging) {
      const dx = (e.touches[0].clientX - dragStart.x) / zoomLevel / 5;
      const dy = (e.touches[0].clientY - dragStart.y) / zoomLevel / 5;
      
      const newPosition = {
        x: mapPosition.x + dx,
        y: mapPosition.y + dy
      };
      
      setMapPosition(newPosition);
      setDragStart({
        x: e.touches[0].clientX,
        y: e.touches[0].clientY
      });
      
      // Apply the transform directly
      if (mapContainerRef.current) {
        mapContainerRef.current.style.transform =
          `scale(${zoomLevel}) translate(${newPosition.x}%, ${newPosition.y}%)`;
      }
    }
  };

  const handleTouchEnd = () => {
    setIsDragging(false);
  };

  const handleWheel = (e) => {
    e.preventDefault();
    if (e.deltaY < 0) {
      zoomIn();
    } else {
      zoomOut();
    }
  };

  return (
    <div className="interactive-map-page">
      <section className="map-container">
        <div className="map-sidebar">
          <div className="region-description">
            <h3>Himachal Pradesh</h3>
            <p>{regions.find(r => r.id === 'himachal').description}</p>
          </div>
          
          <h3>Places to Visit in Himachal Pradesh</h3>
          <ul className="marker-list">
            {markers['himachal'].map((marker) => (
              <li 
                key={marker.id}
                className={activeMarker?.id === marker.id ? 'active' : ''}
                onClick={() => handleMarkerClick(marker)}
              >
                <span className={`marker-type ${marker.type}`}></span>
                {marker.name}
              </li>
            ))}
          </ul>
        </div>
        
        <div className="map-display">
          <div className="map-controls">
            <button className="map-control-btn zoom-in" onClick={zoomIn} title="Zoom In">+</button>
            <button className="map-control-btn zoom-out" onClick={zoomOut} title="Zoom Out">−</button>
            <button className="map-control-btn reset" onClick={resetMap} title="Reset Map">⟲</button>
          </div>
          
          {/* Simple vector map for testing */}
          <div 
            style={{
              width: '100%', 
              height: '100%', 
              display: 'flex', 
              alignItems: 'center', 
              justifyContent: 'center',
              border: '1px solid #ccc',
              backgroundColor: '#f0f0f0'
            }}
          >
            <div 
              ref={mapContainerRef}
              style={{
                width: '80%',
                height: '80%',
                position: 'relative',
                transition: isDragging ? 'none' : 'transform 0.5s ease-in-out',
                transformOrigin: 'center center',
                cursor: isDragging ? 'grabbing' : 'grab'
              }}
              onMouseDown={handleMouseDown}
              onMouseMove={handleMouseMove}
              onMouseUp={handleMouseUp}
              onMouseLeave={handleMouseUp}
              onTouchStart={handleTouchStart}
              onTouchMove={handleTouchMove}
              onTouchEnd={handleTouchEnd}
              onWheel={handleWheel}
            >
              <svg 
                viewBox="0 0 100 150" 
                xmlns="http://www.w3.org/2000/svg"
                style={{ width: '100%', height: '100%' }}
              >
                <rect x="0" y="0" width="100" height="150" fill="#f8f8f8" stroke="#ddd" strokeWidth="0.5" />
                
                <path 
                  d="M40,10 C45,8 48,10 50,12 C52,14 55,15 58,14 C61,13 63,10 65,12 C67,14 70,15 72,18 C74,21 76,25 75,28 C74,31 72,34 70,36 C68,38 65,40 66,44 C67,48 70,50 72,53 C74,56 75,60 73,64 C71,68 68,70 65,73 C62,76 59,80 60,84 C61,88 64,90 65,94 C66,98 65,102 62,105 C59,108 55,110 52,112 C49,114 45,115 45,119 C45,123 48,125 50,128 C52,131 53,135 50,138 C47,141 43,142 40,144 C37,146 35,150 30,150 C25,150 20,145 18,140 C16,135 15,130 20,128 C25,126 30,130 25,125 C20,120 15,115 15,110 C15,105 20,100 18,95 C16,90 10,85 12,80 C14,75 20,70 22,65 C24,60 25,55 20,50 C15,45 10,40 15,35 C20,30 25,35 30,30 C35,25 30,20 35,15 C40,10 35,12 40,10 Z"
                  fill="#e0e0e0" 
                  stroke="#666" 
                  strokeWidth="0.8"
                />
                
                <circle 
                  cx="35" cy="22" r="8"
                  fill="#1a3c6e" 
                  fillOpacity="0.4" 
                  stroke="#1a3c6e"
                  strokeWidth="1.0"
                  onClick={() => handleRegionClick('himachal')}
                />
                
                <text 
                  x="35" y="17" 
                  fontSize="2.5px"
                  fill="#1a3c6e"
                  fontWeight="bold"
                  textAnchor="middle"
                >
                  Himachal Pradesh
                </text>
                
                {markers['himachal'].map((marker) => (
                  <g key={marker.id} onClick={() => handleMarkerClick(marker)}>
                    <circle 
                      cx={marker.coordinates.x} 
                      cy={marker.coordinates.y} 
                      r="1.5" 
                      fill={marker.type === 'city' ? "#ff5722" : marker.type === 'hotel' ? "#4caf50" : "#2196f3"}
                      stroke="white"
                      strokeWidth="0.5"
                    />
                    <text 
                      x={marker.coordinates.x} 
                      y={marker.coordinates.y - 2}
                      fontSize="2px"
                      fill="#333"
                      textAnchor="middle"
                    >
                      {marker.name}
                    </text>
                  </g>
                ))}
                
                <circle cx="45" cy="45" r="0.8" fill="#999" />
                <text x="46" y="45" fontSize="2px" fill="#666">Delhi</text>
                
                <circle cx="38" cy="65" r="0.8" fill="#999" />
                <text x="39" y="65" fontSize="2px" fill="#666">Mumbai</text>
              </svg>
            </div>
          </div>
          
          {/* Location Details Popup */}
          {activeMarker && (
            <div className="location-details">
              <div className="details-header">
                <h2>{activeMarker.name}</h2>
                <button className="close-btn" onClick={handleCloseDetails}>×</button>
              </div>
              <div className="details-content">
                <div className="location-image" style={{ backgroundImage: `url(${activeMarker.details.image})` }}></div>
                <p className="location-description">{activeMarker.details.description}</p>
                
                <h3>Top Attractions</h3>
                <ul className="attractions-list">
                  {activeMarker.details.attractions.map((attraction, index) => (
                    <li key={index}>{attraction}</li>
                  ))}
                </ul>
                
                <h3>Recommended Hotels</h3>
                <ul className="hotels-list">
                  {activeMarker.details.hotels.map((hotel, index) => (
                    <li key={index}>{hotel}</li>
                  ))}
                </ul>
                
                <button className="btn">View Packages</button>
              </div>
            </div>
          )}
        </div>
      </section>

      <section className="map-info-section">
        <h2>How to Use the Interactive Map</h2>
        <div className="map-instructions">
          <div className="instruction-step">
            <div className="step-number">1</div>
            <p>Explore Himachal Pradesh on the map</p>
          </div>
          <div className="instruction-step">
            <div className="step-number">2</div>
            <p>Drag to move around the map</p>
          </div>
          <div className="instruction-step">
            <div className="step-number">3</div>
            <p>Use zoom buttons to adjust your view</p>
          </div>
          <div className="instruction-step">
            <div className="step-number">4</div>
            <p>Click on markers to see details about locations</p>
          </div>
        </div>
      </section>
    </div>
  );
}

export default InteractiveMap;
