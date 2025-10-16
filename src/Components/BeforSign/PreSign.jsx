import React, { useState } from 'react';
 

// Import your images
import madampeImage from '../../assets/hey.jpg';
import colomboImage from '../../assets/colombo.webp';
import badalgamaImage from '../../assets/madampe.webp';

const styles = `
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  body {
    font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
    background-color: #f8f9fa;
  }

  .branch-container {
    min-height: 100vh;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding: 40px 20px;
    background: linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%);
  }

  .header {
    text-align: center;
    margin-bottom: 60px;
  }

  .header h1 {
    font-size: 2.8rem;
    font-weight: 300;
    color: #2c3e50;
    margin-bottom: 15px;
    letter-spacing: -0.5px;
  }

  .header p {
    font-size: 1.1rem;
    color: #6c757d;
    font-weight: 400;
  }

  .branches-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
    gap: 30px;
    width: 100%;
    max-width: 1100px;
    margin: 0 auto;
  }

  .branch-card {
    background: white;
    border-radius: 16px;
    padding: 0;
    box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
    transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
    border: 1px solid #e9ecef;
    overflow: hidden;
    position: relative;
  }

  .branch-card:hover {
    transform: translateY(-8px);
    box-shadow: 0 12px 40px rgba(0, 0, 0, 0.15);
  }

  .branch-card::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 4px;
    z-index: 2;
  }

  .branch-card.madampe::before {
    background: white;
    border-bottom: 1px solid #e9ecef;
  }

  .branch-card.colombo::before {
    background: #8dc63f;
  }

  .branch-card.badalgama::before {
    background: black;
  }

  .branch-image {
    width: 100%;
    height: 200px;
    object-fit: cover;
    border-bottom: 1px solid #e9ecef;
    transition: transform 0.3s ease;
  }

  .branch-card:hover .branch-image {
    transform: scale(1.05);
  }

  .image-container {
    overflow: hidden;
    position: relative;
  }

  .branch-content {
    padding: 30px 25px;
    text-align: center;
  }

  .branch-name {
    font-size: 1.4rem;
    font-weight: 600;
    margin-bottom: 12px;
    color: #2c3e50;
  }

  .branch-description {
    color: #6c757d;
    font-size: 0.95rem;
    line-height: 1.6;
    margin-bottom: 25px;
  }

  .select-btn {
    width: 100%;
    padding: 14px 24px;
    border: none;
    border-radius: 10px;
    font-size: 1rem;
    font-weight: 600;
    cursor: pointer;
    transition: all 0.3s ease;
    text-transform: uppercase;
    letter-spacing: 0.5px;
    position: relative;
    overflow: hidden;
  }

  .branch-card.madampe .select-btn {
    background: white;
    color: #2c3e50;
    border: 2px solid #e9ecef;
  }

  .branch-card.madampe .select-btn:hover:not(:disabled) {
    background: #f8f9fa;
    border-color: #8dc63f;
    color: #8dc63f;
  }

  .branch-card.colombo .select-btn {
    background: #8dc63f;
    color: white;
    border: 2px solid #8dc63f;
  }

  .branch-card.colombo .select-btn:hover:not(:disabled) {
    background: #7cb32e;
    border-color: #7cb32e;
  }

  .branch-card.badalgama .select-btn {
    background: black;
    color: white;
    border: 2px solid black;
  }

  .branch-card.badalgama .select-btn:hover:not(:disabled) {
    background: #333;
    border-color: #333;
  }

  .select-btn:disabled {
    cursor: not-allowed;
    opacity: 0.7;
  }

  /* Modern Loading Spinner */
  .spinner-container {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 12px;
  }

  .spinner {
    width: 20px;
    height: 20px;
    border: 2px solid transparent;
    border-radius: 50%;
    animation: spin 1s linear infinite;
  }

  .branch-card.madampe .spinner {
    border-top: 2px solid #8dc63f;
  }

  .branch-card.colombo .spinner {
    border-top: 2px solid white;
  }

  .branch-card.badalgama .spinner {
    border-top: 2px solid white;
  }

  .loading-text {
    font-weight: 500;
  }

  .branch-card.madampe .loading-text {
    color: #8dc63f;
  }

  .branch-card.colombo .loading-text,
  .branch-card.badalgama .loading-text {
    color: white;
  }

  @keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
  }

  /* Pulse animation for cards */
  @keyframes pulse {
    0%, 100% { transform: scale(1); }
    50% { transform: scale(1.02); }
  }

  .pulse {
    animation: pulse 2s ease-in-out infinite;
  }

  /* Image placeholder styling */
  .image-placeholder {
    width: 100%;
    height: 200px;
    background: linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%);
    display: flex;
    align-items: center;
    justify-content: center;
    color: #6c757d;
    font-size: 3rem;
    border-bottom: 1px solid #e9ecef;
  }

  /* Responsive Design */
  @media (max-width: 768px) {
    .branches-grid {
      grid-template-columns: 1fr;
      max-width: 400px;
    }
    
    .header h1 {
      font-size: 2.2rem;
    }
    
    .branch-content {
      padding: 25px 20px;
    }
    
    .branch-image {
      height: 180px;
    }
  }

  @media (max-width: 480px) {
    .branch-container {
      padding: 20px 15px;
    }
    
    .header {
      margin-bottom: 40px;
    }
    
    .header h1 {
      font-size: 1.8rem;
    }
    
    .branch-image {
      height: 160px;
    }
  }
`;

// Inject styles
const styleSheet = document.createElement("style");
styleSheet.innerText = styles;
document.head.appendChild(styleSheet);

function BranchSelection() {
  const [loadingBranch, setLoadingBranch] = useState(null);
  const [selectedBranch, setSelectedBranch] = useState(null);

  const handleBranchSelect = (branch) => {
    setLoadingBranch(branch);
    setSelectedBranch(branch);

    // Simulate API call or processing
    setTimeout(() => {
      // Navigate to /sign path
      window.location.href = '/sign';
    }, 2500);
  };

  const branches = [
    {
      id: 'madampe',
      name: 'Madampe Lab',
      description: 'Modern banking services with personalized customer care in the heart of Madampe.',
      src: madampeImage,
      icon: '🏢'
    },
    {
      id: 'colombo',
      name: 'Colombo Lab',
      description: 'Our flagship branch offering comprehensive financial solutions in the capital city.',
      src: colomboImage,
      icon: '🏛️'
    },
    {
      id: 'badalgama',
      name: 'Badalgama Lab',
      description: 'Community-focused banking with friendly service in the Badalgama area.',
      src: badalgamaImage,
      icon: '🏦'
    }
  ];

  return (
    <div className="branch-container">
      <div className="header">
        <h1>Select Your Branch</h1>
        <p>Choose your preferred branch location to continue</p>
      </div>

      <div className="branches-grid">
        {branches.map((branch) => (
          <div 
            key={branch.id} 
            className={`branch-card ${branch.id} ${selectedBranch === branch.id ? 'pulse' : ''}`}
          >
            <div className="image-container">
              {branch.src ? (
                <img 
                  src={branch.src} 
                  alt={branch.name}
                  className="branch-image"
                  onError={(e) => {
                    e.target.style.display = 'none';
                    e.target.nextSibling.style.display = 'flex';
                  }}
                />
              ) : (
                <div className="image-placeholder">
                  {branch.icon}
                </div>
              )}
            </div>
            
            <div className="branch-content">
              <h3 className="branch-name">{branch.name}</h3>
              
              <p className="branch-description">
                {branch.description}
              </p>

              <button
                className="select-btn"
                onClick={() => handleBranchSelect(branch.id)}
                disabled={loadingBranch && loadingBranch !== branch.id}
              >
                {loadingBranch === branch.id ? (
                  <div className="spinner-container">
                    <div className="spinner"></div>
                    <span className="loading-text">Processing...</span>
                  </div>
                ) : (
                  'Select Branch'
                )}
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default BranchSelection;