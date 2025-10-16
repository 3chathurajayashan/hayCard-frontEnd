import React, { useState, useEffect, useRef } from 'react';

import h1 from '../../assets/l1.jpg';

export default function ModernHeroSection() {
  const [scrollY, setScrollY] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const [featuresVisible, setFeaturesVisible] = useState(false);
  const [statsVisible, setStatsVisible] = useState(false);
  const [counters, setCounters] = useState({ stat1: 0, stat2: 0, stat3: 0 });
  const [hasAnimated, setHasAnimated] = useState(false);
  const featuresRef = useRef(null);
  const statsRef = useRef(null);

  // Animated counter function
  const animateCounter = (target, key, duration = 2000, suffix = '') => {
    const start = 0;
    const increment = target / (duration / 16);
    let current = 0;

    const timer = setInterval(() => {
      current += increment;
      if (current >= target) {
        setCounters(prev => ({ ...prev, [key]: target }));
        clearInterval(timer);
      } else {
        setCounters(prev => ({ ...prev, [key]: Math.floor(current) }));
      }
    }, 16);
  };

  useEffect(() => {
    setTimeout(() => setIsVisible(true), 100);
    
    const handleScroll = () => {
      setScrollY(window.scrollY);
      
      if (featuresRef.current) {
        const rect = featuresRef.current.getBoundingClientRect();
        if (rect.top < window.innerHeight - 100) {
          setFeaturesVisible(true);
        }
      }

      if (statsRef.current && !hasAnimated) {
        const rect = statsRef.current.getBoundingClientRect();
        if (rect.top < window.innerHeight - 100) {
          setStatsVisible(true);
          setHasAnimated(true);
          // Start counter animations
          setTimeout(() => animateCounter(500, 'stat1'), 200);
          setTimeout(() => animateCounter(50, 'stat2'), 300);
          setTimeout(() => animateCounter(99, 'stat3'), 400);
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, [hasAnimated]);

  return (
    <>
      <style>{`
        * {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
        }

        @keyframes slideUp {
          from {
            opacity: 0;
            transform: translateY(40px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes slideLeft {
          from {
            opacity: 0;
            transform: translateX(40px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }

        @keyframes slideRight {
          from {
            opacity: 0;
            transform: translateX(-40px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }

        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }

        @keyframes scaleIn {
          from {
            opacity: 0;
            transform: scale(0.9);
          }
          to {
            opacity: 1;
            transform: scale(1);
          }
        }

        @keyframes rotateIn {
          from {
            opacity: 0;
            transform: rotate(-5deg) scale(0.95);
          }
          to {
            opacity: 1;
            transform: rotate(0) scale(1);
          }
        }

        @keyframes float {
          0%, 100% {
            transform: translateY(0px);
          }
          50% {
            transform: translateY(-15px);
          }
        }

        @keyframes pulse {
          0%, 100% {
            transform: scale(1);
          }
          50% {
            transform: scale(1.05);
          }
        }

        @keyframes shimmer {
          0% {
            background-position: -1000px 0;
          }
          100% {
            background-position: 1000px 0;
          }
        }

        @keyframes gradientShift {
          0% {
            background-position: 0% 50%;
          }
          50% {
            background-position: 100% 50%;
          }
          100% {
            background-position: 0% 50%;
          }
        }

        @keyframes counterGlow {
          0%, 100% {
            text-shadow: 0 0 20px rgba(141, 198, 63, 0.3);
          }
          50% {
            text-shadow: 0 0 30px rgba(141, 198, 63, 0.6);
          }
        }

        .animate-up {
          animation: slideUp 0.8s cubic-bezier(0.4, 0, 0.2, 1) forwards;
        }

        .animate-left {
          animation: slideLeft 0.9s cubic-bezier(0.4, 0, 0.2, 1) forwards;
        }

        .animate-right {
          animation: slideRight 0.9s cubic-bezier(0.4, 0, 0.2, 1) forwards;
        }

        .animate-fade {
          animation: fadeIn 1s ease-out forwards;
        }

        .animate-scale {
          animation: scaleIn 0.8s cubic-bezier(0.4, 0, 0.2, 1) forwards;
        }

        .animate-rotate {
          animation: rotateIn 0.9s cubic-bezier(0.4, 0, 0.2, 1) forwards;
        }

        .float {
          animation: float 3s ease-in-out infinite;
        }

        .pulse {
          animation: pulse 2s ease-in-out infinite;
        }

        .counter-glow {
          animation: counterGlow 2s ease-in-out infinite;
        }

        .btn {
          display: inline-block;
          padding: 18px 48px;
          font-size: 17px;
          font-weight: 600;
          text-decoration: none;
          border-radius: 12px;
          transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
          cursor: pointer;
          border: none;
          position: relative;
          overflow: hidden;
        }

        .btn::before {
          content: '';
          position: absolute;
          top: 0;
          left: -100%;
          width: 100%;
          height: 100%;
          background: linear-gradient(90deg, transparent, rgba(255,255,255,0.3), transparent);
          transition: left 0.6s;
        }

        .btn:hover::before {
          left: 100%;
        }

        .btn-primary {
          background: linear-gradient(135deg, #8dc63f, #7ab82f);
          color: white;
          box-shadow: 0 10px 30px rgba(141, 198, 63, 0.35);
        }

        .btn-primary:hover {
          transform: translateY(-4px) scale(1.02);
          box-shadow: 0 15px 40px rgba(141, 198, 63, 0.45);
        }

        .btn-secondary {
          background: white;
          color: #333;
          border: 2px solid #e0e0e0;
          box-shadow: 0 6px 20px rgba(0, 0, 0, 0.1);
        }

        .btn-secondary:hover {
          border-color: #8dc63f;
          color: #8dc63f;
          transform: translateY(-4px) scale(1.02);
          box-shadow: 0 10px 30px rgba(141, 198, 63, 0.25);
        }

        .feature-item {
          transition: all 0.5s cubic-bezier(0.4, 0, 0.2, 1);
          position: relative;
        }

        .feature-item::before {
          content: '';
          position: absolute;
          inset: 0;
          border-radius: 20px;
          padding: 2px;
          background: linear-gradient(135deg, #8dc63f, #7ab82f, transparent);
          -webkit-mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
          -webkit-mask-composite: xor;
          mask-composite: exclude;
          opacity: 0;
          transition: opacity 0.5s;
        }

        .feature-item:hover::before {
          opacity: 1;
        }

        .feature-item:hover {
          transform: translateY(-12px);
          box-shadow: 0 25px 50px rgba(141, 198, 63, 0.25);
        }

        .feature-icon {
          transition: all 0.5s cubic-bezier(0.4, 0, 0.2, 1);
        }

        .feature-item:hover .feature-icon {
          transform: scale(1.15) rotate(5deg);
          background: linear-gradient(135deg, #8dc63f, #7ab82f);
        }

        .feature-item:hover .feature-icon svg {
          stroke: white;
        }

        .stat-card {
          transition: all 0.5s cubic-bezier(0.4, 0, 0.2, 1);
          position: relative;
        }

        .stat-card::after {
          content: '';
          position: absolute;
          bottom: -10px;
          left: 50%;
          transform: translateX(-50%);
          width: 0;
          height: 3px;
          background: linear-gradient(90deg, transparent, #8dc63f, transparent);
          transition: width 0.5s cubic-bezier(0.4, 0, 0.2, 1);
        }

        .stat-card:hover::after {
          width: 100%;
        }

        .stat-card:hover {
          transform: translateY(-8px) scale(1.08);
        }

        .image-wrapper {
          transition: all 0.6s cubic-bezier(0.4, 0, 0.2, 1);
        }

        .image-wrapper:hover {
          transform: scale(1.03) rotate(1deg);
        }

        .badge {
          transition: all 0.5s cubic-bezier(0.4, 0, 0.2, 1);
        }

        .badge:hover {
          transform: scale(1.15) rotate(-3deg);
        }

        .shimmer-text {
          background: linear-gradient(90deg, #8dc63f 0%, #6fa832 25%, #8dc63f 50%, #7ab82f 75%, #8dc63f 100%);
          background-size: 200% auto;
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          animation: shimmer 3s linear infinite;
        }

        .gradient-bg {
          background: linear-gradient(-45deg, #ffffff, #f8faf9, #f0f7e6, #f8faf9);
          background-size: 400% 400%;
          animation: gradientShift 15s ease infinite;
        }

        @media (max-width: 968px) {
          .hero-container {
            flex-direction: column !important;
            text-align: center;
          }
          .hero-content {
            max-width: 100% !important;
          }
          .hero-image {
            margin-top: 40px !important;
          }
          .stats-grid {
            justify-content: center !important;
          }
        }
      `}</style>

      {/* Hero Section */}
      <section className="gradient-bg" style={{
        padding: '120px 40px',
        position: 'relative',
        overflow: 'hidden'
      }}>
        {/* Enhanced Animated Background Elements */}
        <div className="float" style={{
          position: 'absolute',
          top: '5%',
          right: '8%',
          width: '400px',
          height: '400px',
          background: 'radial-gradient(circle, rgba(141, 198, 63, 0.12) 0%, transparent 70%)',
          borderRadius: '50%',
          pointerEvents: 'none',
          animationDelay: '0s',
          filter: 'blur(40px)'
        }} />
        
        <div className="float" style={{
          position: 'absolute',
          bottom: '15%',
          left: '8%',
          width: '350px',
          height: '350px',
          background: 'radial-gradient(circle, rgba(122, 184, 47, 0.1) 0%, transparent 70%)',
          borderRadius: '50%',
          pointerEvents: 'none',
          animationDelay: '1.5s',
          filter: 'blur(40px)'
        }} />

        <div className="float" style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: '500px',
          height: '500px',
          background: 'radial-gradient(circle, rgba(141, 198, 63, 0.05) 0%, transparent 70%)',
          borderRadius: '50%',
          pointerEvents: 'none',
          animationDelay: '0.75s',
          filter: 'blur(60px)'
        }} />

        <div style={{
          maxWidth: '1200px',
          margin: '0 auto',
          display: 'flex',
          alignItems: 'center',
          gap: '80px',
          position: 'relative',
          zIndex: 1
        }} className="hero-container">
          {/* Left Content */}
          <div style={{ flex: 1, maxWidth: '600px' }} className="hero-content">
            <div 
              className={isVisible ? 'animate-scale' : ''}
              style={{
                opacity: 0,
                animationDelay: '0.1s'
              }}
            >
              <span className="pulse" style={{
                display: 'inline-block',
                background: 'linear-gradient(135deg, #f0f7e6, #e8f5d8)',
                color: '#6fa832',
                padding: '12px 28px',
                borderRadius: '50px',
                fontSize: '14px',
                fontWeight: '700',
                marginBottom: '32px',
                border: '2px solid rgba(141, 198, 63, 0.3)',
                letterSpacing: '0.5px',
                boxShadow: '0 4px 15px rgba(141, 198, 63, 0.2)'
              }}>
                🌱 Transforming by-products into sustainable products
              </span>
            </div>

            <h1 
              className={isVisible ? 'animate-right' : ''}
              style={{
                fontSize: '68px',
                fontWeight: '900',
                lineHeight: '1.1',
                color: '#1a1a1a',
                marginBottom: '28px',
                opacity: 0,
                animationDelay: '0.2s',
                letterSpacing: '-2px'
              }}
            >
              Build the future with{' '}
              <span className="shimmer-text">Sustainable Innovation</span>
            </h1>

            <p 
              className={isVisible ? 'animate-right' : ''}
              style={{
                fontSize: '20px',
                lineHeight: '1.8',
                color: '#555',
                marginBottom: '40px',
                opacity: 0,
                animationDelay: '0.3s',
                fontWeight: '400'
              }}
            >
              The Group has consistently demonstrated its expertise in innovation by leveraging market intelligence, manufacturing excellence, and R&D capabilities to develop a diverse product portfolio. With a strong commitment to sustainable production, we identify emerging trends, collaborate with customers to deliver tailored solutions, continuously enhance our competitive edge to strengthen our value proposition and drive expansion into new markets.
            </p>

            <div 
              className={isVisible ? 'animate-right' : ''}
              style={{
                display: 'flex',
                gap: '20px',
                marginBottom: '70px',
                opacity: 0,
                animationDelay: '0.4s',
                flexWrap: 'wrap'
              }}
            >
              <button className="btn btn-primary">
                Read more
              </button>

               
              <button
               className="btn btn-secondary"
                onClick={() => window.open("https://youtu.be/OdCOV7heMvQ?si=8nCVUKjJCqfbgPk2", "_blank")}
                >
  Watch Video
</button>
            </div>

            <div 
              ref={statsRef}
              className="stats-grid"
              style={{
                display: 'flex',
                gap: '60px',
                paddingTop: '40px',
                borderTop: '2px solid rgba(141, 198, 63, 0.2)',
                flexWrap: 'wrap'
              }}
            >
              {[
                { number: counters.stat1, label: 'Projects Completed', suffix: '+' },
                { number: counters.stat2, label: 'Active Users', suffix: 'K+' },
                { number: counters.stat3, label: 'Satisfaction Rate', suffix: '%' }
              ].map((stat, index) => (
                <div 
                  key={index}
                  className={`stat-card ${statsVisible ? 'animate-up' : ''}`}
                  style={{
                    opacity: 0,
                    animationDelay: `${0.5 + index * 0.1}s`
                  }}
                >
                  <div className="counter-glow" style={{ 
                    fontSize: '48px', 
                    fontWeight: '900', 
                    background: 'linear-gradient(135deg, #8dc63f, #6fa832)',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    backgroundClip: 'text',
                    marginBottom: '8px',
                    lineHeight: '1'
                  }}>
                    {stat.number}{stat.suffix}
                  </div>
                  <div style={{ 
                    fontSize: '15px', 
                    color: '#666', 
                    fontWeight: '600',
                    letterSpacing: '0.3px'
                  }}>
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right Content - Image */}
          <div 
            className={isVisible ? 'animate-left' : ''}
            style={{
              flex: 1,
              opacity: 0,
              animationDelay: '0.3s'
            }}
          >
            <div className="image-wrapper" style={{
              position: 'relative',
              borderRadius: '24px',
              overflow: 'hidden',
              boxShadow: '0 30px 80px rgba(0, 0, 0, 0.18)',
              transform: `translateY(${-scrollY * 0.15}px)`,
              border: '1px solid rgba(141, 198, 63, 0.2)'
            }}>
              <div style={{
                position: 'absolute',
                inset: 0,
                background: 'linear-gradient(135deg, rgba(141, 198, 63, 0.15), transparent)',
                zIndex: 1
              }} />
              <img 
                src={h1}
                alt="Technology Innovation"
                style={{
                  width: '100%',
                  height: 'auto',
                  display: 'block'
                }}
              />
              
              {/* Enhanced Floating Badge */}
              <div className="badge float" style={{
                position: 'absolute',
                bottom: '32px',
                right: '32px',
                background: 'linear-gradient(135deg, white, #f8faf9)',
                padding: '28px 36px',
                borderRadius: '20px',
                boxShadow: '0 15px 40px rgba(0, 0, 0, 0.25)',
                border: '3px solid #8dc63f',
                animationDelay: '0.5s'
              }}>
                <div style={{
                  fontSize: '42px',
                  fontWeight: '900',
                  background: 'linear-gradient(135deg, #8dc63f, #6fa832)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text',
                  marginBottom: '6px',
                  lineHeight: '1'
                }}>
                  #1
                </div>
                <div style={{
                  fontSize: '14px',
                  color: '#666',
                  fontWeight: '700',
                  letterSpacing: '0.5px'
                }}>
                  Industry Leader
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section ref={featuresRef} style={{
        background: 'linear-gradient(180deg, white 0%, #fafbfa 100%)',
        padding: '140px 40px',
        position: 'relative'
      }}>
        <div style={{
          maxWidth: '1200px',
          margin: '0 auto'
        }}>
          <div 
            className={featuresVisible ? 'animate-up' : ''}
            style={{
              textAlign: 'center',
              marginBottom: '90px',
              opacity: 0,
              animationDelay: '0s'
            }}
          >
            <h2 style={{
              fontSize: '52px',
              fontWeight: '900',
              color: '#1a1a1a',
              marginBottom: '24px',
              letterSpacing: '-1.5px'
            }}>
              Why choose <span className="shimmer-text">HayCarb</span>?
            </h2>
            <p style={{
              fontSize: '21px',
              color: '#666',
              maxWidth: '650px',
              margin: '0 auto',
              lineHeight: '1.7',
              fontWeight: '400'
            }}>
              Comprehensive solutions that help businesses thrive in the digital age with sustainable innovation
            </p>
          </div>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
            gap: '36px'
          }}>
            {[
              {
                icon: <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/>,
                title: 'Advanced Technology',
                desc: 'Cutting-edge AI and ML systems that deliver exceptional performance and scalability for your business'
              },
              {
                icon: <><circle cx="12" cy="12" r="10"/><path d="M12 6v6l4 2"/></>,
                title: '24/7 Support',
                desc: 'Round-the-clock expert assistance to ensure your success at every step of your journey'
              },
              {
                icon: <><path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"/><polyline points="7.5 4.21 12 6.81 16.5 4.21"/><polyline points="7.5 19.79 7.5 14.6 3 12"/><polyline points="21 12 16.5 14.6 16.5 19.79"/></>,
                title: 'Eco-Friendly',
                desc: 'Sustainable and environmentally responsible solutions for a better tomorrow and cleaner planet'
              },
              {
                icon: <><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></>,
                title: 'Expert Team',
                desc: 'Industry-leading professionals with decades of combined experience and proven results'
              }
            ].map((feature, index) => (
              <div 
                key={index}
                className={`feature-item ${featuresVisible ? 'animate-scale' : ''}`}
                style={{
                  background: 'white',
                  padding: '52px 40px',
                  borderRadius: '20px',
                  boxShadow: '0 6px 25px rgba(0, 0, 0, 0.1)',
                  opacity: 0,
                  animationDelay: `${0.1 + index * 0.1}s`,
                  border: '1px solid #f5f5f5'
                }}
              >
                <div className="feature-icon" style={{
                  width: '80px',
                  height: '80px',
                  background: 'linear-gradient(135deg, #f0f7e6, #e8f5d8)',
                  borderRadius: '20px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginBottom: '32px',
                  border: '2px solid rgba(141, 198, 63, 0.25)'
                }}>
                  <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="#8dc63f" strokeWidth="2.5">
                    {feature.icon}
                  </svg>
                </div>
                <h3 style={{
                  fontSize: '26px',
                  fontWeight: '800',
                  color: '#1a1a1a',
                  marginBottom: '18px',
                  letterSpacing: '-0.5px'
                }}>
                  {feature.title}
                </h3>
                <p style={{
                  fontSize: '16px',
                  lineHeight: '1.75',
                  color: '#666',
                  fontWeight: '400'
                }}>
                  {feature.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}