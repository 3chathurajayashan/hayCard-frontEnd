import React from 'react';
import { Link } from 'react-router-dom';

function Home() {
  return (
    <div style={styles.container}>
      <style>{`
        * {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
        }
        
        body {
          font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, sans-serif;
        }
      `}</style>
      
      {/* Header */}
      <header style={styles.header}>
        <div style={styles.headerContent}>
          <div style={styles.logo}>
            <span style={styles.logoText}>HeyCarb</span>
          </div>
          <nav style={styles.nav}>
            <Link to="/" style={styles.navLink}>Home</Link>
            <Link to="/about" style={styles.navLink}>About</Link>
            <Link to="/services" style={styles.navLink}>Services</Link>
            <Link to="/contact" style={styles.navLink}>Contact</Link>
            <Link to="/sign" style={styles.signInLink}>Sign In</Link>
          </nav>
        </div>
      </header>

      {/* Hero Section */}
      <section style={styles.hero}>
        <div style={styles.heroContent}>
          <h1 style={styles.heroTitle}>Welcome to HeyCarb</h1>
          <p style={styles.heroSubtitle}>
            Crafting exceptional experiences with innovation and excellence
          </p>
          <div style={styles.heroButtons}>
            <button style={styles.primaryButton}>Get Started</button>
            <button style={styles.secondaryButton}>Learn More</button>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section style={styles.features}>
        <div style={styles.featuresContent}>
          <h2 style={styles.sectionTitle}>Our Services</h2>
          <div style={styles.featureGrid}>
            <div style={styles.featureCard}>
              <h3 style={styles.featureTitle}>Quality First</h3>
              <p style={styles.featureText}>
                Delivering premium solutions that exceed expectations
              </p>
            </div>
            <div style={styles.featureCard}>
              <h3 style={styles.featureTitle}>Fast & Reliable</h3>
              <p style={styles.featureText}>
                Efficient processes that save you time and resources
              </p>
            </div>
            <div style={styles.featureCard}>
              <h3 style={styles.featureTitle}>Focused Approach</h3>
              <p style={styles.featureText}>
                Targeted strategies designed for your success
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer style={styles.footer}>
        <div style={styles.footerContent}>
          <p style={styles.footerText}>© 2025 YourBrand. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}

const styles = { container: { minHeight: '100vh', display: 'flex', flexDirection: 'column', backgroundColor: '#ffffff', }, header: { backgroundColor: '#ffffff', borderBottom: '1px solid #e5e5e5', padding: '1rem 0', position: 'sticky', top: 0, zIndex: 100, boxShadow: '0 2px 4px rgba(0,0,0,0.05)', }, headerContent: { maxWidth: '1200px', margin: '0 auto', padding: '0 2rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center', }, logo: { fontSize: '1.5rem', fontWeight: 'bold', }, logoText: { color: '#556B2F', }, nav: { display: 'flex', gap: '2rem', alignItems: 'center', }, navLink: { color: '#000000', textDecoration: 'none', fontSize: '1rem', transition: 'color 0.3s ease', fontWeight: '500', }, signInLink: { color: '#ffffff', backgroundColor: '#556B2F', padding: '0.5rem 1.5rem', borderRadius: '4px', textDecoration: 'none', fontSize: '1rem', fontWeight: '500', transition: 'background-color 0.3s ease', }, hero: { flex: 1, backgroundColor: '#f8f8f8', padding: '6rem 2rem', display: 'flex', alignItems: 'center', justifyContent: 'center', }, heroContent: { maxWidth: '800px', textAlign: 'center', }, heroTitle: { fontSize: '3rem', color: '#000000', marginBottom: '1rem', fontWeight: '700', }, heroSubtitle: { fontSize: '1.25rem', color: '#666666', marginBottom: '2rem', lineHeight: '1.6', }, heroButtons: { display: 'flex', gap: '1rem', justifyContent: 'center', }, primaryButton: { backgroundColor: '#556B2F', color: '#ffffff', padding: '0.875rem 2rem', border: 'none', borderRadius: '4px', fontSize: '1rem', fontWeight: '600', cursor: 'pointer', transition: 'background-color 0.3s ease', }, secondaryButton: { backgroundColor: '#ffffff', color: '#556B2F', padding: '0.875rem 2rem', border: '2px solid #556B2F', borderRadius: '4px', fontSize: '1rem', fontWeight: '600', cursor: 'pointer', transition: 'all 0.3s ease', }, features: { backgroundColor: '#ffffff', padding: '5rem 2rem', }, featuresContent: { maxWidth: '1200px', margin: '0 auto', }, sectionTitle: { fontSize: '2.5rem', color: '#000000', textAlign: 'center', marginBottom: '3rem', fontWeight: '700', }, featureGrid: { display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '2rem', }, featureCard: { backgroundColor: '#f8f8f8', padding: '2rem', borderRadius: '8px', textAlign: 'center', transition: 'transform 0.3s ease, box-shadow 0.3s ease', border: '1px solid #e5e5e5', }, featureIcon: { fontSize: '3rem', marginBottom: '1rem', }, featureTitle: { fontSize: '1.5rem', color: '#556B2F', marginBottom: '0.75rem', fontWeight: '600', }, featureText: { fontSize: '1rem', color: '#666666', lineHeight: '1.6', }, footer: { backgroundColor: '#000000', color: '#ffffff', padding: '2rem', marginTop: 'auto', }, footerContent: { maxWidth: '1200px', margin: '0 auto', textAlign: 'center', }, footerText: { fontSize: '0.875rem', color: '#ffffff', }, };

export default Home;
