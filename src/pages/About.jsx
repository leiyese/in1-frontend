import React, { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import styles from '../styles/About.module.css';

const About = () => {
  const navigate = useNavigate();
  const parallaxRef = useRef(null);
  const [scrollPosition, setScrollPosition] = useState(0);
  
  // Animate on scroll
  useEffect(() => {
    const handleScroll = () => {
      const position = window.scrollY;
      setScrollPosition(position);
      
      // Add visible class to elements as they enter viewport
      document.querySelectorAll(`.${styles.fadeIn}`).forEach(element => {
        const elementTop = element.getBoundingClientRect().top;
        const elementVisible = 150;
        if (elementTop < window.innerHeight - elementVisible) {
          element.classList.add(styles.visible);
        }
      });
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Initial check
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  // Interactive timeline item click handler
  const handleTimelineClick = (index) => {
    const timelineItems = document.querySelectorAll(`.${styles.timelineItem}`);
    timelineItems.forEach((item, i) => {
      if (i === index) {
        item.classList.toggle(styles.expanded);
      } else {
        item.classList.remove(styles.expanded);
      }
    });
  };

  return (
    <div className={styles.aboutPage}>
      <Header />
      
      {/* Hero section with parallax */}
      <section 
        className={styles.heroSection}
        ref={parallaxRef}
        style={{ backgroundPositionY: `${scrollPosition * 0.5}px` }}
      >
        <div className={styles.heroContent}>
          <h1 className={styles.title}>Our Story</h1>
          <p className={styles.subtitle}>Creating the future of AI interaction</p>
        </div>
        <div className={styles.scrollIndicator}>
          <span>Scroll to explore</span>
          <div className={styles.arrow}></div>
        </div>
      </section>
      
      {/* Vision section */}
      <section className={`${styles.visionSection} ${styles.fadeIn}`}>
        <div className={styles.container}>
          <h2>Our Vision</h2>
          <div className={styles.visionContent}>
            <div className={styles.visionImage}>
              <div className={styles.imageWrapper}>
                <div className={styles.glowEffect}></div>
              </div>
            </div>
            <div className={styles.visionText}>
              <p>In1 was born from a simple idea: make artificial intelligence accessible to everyone while maintaining the highest level of performance and reliability.</p>
              <p>We believe AI should be intuitive, powerful, and seamlessly integrated into everyday life. Our platform brings together cutting-edge models in a user-friendly interface that adapts to your needs.</p>
            </div>
          </div>
        </div>
      </section>
      
      {/* Interactive timeline */}
      <section className={`${styles.timelineSection} ${styles.fadeIn}`}>
        <div className={styles.container}>
          <h2>Our Journey</h2>
          <div className={styles.timeline}>
            {[
              { year: '2022', title: 'The Beginning', content: 'Our journey began in a small apartment with a team of three developers sharing a vision for more accessible AI.' },
              { year: '2023', title: 'First Prototype', content: 'After months of development, we launched our first prototype, receiving enthusiastic feedback from early adopters.' },
              { year: '2024', title: 'Growing Community', content: 'Our user base expanded rapidly as we introduced new models and subscription options to meet diverse needs.' },
              { year: '2025', title: 'The Future', content: 'We continue to push boundaries, with exciting developments in multimodal AI and custom model training on the horizon.' }
            ].map((item, index) => (
              <div 
                key={index} 
                className={styles.timelineItem}
                onClick={() => handleTimelineClick(index)}
              >
                <div className={styles.timelineYear}>{item.year}</div>
                <div className={styles.timelineContent}>
                  <h3>{item.title}</h3>
                  <p>{item.content}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
      
      {/* Team section with animated cards */}
      <section className={`${styles.teamSection} ${styles.fadeIn}`}>
        <div className={styles.container}>
          <h2>Meet Our Team</h2>
          <div className={styles.teamGrid}>
            {[
              { name: 'Alexandra Chen', role: 'Founder & CEO', image: '/team1.jpg' },
              { name: 'Marcus Johnson', role: 'CTO', image: '/team2.jpg' },
              { name: 'Sofia Rodriguez', role: 'Lead AI Researcher', image: '/team3.jpg' },
              { name: 'David Kim', role: 'UX Designer', image: '/team4.jpg' }
            ].map((member, index) => (
              <div key={index} className={styles.teamCard}>
                <div className={styles.teamCardInner}>
                  <div className={styles.teamCardFront}>
                    <div className={styles.teamImagePlaceholder}></div>
                    <h3>{member.name}</h3>
                    <p>{member.role}</p>
                  </div>
                  <div className={styles.teamCardBack}>
                    <p>Passionate about creating technology that enhances human capability and creativity.</p>
                    <div className={styles.socialLinks}>
                      <span>🔗</span>
                      <span>📧</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
      
      {/* Interactive feature section */}
      <section className={`${styles.featureSection} ${styles.fadeIn}`}>
        <div className={styles.container}>
          <h2>What Makes Us Different</h2>
          <div className={styles.featureGrid}>
            {[
              { icon: '🧠', title: 'Advanced AI Models', description: 'Access to the most powerful language models available today.' },
              { icon: '🛡️', title: 'Security First', description: 'Your data and conversations are encrypted and protected.' },
              { icon: '⚡', title: 'Lightning Fast', description: 'Optimized for performance even with complex requests.' },
              { icon: '🔍', title: 'Deep Research', description: 'AI that can analyze and synthesize information from multiple sources.' }
            ].map((feature, index) => (
              <div key={index} className={styles.featureCard}>
                <div className={styles.featureIcon}>{feature.icon}</div>
                <h3>{feature.title}</h3>
                <p>{feature.description}</p>
                <div className={styles.featureHighlight}></div>
              </div>
            ))}
          </div>
        </div>
      </section>
      
      {/* Call to action */}
      <section className={`${styles.ctaSection} ${styles.fadeIn}`}>
        <div className={styles.ctaContent}>
          <h2>Ready to experience the future?</h2>
          <p>Join thousands of users already transforming how they work with AI.</p>
          <div className={styles.ctaButtons}>
            <button onClick={() => navigate('/register-user')} className={styles.primaryButton}>
              Get Started
            </button>
            <button onClick={() => navigate('/')} className={styles.secondaryButton}>
              Try Demo
            </button>
          </div>
        </div>
      </section>
      
      <Footer />
    </div>
  );
};

export default About;