import { Phone, Mail, MapPin } from 'lucide-react';
import './Contact.css';

function Contact() {
  
  return (
    <div className="contact-page">
      <section className="contact-hero">
        <div className="contact-hero-content">
          <h1>Contact Us</h1>
          <p>We're here to help with all your travel needs</p>
        </div>
      </section>
      
      <section className="contact-main-section">
        <div className="contact-container">
          {/* Contact Information Cards */}
          <div className="contact-info-grid">
            {/* Phone Numbers Card */}
            <div className="contact-card phone-card">
              <div className="contact-card-header">
                <div className="contact-icon">
                  <Phone className="icon" />
                </div>
                <h3>Contact Numbers</h3>
              </div>
              <div className="contact-card-content">
                <div className="phone-numbers">
                  <a href="tel:+916354486936" className="phone-link">
                    <span className="phone-number">+91 6354486936</span>
                  </a>
                  <a href="tel:+919510141821" className="phone-link">
                    <span className="phone-number">+91 9510141821</span>
                  </a>
                  <a href="tel:+918733096699" className="phone-link">
                    <span className="phone-number">+91 8733096699</span>
                  </a>
                </div>
                <p className="contact-note">Call us anytime for immediate assistance</p>
              </div>
            </div>

            {/* Email Addresses Card */}
            <div className="contact-card email-card">
              <div className="contact-card-header">
                <div className="contact-icon">
                  <Mail className="icon" />
                </div>
                <h3>Email Addresses</h3>
              </div>
              <div className="contact-card-content">
                <div className="email-addresses">
                  <a href="mailto:b2b@royalsunshines.com" className="email-link">
                    <span className="email-address">b2b@royalsunshines.com</span>
                  </a>
                  <a href="mailto:reservations@rshgroups.com" className="email-link">
                    <span className="email-address">reservations@rshgroups.com</span>
                  </a>
                  <a href="mailto:jay@royalsunshines.com" className="email-link">
                    <span className="email-address">jay@royalsunshines.com</span>
                  </a>
                </div>
                <p className="contact-note">Send us an email for detailed inquiries</p>
              </div>
            </div>

            {/* Address Card */}
            <div className="contact-card address-card">
              <div className="contact-card-header">
                <div className="contact-icon">
                  <MapPin className="icon" />
                </div>
                <h3>Office Address</h3>
              </div>
              <div className="contact-card-content">
                <div className="address-details">
                  <p className="address-line">402/03, PRINCE CUBE</p>
                  <p className="address-line">Beside Gangotri exotica Laxmipura Char Rasta</p>
                  <p className="address-line">Nayaran Garden, 30, Mtr Road</p>
                  <p className="address-line">Gotri, Vadodara, Gujarat 390023</p>
                </div>
                <p className="contact-note">Visit our office for personalized service</p>
              </div>
            </div>

          </div>
        </div>
      </section>
    </div>
  );
}

export default Contact;
