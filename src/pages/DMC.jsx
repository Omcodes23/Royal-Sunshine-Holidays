import './DMC.css';
import { useState } from 'react';
import { WobbleCard } from '../components/ui/wobble-card';
import { Link } from 'react-router-dom';

function DMC() {
  const [expandedHimachal, setExpandedHimachal] = useState(false);
  const [expandedUttarakhand, setExpandedUttarakhand] = useState(false);

  const himachalText = "Himachal Pradesh, India is a paradise for adventure and nature lovers alike. Located in the foothills of the Himalayas, it is a picture-perfect destination with breathtaking views, lush green valleys, and snow-capped mountains. It is home to numerous tourist attractions such as the ancient city of Shimla and the beautiful towns of Kullu and Manali. The state has so much to offer to visitors. From trekking, river rafting, paragliding, and skiing to rock climbing, camping, and mountaineering, there are plenty of activities to keep tourists busy. Bikers can take joy rides through the picturesque winding roads of the state and explore the various temples and monasteries located in the region. Nature lovers can take a stroll in the densely forested areas and explore the wildlife. Himachal Pradesh boasts some of the best resorts and hotels in the country. Tourists can indulge in comfortable luxury and pamper themselves with the various spas, restaurants, and other services available. Himachal Pradesh is a great destination for those looking for a peaceful getaway, as well as adventurers looking for some thrills. With its serene atmosphere and beautiful scenery, it is sure to leave visitors with an unforgettable experience.";

  const uttarakhandText = "Uttrakhand, a state located in northern India, is a popular destination for tourists seeking natural beauty, spirituality, and adventure. The state is home to some of the most breathtaking landscapes in the country, including the Himalayas, lush forests, cascading waterfalls, and serene lakes. Royal Sunshine, a destination management company, offers unique travel experiences to explore the state's diverse culture, history, and natural beauty. Uttrakhand is known for its rich culture, which is reflected in the traditional Garhwali and Kumaoni cuisines, handicrafts, and folk music. The state is also famous for its pilgrimage sites such as Haridwar, Rishikesh, and Badrinath, which attract millions of tourists every year. Apart from spiritual tourism, Uttrakhand is also famous for adventure activities such as trekking, camping, river rafting, and skiing. Royal Sunshine offers customized travel packages to some of the most popular tourist destinations in Uttrakhand, including the Jim Corbett National Park, Nainital, Mussoorie, and Auli. These destinations offer breathtaking views of the Himalayan ranges, lakes, and scenic landscapes. The company also provides accommodation options ranging from budget-friendly to luxury resorts, ensuring a comfortable and memorable stay for travelers. In conclusion, Uttrakhand is a treasure trove of natural beauty, spirituality, and adventure. With Royal Sunshine's bespoke travel packages, tourists can experience the state's rich culture, history, and breathtaking landscapes. Whether you're seeking spiritual enlightenment or thrilling adventures, Uttarakhand is the perfect destination for an unforgettable journey.";

  const truncatedHimachal = himachalText.substring(0, 200) + "...";
  const truncatedUttarakhand = uttarakhandText.substring(0, 200) + "...";

  return (
    <div className="dmc-page bg-gradient-to-br from-primary-50 to-secondary-50 min-h-screen">
      <section className="dmc-hero">
        <div className="dmc-hero-content">
          <h1>Destination Management Services</h1>
          <p>Your trusted partner for all destination management needs</p>
        </div>
      </section>
      
      <section className="dmc-destinations">
        <div className="dmc-container">
          <div className="flex flex-col gap-8 w-full">
            {/* Himachal Pradesh Card */}
            <WobbleCard
              containerClassName="w-full h-full bg-white border border-gray-200 shadow-lg min-h-[400px]"
              className=""
            >
              <div className="flex items-center gap-8 w-full h-full">
                <div className="flex-shrink-0">
                  <img
                    src="https://images.unsplash.com/photo-1506905925346-21bda4d32df4?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
                    alt="Himachal Pradesh"
                    className="w-80 h-80 object-cover rounded-2xl shadow-lg"
                  />
                </div>
                <div className="flex-1">
                  <h2 className="text-left text-balance text-2xl md:text-3xl lg:text-4xl font-semibold tracking-[-0.015em] text-gray-800 mb-4">
                    Himachal Pradesh
                  </h2>
                  <p className="text-left text-base/6 text-gray-600 mb-6 max-w-2xl">
                    {expandedHimachal ? himachalText : truncatedHimachal}
                  </p>
                  <div className="flex gap-3">
                    <button 
                      className="read-more-btn"
                      onClick={() => setExpandedHimachal(!expandedHimachal)}
                    >
                      {expandedHimachal ? 'Read Less' : 'Read More'}
                    </button>
                    <Link to="/domestic-packages" className="explore-more-btn">
                      Explore More
                    </Link>
                  </div>
                </div>
              </div>
            </WobbleCard>

            {/* Uttarakhand Card */}
            <WobbleCard 
              containerClassName="w-full h-full bg-white border border-gray-200 shadow-lg min-h-[400px]"
            >
              <div className="flex items-center gap-8 w-full h-full">
                <div className="flex-shrink-0">
                  <img
                    src="https://images.unsplash.com/photo-1578662996442-48f60103fc96?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                    alt="Uttarakhand"
                    className="w-80 h-80 object-cover rounded-2xl shadow-lg"
                  />
                </div>
                <div className="flex-1">
                  <h2 className="text-left text-balance text-2xl md:text-3xl lg:text-4xl font-semibold tracking-[-0.015em] text-gray-800 mb-4">
                    Uttarakhand
                  </h2>
                  <p className="text-left text-base/6 text-gray-600 mb-6 max-w-2xl">
                    {expandedUttarakhand ? uttarakhandText : truncatedUttarakhand}
                  </p>
                  <div className="flex gap-3">
                    <button 
                      className="read-more-btn"
                      onClick={() => setExpandedUttarakhand(!expandedUttarakhand)}
                    >
                      {expandedUttarakhand ? 'Read Less' : 'Read More'}
                    </button>
                    <Link to="/domestic-packages" className="explore-more-btn">
                      Explore More
                    </Link>
                  </div>
                </div>
              </div>
            </WobbleCard>
          </div>
        </div>
      </section>
    </div>
  );
}

export default DMC;
