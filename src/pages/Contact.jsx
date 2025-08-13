import { useState } from 'react';
import { Phone, Mail, MapPin, Send, CheckCircle, AlertCircle } from 'lucide-react';
import './Contact.css';

function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: ''
  });
  
  const [formStatus, setFormStatus] = useState(null);
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const validateForm = (data) => {
    const newErrors = {};
    
    if (!data.name.trim()) newErrors.name = 'Name is required';
    if (!data.email.trim()) newErrors.email = 'Email is required';
    else if (!/\S+@\S+\.\S+/.test(data.email)) newErrors.email = 'Email is invalid';
    if (!data.phone.trim()) newErrors.phone = 'Phone is required';
    if (!data.message.trim()) newErrors.message = 'Message is required';
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
  
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };
  
  const getFieldIds = () => {
    // Open the form in edit mode to inspect field IDs
    const editUrl = 'https://docs.google.com/forms/d/1FAIpQLSeBiEpL9StDMV8Dr8prjGe-UBX9jKG7D_eXBr-MlafL1q6daQ/edit';
    console.log('Opening form in edit mode to inspect field IDs:', editUrl);
    console.log('Instructions:');
    console.log('1. Right-click on each field (Name, Email, Phone, Message)');
    console.log('2. Select "Inspect" or press F12');
    console.log('3. Look for the "name" attribute like "entry.1234567890"');
    console.log('4. Note down each field ID');
    window.open(editUrl, '_blank');
  };

  const testFieldIds = () => {
    // Test function to help identify field IDs
    // Try different common field ID patterns based on typical Google Form IDs
    const testUrls = [
      `https://docs.google.com/forms/d/e/1FAIpQLSeBiEpL9StDMV8Dr8prjGe-UBX9jKG7D_eXBr-MlafL1q6daQ/formResponse?entry.2005620554=TestName&entry.1045781291=test@email.com&entry.1166974658=1234567890&entry.839337160=TestMessage&submit=Submit`,
      `https://docs.google.com/forms/d/e/1FAIpQLSeBiEpL9StDMV8Dr8prjGe-UBX9jKG7D_eXBr-MlafL1q6daQ/formResponse?entry.1234567890=TestName&entry.1234567891=test@email.com&entry.1234567892=1234567890&entry.1234567893=TestMessage&submit=Submit`,
      `https://docs.google.com/forms/d/e/1FAIpQLSeBiEpL9StDMV8Dr8prjGe-UBX9jKG7D_eXBr-MlafL1q6daQ/formResponse?entry.1=TestName&entry.2=test@email.com&entry.3=1234567890&entry.4=TestMessage&submit=Submit`,
      // Try some more realistic field IDs
      `https://docs.google.com/forms/d/e/1FAIpQLSeBiEpL9StDMV8Dr8prjGe-UBX9jKG7D_eXBr-MlafL1q6daQ/formResponse?entry.123456789=TestName&entry.987654321=test@email.com&entry.555666777=1234567890&entry.111222333=TestMessage&submit=Submit`,
      `https://docs.google.com/forms/d/e/1FAIpQLSeBiEpL9StDMV8Dr8prjGe-UBX9jKG7D_eXBr-MlafL1q6daQ/formResponse?entry.1000000001=TestName&entry.1000000002=test@email.com&entry.1000000003=1234567890&entry.1000000004=TestMessage&submit=Submit`
    ];
    
    console.log('Testing different field ID patterns...');
    testUrls.forEach((url, index) => {
      console.log(`Test ${index + 1}:`, url);
    });
    
    // Open the first test URL
    window.open(testUrls[0], '_blank');
  };

  const inspectFormDirectly = () => {
    // Open the form directly to inspect the HTML
    const formUrl = 'https://docs.google.com/forms/d/e/1FAIpQLSeBiEpL9StDMV8Dr8prjGe-UBX9jKG7D_eXBr-MlafL1q6daQ/viewform';
    console.log('Opening form to inspect HTML directly:', formUrl);
    console.log('Instructions:');
    console.log('1. Right-click on the page and select "View Page Source"');
    console.log('2. Search for "entry." to find field IDs');
    console.log('3. Look for patterns like: name="entry.123456789"');
    window.open(formUrl, '_blank');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm(formData)) return;
    
    setIsSubmitting(true);
    
    try {
      // Google Sheets form submission
      const formDataToSend = new FormData();
      
      // Field IDs from your Google Form: https://docs.google.com/forms/d/e/1FAIpQLSeBiEpL9StDMV8Dr8prjGe-UBX9jKG7D_eXBr-MlafL1q6daQ/viewform
      // These need to be replaced with the actual field IDs from the form
      formDataToSend.append('entry.1234567890', formData.name); // Name field
      formDataToSend.append('entry.1234567891', formData.email); // Email field
      formDataToSend.append('entry.1234567892', formData.phone); // Phone field
      formDataToSend.append('entry.1234567893', formData.message); // Message field
      
      // Your Google Form URL - using the correct form ID
      const formUrl = 'https://docs.google.com/forms/d/e/1FAIpQLSeBiEpL9StDMV8Dr8prjGe-UBX9jKG7D_eXBr-MlafL1q6daQ/formResponse';
      console.log('Submitting to:', formUrl);
      console.log('Form data:', Object.fromEntries(formDataToSend));
      
      const response = await fetch(formUrl, {
        method: 'POST',
        body: formDataToSend,
        mode: 'no-cors' // Required for Google Forms
      });
      
      console.log('Response status:', response.status);
      
      setFormStatus('success');
      setFormData({
        name: '',
        email: '',
        phone: '',
        message: ''
      });
      setErrors({});
    } catch (error) {
      console.error('Form submission error:', error);
      setFormStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };
  
  const resetForm = () => {
    setFormStatus(null);
    setErrors({});
  };
  
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
          {/* Left Side - Address Information */}
          <div className="contact-info">
            <div className="contact-details">
              <div className="contact-item">
                <div className="contact-icon">
                  <MapPin className="icon" />
                </div>
                <div className="contact-text">
                  <h3>Address</h3>
                  <p>FF-110, Yash Complex, Gotri, Vadodara, Gujarat, India</p>
                </div>
              </div>
              
              <div className="contact-item">
                <div className="contact-icon">
                  <Phone className="icon" />
                </div>
                <div className="contact-text">
                  <h3>Phone</h3>
                  <p>+91 63544 86936</p>
                </div>
              </div>
              
              <div className="contact-item">
                <div className="contact-icon">
                  <Mail className="icon" />
                </div>
                <div className="contact-text">
                  <h3>Email</h3>
                  <p>b2b@royalsunshines.com</p>
                  <p>jay@royalsunshines.com</p>
                </div>
              </div>
            </div>
          </div>
          
          {/* Right Side - Contact Form */}
          <div className="contact-form-container">
            <h2>CONTACT FORM</h2>
            <p className="form-description">
              We are eager to hear from you; please fill in your contact information and one of our staff members will contact you shortly.
            </p>
            
            {formStatus === 'success' && (
              <div className="form-success-message">
                <CheckCircle className="success-icon" />
                <div>
                  <h4>Message Sent Successfully!</h4>
                  <p>Thank you for your message! We'll get back to you within 24 hours.</p>
                </div>
                <button className="close-btn" onClick={resetForm}>×</button>
              </div>
            )}
            {formStatus === 'error' && (
              <div className="form-error-message">
                <AlertCircle className="error-icon" />
                <div>
                  <h4>Something went wrong!</h4>
                  <p>Please try again or contact us directly via phone.</p>
                </div>
                <button className="close-btn" onClick={resetForm}>×</button>
              </div>
            )}
            
            <form className="contact-form" onSubmit={handleSubmit}>
              <div className="form-group">
                <label htmlFor="name">YOUR NAME *</label>
                <input 
                  type="text" 
                  id="name" 
                  name="name" 
                  value={formData.name}
                  onChange={handleChange}
                  className={errors.name ? 'error' : ''}
                  placeholder="Enter your full name"
                />
                {errors.name && <span className="error-message">{errors.name}</span>}
              </div>
              
              <div className="form-group">
                <label htmlFor="email">YOUR EMAIL ADDRESS *</label>
                <input 
                  type="email" 
                  id="email" 
                  name="email" 
                  value={formData.email}
                  onChange={handleChange}
                  className={errors.email ? 'error' : ''}
                  placeholder="Enter your email address"
                />
                {errors.email && <span className="error-message">{errors.email}</span>}
              </div>
              
              <div className="form-group">
                <label htmlFor="phone">YOUR PHONE *</label>
                <input 
                  type="tel" 
                  id="phone" 
                  name="phone" 
                  value={formData.phone}
                  onChange={handleChange}
                  className={errors.phone ? 'error' : ''}
                  placeholder="Enter your phone number"
                />
                {errors.phone && <span className="error-message">{errors.phone}</span>}
              </div>
              
              <div className="form-group">
                <label htmlFor="message">YOUR MESSAGE *</label>
                <textarea 
                  id="message" 
                  name="message" 
                  rows="6" 
                  value={formData.message}
                  onChange={handleChange}
                  className={errors.message ? 'error' : ''}
                  placeholder="Tell us more about your inquiry..."
                ></textarea>
                {errors.message && <span className="error-message">{errors.message}</span>}
              </div>
              
              <p className="required-note">* Please fill in all of the required fields</p>
              
              <button type="submit" className="btn" disabled={isSubmitting}>
                {isSubmitting ? (
                  <>
                    <div className="spinner"></div>
                    Sending...
                  </>
                ) : (
                  <>
                    <Send className="btn-icon" />
                    Send Message
                  </>
                )}
              </button>
              
              {/* Test button to help get field IDs */}
              <button 
                type="button" 
                onClick={testFieldIds}
                style={{
                  background: '#6b7280',
                  color: 'white',
                  border: 'none',
                  padding: '8px 16px',
                  borderRadius: '4px',
                  fontSize: '0.875rem',
                  marginTop: '10px',
                  marginRight: '10px',
                  cursor: 'pointer'
                }}
              >
                Test Field IDs
              </button>
              
              {/* Button to open form in edit mode */}
              <button 
                type="button" 
                onClick={getFieldIds}
                style={{
                  background: '#059669',
                  color: 'white',
                  border: 'none',
                  padding: '8px 16px',
                  borderRadius: '4px',
                  fontSize: '0.875rem',
                  marginTop: '10px',
                  marginRight: '10px',
                  cursor: 'pointer'
                }}
              >
                Get Field IDs
              </button>
              
              {/* Button to inspect form source */}
              <button 
                type="button" 
                onClick={inspectFormDirectly}
                style={{
                  background: '#dc2626',
                  color: 'white',
                  border: 'none',
                  padding: '8px 16px',
                  borderRadius: '4px',
                  fontSize: '0.875rem',
                  marginTop: '10px',
                  cursor: 'pointer'
                }}
              >
                Inspect Form Source
              </button>
            </form>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Contact;
