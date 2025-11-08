import React, { useState, useEffect, useRef } from 'react';
import { Link } from "react-router-dom";

import i1 from '../../assets/i1.jpg'
import i2 from '../../assets/i2.jpg'
import i3 from '../../assets/i3.jpg'
import i4 from '../../assets/i4.jpg'
import i6 from '../../assets/i6.jpg'
import i8 from '../../assets/i8.jpg'
import v1 from '../../assets/v1.jpg'

import Features from '../Features/Features'
import Newh from '../NewHomes/Newh'
import c1 from '../../assets/c1.webp'
import c2 from '../../assets/c2.webp'
import c3 from '../../assets/c3.webp'

import Hero from '../HeroSection/Hero'
import Graph from '../Graphs/Graphs'
import Feedbacks from '../Feedbacks/Feedbacks'

function Home() {
  const [activeSlide, setActiveSlide] = useState(0);
  const [isHeaderScrolled, setIsHeaderScrolled] = useState(false);
  const [countStart, setCountStart] = useState(false);
  const [counts, setCounts] = useState({ projects: 0, satisfaction: 0, countries: 0, support: 0 });
  const [activeTestimonial, setActiveTestimonial] = useState(0);
  const statsRef = useRef(null);

  // Header scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setIsHeaderScrolled(window.scrollY > 50);
      
      // Check if stats section is in view
      if (statsRef.current) {
        const rect = statsRef.current.getBoundingClientRect();
        if (rect.top < window.innerHeight * 0.8 && !countStart) {
          setCountStart(true);
        }
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [countStart]);

  // Counter animation
  useEffect(() => {
    if (!countStart) return;
    
    const duration = 2000;
    const steps = 60;
    const increment = duration / steps;
    
    const targets = { projects: 500, satisfaction: 98, countries: 50, support: 24 };
    let currentStep = 0;
    
    const timer = setInterval(() => {
      currentStep++;
      const progress = currentStep / steps;
      
      setCounts({
        projects: Math.floor(targets.projects * progress),
        satisfaction: Math.floor(targets.satisfaction * progress),
        countries: Math.floor(targets.countries * progress),
        support: Math.floor(targets.support * progress)
      });
      
      if (currentStep >= steps) {
        setCounts(targets);
        clearInterval(timer);
      }
    }, increment);
    
    return () => clearInterval(timer);
  }, [countStart]);

  // Auto slide for hero
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveSlide((prev) => (prev + 1) % 3);
    }, 6000);
    return () => clearInterval(interval);
  }, []);

  // Auto testimonial slider
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveTestimonial((prev) => (prev + 1) % 3);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const heroSlides = [
    {
      title: "Innovating the Way the World Breathes and Powers Up",
      subtitle: "TOur company stands at the intersection of air, gas, and energy innovation. We engineer next-generation solutions that enhance energy efficiency.",
      image: i4
    },
    {
      title: "Fast. Safe. Sustainable Charging for Every EV",
      subtitle: "Experience next-generation EV charging with EV Filling Station. Our stations are designed with cutting-edge technology to ensure maximum safety.",
      image: v1
    },
    {
      title: "Shaping lasting Relationships through trust",
      subtitle: "We believe great service starts with trust. That’s why Trusted Service focuses on consistent quality, quick response times, and long-term customer satisfaction.",
      image: i6
    },
    {
      title: "versatile activated carbon solutionsfor every industry",
      subtitle: "Maximize yields while minimizing environmental impact with our eco-friendly agricultural innovations",
      image: i8
    },
    {
      title: "Smart Farming Technology",
      subtitle: "Data-driven insights and precision agriculture for optimal plant health and productivity",
      image: i3
    }
  ];

  const services = [
    {
      title: "Resolving Operational Risks due to Carbon Fine Generation in Activated Carbon for Dechlorination at a Beverage Bottling Plant in Europe",
      description: "A leading European beverage producer worked with Haycarb to resolve carbon fine generation in Dechlorination filters. Through system audits and optimized backwashing adjustments, Haycarb restored water clarity and ensured stable, efficient chlorine removal.",
      image:  c1
    },
    {
      title: "Activated Carbon development for a Powered Air Purifying Respirator",
      description: "Discover how a respirator manufacturer partnered with Haycarb for expert recommendations and customized carbon samples for OV/AG filters in a Powered Air Purifying Respirator (PAPR) system. To support NIOSH certification, Haycarb supplied optimized samples tested against multiple gases to ensure effective filtration and regulatory compliance.",
      image:c2
    },
    {
      title: "Addressing Low Activity of Regenerated Carbon and Fine Particle Distribution Issues at a Gold Mine in Victoria, Australia",
      description: "Explore how Haycarb addressed critical challenges at a gold mine in Victoria, Australia, where ineffective carbon regeneration and excessive fine carbon were hindering the gold recovery efficiency. Through targeted solutions, we resolved these issues and significantly improved recovery efficiency.",
      image:  c3
    },
    {
      title: "How Hydroponics Saves Water and Protects the Planet",
      description: "Blog & News How Hydroponics Saves Water and Protects the Planet raditya Uncategorized September 20, 2025 With…",
      image:  i1
    }
  ];

  const testimonials = [
    {
      name: "Sarah Mitchell",
      role: "Commercial Farm Owner",
      text: "HeyCarb has revolutionized our farming operations. The hydroponic systems increased our yield by 45% while reducing water consumption significantly.",
      avatar: "SM"
    },
    {
      name: "David Chen",
      role: "Agricultural Consultant",
      text: "The most innovative and reliable agricultural technology I've encountered. Their support team is exceptional and the results speak for themselves.",
      avatar: "DC"
    },
    {
      name: "Emma Rodriguez",
      role: "Sustainable Farmer",
      text: "Implementing HeyCarb solutions transformed our farm into a model of sustainability. We're producing more with less environmental impact.",
      avatar: "ER"
    }
  ];

  return (
    <div style={styles.container}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700;800&display=swap');
        
        * {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
        }
        
        body {
          font-family: 'Poppins', sans-serif;
          overflow-x: hidden;
        }

        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(60px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes fadeInDown {
          from {
            opacity: 0;
            transform: translateY(-60px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes slideInLeft {
          from {
            opacity: 0;
            transform: translateX(-100px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }

        @keyframes slideInRight {
          from {
            opacity: 0;
            transform: translateX(100px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }

        @keyframes scaleIn {
          from {
            opacity: 0;
            transform: scale(0.8);
          }
          to {
            opacity: 1;
            transform: scale(1);
          }
        }

        @keyframes float {
          0%, 100% {
            transform: translateY(0);
          }
          50% {
            transform: translateY(-20px);
          }
        }

        @keyframes pulse {
          0%, 100% {
            transform: scale(1);
            opacity: 1;
          }
          50% {
            transform: scale(1.05);
            opacity: 0.9;
          }
        }

        .fade-in-up {
          animation: fadeInUp 0.8s ease-out forwards;
        }

        .fade-in-down {
          animation: fadeInDown 0.8s ease-out forwards;
        }

        .slide-in-left {
          animation: slideInLeft 0.8s ease-out forwards;
        }

        .slide-in-right {
          animation: slideInRight 0.8s ease-out forwards;
        }

        .scale-in {
          animation: scaleIn 0.8s ease-out forwards;
        }

        .float {
          animation: float 4s ease-in-out infinite;
        }

        .service-card {
          transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
        }

        .service-card:hover {
          transform: translateY(-15px);
          box-shadow: 0 20px 60px rgba(141, 198, 63, 0.2);
        }

        .service-card:hover::before {
          opacity: 1;
        }

        .stat-card {
          transition: all 0.3s ease;
        }

        .stat-card:hover {
          transform: scale(1.05);
        }

        .nav-link-hover {
          position: relative;
        }

        .nav-link-hover::after {
          content: '';
          position: absolute;
          bottom: -5px;
          left: 0;
          width: 0;
          height: 2px;
          background: #8dc63f;
          transition: width 0.3s ease;
        }

        .nav-link-hover:hover::after {
          width: 100%;
        }

        .btn-primary {
          position: relative;
          overflow: hidden;
        }

        .btn-primary::before {
          content: '';
          position: absolute;
          top: 50%;
          left: 50%;
          width: 0;
          height: 0;
          border-radius: 50%;
          background: rgba(255, 255, 255, 0.2);
          transform: translate(-50%, -50%);
          transition: width 0.6s, height 0.6s;
        }

        .btn-primary:hover::before {
          width: 300px;
          height: 300px;
        }

        .image-overlay {
          position: relative;
          overflow: hidden;
        }

        .image-overlay::after {
          content: '';
          position: absolute;
          top: 0;
          left: -100%;
          width: 100%;
          height: 100%;
          background: linear-gradient(90deg, transparent, rgba(141, 198, 63, 0.3), transparent);
          transition: left 0.5s;
        }

        .image-overlay:hover::after {
          left: 100%;
        }

        .testimonial-slide {
          transition: all 0.5s ease-in-out;
        }

        /* Hover effects */
        .nav-link-hover:hover {
          color: #8dc63f;
        }

        .btn-primary:hover {
          background-color: #7ab02d;
          transform: translateY(-2px);
          box-shadow: 0 8px 30px rgba(141, 198, 63, 0.5);
        }

        .social-link:hover {
          background-color: #8dc63f;
          color: white;
          transform: translateY(-2px);
        }

        .footer-link:hover {
          color: #8dc63f;
        }

        .service-btn:hover {
          gap: 1rem;
        }

        .service-btn:hover .service-btn-arrow {
          transform: translateX(5px);
        }

        .hero-secondary-btn:hover {
          background-color: rgba(255, 255, 255, 0.1);
          transform: translateY(-2px);
        }

        .cta-secondary-btn:hover {
          background-color: rgba(255, 255, 255, 0.1);
          transform: translateY(-2px);
        }

        .slider-arrow:hover {
          background-color: rgba(255, 255, 255, 0.3);
          transform: scale(1.1);
        }
      `}</style>
      
      <Newh />

     
 
        

      {/* Features Bar */}
      <section style={styles.featuresBar}>
        <div style={styles.featuresBarContent}>
          <div style={styles.featureBarItem} className="scale-in">
            <div style={styles.featureBarIcon}>
              <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="#8dc63f" strokeWidth="2">
                <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/>
              </svg>
            </div>
            <div>
              <div style={styles.featureBarTitle}>Advanced Technology</div>
              <div style={styles.featureBarText}>Cutting-edge systems</div>
            </div>
          </div>
          <div style={styles.featureBarItem} className="scale-in">
            <div style={styles.featureBarIcon}>
              <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="#8dc63f" strokeWidth="2">
                <circle cx="12" cy="12" r="10"/>
                <path d="M12 6v6l4 2"/>
              </svg>
            </div>
            <div>
              <div style={styles.featureBarTitle}>24/7 Support</div>
              <div style={styles.featureBarText}>Always available</div>
            </div>
          </div>
          <div style={styles.featureBarItem} className="scale-in">
            <div style={styles.featureBarIcon}>
              <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="#8dc63f" strokeWidth="2">
                <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"/>
                <polyline points="7.5 4.21 12 6.81 16.5 4.21"/>
                <polyline points="7.5 19.79 7.5 14.6 3 12"/>
                <polyline points="21 12 16.5 14.6 16.5 19.79"/>
              </svg>
            </div>
            <div>
              <div style={styles.featureBarTitle}>Eco-Friendly</div>
              <div style={styles.featureBarText}>Sustainable solutions</div>
            </div>
          </div>
          <div style={styles.featureBarItem} className="scale-in">
            <div style={styles.featureBarIcon}>
              <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="#8dc63f" strokeWidth="2">
                <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/>
                <circle cx="12" cy="7" r="4"/>
              </svg>
            </div>
            <div>
              <div style={styles.featureBarTitle}>Expert Team</div>
              <div style={styles.featureBarText}>Experienced professionals</div>
            </div>
          </div>
        </div>
      </section>
      <Features />

      {/* About Section */}
      <section style={styles.aboutSection}>
        <div style={styles.aboutContent}>
          <div style={styles.aboutLeft} className="slide-in-left">
            <div style={styles.aboutImageWrapper}>
              <img 
                src={i4}
                alt="Modern farming"
                style={styles.aboutImage}
                className="image-overlay"
              />
              <div style={styles.aboutImageBadge}>
                <div style={styles.badgeNumber}>15+</div>
                <div style={styles.badgeText}>Years Experience</div>
              </div>
            </div>
          </div>
          <div style={styles.aboutRight} className="slide-in-right">
            <div style={styles.sectionLabel}>About HeyCarb</div>
            <h2 style={styles.aboutTitle}>
            versatile activated carbon solutions
for every industry
            </h2>
            <p style={styles.aboutText}>
             Our products are tailored to meet the specific requirements of diverse industries, delivering effective results across various applications.
            </p>
            <p style={styles.aboutText}>
              With over 15 years of experience, we've helped thousands of farms transition to modern, efficient, and eco-friendly growing methods. Our commitment to innovation and sustainability drives everything we do.
            </p>
            <div style={styles.aboutFeatures}>
              <div style={styles.aboutFeature}>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#8dc63f" strokeWidth="2.5">
                  <polyline points="20 6 9 17 4 12"/>
                </svg>
                <span>Water</span>
              </div>
              <div style={styles.aboutFeature}>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#8dc63f" strokeWidth="2.5">
                  <polyline points="20 6 9 17 4 12"/>
                </svg>
                <span>Air and Gas</span>
              </div>
              <div style={styles.aboutFeature}>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#8dc63f" strokeWidth="2.5">
                  <polyline points="20 6 9 17 4 12"/>
                </svg>
                <span>Pharmaceutical & Cosmetics</span>
              </div>
              <div style={styles.aboutFeature}>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#8dc63f" strokeWidth="2.5">
                  <polyline points="20 6 9 17 4 12"/>
                </svg>
                <span>Lifetime support guarantee</span>
              </div>
            </div>
            <button style={styles.aboutBtn} className="btn-primary">
              Discover More
            </button>
          </div>
        </div>
      </section>
       <Hero />

      {/* Services Section */}
      <section style={styles.servicesSection}>
        <div style={styles.servicesContent}>
          <div style={styles.sectionHeader} className="fade-in-up">
            <div style={styles.sectionLabel}>Our Services</div>
            <h2 style={styles.sectionTitle}>
              Comprehensive Case Studies
            </h2>
            <p style={styles.sectionDescription}>
              From advanced hydroponics to smart climate control, we provide end-to-end solutions for modern Industries
            </p>
          </div>
          
          <div style={styles.servicesGrid}>
            {services.map((service, index) => (
              <div
                key={index}
                style={styles.serviceCard}
                className="service-card scale-in"
              >
                <div style={styles.serviceImageWrapper}>
                  <img 
                    src={service.image}
                    alt={service.title}
                    style={styles.serviceImage}
                  />
                  <div style={styles.serviceOverlay}></div>
                </div>
                <div style={styles.serviceContent}>
                  <h3 style={styles.serviceTitle}>{service.title}</h3>
                  <p style={styles.serviceDescription}>{service.description}</p>
                  <button style={styles.serviceBtn} className="service-btn">
                    Learn More
                    <span style={styles.serviceBtnArrow} className="service-btn-arrow">→</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section style={styles.statsSection} ref={statsRef}>
        <div style={styles.statsOverlay}></div>
        <div style={styles.statsContent}>
          <div style={styles.statCard} className="stat-card">
            <div style={styles.statIcon}>
              <svg width="50" height="50" viewBox="0 0 24 24" fill="none" stroke="#8dc63f" strokeWidth="2">
                <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/>
                <polyline points="9 22 9 12 15 12 15 22"/>
              </svg>
            </div>
            <div style={styles.statNumber}>{counts.projects}+</div>
            <div style={styles.statLabel}>Successful Projects</div>
            <div style={styles.statBar}>
              <div style={{...styles.statBarFill, width: countStart ? '100%' : '0%'}}></div>
            </div>
          </div>
          
          <div style={styles.statCard} className="stat-card">
            <div style={styles.statIcon}>
              <svg width="50" height="50" viewBox="0 0 24 24" fill="none" stroke="#8dc63f" strokeWidth="2">
                <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
              </svg>
            </div>
            <div style={styles.statNumber}>{counts.satisfaction}%</div>
            <div style={styles.statLabel}>Client Satisfaction</div>
            <div style={styles.statBar}>
              <div style={{...styles.statBarFill, width: countStart ? '98%' : '0%'}}></div>
            </div>
          </div>
          
          <div style={styles.statCard} className="stat-card">
            <div style={styles.statIcon}>
              <svg width="50" height="50" viewBox="0 0 24 24" fill="none" stroke="#8dc63f" strokeWidth="2">
                <circle cx="12" cy="12" r="10"/>
                <line x1="2" y1="12" x2="22" y2="12"/>
                <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/>
              </svg>
            </div>
            <div style={styles.statNumber}>{counts.countries}+</div>
            <div style={styles.statLabel}>Countries Served</div>
            <div style={styles.statBar}>
              <div style={{...styles.statBarFill, width: countStart ? '85%' : '0%'}}></div>
            </div>
          </div>
          
          <div style={styles.statCard} className="stat-card">
            <div style={styles.statIcon}>
              <svg width="50" height="50" viewBox="0 0 24 24" fill="none" stroke="#8dc63f" strokeWidth="2">
                <circle cx="12" cy="12" r="10"/>
                <polyline points="12 6 12 12 16 14"/>
              </svg>
            </div>
            <div style={styles.statNumber}>{counts.support}/7</div>
            <div style={styles.statLabel}>Support Available</div>
            <div style={styles.statBar}>
              <div style={{...styles.statBarFill, width: countStart ? '100%' : '0%'}}></div>
            </div>
          </div>
        </div>
      </section>
      
      <Graph />

       
          <Feedbacks />

      {/* CTA Section */}
      <section style={styles.ctaSection}>
        <div style={styles.ctaContent}>
          <h2 style={styles.ctaTitle} className="fade-in-up">
            Ready to Transform Your Project with HAYCARB?
          </h2>
          <p style={styles.ctaSubtitle} className="fade-in-up">
            Join thousands of investors who have revolutionized their operations with HAYCARB
          </p>
          <div style={styles.ctaButtons} className="fade-in-up">
            <button style={styles.ctaPrimaryBtn} className="btn-primary">
              Request Consultation
            </button>
            <button style={styles.ctaSecondaryBtn} className="cta-secondary-btn">
              View Our Portfolio
            </button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer style={styles.footer}>
        <div style={styles.footerTop}>
          <div style={styles.footerContent}>
            <div style={styles.footerCol}>
              <div style={styles.footerLogo}>
                <span style={styles.logoText}>HayCarb</span>
                <div style={styles.logoSubtext}>Carbon Innovation</div>
              </div>
              <p style={styles.footerDesc}>
                Leading the Carbon revolution with innovative hydroponic systems and sustainable  solutions for a better tomorrow.
              </p>
              <div style={styles.socialLinks}>
                <a href="#" style={styles.socialLink} className="social-link">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                  </svg>
                </a>
                <a href="#" style={styles.socialLink} className="social-link">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/>
                  </svg>
                </a>
                <a href="#" style={styles.socialLink} className="social-link">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 0C8.74 0 8.333.015 7.053.072 5.775.132 4.905.333 4.14.63c-.789.306-1.459.717-2.126 1.384S.935 3.35.63 4.14C.333 4.905.131 5.775.072 7.053.012 8.333 0 8.74 0 12s.015 3.667.072 4.947c.06 1.277.261 2.148.558 2.913.306.788.717 1.459 1.384 2.126.667.666 1.336 1.079 2.126 1.384.766.296 1.636.499 2.913.558C8.333 23.988 8.74 24 12 24s3.667-.015 4.947-.072c1.277-.06 2.148-.262 2.913-.558.788-.306 1.459-.718 2.126-1.384.666-.667 1.079-1.335 1.384-2.126.296-.765.499-1.636.558-2.913.06-1.28.072-1.687.072-4.947s-.015-3.667-.072-4.947c-.06-1.277-.262-2.149-.558-2.913-.306-.789-.718-1.459-1.384-2.126C21.319 1.347 20.651.935 19.86.63c-.765-.297-1.636-.499-2.913-.558C15.667.012 15.26 0 12 0zm0 2.16c3.203 0 3.585.016 4.85.071 1.17.055 1.805.249 2.227.415.562.217.96.477 1.382.896.419.42.679.819.896 1.381.164.422.36 1.057.413 2.227.057 1.266.07 1.646.07 4.85s-.015 3.585-.074 4.85c-.061 1.17-.256 1.805-.421 2.227-.224.562-.479.96-.899 1.382-.419.419-.824.679-1.38.896-.42.164-1.065.36-2.235.413-1.274.057-1.649.07-4.859.07-3.211 0-3.586-.015-4.859-.074-1.171-.061-1.816-.256-2.236-.421-.569-.224-.96-.479-1.379-.899-.421-.419-.69-.824-.9-1.38-.165-.42-.359-1.065-.42-2.235-.045-1.26-.061-1.649-.061-4.844 0-3.196.016-3.586.061-4.861.061-1.17.255-1.814.42-2.234.21-.57.479-.96.9-1.381.419-.419.81-.689 1.379-.898.42-.166 1.051-.361 2.221-.421 1.275-.045 1.65-.06 4.859-.06l.045.03zm0 3.678c-3.405 0-6.162 2.76-6.162 6.162 0 3.405 2.76 6.162 6.162 6.162 3.405 0 6.162-2.76 6.162-6.162 0-3.405-2.76-6.162-6.162-6.162zM12 16c-2.21 0-4-1.79-4-4s1.79-4 4-4 4 1.79 4 4-1.79 4-4 4zm7.846-10.405c0 .795-.646 1.44-1.44 1.44-.795 0-1.44-.646-1.44-1.44 0-.794.646-1.439 1.44-1.439.793-.001 1.44.645 1.44 1.439z"/>
                  </svg>
                </a>
                <a href="#" style={styles.socialLink} className="social-link">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                  </svg>
                </a>
              </div>
            </div>
           
            
            <div style={styles.footerCol}>
              <h4 style={styles.footerTitle}>Quick Links</h4>
              <a href="/about" style={styles.footerLink} className="footer-link">About Us</a>
              <a href="/services" style={styles.footerLink} className="footer-link">Our Services</a>
              <a href="/products" style={styles.footerLink} className="footer-link">Products</a>
              <a href="/contact" style={styles.footerLink} className="footer-link">Contact Us</a>
              <a href="#" style={styles.footerLink} className="footer-link">Careers</a>
            </div>
            
            <div style={styles.footerCol}>
              <h4 style={styles.footerTitle}>Services</h4>
              <a href="#" style={styles.footerLink} className="footer-link">Hydroponic Systems</a>
              <a href="#" style={styles.footerLink} className="footer-link">Climate Control</a>
              <a href="#" style={styles.footerLink} className="footer-link">Smart Irrigation</a>
              <a href="#" style={styles.footerLink} className="footer-link">Consulting</a>
              <a href="#" style={styles.footerLink} className="footer-link">Maintenance</a>
            </div>
            
            <div style={styles.footerCol}>
              <h4 style={styles.footerTitle}>Contact Info</h4>
              <div style={styles.contactItem}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#8dc63f" strokeWidth="2">
                  <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/>
                  <circle cx="12" cy="10" r="3"/>
                </svg>
                <span>Colombo 07/</span>
              </div>
              <div style={styles.contactItem}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#8dc63f" strokeWidth="2">
                  <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/>
                </svg>
                <span>+94 (555) 123-4567</span>
              </div>
              <div style={styles.contactItem}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#8dc63f" strokeWidth="2">
                  <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
                  <polyline points="22,6 12,13 2,6"/>
                </svg>
                <span>info@haycarb.com</span>
              </div>
            </div>
          </div>
        </div>
        
        <div style={styles.footerBottom}>
          <p style={styles.footerCopyright}>
            © 2025 HayCarb. All rights reserved.
          </p>
          <div style={styles.footerBottomLinks}>
            <a href="#" style={styles.footerBottomLink} className="footer-link">Privacy Policy</a>
            <span style={styles.footerDivider}>|</span>
            <a href="#" style={styles.footerBottomLink} className="footer-link">Terms of Service</a>
            <span style={styles.footerDivider}>|</span>
            <a href="#" style={styles.footerBottomLink} className="footer-link">Cookie Policy</a>
          </div>
        </div>
      </footer>
    </div>
  );
}

const styles = {
  container: {
    minHeight: '100vh',
    display: 'flex',
    flexDirection: 'column',
    backgroundColor: '#ffffff',
  },
  
  // Header
  header: {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    zIndex: 1000,
    transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
  },
  headerContent: {
    maxWidth: '1400px',
    margin: '0 auto',
    padding: '0 3rem',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  logo: {
    display: 'flex',
    flexDirection: 'column',
  },
  logoText: {
    fontSize: '2rem',
    fontWeight: '800',
    background: 'linear-gradient(135deg, #8dc63f 0%, #6da82d 100%)',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
    letterSpacing: '-0.5px',
  },
  logoSubtext: {
    fontSize: '0.7rem',
    color: '#666',
    fontWeight: '500',
    letterSpacing: '1px',
    marginTop: '-5px',
  },
  nav: {
    display: 'flex',
    gap: '2.5rem',
    alignItems: 'center',
  },
  navLink: {
    color: '#333',
    textDecoration: 'none',
    fontSize: '0.95rem',
    fontWeight: '500',
    transition: 'color 0.3s ease',
  },
  signInBtn: {
    backgroundColor: '#8dc63f',
    color: '#ffffff',
    padding: '0.85rem 2rem',
    borderRadius: '30px',
    textDecoration: 'none',
    fontSize: '0.95rem',
    fontWeight: '600',
    transition: 'all 0.3s ease',
    border: 'none',
    cursor: 'pointer',
    boxShadow: '0 4px 20px rgba(141, 198, 63, 0.25)',
  },

  // Hero Section
  hero: {
    position: 'relative',
    height: '100vh',
    overflow: 'hidden',
  },
  heroSlide: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    transition: 'all 1s cubic-bezier(0.4, 0, 0.2, 1)',
  },
  heroImageContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
  },
  heroImage: {
    width: '100%',
    height: '100%',
    objectFit: 'cover',
  },
  heroOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    background: 'linear-gradient(135deg, rgba(0, 0, 0, 0.6) 0%, rgba(141, 198, 63, 0.3) 100%)',
  },
  heroContent: {
    position: 'relative',
    height: '100%',
    display: 'flex',
    alignItems: 'center',
    maxWidth: '1400px',
    margin: '0 auto',
    padding: '0 3rem',
    zIndex: 2,
  },
  heroTextContent: {
    maxWidth: '700px',
  },
  heroTitle: {
    fontSize: '4rem',
    fontWeight: '800',
    color: '#ffffff',
    lineHeight: '1.1',
    marginBottom: '1.5rem',
    textShadow: '2px 2px 20px rgba(0, 0, 0, 0.3)',
  },
  heroSubtitle: {
    fontSize: '1.25rem',
    color: '#ffffff',
    lineHeight: '1.7',
    marginBottom: '3rem',
    opacity: 0.95,
  },
  heroButtons: {
    display: 'flex',
    gap: '1.5rem',
  },
  heroPrimaryBtn: {
    backgroundColor: '#8dc63f',
    color: '#ffffff',
    padding: '1.2rem 3rem',
    border: 'none',
    borderRadius: '50px',
    fontSize: '1.05rem',
    fontWeight: '600',
    cursor: 'pointer',
    transition: 'all 0.3s ease',
    boxShadow: '0 8px 30px rgba(141, 198, 63, 0.4)',
  },
  heroSecondaryBtn: {
    backgroundColor: 'transparent',
    color: '#ffffff',
    padding: '1.2rem 3rem',
    border: '2px solid #ffffff',
    borderRadius: '50px',
    fontSize: '1.05rem',
    fontWeight: '600',
    cursor: 'pointer',
    transition: 'all 0.3s ease',
    backdropFilter: 'blur(10px)',
  },
  sliderControls: {
    position: 'absolute',
    bottom: '3rem',
    left: '50%',
    transform: 'translateX(-50%)',
    display: 'flex',
    alignItems: 'center',
    gap: '2rem',
    zIndex: 3,
  },
  sliderArrow: {
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    color: '#ffffff',
    border: 'none',
    width: '50px',
    height: '50px',
    borderRadius: '50%',
    fontSize: '1.5rem',
    cursor: 'pointer',
    transition: 'all 0.3s ease',
    backdropFilter: 'blur(10px)',
  },
  sliderDots: {
    display: 'flex',
    gap: '0.7rem',
  },
  sliderDot: {
    border: 'none',
    height: '4px',
    borderRadius: '2px',
    cursor: 'pointer',
    transition: 'all 0.4s ease',
  },
  floatingElement1: {
    position: 'absolute',
    top: '15%',
    right: '10%',
    width: '150px',
    height: '150px',
    borderRadius: '50%',
    background: 'rgba(141, 198, 63, 0.1)',
    backdropFilter: 'blur(10px)',
    zIndex: 1,
  },
  floatingElement2: {
    position: 'absolute',
    bottom: '20%',
    left: '8%',
    width: '100px',
    height: '100px',
    borderRadius: '50%',
    background: 'rgba(255, 255, 255, 0.1)',
    backdropFilter: 'blur(10px)',
    zIndex: 1,
  },

  // Features Bar
  featuresBar: {
    backgroundColor: '#ffffff',
    padding: '3rem 0',
    boxShadow: '0 -5px 30px rgba(0, 0, 0, 0.05)',
  },
  featuresBarContent: {
    maxWidth: '1400px',
    margin: '0 auto',
    padding: '0 3rem',
    display: 'grid',
    gridTemplateColumns: 'repeat(4, 1fr)',
    gap: '2rem',
  },
  featureBarItem: {
    display: 'flex',
    alignItems: 'center',
    gap: '1.2rem',
  },
  featureBarIcon: {
    flexShrink: 0,
  },
  featureBarTitle: {
    fontSize: '1.1rem',
    fontWeight: '700',
    color: '#000',
    marginBottom: '0.2rem',
  },
  featureBarText: {
    fontSize: '0.85rem',
    color: '#666',
  },

  // About Section
  aboutSection: {
    padding: '8rem 3rem',
    backgroundColor: '#f9fafb',
  },
  aboutContent: {
    maxWidth: '1400px',
    margin: '0 auto',
    display: 'grid',
    gridTemplateColumns: '1fr 1fr',
    gap: '5rem',
    alignItems: 'center',
  },
  aboutLeft: {},
  aboutImageWrapper: {
    position: 'relative',
  },
  aboutImage: {
    width: '100%',
    height: '600px',
    objectFit: 'cover',
    borderRadius: '20px',
    boxShadow: '0 20px 60px rgba(0, 0, 0, 0.15)',
  },
  aboutImageBadge: {
    position: 'absolute',
    bottom: '2rem',
    right: '2rem',
    backgroundColor: '#8dc63f',
    padding: '2rem',
    borderRadius: '15px',
    textAlign: 'center',
    boxShadow: '0 10px 40px rgba(141, 198, 63, 0.4)',
  },
  badgeNumber: {
    fontSize: '3rem',
    fontWeight: '800',
    color: '#ffffff',
    lineHeight: '1',
  },
  badgeText: {
    fontSize: '0.9rem',
    color: '#ffffff',
    fontWeight: '500',
    marginTop: '0.5rem',
  },
  aboutRight: {},
  sectionLabel: {
    color: '#8dc63f',
    fontSize: '0.95rem',
    fontWeight: '700',
    letterSpacing: '2px',
    textTransform: 'uppercase',
    marginBottom: '1rem',
  },
  aboutTitle: {
    fontSize: '3rem',
    fontWeight: '800',
    color: '#000',
    lineHeight: '1.2',
    marginBottom: '2rem',
  },
  aboutText: {
    fontSize: '1.05rem',
    color: '#666',
    lineHeight: '1.8',
    marginBottom: '1.5rem',
  },
  aboutFeatures: {
    display: 'grid',
    gridTemplateColumns: '1fr 1fr',
    gap: '1rem',
    margin: '2.5rem 0',
  },
  aboutFeature: {
    display: 'flex',
    alignItems: 'center',
    gap: '0.8rem',
    fontSize: '0.95rem',
    color: '#333',
    fontWeight: '500',
  },
  aboutBtn: {
    backgroundColor: '#8dc63f',
    color: '#ffffff',
    padding: '1.1rem 2.5rem',
    border: 'none',
    borderRadius: '50px',
    fontSize: '1rem',
    fontWeight: '600',
    cursor: 'pointer',
    transition: 'all 0.3s ease',
    boxShadow: '0 6px 25px rgba(141, 198, 63, 0.3)',
  },

  // Services Section
  servicesSection: {
    padding: '8rem 3rem',
    backgroundColor: '#ffffff',
  },
  servicesContent: {
    maxWidth: '1400px',
    margin: '0 auto',
  },
  sectionHeader: {
    textAlign: 'center',
    marginBottom: '5rem',
  },
  sectionTitle: {
    fontSize: '3rem',
    fontWeight: '800',
    color: '#000',
    marginBottom: '1rem',
  },
  sectionDescription: {
    fontSize: '1.1rem',
    color: '#666',
    maxWidth: '700px',
    margin: '0 auto',
    lineHeight: '1.7',
  },
  servicesGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(2, 1fr)',
    gap: '2.5rem',
  },
  serviceCard: {
    backgroundColor: '#ffffff',
    borderRadius: '20px',
    overflow: 'hidden',
    boxShadow: '0 10px 40px rgba(0, 0, 0, 0.08)',
    position: 'relative',
  },
  serviceImageWrapper: {
    position: 'relative',
    height: '280px',
    overflow: 'hidden',
  },
  serviceImage: {
    width: '100%',
    height: '100%',
    objectFit: 'cover',
    transition: 'transform 0.5s ease',
  },
  serviceOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    background: 'linear-gradient(to bottom, transparent 0%, rgba(0, 0, 0, 0.4) 100%)',
  },
  serviceContent: {
    padding: '2.5rem',
  },
  serviceTitle: {
    fontSize: '1.6rem',
    fontWeight: '700',
    color: '#000',
    marginBottom: '1rem',
  },
  serviceDescription: {
    fontSize: '1rem',
    color: '#666',
    lineHeight: '1.7',
    marginBottom: '2rem',
  },
  serviceBtn: {
    backgroundColor: 'transparent',
    color: '#8dc63f',
    border: 'none',
    padding: '0',
    fontSize: '1rem',
    fontWeight: '600',
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    gap: '0.5rem',
    transition: 'gap 0.3s ease',
  },
  serviceBtnArrow: {
    transition: 'transform 0.3s ease',
  },

  // Stats Section
  statsSection: {
    position: 'relative',
    padding: '8rem 3rem',
    backgroundImage: 'url(https://images.unsplash.com/photo-1530836369250-ef72a3f5cda8?w=1600&h=900&fit=crop)',
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    backgroundAttachment: 'fixed',
  },
  statsOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    background: 'linear-gradient(135deg, rgba(0, 0, 0, 0.85) 0%, rgba(141, 198, 63, 0.7) 100%)',
  },
  statsContent: {
    position: 'relative',
    maxWidth: '1400px',
    margin: '0 auto',
    display: 'grid',
    gridTemplateColumns: 'repeat(4, 1fr)',
    gap: '3rem',
    zIndex: 1,
  },
  statCard: {
    textAlign: 'center',
    padding: '2rem',
  },
  statIcon: {
    marginBottom: '1.5rem',
  },
  statNumber: {
    fontSize: '3.5rem',
    fontWeight: '800',
    color: '#ffffff',
    marginBottom: '0.5rem',
  },
  statLabel: {
    fontSize: '1.1rem',
    color: '#ffffff',
    fontWeight: '500',
    marginBottom: '1.5rem',
    opacity: 0.9,
  },
  statBar: {
    width: '100%',
    height: '4px',
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    borderRadius: '2px',
    overflow: 'hidden',
  },
  statBarFill: {
    height: '100%',
    backgroundColor: '#8dc63f',
    transition: 'width 2s cubic-bezier(0.4, 0, 0.2, 1)',
  },

  // Testimonials Section
  testimonialsSection: {
    padding: '8rem 3rem',
    backgroundColor: '#f9fafb',
  },
  testimonialsContent: {
    maxWidth: '1400px',
    margin: '0 auto',
  },
  testimonialSlider: {
    position: 'relative',
    height: '350px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  testimonialCard: {
    position: 'absolute',
    backgroundColor: '#ffffff',
    padding: '3rem',
    borderRadius: '20px',
    maxWidth: '800px',
    width: '100%',
    boxShadow: '0 20px 60px rgba(0, 0, 0, 0.1)',
    transition: 'all 0.5s cubic-bezier(0.4, 0, 0.2, 1)',
  },
  quoteIcon: {
    fontSize: '5rem',
    color: '#8dc63f',
    lineHeight: '1',
    opacity: 0.3,
    marginBottom: '1rem',
  },
  testimonialText: {
    fontSize: '1.25rem',
    color: '#333',
    lineHeight: '1.8',
    marginBottom: '2.5rem',
    fontStyle: 'italic',
  },
  testimonialAuthor: {
    display: 'flex',
    alignItems: 'center',
    gap: '1.5rem',
  },
  authorAvatar: {
    width: '60px',
    height: '60px',
    borderRadius: '50%',
    backgroundColor: '#8dc63f',
    color: '#ffffff',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: '1.3rem',
    fontWeight: '700',
  },
  authorName: {
    fontSize: '1.1rem',
    fontWeight: '700',
    color: '#000',
    marginBottom: '0.2rem',
  },
  authorRole: {
    fontSize: '0.95rem',
    color: '#666',
  },
  testimonialDots: {
    display: 'flex',
    justifyContent: 'center',
    gap: '0.8rem',
    marginTop: '3rem',
  },
  testimonialDot: {
    width: '12px',
    height: '12px',
    borderRadius: '50%',
    border: 'none',
    cursor: 'pointer',
    transition: 'all 0.3s ease',
  },

  // CTA Section
  ctaSection: {
    padding: '8rem 3rem',
    backgroundColor: '#000000',
    textAlign: 'center',
  },
  ctaContent: {
    maxWidth: '900px',
    margin: '0 auto',
  },
  ctaTitle: {
    fontSize: '3rem',
    fontWeight: '800',
    color: '#ffffff',
    marginBottom: '1.5rem',
    lineHeight: '1.2',
  },
  ctaSubtitle: {
    fontSize: '1.2rem',
    color: '#cccccc',
    marginBottom: '3rem',
    lineHeight: '1.7',
  },
  ctaButtons: {
    display: 'flex',
    justifyContent: 'center',
    gap: '1.5rem',
    flexWrap: 'wrap',
  },
  ctaPrimaryBtn: {
    backgroundColor: '#8dc63f',
    color: '#ffffff',
    padding: '1.2rem 3rem',
    border: 'none',
    borderRadius: '50px',
    fontSize: '1.05rem',
    fontWeight: '600',
    cursor: 'pointer',
    transition: 'all 0.3s ease',
    boxShadow: '0 8px 30px rgba(141, 198, 63, 0.4)',
  },
  ctaSecondaryBtn: {
    backgroundColor: 'transparent',
    color: '#ffffff',
    padding: '1.2rem 3rem',
    border: '2px solid #ffffff',
    borderRadius: '50px',
    fontSize: '1.05rem',
    fontWeight: '600',
    cursor: 'pointer',
    transition: 'all 0.3s ease',
  },

  // Footer
  footer: {
    backgroundColor: '#1a1a1a',
  },
  footerTop: {
    padding: '5rem 3rem 3rem',
  },
  footerContent: {
    maxWidth: '1400px',
    margin: '0 auto',
    display: 'grid',
    gridTemplateColumns: '2fr 1fr 1fr 1.5fr',
    gap: '4rem',
  },
  footerCol: {
    display: 'flex',
    flexDirection: 'column',
    gap: '1rem',
  },
  footerLogo: {
    marginBottom: '1rem',
  },
  footerDesc: {
    fontSize: '0.95rem',
    color: '#999',
    lineHeight: '1.7',
    marginBottom: '1.5rem',
  },
  socialLinks: {
    display: 'flex',
    gap: '1rem',
  },
  socialLink: {
    width: '40px',
    height: '40px',
    borderRadius: '50%',
    backgroundColor: 'rgba(141, 198, 63, 0.1)',
    color: '#8dc63f',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    transition: 'all 0.3s ease',
    textDecoration: 'none',
  },
  footerTitle: {
    fontSize: '1.1rem',
    fontWeight: '700',
    color: '#ffffff',
    marginBottom: '0.5rem',
  },
  footerLink: {
    color: '#999',
    textDecoration: 'none',
    fontSize: '0.95rem',
    transition: 'all 0.3s ease',
  },
  contactItem: {
    display: 'flex',
    alignItems: 'flex-start',
    gap: '1rem',
    color: '#999',
    fontSize: '0.95rem',
    lineHeight: '1.6',
  },
  footerBottom: {
    borderTop: '1px solid #333',
    padding: '2rem 3rem',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    maxWidth: '1400px',
    margin: '0 auto',
  },
  footerCopyright: {
    color: '#666',
    fontSize: '0.9rem',
  },
  footerBottomLinks: {
    display: 'flex',
    gap: '1rem',
    alignItems: 'center',
  },
  footerBottomLink: {
    color: '#666',
    textDecoration: 'none',
    fontSize: '0.9rem',
    transition: 'color 0.3s ease',
  },
  footerDivider: {
    color: '#444',
  }
};

export default Home;