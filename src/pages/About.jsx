import React, { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import styles from '../styles/About.module.css';

// Import team member images
import antonImage from '../assets/anton.jpg';
import pirozImage from '../assets/piroz.jfif';
import albinImage from '../assets/albin.jfif';
import leiImage from '../assets/lei.jpg';

const About = () => {
  const [scrollPosition, setScrollPosition] = useState(0);
  const parallaxRef = useRef(null);
  const navigate = useNavigate();

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
          <h1 className={styles.title}>About Us</h1>
          <p className={styles.subtitle}>Unifying AI power for everyone</p>
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
              <span className={styles.imageCaption}>Team ideation session</span>
            </div>
            <div className={styles.visionText}>
              <p>At In-1, we are driven by a fundamental belief: the power of Artificial Intelligence should be accessible, manageable, and impactful for everyone. We are living in a new technological dawn, where AI is rapidly becoming the most potent tool humanity has ever created, promising to reshape industries and enhance our capabilities in unprecedented ways.</p>
              <p>Our platform is designed for the modern workplace – from small businesses to large enterprises and public sector organizations. By providing employees with seamless access to cutting-edge AI capabilities through one integrated solution, we empower organizations to streamline workflows, boost efficiency, drive innovation, and optimize costs.</p>
            </div>
          </div>
        </div>
      </section>
      
      {/* Challenge section */}
      <section className={`${styles.challengeSection} ${styles.fadeIn}`}>
        <div className={styles.container}>
          <h2>The Challenge in the Age of AI</h2>
          <div className={styles.challengeContent}>
            <p>
              The AI landscape is exploding with innovation. Specialized models excel at specific tasks – generating stunning visuals, composing intricate text, editing audio with precision, or performing complex data analysis. However, harnessing the best of these tools often means navigating a fragmented market, managing multiple subscriptions with varying and often significant costs (from hundreds to thousands per year or even month per tool), and dealing with the complexity of integrating disparate systems. This creates a barrier, particularly for businesses and organizations aiming to leverage AI comprehensively without breaking the bank or overwhelming their teams.
            </p>
            <div className={styles.challengeVisual}>
              <span className={styles.imageCaption}>Collaborative problem solving</span>
            </div>
          </div>
        </div>
      </section>
      
      {/* Solution section */}
      <section className={`${styles.solutionSection} ${styles.fadeIn}`}>
        <div className={styles.container}>
          <h2>Our Solution: A Unified AI Powerhouse</h2>
          <div className={styles.solutionContent}>
            <div className={styles.solutionVisual}>
              <span className={styles.imageCaption}>Building the future together</span>
            </div>
            <p>
              In-1 was founded to solve this challenge. We are developing a comprehensive, full-stack, all-in-one platform that aggregates a curated selection of leading AI models. Our core offering simplifies AI adoption: through a single, streamlined subscription, our clients gain access to a powerful suite of diverse, best-in-class AI tools. We aim to offer clear, potentially flexible pricing tiers based on usage needs, ensuring that professional-grade AI is within reach.
            </p>
          </div>
          <div className={styles.benefitsList}>
            <div className={styles.benefitItem}>
              <span>✓</span> Streamline Workflows: Integrate AI seamlessly into daily tasks.
            </div>
            <div className={styles.benefitItem}>
              <span>✓</span> Boost Efficiency: Automate repetitive processes and accelerate project completion.
            </div>
            <div className={styles.benefitItem}>
              <span>✓</span> Drive Innovation: Unlock new creative and analytical possibilities.
            </div>
            <div className={styles.benefitItem}>
              <span>✓</span> Optimize Costs: Access multiple premium AI models through one predictable cost structure.
            </div>
          </div>
        </div>
      </section>
      
      {/* Team section with real team members */}
      <section className={`${styles.teamSection} ${styles.fadeIn}`}>
        <div className={styles.container}>
          <h2>Meet the Team</h2>
          <p style={{ textAlign: 'center', marginBottom: '2rem' }}>
            The vision for In-1 is brought to life by a team of passionate technologists and innovators
          </p>
          <div className={styles.teamGrid}>
            {[
              { 
                name: 'Piroz Kianersi', 
                role: 'Lead Innovator', 
                image: pirozImage,
                description: 'A visionary thinker with an exceptional aptitude for programming and out-of-the-box problem-solving. Piroz drives our core innovation.'
              },
              { 
                name: 'Albin Cronmark', 
                role: 'Integration Specialist', 
                image: albinImage,
                description: 'A master of programming logic, with deep expertise in Python and the intricacies of API integration, ensuring our platform is robust and interconnected.'
              },
              { 
                name: 'Lei Ye', 
                role: 'Development Navigator', 
                image: leiImage,
                description: 'The essential navigator guiding our development efforts; a brilliant programmer ensuring we stay on course and deliver exceptional software.'
              },
              { 
                name: 'Anton Ernstsson', 
                role: 'Database & UX Architect', 
                image: antonImage,
                description: 'A master of database architecture and user-centric design, focusing on creating a platform that is not only powerful but also intuitive and reliable.'
              }
            ].map((member, index) => (
              <div key={index} className={styles.teamCard}>
                <div className={styles.teamCardInner}>
                  <div className={styles.teamCardFront}>
                    <div 
                      className={styles.teamImage} 
                      style={{ backgroundImage: `url(${member.image})` }}
                    ></div>
                    <h3>{member.name}</h3>
                    <p>{member.role}</p>
                  </div>
                  <div className={styles.teamCardBack}>
                    <p>{member.description}</p>
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
      
      {/* Feature section */}
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