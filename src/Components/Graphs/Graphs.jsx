import React, { useState, useEffect, useRef } from 'react';
import { TrendingUp, Users, Award, Target } from 'lucide-react';

const ProductHeroSection = () => {
  const [scrollY, setScrollY] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const chartRef = useRef(null);
  const [animateChart, setAnimateChart] = useState(false);

  useEffect(() => {
    setIsVisible(true);
    
    const handleScroll = () => {
      setScrollY(window.scrollY);
      
      if (chartRef.current) {
        const rect = chartRef.current.getBoundingClientRect();
        const inView = rect.top < window.innerHeight * 0.8 && rect.bottom > 0;
        
        if (inView && !animateChart) {
          setAnimateChart(true);
        } else if (!inView && animateChart) {
          setAnimateChart(false);
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll();
    
    return () => window.removeEventListener('scroll', handleScroll);
  }, [animateChart]);

  const chartData = [
    { label: 'Performance', value: 85, color: '#10b981' },
    { label: 'Reliability', value: 92, color: '#059669' },
    { label: 'User Satisfaction', value: 95, color: '#34d399' },
    { label: 'Support Quality', value: 88, color: '#6ee7b7' }
  ];

  const pieData = [
    { label: 'Enterprise', value: 45, color: '#10b981' },
    { label: 'Small Business', value: 30, color: '#34d399' },
    { label: 'Startups', value: 15, color: '#6ee7b7' },
    { label: 'Individual', value: 10, color: '#a7f3d0' }
  ];

  const improvements = [
    { icon: <TrendingUp />, value: '250%', label: 'Faster Performance' },
    { icon: <Users />, value: '10M+', label: 'Active Users' },
    { icon: <Award />, value: '99.9%', label: 'Uptime Rate' },
    { icon: <Target />, value: '450%', label: 'Growth Rate' }
  ];

  const renderPieChart = () => {
    const total = pieData.reduce((sum, item) => sum + item.value, 0);
    let currentAngle = -90;
    
    return pieData.map((item, index) => {
      const percentage = (item.value / total) * 100;
      const angle = (item.value / total) * 360;
      const startAngle = currentAngle;
      const endAngle = currentAngle + angle;
      
      const startRad = (startAngle * Math.PI) / 180;
      const endRad = (endAngle * Math.PI) / 180;
      
      const x1 = 140 + 70 * Math.cos(startRad);
      const y1 = 140 + 70 * Math.sin(startRad);
      const x2 = 140 + 70 * Math.cos(endRad);
      const y2 = 140 + 70 * Math.sin(endRad);
      
      const largeArc = angle > 180 ? 1 : 0;
      
      const pathData = [
        `M 140 140`,
        `L ${x1} ${y1}`,
        `A 70 70 0 ${largeArc} 1 ${x2} ${y2}`,
        `Z`
      ].join(' ');
      
      const labelAngle = startAngle + angle / 2;
      const labelRad = (labelAngle * Math.PI) / 180;
      const labelX = 140 + 50 * Math.cos(labelRad);
      const labelY = 140 + 50 * Math.sin(labelRad);
      
      currentAngle = endAngle;
      
      return (
        <g key={index}>
          <path
            d={pathData}
            fill={item.color}
            className="pie-segment"
            style={{
              opacity: animateChart ? 1 : 0,
              transform: animateChart ? 'scale(1)' : 'scale(0)',
              transformOrigin: '140px 140px',
              transition: `all 0.8s cubic-bezier(0.34, 1.56, 0.64, 1) ${index * 0.15}s`
            }}
          />
          {animateChart && (
            <text
              x={labelX}
              y={labelY}
              textAnchor="middle"
              dominantBaseline="middle"
              style={styles.pieLabel}
              className="fade-in"
            >
              {item.value}%
            </text>
          )}
        </g>
      );
    });
  };

  return (
    <div style={styles.container}>
      <style>{`
        @keyframes slideUp {
          from { transform: translateY(60px); opacity: 0; }
          to { transform: translateY(0); opacity: 1; }
        }

        @keyframes slideInLeft {
          from { transform: translateX(-60px); opacity: 0; }
          to { transform: translateX(0); opacity: 1; }
        }

        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }

        @keyframes barGrow {
          from { width: 0; }
          to { width: 100%; }
        }

        .slide-up { animation: slideUp 0.8s cubic-bezier(0.16, 1, 0.3, 1) forwards; }
        .slide-left { animation: slideInLeft 0.8s cubic-bezier(0.16, 1, 0.3, 1) forwards; }
        .fade-in { animation: fadeIn 1s ease-out forwards; }
        
        .stat-card {
          transition: all 0.4s cubic-bezier(0.16, 1, 0.3, 1);
        }
        
        .stat-card:hover {
          transform: translateY(-8px);
          box-shadow: 0 20px 60px rgba(16, 185, 129, 0.15);
        }

        .chart-bar {
          transition: all 0.3s ease;
        }

        .chart-bar:hover {
          filter: brightness(0.85);
        }

        .pie-segment {
          cursor: pointer;
          transition: all 0.3s ease;
        }

        .pie-segment:hover {
          filter: brightness(1.1);
          opacity: 0.9;
        }

        @media (max-width: 768px) {
          .stats-grid {
            grid-template-columns: repeat(2, 1fr) !important;
          }
          .charts-container {
            flex-direction: column !important;
          }
        }
      `}</style>

      <div style={styles.content}>
        <div style={styles.heroSection}>
          <div className={isVisible ? 'slide-up' : ''} style={{ animationDelay: '0.1s' }}>
            <div style={styles.badge}>
              Top Rated 2025
            </div>
          </div>

          <h1 
            className={isVisible ? 'slide-up' : ''} 
            style={{...styles.title, animationDelay: '0.2s'}}
          >
            Transform Your Business Performance
          </h1>

          <p 
            className={isVisible ? 'slide-up' : ''} 
            style={{...styles.subtitle, animationDelay: '0.3s'}}
          >
            Data-driven insights and proven results that accelerate growth and maximize efficiency
          </p>
        </div>

        <div style={styles.statsGrid}>
          {improvements.map((stat, index) => (
            <div
              key={index}
              className={`stat-card ${isVisible ? 'slide-up' : ''}`}
              style={{
                ...styles.statCard,
                animationDelay: `${0.4 + index * 0.1}s`
              }}
            >
              <div style={styles.iconWrapper}>
                {stat.icon}
              </div>
              <div style={styles.statValue}>{stat.value}</div>
              <div style={styles.statLabel}>{stat.label}</div>
            </div>
          ))}
        </div>

        <div ref={chartRef} style={styles.chartsContainer}>
          <div 
            className={animateChart ? 'slide-left' : ''} 
            style={{...styles.chartSection, animationDelay: '0.2s'}}
          >
            <h2 style={styles.chartTitle}>Performance Metrics</h2>
            <div style={styles.barChart}>
              {chartData.map((item, index) => (
                <div key={index} style={styles.barRow}>
                  <div style={styles.barLabel}>{item.label}</div>
                  <div style={styles.barContainer}>
                    <div 
                      className="chart-bar"
                      style={{
                        ...styles.barFill,
                        width: animateChart ? `${item.value}%` : '0%',
                        background: item.color,
                        animation: animateChart ? `barGrow 1.2s cubic-bezier(0.16, 1, 0.3, 1) ${index * 0.1}s forwards` : 'none'
                      }}
                    >
                      <span style={styles.barValue}>{item.value}%</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div 
            className={animateChart ? 'slide-up' : ''} 
            style={{...styles.chartSection, animationDelay: '0.4s'}}
          >
            <h2 style={styles.chartTitle}>Customer Distribution</h2>
            <div style={styles.pieChartContainer}>
              <svg width="280" height="280" viewBox="0 0 280 280" style={styles.pieChart}>
                {renderPieChart()}
              </svg>
              
              <div style={styles.pieLegend}>
                {pieData.map((item, index) => (
                  <div 
                    key={index} 
                    style={styles.legendItem}
                    className={animateChart ? 'slide-left' : ''}
                  >
                    <div style={{...styles.legendColor, background: item.color}} />
                    <span style={styles.legendLabel}>{item.label}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div style={styles.ctaSection} className={isVisible ? 'slide-up' : ''}>
          <button style={styles.primaryButton}>
            Get Started Now
          </button>
          <button style={styles.secondaryButton}>
            View Case Studies
          </button>
        </div>
      </div>
    </div>
  );
};

const styles = {
  container: {
    minHeight: '100vh',
    background: '#ffffff',
    padding: '80px 20px',
    fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif'
  },
  content: {
    maxWidth: '1200px',
    margin: '0 auto'
  },
  heroSection: {
    textAlign: 'center',
    marginBottom: '80px'
  },
  badge: {
    display: 'inline-block',
    background: '#f8fafc',
    color: '#000',
    fontSize: '13px',
    fontWeight: '600',
    padding: '8px 20px',
    borderRadius: '100px',
    marginBottom: '24px',
    border: '1px solid #e2e8f0',
    letterSpacing: '0.5px'
  },
  title: {
    fontSize: '64px',
    fontWeight: '700',
    color: '#000',
    marginBottom: '24px',
    lineHeight: '1.1',
    letterSpacing: '-2px'
  },
  subtitle: {
    fontSize: '20px',
    color: '#059669',
    maxWidth: '700px',
    margin: '0 auto',
    lineHeight: '1.6',
    fontWeight: '500'
  },
  statsGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
    gap: '24px',
    marginBottom: '100px'
  },
  statCard: {
    background: '#f8fafc',
    borderRadius: '16px',
    padding: '32px 24px',
    textAlign: 'center',
    border: '1px solid #e2e8f0'
  },
  iconWrapper: {
    width: '56px',
    height: '56px',
    margin: '0 auto 16px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    color: '#10b981'
  },
  statValue: {
    fontSize: '48px',
    fontWeight: '700',
    color: '#000',
    marginBottom: '8px',
    letterSpacing: '-1px'
  },
  statLabel: {
    fontSize: '15px',
    color: '#059669',
    fontWeight: '500'
  },
  chartsContainer: {
    display: 'flex',
    gap: '40px',
    marginBottom: '80px',
    alignItems: 'flex-start'
  },
  chartSection: {
    flex: 1,
    background: '#f8fafc',
    borderRadius: '20px',
    padding: '40px',
    border: '1px solid #e2e8f0'
  },
  chartTitle: {
    fontSize: '24px',
    fontWeight: '700',
    color: '#000',
    marginBottom: '32px',
    letterSpacing: '-0.5px'
  },
  barChart: {
    display: 'flex',
    flexDirection: 'column',
    gap: '24px'
  },
  barRow: {
    display: 'flex',
    flexDirection: 'column',
    gap: '8px'
  },
  barLabel: {
    fontSize: '14px',
    fontWeight: '600',
    color: '#000',
    marginBottom: '4px'
  },
  barContainer: {
    width: '100%',
    height: '40px',
    background: '#ffffff',
    borderRadius: '8px',
    overflow: 'hidden',
    border: '1px solid #e2e8f0'
  },
  barFill: {
    height: '100%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    paddingRight: '12px',
    borderRadius: '8px',
    transition: 'width 0.3s ease'
  },
  barValue: {
    fontSize: '13px',
    fontWeight: '700',
    color: '#ffffff'
  },
  pieChartContainer: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: '32px'
  },
  pieChart: {
    filter: 'drop-shadow(0 4px 12px rgba(16, 185, 129, 0.1))'
  },
  pieLabel: {
    fontSize: '16px',
    fontWeight: '700',
    fill: '#000'
  },
  pieLegend: {
    display: 'grid',
    gridTemplateColumns: 'repeat(2, 1fr)',
    gap: '16px',
    width: '100%'
  },
  legendItem: {
    display: 'flex',
    alignItems: 'center',
    gap: '12px'
  },
  legendColor: {
    width: '16px',
    height: '16px',
    borderRadius: '4px',
    flexShrink: 0
  },
  legendLabel: {
    fontSize: '14px',
    color: '#059669',
    fontWeight: '500'
  },
  ctaSection: {
    display: 'flex',
    justifyContent: 'center',
    gap: '16px',
    flexWrap: 'wrap',
    animationDelay: '0.8s'
  },
  primaryButton: {
    background: '#10b981',
    color: '#fff',
    border: 'none',
    borderRadius: '12px',
    padding: '16px 32px',
    fontSize: '16px',
    fontWeight: '600',
    cursor: 'pointer',
    transition: 'all 0.3s ease'
  },
  secondaryButton: {
    background: '#f8fafc',
    color: '#000',
    border: '1px solid #e2e8f0',
    borderRadius: '12px',
    padding: '16px 32px',
    fontSize: '16px',
    fontWeight: '600',
    cursor: 'pointer',
    transition: 'all 0.3s ease'
  }
};

export default ProductHeroSection;