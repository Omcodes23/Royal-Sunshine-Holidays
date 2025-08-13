import './About.css';
import { LinkPreview } from '../components/ui/link-preview';

function About() {
  return (
    <div className="about-page">
      <section className="about-hero">
        <div className="about-hero-content">
          <h1>About Royal Sunshine</h1>
          <p>Your trusted destination management partner</p>
        </div>
      </section>
      
      <section className="about-section">
        <div className="about-container">
          <div className="about-content">
            <p className="mb-6 text-lg leading-relaxed">
              Royal Sunshine is a renowned destination management company (DMC) based in Gujarat, India, specializing in providing personalized travel solutions and services to its customers. Led by Jay Vataliya, it has been a leader in the travel and tourism industry for several years, managing the{" "}
              <LinkPreview 
                url="https://himachaltourism.gov.in" 
                className="font-bold"
                isStatic={true}
                imageSrc="/assets/maps/himachal.png"
              >
                Himachal Pradesh
              </LinkPreview>{" "}
              DMC and aiming to expand its operations to other states such as{" "}
              <LinkPreview 
                url="https://tourism.rajasthan.gov.in" 
                className="font-bold"
                isStatic={true}
                imageSrc="/assets/maps/rajasthan.png"
              >
                Rajasthan
              </LinkPreview>,{" "}
              <LinkPreview 
                url="https://uttarakhandtourism.gov.in" 
                className="font-bold"
                isStatic={true}
                imageSrc="/assets/maps/uttrakhand.png"
              >
                Uttarakhand
              </LinkPreview>,{" "}
              <LinkPreview 
                url="https://gujarattourism.com" 
                className="font-bold"
                isStatic={true}
                imageSrc="/assets/maps/gujarat.png"
              >
                Gujarat
              </LinkPreview>, and{" "}
              <LinkPreview 
                url="https://goatourism.gov.in" 
                className="font-bold"
                isStatic={true}
                imageSrc="/assets/maps/goa.png"
              >
                Goa
              </LinkPreview>.
            </p>
            <p className="mb-6 text-lg leading-relaxed">
              At Royal Sunshine, each traveler is provided with an unforgettable experience, no matter the occasion. Be it for a leisure trip, corporate tour, or destination wedding, a team of professional's works to ensure that the customer's needs are catered to. From transportation and accommodation to sightseeing and adventure activities, Royal Sunshine offers a comprehensive range of services that are tailored to each customer.
            </p>
            <p className="mb-6 text-lg leading-relaxed">
              The company is widely recognized for its commitment to customer satisfaction, attention to detail, and excellence in delivering its services. Their goal is to provide a unique and enjoyable holiday experience to travelers visiting Himachal Pradesh, Rajasthan, Uttrakhand, Gujarat, or Goa.
            </p>
            <p className="text-lg leading-relaxed">
              Our team is highly talented and efficient in delivering our services. We bring a fresh perspective to any destination and provide our customers with access to our extensive network and resources in the world of travel. We offer customizable deals and options for a variety of holiday activities. With us, you are guaranteed an enjoyable and unforgettable vacation experience.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}

export default About;
