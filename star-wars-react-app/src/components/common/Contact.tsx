import React, { useState } from 'react';
import '../../styles/Contact.css';

interface FormState {
  name: string;
  email: string;
  subject: string;
  message: string;
}

interface FormErrors {
  name?: string;
  email?: string;
  message?: string;
}

const Contact: React.FC = () => {
  const [formState, setFormState] = useState<FormState>({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  
  const [errors, setErrors] = useState<FormErrors>({});
  const [submitted, setSubmitted] = useState(false);
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormState(prev => ({
      ...prev,
      [name]: value
    }));
    
    // Clear error when user types
    if (errors[name as keyof FormErrors]) {
      setErrors(prev => ({
        ...prev,
        [name]: undefined
      }));
    }
  };
  
  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};
    
    if (!formState.name.trim()) {
      newErrors.name = 'Name is required';
    }
    
    if (!formState.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^\S+@\S+\.\S+$/.test(formState.email)) {
      newErrors.email = 'Please enter a valid email address';
    }
    
    if (!formState.message.trim()) {
      newErrors.message = 'Message is required';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (validateForm()) {
      // In a real implementation, this would connect to your backend
      console.log('Form data:', formState);
      setSubmitted(true);
      
      // Reset form
      setFormState({
        name: '',
        email: '',
        subject: '',
        message: ''
      });
    }
  };
  
  return (
    <div className="contact-container">
      <div className="contact-header">
        <h1>Contact the Author</h1>
        <div className="author-info">
          <div className="author-image">
            <img src="../../../public/profile.svg" alt="Author" />
          </div>
          <div className="author-bio">
            <h2>About Me</h2>
            <p>Hello there! I'm the creator of this Star Wars fan page. I've been a passionate Star Wars fan since childhood and created this site to share my love for the galaxy far, far away with fellow fans.</p>
            
            <div className="author-quote">
              <p>"The Force will be with you. Always."</p>
            </div>
          </div>
        </div>
      </div>

      <div className="contact-content">
        {submitted ? (
          <div className="success-message">
            <div className="success-icon">✓</div>
            <h2>Message Sent Successfully!</h2>
            <p>Thank you for reaching out. May the Force be with you!</p>
            <button 
              className="send-another-btn"
              onClick={() => setSubmitted(false)}
            >
              Send Another Message
            </button>
          </div>
        ) : (
          <form className="contact-form" onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="name">Your Name:</label>
              <input
                type="text"
                id="name"
                name="name"
                value={formState.name}
                onChange={handleChange}
                className={errors.name ? 'error' : ''}
              />
              {errors.name && <span className="error-message">{errors.name}</span>}
            </div>
            
            <div className="form-group">
              <label htmlFor="email">Your Email:</label>
              <input
                type="email"
                id="email"
                name="email"
                value={formState.email}
                onChange={handleChange}
                className={errors.email ? 'error' : ''}
              />
              {errors.email && <span className="error-message">{errors.email}</span>}
            </div>
            
            <div className="form-group">
              <label htmlFor="subject">Subject:</label>
              <select
                id="subject"
                name="subject"
                value={formState.subject}
                onChange={handleChange}
              >
                <option value="">Select a topic</option>
                <option value="question">Question</option>
                <option value="suggestion">Suggestion</option>
                <option value="feedback">Feedback</option>
                <option value="other">Other</option>
              </select>
            </div>
            
            <div className="form-group">
              <label htmlFor="message">Your Message:</label>
              <textarea
                id="message"
                name="message"
                rows={6}
                value={formState.message}
                onChange={handleChange}
                className={errors.message ? 'error' : ''}
              ></textarea>
              {errors.message && <span className="error-message">{errors.message}</span>}
            </div>
            
            <div className="form-actions">
              <button type="submit" className="submit-btn">
                Send Message
              </button>
              <button 
                type="button" 
                className="reset-btn"
                onClick={() => {
                  setFormState({
                    name: '',
                    email: '',
                    subject: '',
                    message: ''
                  });
                  setErrors({});
                }}
              >
                Reset Form
              </button>
            </div>
          </form>
        )}
      </div>
      
      <div className="additional-contact">
      
        <div className="contact-methods">
          <div className="contact-method">
          <a href="https://github.com/yourusername" target="_blank">Github</a>
          </div>
          <div className="contact-method">
            <a href="https://www.linkedin.com/in/brian-koringo/">LinkedIn</a>
          </div>
          <div className="contact-method">
          <a href="mailto:your.email@example.com" target="_blank">Email</a>
          </div>
          <div className="contact-method">
          <a href="brianwendot.com" target="_blank">Website</a>
          </div>
          
        </div>
      </div>
    </div>
  );
};

export default Contact;