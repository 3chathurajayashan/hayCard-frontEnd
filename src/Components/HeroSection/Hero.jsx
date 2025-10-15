import React, { useEffect, useRef, useState } from 'react';

const HeroSection = () => {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef(null);
  const cardsRef = useRef([]);

  const solutions = [
    {
      title: 'Water',
      description: 'Ensuring clean, safe water through advanced purification and filtration solutions',
      image: 'https://images.unsplash.com/photo-1548839140-29a749e1cf4d?w=800&q=80'
    },
    {
      title: 'Air/Gas',
      description: 'Advanced solutions for removing pollutants, odors and hazardous chemicals',
      image: 'https://images.unsplash.com/photo-1611273426858-450d8e3c9fce?w=800&q=80'
    },
    {
      title: 'Food & Beverage',
      description: 'Enhancing quality, taste, and safety in food and beverage processing',
      image: 'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=800&q=80'
    },
    {
      title: 'Energy',
      description: 'Powering the future with advanced carbon technology for energy storage',
      image: 'https://images.unsplash.com/photo-1473341304170-971dccb5ac1e?w=800&q=80'
    },
    {
      title: 'Gold',
      description: 'Premium activated carbon designed for optimal adsorption in gold recovery',
      image: 'https://images.unsplash.com/photo-1610375461246-83df859d849d?w=800&q=80'
    },
    {
      title: 'Pharmaceutical & Cosmetics',
      description: 'Advanced activated carbon ensuring superior adsorption and purity',
      image: 'https://images.unsplash.com/photo-1583947215259-38e31be8751f?w=800&q=80'
    },
    {
      title: 'Speciality',
      description: 'Premium activated carbon tailored for high-performance speciality applications',
      image: 'https://images.unsplash.com/photo-1532094349884-543bc11b234d?w=800&q=80'
    }
  ];

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(true);
          }
        });
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      cardsRef.current.forEach((card) => {
        if (card) {
          const rect = card.getBoundingClientRect();
          const windowHeight = window.innerHeight;
          const scrollProgress = (windowHeight - rect.top) / windowHeight;
          
          if (scrollProgress > 0 && scrollProgress < 1.2) {
            const translateY = Math.max(0, (1 - scrollProgress) * 80);
            const opacity = Math.min(1, Math.max(0, scrollProgress * 1.5));
            const scale = Math.min(1, Math.max(0.9, 0.9 + scrollProgress * 0.1));
            
            card.style.transform = `translateY(${translateY}px) scale(${scale})`;
            card.style.opacity = opacity;
          }
        }
      });
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll();

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      <style>{`
        * {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
        }

        body {
          font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', sans-serif;
          background: #fff;
          color: #000;
        }

        .hero-section {
          min-height: 100vh;
          background: #ffffff;
          padding: 100px 20px 120px;
          position: relative;
          overflow: hidden;
        }

        .hero-section::before {
          content: '';
          position: absolute;
          top: -50%;
          right: -10%;
          width: 600px;
          height: 600px;
          background: radial-gradient(circle, rgba(141, 198, 63, 0.08) 0%, transparent 70%);
          border-radius: 50%;
          pointer-events: none;
        }

        .hero-section::after {
          content: '';
          position: absolute;
          bottom: -30%;
          left: -10%;
          width: 500px;
          height: 500px;
          background: radial-gradient(circle, rgba(141, 198, 63, 0.06) 0%, transparent 70%);
          border-radius: 50%;
          pointer-events: none;
        }

        .hero-container {
          max-width: 1400px;
          margin: 0 auto;
          position: relative;
          z-index: 1;
        }

        .hero-header {
          text-align: center;
          margin-bottom: 70px;
          opacity: 0;
          animation: fadeInUp 1s ease forwards;
        }

        @keyframes fadeInUp {
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .section-label {
          display: inline-block;
          font-size: 0.875rem;
          font-weight: 600;
          color: #8dc63f;
          text-transform: uppercase;
          letter-spacing: 2px;
          margin-bottom: 20px;
          padding: 8px 20px;
          background: rgba(141, 198, 63, 0.1);
          border-radius: 50px;
        }

        .hero-title {
          font-size: clamp(2.5rem, 5vw, 4.5rem);
          font-weight: 800;
          margin-bottom: 24px;
          color: #000;
          letter-spacing: -0.03em;
          line-height: 1.1;
        }

        .hero-title-accent {
          color: #8dc63f;
          position: relative;
          display: inline-block;
        }

        .hero-subtitle {
          font-size: clamp(1.1rem, 2vw, 1.35rem);
          color: #666;
          max-width: 700px;
          margin: 0 auto;
          line-height: 1.7;
          font-weight: 400;
        }

        .solutions-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(340px, 1fr));
          gap: 35px;
          margin-top: 80px;
        }

        .solution-card {
          position: relative;
          height: 440px;
          border-radius: 24px;
          overflow: hidden;
          cursor: pointer;
          transform: translateY(80px) scale(0.9);
          opacity: 0;
          transition: all 0.6s cubic-bezier(0.4, 0, 0.2, 1);
          box-shadow: 0 10px 40px rgba(0, 0, 0, 0.08);
        }

        .solution-card::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: linear-gradient(180deg, rgba(0, 0, 0, 0) 0%, rgba(0, 0, 0, 0.75) 100%);
          z-index: 1;
          transition: all 0.5s ease;
        }

        .solution-card:hover {
          transform: translateY(-12px) scale(1);
          box-shadow: 0 25px 60px rgba(0, 0, 0, 0.15);
        }

        .solution-card:hover::before {
          background: linear-gradient(180deg, rgba(141, 198, 63, 0.15) 0%, rgba(0, 0, 0, 0.85) 100%);
        }

        .card-image {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          object-fit: cover;
          transition: transform 0.7s cubic-bezier(0.4, 0, 0.2, 1);
        }

        .solution-card:hover .card-image {
          transform: scale(1.15);
        }

        .card-content {
          position: absolute;
          bottom: 0;
          left: 0;
          right: 0;
          padding: 40px;
          z-index: 2;
          transform: translateY(0);
          transition: transform 0.5s ease;
        }

        .solution-card:hover .card-content {
          transform: translateY(-8px);
        }

        .card-number {
          font-size: 0.75rem;
          font-weight: 700;
          color: #8dc63f;
          text-transform: uppercase;
          letter-spacing: 2px;
          margin-bottom: 12px;
          opacity: 0;
          transform: translateY(10px);
          transition: all 0.4s ease 0.1s;
        }

        .solution-card:hover .card-number {
          opacity: 1;
          transform: translateY(0);
        }

        .card-title {
          font-size: 2rem;
          font-weight: 700;
          margin-bottom: 16px;
          color: #fff;
          position: relative;
          display: inline-block;
          line-height: 1.2;
        }

        .card-description {
          font-size: 1rem;
          line-height: 1.7;
          color: rgba(255, 255, 255, 0.9);
          opacity: 0;
          transform: translateY(15px);
          transition: all 0.5s ease 0.15s;
          max-width: 90%;
        }

        .solution-card:hover .card-description {
          opacity: 1;
          transform: translateY(0);
        }

        .card-arrow {
          position: absolute;
          bottom: 40px;
          right: 40px;
          width: 50px;
          height: 50px;
          background: #8dc63f;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 3;
          opacity: 0;
          transform: scale(0.8);
          transition: all 0.4s ease 0.2s;
        }

        .solution-card:hover .card-arrow {
          opacity: 1;
          transform: scale(1);
        }

        .card-arrow::after {
          content: '→';
          font-size: 1.5rem;
          color: #fff;
          font-weight: 700;
        }

        @media (max-width: 768px) {
          .hero-section {
            padding: 60px 20px 80px;
          }

          .hero-header {
            margin-bottom: 50px;
          }

          .solutions-grid {
            grid-template-columns: 1fr;
            gap: 25px;
            margin-top: 50px;
          }

          .solution-card {
            height: 380px;
          }

          .card-content {
            padding: 30px;
          }

          .card-title {
            font-size: 1.65rem;
          }

          .card-description {
            font-size: 0.95rem;
          }

          .card-arrow {
            bottom: 30px;
            right: 30px;
            width: 45px;
            height: 45px;
          }
        }

        @media (min-width: 769px) and (max-width: 1024px) {
          .solutions-grid {
            grid-template-columns: repeat(2, 1fr);
          }
        }

        @media (min-width: 1025px) {
          .solutions-grid {
            grid-template-columns: repeat(3, 1fr);
          }
        }
      `}</style>

      <section className="hero-section" ref={sectionRef}>
        <div className="hero-container">
          <div className="hero-header">
            <div className="section-label">Our Solutions</div>
            <h1 className="hero-title">
              Explore <span className="hero-title-accent">Activated Carbon</span> Solutions
            </h1>
            <p className="hero-subtitle">
              Industry-leading activated carbon technologies for diverse applications across multiple sectors worldwide
            </p>
          </div>

          <div className="solutions-grid">
            {solutions.map((solution, index) => (
              <div
                key={index}
                className="solution-card"
                ref={(el) => (cardsRef.current[index] = el)}
              >
                <img
                  src={solution.image}
                  alt={solution.title}
                  className="card-image"
                />
                <div className="card-content">
                  <div className="card-number">Solution {(index + 1).toString().padStart(2, '0')}</div>
                  <h3 className="card-title">{solution.title}</h3>
                  <p className="card-description">{solution.description}</p>
                </div>
                <div className="card-arrow"></div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
};

export default HeroSection;