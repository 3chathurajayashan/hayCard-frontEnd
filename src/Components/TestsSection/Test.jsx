import React, { useState, useEffect } from 'react';
import { AlertTriangle, Plus, Search, Trash2, FlaskConical, Calendar, MapPin, Package, AlertCircle, CheckCircle, Clock, Shield, Droplets, Skull, Flame } from 'lucide-react';

const LabSafetyAssistant = () => {
  const [activeTab, setActiveTab] = useState('search');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedChemical, setSelectedChemical] = useState(null);
  const [inventory, setInventory] = useState([]);
  const [showAddForm, setShowAddForm] = useState(false);
  const [compatibilityCheck, setCompatibilityCheck] = useState({ chemical1: '', chemical2: '', result: null });

  const [newChemical, setNewChemical] = useState({
    name: '',
    lotNo: '',
    purchaseDate: '',
    openedDate: '',
    expirationDate: '',
    quantity: '',
    location: '',
    type: 'Standard Chemical'
  });

  const chemicalDatabase = {
    'nitric acid': {
      name: 'Nitric Acid',
      formula: 'HNO₃',
      cas: '7697-37-2',
      riskLevel: 'High',
      hazards: [
        'Highly corrosive to skin, eyes, and respiratory tract',
        'Strong oxidizing agent - can cause fires with combustible materials',
        'Releases toxic nitrogen dioxide fumes when heated',
        'May be fatal if swallowed or inhaled',
        'Causes severe burns and eye damage'
      ],
      ppe: [
        'Chemical-resistant gloves (nitrile or neoprene)',
        'Safety goggles with face shield',
        'Lab coat or chemical-resistant apron',
        'Closed-toe shoes',
        'Work in fume hood when possible'
      ],
      handling: [
        'Always add acid to water, never water to acid',
        'Use only in well-ventilated areas or fume hood',
        'Keep away from bases, metals, and organic materials',
        'Use secondary containment when transporting',
        'Never pipette by mouth'
      ],
      storage: [
        'Store in corrosive-resistant cabinet',
        'Keep container tightly closed',
        'Store away from bases and flammable materials',
        'Keep in cool, dry, well-ventilated area',
        'Use secondary containment trays'
      ],
      emergency: [
        'Inhalation: Move to fresh air immediately, seek medical attention',
        'Skin contact: Remove contaminated clothing, flush with water for 15-30 minutes',
        'Eye contact: Flush eyes with water for 30 minutes, seek immediate medical help',
        'Spill: Neutralize with sodium bicarbonate, absorb with inert material',
        'Fire: Use water spray, dry chemical, or CO₂ extinguisher'
      ],
      disposal: [
        'Neutralize with sodium bicarbonate or lime',
        'Dilute neutralized solution with large amounts of water',
        'Follow local hazardous waste regulations',
        'Never pour down drain without neutralization',
        'Contact EH&S for large quantities'
      ],
      incompatible: ['acetone', 'ethanol', 'sodium hydroxide', 'ammonia', 'hydrogen peroxide']
    },
    'sodium hydroxide': {
      name: 'Sodium Hydroxide',
      formula: 'NaOH',
      cas: '1310-73-2',
      riskLevel: 'High',
      hazards: [
        'Highly corrosive to skin and eyes',
        'Can cause severe burns',
        'Generates heat when dissolved in water',
        'Harmful if swallowed or inhaled',
        'May cause permanent eye damage'
      ],
      ppe: [
        'Chemical-resistant gloves (nitrile)',
        'Safety goggles with face shield',
        'Lab coat',
        'Closed-toe shoes',
        'Dust mask if handling powder'
      ],
      handling: [
        'Always add base to water slowly',
        'Stir continuously when dissolving',
        'Use heat-resistant containers',
        'Avoid generating dust',
        'Keep away from acids and metals'
      ],
      storage: [
        'Store in tightly closed plastic or glass container',
        'Keep in cool, dry place',
        'Store away from acids',
        'Avoid metal containers',
        'Use secondary containment'
      ],
      emergency: [
        'Inhalation: Move to fresh air, seek medical attention if symptoms persist',
        'Skin contact: Flush with water for 15 minutes, remove contaminated clothing',
        'Eye contact: Flush with water for 30 minutes, seek immediate medical help',
        'Spill: Neutralize with weak acid (acetic acid), clean with water',
        'Fire: Use dry chemical, CO₂, or water spray'
      ],
      disposal: [
        'Neutralize with dilute acid (HCl or acetic acid)',
        'Check pH before disposal',
        'Dilute with large amounts of water',
        'Follow local regulations',
        'Never mix with acids directly'
      ],
      incompatible: ['nitric acid', 'sulfuric acid', 'hydrochloric acid', 'acetone', 'aluminum']
    },
    'acetone': {
      name: 'Acetone',
      formula: 'C₃H₆O',
      cas: '67-64-1',
      riskLevel: 'Moderate',
      hazards: [
        'Highly flammable liquid and vapor',
        'May cause eye and respiratory irritation',
        'Can cause drowsiness and dizziness',
        'May cause skin dryness',
        'Vapors may form explosive mixtures with air'
      ],
      ppe: [
        'Nitrile gloves',
        'Safety goggles',
        'Lab coat',
        'Work in ventilated area'
      ],
      handling: [
        'Keep away from heat, sparks, and open flames',
        'Use only non-sparking tools',
        'Ground containers when transferring',
        'Use in fume hood',
        'Keep container tightly closed'
      ],
      storage: [
        'Store in flammable storage cabinet',
        'Keep container tightly closed',
        'Store in cool, well-ventilated area',
        'Keep away from oxidizing agents',
        'Ground storage containers'
      ],
      emergency: [
        'Inhalation: Move to fresh air',
        'Skin contact: Wash with soap and water',
        'Eye contact: Flush with water for 15 minutes',
        'Spill: Eliminate ignition sources, absorb with inert material',
        'Fire: Use dry chemical, CO₂, or alcohol-resistant foam'
      ],
      disposal: [
        'Collect in flammable waste container',
        'Do not mix with other chemicals',
        'Follow hazardous waste regulations',
        'Dispose through approved waste vendor'
      ],
      incompatible: ['nitric acid', 'sulfuric acid', 'hydrogen peroxide', 'oxidizing agents']
    }
  };

  const getExpiryStatus = (expiryDate, openedDate) => {
    if (!expiryDate) return { status: 'unknown', color: 'gray', label: 'No Expiry' };
    
    const today = new Date();
    const expiry = new Date(expiryDate);
    const daysUntilExpiry = Math.ceil((expiry - today) / (1000 * 60 * 60 * 24));
    
    if (daysUntilExpiry < 0) {
      return { status: 'expired', color: 'red', label: 'Expired', days: Math.abs(daysUntilExpiry) };
    } else if (daysUntilExpiry <= 30) {
      return { status: 'expiring', color: 'yellow', label: 'Expiring Soon', days: daysUntilExpiry };
    } else {
      return { status: 'fresh', color: 'green', label: 'Fresh', days: daysUntilExpiry };
    }
  };

  const getInventoryStats = () => {
    const stats = { total: inventory.length, fresh: 0, expiring: 0, expired: 0 };
    inventory.forEach(chem => {
      const status = getExpiryStatus(chem.expirationDate);
      if (status.status === 'fresh') stats.fresh++;
      else if (status.status === 'expiring') stats.expiring++;
      else if (status.status === 'expired') stats.expired++;
    });
    return stats;
  };

  const handleSearch = () => {
    const query = searchQuery.toLowerCase().trim();
    if (chemicalDatabase[query]) {
      setSelectedChemical(chemicalDatabase[query]);
    } else {
      setSelectedChemical({ name: searchQuery, notFound: true });
    }
  };

  const handleAddChemical = () => {
    if (newChemical.name && newChemical.lotNo) {
      setInventory([...inventory, { ...newChemical, id: Date.now() }]);
      setNewChemical({
        name: '',
        lotNo: '',
        purchaseDate: '',
        openedDate: '',
        expirationDate: '',
        quantity: '',
        location: '',
        type: 'Standard Chemical'
      });
      setShowAddForm(false);
    }
  };

  const handleDeleteChemical = (id) => {
    setInventory(inventory.filter(chem => chem.id !== id));
  };

  const checkCompatibility = () => {
    const chem1 = compatibilityCheck.chemical1.toLowerCase().trim();
    const chem2 = compatibilityCheck.chemical2.toLowerCase().trim();
    
    if (!chem1 || !chem2) {
      setCompatibilityCheck({ ...compatibilityCheck, result: null });
      return;
    }

    const chemical1Data = chemicalDatabase[chem1];
    const chemical2Data = chemicalDatabase[chem2];

    if (!chemical1Data || !chemical2Data) {
      setCompatibilityCheck({
        ...compatibilityCheck,
        result: {
          compatible: null,
          message: 'One or both chemicals not found in database. Please verify chemical names.'
        }
      });
      return;
    }

    const isIncompatible = chemical1Data.incompatible?.includes(chem2) || 
                          chemical2Data.incompatible?.includes(chem1);

    setCompatibilityCheck({
      ...compatibilityCheck,
      result: {
        compatible: !isIncompatible,
        message: isIncompatible 
          ? `WARNING: ${chemical1Data.name} and ${chemical2Data.name} are INCOMPATIBLE! Keep these chemicals separated.`
          : `${chemical1Data.name} and ${chemical2Data.name} appear compatible based on available data. Always verify with SDS.`
      }
    });
  };

  const stats = getInventoryStats();

  return (
    <div className="lab-safety-container">
      <style>{`
        * {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
        }

        body {
          font-family: 'Inter', 'Segoe UI', system-ui, sans-serif;
          background: linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%);
          min-height: 100vh;
        }

        .lab-safety-container {
          min-height: 100vh;
          padding: 24px;
          background: linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%);
          animation: fadeIn 0.8s ease-out;
        }

        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }

        @keyframes slideIn {
          from { opacity: 0; transform: translateX(-20px); }
          to { opacity: 1; transform: translateX(0); }
        }

        @keyframes pulse {
          0%, 100% { transform: scale(1); }
          50% { transform: scale(1.05); }
        }

        @keyframes shimmer {
          0% { background-position: -200px 0; }
          100% { background-position: 200px 0; }
        }

        .container {
          max-width: 1200px;
          margin: 0 auto;
        }

        .header-card {
          background: linear-gradient(135deg, #ffffff 0%, #f8fafc 100%);
          border-radius: 16px;
          box-shadow: 0 8px 32px rgba(0,0,0,0.08);
          padding: 32px;
          margin-bottom: 32px;
          border: 1px solid #e2e8f0;
          position: relative;
          overflow: hidden;
          animation: slideIn 0.6s ease-out;
        }

        .header-card::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          height: 4px;
          background: linear-gradient(90deg, #3b82f6, #8b5cf6, #06b6d4);
        }

        .header-content {
          display: flex;
          align-items: center;
          gap: 20px;
          margin-bottom: 12px;
        }

        .header-icon-wrapper {
          width: 60px;
          height: 60px;
          background: linear-gradient(135deg, #3b82f6, #06b6d4);
          border-radius: 12px;
          display: flex;
          align-items: center;
          justify-content: center;
          color: white;
          animation: pulse 2s infinite;
        }

        .header-title {
          font-size: 32px;
          font-weight: 800;
          color: #1e293b;
          margin: 0;
          background: linear-gradient(135deg, #1e293b, #475569);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
        }

        .header-subtitle {
          color: #64748b;
          font-size: 16px;
          margin: 0;
          font-weight: 500;
        }

        .main-card {
          background: white;
          border-radius: 16px;
          box-shadow: 0 8px 32px rgba(0,0,0,0.08);
          margin-bottom: 32px;
          overflow: hidden;
          border: 1px solid #e2e8f0;
          animation: slideIn 0.6s ease-out 0.1s both;
        }

        .tab-buttons {
          display: flex;
          background: #f8fafc;
          border-bottom: 1px solid #e2e8f0;
        }

        .tab-button {
          flex: 1;
          padding: 20px 24px;
          font-weight: 600;
          background: transparent;
          color: #64748b;
          border: none;
          cursor: pointer;
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 12px;
          font-size: 15px;
          position: relative;
          overflow: hidden;
        }

        .tab-button::before {
          content: '';
          position: absolute;
          bottom: 0;
          left: 50%;
          width: 0;
          height: 3px;
          background: linear-gradient(90deg, #3b82f6, #06b6d4);
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
          transform: translateX(-50%);
        }

        .tab-button:hover {
          color: #334155;
          background: #f1f5f9;
        }

        .tab-button.active {
          color: #3b82f6;
          background: white;
        }

        .tab-button.active::before {
          width: 100%;
        }

        .tab-content {
          padding: 32px;
        }

        .search-container {
          display: flex;
          gap: 16px;
          margin-bottom: 32px;
        }

        .search-input {
          flex: 1;
          padding: 16px 20px;
          border: 2px solid #e2e8f0;
          border-radius: 12px;
          font-size: 16px;
          transition: all 0.3s ease;
          background: white;
          font-weight: 500;
        }

        .search-input:focus {
          outline: none;
          border-color: #3b82f6;
          box-shadow: 0 0 0 4px rgba(59, 130, 246, 0.1);
          transform: translateY(-2px);
        }

        .search-button {
          padding: 16px 32px;
          background: linear-gradient(135deg, #3b82f6, #1d4ed8);
          color: white;
          border: none;
          border-radius: 12px;
          cursor: pointer;
          font-weight: 600;
          transition: all 0.3s ease;
          display: flex;
          align-items: center;
          gap: 12px;
          box-shadow: 0 4px 12px rgba(59, 130, 246, 0.3);
        }

        .search-button:hover {
          transform: translateY(-2px);
          box-shadow: 0 6px 20px rgba(59, 130, 246, 0.4);
        }

        .chemical-header {
          background: linear-gradient(135deg, #1e293b 0%, #334155 100%);
          color: white;
          border-radius: 16px;
          padding: 32px;
          margin-bottom: 24px;
          position: relative;
          overflow: hidden;
        }

        .chemical-header::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: linear-gradient(45deg, transparent 30%, rgba(255,255,255,0.1) 50%, transparent 70%);
          animation: shimmer 3s infinite;
        }

        .chemical-name {
          font-size: 36px;
          font-weight: 800;
          margin-bottom: 12px;
        }

        .chemical-details {
          display: flex;
          gap: 32px;
          font-size: 15px;
          align-items: center;
        }

        .risk-badge {
          padding: 8px 20px;
          border-radius: 20px;
          font-weight: 700;
          font-size: 13px;
          text-transform: uppercase;
          letter-spacing: 0.5px;
        }

        .risk-high {
          background: linear-gradient(135deg, #ef4444, #dc2626);
          box-shadow: 0 4px 12px rgba(239, 68, 68, 0.3);
        }

        .risk-moderate {
          background: linear-gradient(135deg, #f59e0b, #d97706);
          box-shadow: 0 4px 12px rgba(245, 158, 11, 0.3);
        }

        .safety-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 20px;
          margin-bottom: 24px;
        }

        .warning-banner {
          background: linear-gradient(135deg, #fef3c7, #fde68a);
          border: 1px solid #fcd34d;
          border-radius: 12px;
          padding: 20px;
          margin-top: 24px;
        }

        .warning-text {
          color: #92400e;
          font-size: 14px;
          font-weight: 600;
          margin: 0;
          display: flex;
          align-items: center;
          gap: 12px;
        }

        .not-found {
          background: linear-gradient(135deg, #fef3c7, #fde68a);
          border: 1px solid #fcd34d;
          border-radius: 16px;
          padding: 32px;
          text-align: center;
        }

        .not-found-header {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 16px;
          margin-bottom: 16px;
        }

        .not-found-title {
          font-size: 24px;
          font-weight: 700;
          color: #92400e;
          margin: 0;
        }

        .stats-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 20px;
          margin-bottom: 32px;
        }

        .stat-card {
          padding: 24px;
          border-radius: 16px;
          text-align: center;
          transition: all 0.3s ease;
          border: 1px solid;
        }

        .stat-card:hover {
          transform: translateY(-4px);
        }

        .stat-blue {
          background: linear-gradient(135deg, #dbeafe, #eff6ff);
          border-color: #bfdbfe;
          color: #1e40af;
        }

        .stat-green {
          background: linear-gradient(135deg, #d1fae5, #ecfdf5);
          border-color: #a7f3d0;
          color: #065f46;
        }

        .stat-yellow {
          background: linear-gradient(135deg, #fef3c7, #fffbeb);
          border-color: #fde68a;
          color: #92400e;
        }

        .stat-red {
          background: linear-gradient(135deg, #fee2e2, #fef2f2);
          border-color: #fecaca;
          color: #991b1b;
        }

        .stat-value {
          font-size: 36px;
          font-weight: 800;
          margin-bottom: 8px;
        }

        .stat-label {
          font-size: 14px;
          font-weight: 600;
          text-transform: uppercase;
          letter-spacing: 0.5px;
        }

        .add-button {
          padding: 16px 24px;
          background: linear-gradient(135deg, #3b82f6, #1d4ed8);
          color: white;
          border: none;
          border-radius: 12px;
          cursor: pointer;
          font-weight: 600;
          margin-bottom: 24px;
          display: flex;
          align-items: center;
          gap: 12px;
          transition: all 0.3s ease;
          box-shadow: 0 4px 12px rgba(59, 130, 246, 0.3);
        }

        .add-button:hover {
          transform: translateY(-2px);
          box-shadow: 0 6px 20px rgba(59, 130, 246, 0.4);
        }

        .add-form {
          background: linear-gradient(135deg, #f8fafc, #f1f5f9);
          border-radius: 16px;
          padding: 32px;
          margin-bottom: 32px;
          border: 1px solid #e2e8f0;
          animation: slideIn 0.4s ease-out;
        }

        .form-title {
          font-size: 24px;
          font-weight: 700;
          margin-bottom: 24px;
          color: #1e293b;
        }

        .form-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 20px;
          margin-bottom: 24px;
        }

        .form-input, .form-select {
          padding: 16px;
          border: 2px solid #e2e8f0;
          border-radius: 12px;
          font-size: 15px;
          transition: all 0.3s ease;
          background: white;
          font-weight: 500;
        }

        .form-input:focus, .form-select:focus {
          outline: none;
          border-color: #3b82f6;
          box-shadow: 0 0 0 4px rgba(59, 130, 246, 0.1);
          transform: translateY(-2px);
        }

        .form-buttons {
          display: flex;
          gap: 16px;
        }

        .save-button {
          padding: 16px 32px;
          background: linear-gradient(135deg, #10b981, #059669);
          color: white;
          border: none;
          border-radius: 12px;
          cursor: pointer;
          font-weight: 600;
          transition: all 0.3s ease;
          box-shadow: 0 4px 12px rgba(16, 185, 129, 0.3);
        }

        .save-button:hover {
          transform: translateY(-2px);
          box-shadow: 0 6px 20px rgba(16, 185, 129, 0.4);
        }

        .cancel-button {
          padding: 16px 32px;
          background: linear-gradient(135deg, #64748b, #475569);
          color: white;
          border: none;
          border-radius: 12px;
          cursor: pointer;
          font-weight: 600;
          transition: all 0.3s ease;
        }

        .cancel-button:hover {
          transform: translateY(-2px);
          background: linear-gradient(135deg, #475569, #374151);
        }

        .inventory-table {
          width: 100%;
          border-collapse: collapse;
          background: white;
          border-radius: 16px;
          overflow: hidden;
          box-shadow: 0 4px 12px rgba(0,0,0,0.08);
          border: 1px solid #e2e8f0;
        }

        .table-header {
          background: linear-gradient(135deg, #f8fafc, #f1f5f9);
        }

        .table-header th {
          padding: 20px;
          text-align: left;
          font-weight: 600;
          color: #475569;
          font-size: 14px;
          border-bottom: 2px solid #e2e8f0;
          text-transform: uppercase;
          letter-spacing: 0.5px;
        }

        .table-row {
          border-bottom: 1px solid #e2e8f0;
          transition: all 0.3s ease;
        }

        .table-row:hover {
          background: #f8fafc;
          transform: scale(1.01);
        }

        .table-row td {
          padding: 20px;
          font-size: 14px;
          color: #475569;
          font-weight: 500;
        }

        .status-badge {
          padding: 8px 16px;
          border-radius: 20px;
          font-size: 12px;
          font-weight: 700;
          display: inline-block;
          text-transform: uppercase;
          letter-spacing: 0.5px;
        }

        .status-green {
          background: linear-gradient(135deg, #d1fae5, #a7f3d0);
          color: #065f46;
        }

        .status-yellow {
          background: linear-gradient(135deg, #fef3c7, #fde68a);
          color: #92400e;
        }

        .status-red {
          background: linear-gradient(135deg, #fee2e2, #fecaca);
          color: #991b1b;
        }

        .status-gray {
          background: linear-gradient(135deg, #f1f5f9, #e2e8f0);
          color: #64748b;
        }

        .delete-button {
          background: none;
          border: none;
          color: #dc2626;
          cursor: pointer;
          padding: 12px;
          border-radius: 8px;
          transition: all 0.3s ease;
        }

        .delete-button:hover {
          background: #fee2e2;
          color: #b91c1c;
          transform: scale(1.1);
        }

        .compatibility-warning {
          background: linear-gradient(135deg, #fef3c7, #fde68a);
          border: 1px solid #fcd34d;
          border-radius: 12px;
          padding: 20px;
          margin-bottom: 24px;
        }

        .compatibility-inputs {
          display: flex;
          flex-direction: column;
          gap: 20px;
          margin-bottom: 24px;
        }

        .input-group {
          display: flex;
          flex-direction: column;
          gap: 12px;
        }

        .input-label {
          font-weight: 600;
          color: #374151;
          font-size: 15px;
        }

        .compatibility-input {
          padding: 16px 20px;
          border: 2px solid #e2e8f0;
          border-radius: 12px;
          font-size: 16px;
          transition: all 0.3s ease;
          background: white;
        }

        .compatibility-input:focus {
          outline: none;
          border-color: #3b82f6;
          box-shadow: 0 0 0 4px rgba(59, 130, 246, 0.1);
          transform: translateY(-2px);
        }

        .check-button {
          width: 100%;
          padding: 20px;
          background: linear-gradient(135deg, #3b82f6, #1d4ed8);
          color: white;
          border: none;
          border-radius: 12px;
          cursor: pointer;
          font-weight: 600;
          font-size: 16px;
          transition: all 0.3s ease;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 12px;
          box-shadow: 0 4px 12px rgba(59, 130, 246, 0.3);
        }

        .check-button:hover {
          transform: translateY(-2px);
          box-shadow: 0 6px 20px rgba(59, 130, 246, 0.4);
        }

        .result-card {
          border-radius: 16px;
          padding: 24px;
          border: 2px solid;
          margin-top: 24px;
          animation: slideIn 0.4s ease-out;
        }

        .result-success {
          background: linear-gradient(135deg, #f0fdf4, #dcfce7);
          border-color: #22c55e;
        }

        .result-danger {
          background: linear-gradient(135deg, #fef2f2, #fee2e2);
          border-color: #ef4444;
        }

        .result-neutral {
          background: linear-gradient(135deg, #f8fafc, #f1f5f9);
          border-color: #94a3b8;
        }

        .result-content {
          display: flex;
          align-items: flex-start;
          gap: 20px;
        }

        .result-title {
          font-size: 18px;
          font-weight: 700;
          margin-bottom: 8px;
          color: #1e293b;
        }

        .result-message {
          color: #475569;
          line-height: 1.6;
          font-weight: 500;
        }

        .chemicals-list {
          background: linear-gradient(135deg, #dbeafe, #eff6ff);
          border: 1px solid #bfdbfe;
          border-radius: 16px;
          padding: 24px;
          margin-top: 32px;
        }

        .list-title {
          font-weight: 700;
          color: #1e40af;
          margin-bottom: 16px;
          font-size: 16px;
        }

        .list-items {
          color: #1e40af;
          font-size: 14px;
          line-height: 1.8;
          font-weight: 500;
        }

        .empty-state {
          padding: 48px 24px;
          text-align: center;
          color: #64748b;
          font-size: 16px;
          font-weight: 500;
        }

        @media (max-width: 768px) {
          .safety-grid {
            grid-template-columns: 1fr;
          }
          
          .stats-grid {
            grid-template-columns: repeat(2, 1fr);
          }
          
          .form-grid {
            grid-template-columns: 1fr;
          }
          
          .chemical-details {
            flex-direction: column;
            gap: 12px;
            align-items: flex-start;
          }
          
          .tab-buttons {
            flex-direction: column;
          }
          
          .search-container {
            flex-direction: column;
          }
        }
      `}</style>

      <div className="container">
        <div className="header-card">
          <div className="header-content">
             
            <h1 className="header-title">Let's Manage Chemicals</h1>
          </div>
          <p className="header-subtitle">Instant safety guidelines for lab chemicals - Powered by HAYCARB</p>
        </div>

        <div className="main-card">
          <div className="tab-buttons">
            <button
              onClick={() => setActiveTab('search')}
              className={`tab-button ${activeTab === 'search' ? 'active' : ''}`}
            >
              <Search size={20} />
              Chemical Search
            </button>
            <button
              onClick={() => setActiveTab('inventory')}
              className={`tab-button ${activeTab === 'inventory' ? 'active' : ''}`}
            >
              <Package size={20} />
              Inventory Maintains
            </button>
            <button
              onClick={() => setActiveTab('compatibility')}
              className={`tab-button ${activeTab === 'compatibility' ? 'active' : ''}`}
            >
              <AlertTriangle size={20} />
              Compatibility Checkings
            </button>
          </div>

          <div className="tab-content">
            {activeTab === 'search' && (
              <div>
                <div className="search-container">
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
                    placeholder="Enter chemical name (e.g., nitric acid, sodium hydroxide, acetone)"
                    className="search-input"
                  />
                  <button onClick={handleSearch} className="search-button">
                    <Search size={20} />
                    Search
                  </button>
                </div>

                {selectedChemical && (
                  selectedChemical.notFound ? (
                    <div className="not-found">
                      <div className="not-found-header">
                        <AlertCircle size={28} color="#d97706" />
                        <h3 className="not-found-title">Chemical Not Found</h3>
                      </div>
                      <p>
                        Safety information for "{selectedChemical.name}" is not available in the database.
                        Please consult the Safety Data Sheet (SDS) for this chemical.
                      </p>
                      <p style={{ marginTop: '16px', fontSize: '14px', color: '#92400e', fontWeight: '500' }}>
                        Available chemicals: Nitric Acid, Sodium Hydroxide, Acetone
                      </p>
                    </div>
                  ) : (
                    <div>
                      <div className="chemical-header">
                        <h2 className="chemical-name">{selectedChemical.name}</h2>
                        <div className="chemical-details">
                          <span>Formula: <strong>{selectedChemical.formula}</strong></span>
                          <span>CAS Number: <strong>{selectedChemical.cas}</strong></span>
                          <span className={`risk-badge ${selectedChemical.riskLevel === 'High' ? 'risk-high' : 'risk-moderate'}`}>
                            Risk Level: {selectedChemical.riskLevel}
                          </span>
                        </div>
                      </div>

                      <div className="safety-grid">
                        <SafetySection title="Hazards" icon={<Skull size={20} />} items={selectedChemical.hazards} color="red" />
                        <SafetySection title="PPE" icon={<Shield size={20} />} items={selectedChemical.ppe} color="blue" />
                        <SafetySection title="Handling" icon={<FlaskConical size={20} />} items={selectedChemical.handling} color="green" />
                        <SafetySection title="Storage" icon={<Package size={20} />} items={selectedChemical.storage} color="purple" />
                        <SafetySection title="Emergency Procedures" icon={<AlertTriangle size={20} />} items={selectedChemical.emergency} color="red" />
                        <SafetySection title="Disposal" icon={<Droplets size={20} />} items={selectedChemical.disposal} color="green" />
                      </div>

                      <div className="warning-banner">
                        <p className="warning-text">
                          <AlertTriangle size={20} color="#92400e" />
                          Always have emergency protocols posted in your lab. Consult the full SDS for complete safety information.
                        </p>
                      </div>
                    </div>
                  )
                )}
              </div>
            )}

            {activeTab === 'inventory' && (
              <div>
                <div className="stats-grid">
                  <div className="stat-card stat-blue">
                    <div className="stat-value">{stats.total}</div>
                    <div className="stat-label">Total Chemicals</div>
                  </div>
                  <div className="stat-card stat-green">
                    <div className="stat-value">{stats.fresh}</div>
                    <div className="stat-label">Fresh</div>
                  </div>
                  <div className="stat-card stat-yellow">
                    <div className="stat-value">{stats.expiring}</div>
                    <div className="stat-label">Expiring Soon</div>
                  </div>
                  <div className="stat-card stat-red">
                    <div className="stat-value">{stats.expired}</div>
                    <div className="stat-label">Expired</div>
                  </div>
                </div>

                <button
                  onClick={() => setShowAddForm(!showAddForm)}
                  className="add-button"
                >
                  <Plus size={20} />
                  Add Chemical
                </button>

                {showAddForm && (
                  <div className="add-form">
                    <h3 className="form-title">Add New Chemical</h3>
                    <div className="form-grid">
                      <input
                        type="text"
                        placeholder="Chemical Name"
                        value={newChemical.name}
                        onChange={(e) => setNewChemical({ ...newChemical, name: e.target.value })}
                        className="form-input"
                      />
                      <input
                        type="text"
                        placeholder="Lot/Batch No."
                        value={newChemical.lotNo}
                        onChange={(e) => setNewChemical({ ...newChemical, lotNo: e.target.value })}
                        className="form-input"
                      />
                      <input
                        type="date"
                        placeholder="Purchase Date"
                        value={newChemical.purchaseDate}
                        onChange={(e) => setNewChemical({ ...newChemical, purchaseDate: e.target.value })}
                        className="form-input"
                      />
                      <input
                        type="date"
                        placeholder="Opened Date"
                        value={newChemical.openedDate}
                        onChange={(e) => setNewChemical({ ...newChemical, openedDate: e.target.value })}
                        className="form-input"
                      />
                      <input
                        type="date"
                        placeholder="Expiration Date"
                        value={newChemical.expirationDate}
                        onChange={(e) => setNewChemical({ ...newChemical, expirationDate: e.target.value })}
                        className="form-input"
                      />
                      <input
                        type="text"
                        placeholder="Quantity"
                        value={newChemical.quantity}
                        onChange={(e) => setNewChemical({ ...newChemical, quantity: e.target.value })}
                        className="form-input"
                      />
                      <input
                        type="text"
                        placeholder="Location"
                        value={newChemical.location}
                        onChange={(e) => setNewChemical({ ...newChemical, location: e.target.value })}
                        className="form-input"
                      />
                      <select
                        value={newChemical.type}
                        onChange={(e) => setNewChemical({ ...newChemical, type: e.target.value })}
                        className="form-select"
                      >
                        <option>Standard Chemical</option>
                        <option>Peroxide Former</option>
                        <option>Reagent</option>
                        <option>Solvent</option>
                        <option>Acid</option>
                        <option>Base</option>
                      </select>
                    </div>
                    <div className="form-buttons">
                      <button onClick={handleAddChemical} className="save-button">
                        Save Chemical
                      </button>
                      <button onClick={() => setShowAddForm(false)} className="cancel-button">
                        Cancel
                      </button>
                    </div>
                  </div>
                )}

                <table className="inventory-table">
                  <thead className="table-header">
                    <tr>
                      <th>Name</th>
                      <th>Lot No.</th>
                      <th>Purchase</th>
                      <th>Opened</th>
                      <th>Expiry</th>
                      <th>Status</th>
                      <th>Qty</th>
                      <th>Location</th>
                      <th>Type</th>
                      <th>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {inventory.length === 0 ? (
                      <tr>
                        <td colSpan="10" className="empty-state">
                          No chemicals in inventory. Click "Add Chemical" to get started.
                        </td>
                      </tr>
                    ) : (
                      inventory.map((chem) => {
                        const status = getExpiryStatus(chem.expirationDate);
                        return (
                          <tr key={chem.id} className="table-row">
                            <td style={{ fontWeight: '600', color: '#1e293b' }}>{chem.name}</td>
                            <td>{chem.lotNo}</td>
                            <td>{chem.purchaseDate || '-'}</td>
                            <td>{chem.openedDate || '-'}</td>
                            <td>{chem.expirationDate || '-'}</td>
                            <td>
                              <span className={`status-badge status-${status.color}`}>
                                {status.label}
                                {status.days !== undefined && ` (${status.days}d)`}
                              </span>
                            </td>
                            <td>{chem.quantity}</td>
                            <td>{chem.location}</td>
                            <td>{chem.type}</td>
                            <td>
                              <button
                                onClick={() => handleDeleteChemical(chem.id)}
                                className="delete-button"
                              >
                                <Trash2 size={20} />
                              </button>
                            </td>
                          </tr>
                        );
                      })
                    )}
                  </tbody>
                </table>
              </div>
            )}

            {activeTab === 'compatibility' && (
              <div>
                <div className="compatibility-warning">
                  <p className="warning-text">
                    <AlertTriangle size={20} color="#92400e" />
                    Check if two chemicals can be safely stored or used together
                  </p>
                </div>

                <div className="compatibility-inputs">
                  <div className="input-group">
                    <label className="input-label">First Chemical</label>
                    <input
                      type="text"
                      value={compatibilityCheck.chemical1}
                      onChange={(e) => setCompatibilityCheck({ ...compatibilityCheck, chemical1: e.target.value, result: null })}
                      placeholder="Enter chemical name (e.g., nitric acid)"
                      className="compatibility-input"
                    />
                  </div>

                  <div className="input-group">
                    <label className="input-label">Second Chemical</label>
                    <input
                      type="text"
                      value={compatibilityCheck.chemical2}
                      onChange={(e) => setCompatibilityCheck({ ...compatibilityCheck, chemical2: e.target.value, result: null })}
                      placeholder="Enter chemical name (e.g., acetone)"
                      className="compatibility-input"
                    />
                  </div>

                  <button onClick={checkCompatibility} className="check-button">
                    <AlertTriangle size={20} />
                    Check Compatibility
                  </button>
                </div>

                {compatibilityCheck.result && (
                  <div className={`result-card ${
                    compatibilityCheck.result.compatible === null
                      ? 'result-neutral'
                      : compatibilityCheck.result.compatible
                      ? 'result-success'
                      : 'result-danger'
                  }`}>
                    <div className="result-content">
                      {compatibilityCheck.result.compatible === true && <CheckCircle size={28} color="#22c55e" />}
                      {compatibilityCheck.result.compatible === false && <AlertTriangle size={28} color="#ef4444" />}
                      {compatibilityCheck.result.compatible === null && <AlertCircle size={28} color="#64748b" />}
                      <div>
                        <h3 className="result-title">Compatibility Result</h3>
                        <p className="result-message">{compatibilityCheck.result.message}</p>
                      </div>
                    </div>
                  </div>
                )}

                <div className="chemicals-list">
                  <h4 className="list-title">Available Chemicals in Database:</h4>
                  <div className="list-items">
                    <div>• Nitric Acid</div>
                    <div>• Sodium Hydroxide</div>
                    <div>• Acetone</div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

const SafetySection = ({ title, icon, items, color }) => {
  const colorStyles = {
    red: { 
      borderColor: '#ef4444', 
      backgroundColor: 'linear-gradient(135deg, #fef2f2, #fee2e2)',
      iconColor: '#dc2626'
    },
    blue: { 
      borderColor: '#3b82f6', 
      backgroundColor: 'linear-gradient(135deg, #eff6ff, #dbeafe)',
      iconColor: '#1d4ed8'
    },
    green: { 
      borderColor: '#10b981', 
      backgroundColor: 'linear-gradient(135deg, #f0fdf4, #dcfce7)',
      iconColor: '#059669'
    },
    purple: { 
      borderColor: '#8b5cf6', 
      backgroundColor: 'linear-gradient(135deg, #faf5ff, #f3e8ff)',
      iconColor: '#7c3aed'
    }
  };

  return (
    <div style={{
      borderRadius: '12px',
      borderLeft: `4px solid ${colorStyles[color].borderColor}`,
      padding: '20px',
      background: colorStyles[color].backgroundColor,
      transition: 'all 0.3s ease'
    }} className="safety-section">
      <h3 style={{
        fontSize: '18px',
        fontWeight: '700',
        marginBottom: '16px',
        display: 'flex',
        alignItems: 'center',
        gap: '12px',
        color: '#1e293b'
      }}>
        <span style={{ color: colorStyles[color].iconColor }}>{icon}</span>
        {title}
      </h3>
      <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
        {items.map((item, index) => (
          <li key={index} style={{
            fontSize: '14px',
            color: '#475569',
            marginBottom: '12px',
            display: 'flex',
            alignItems: 'flex-start',
            gap: '12px',
            lineHeight: '1.5',
            fontWeight: '500'
          }}>
            <span style={{ 
              color: colorStyles[color].iconColor, 
              fontWeight: '700', 
              marginTop: '2px',
              fontSize: '16px'
            }}>•</span>
            <span>{item}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default LabSafetyAssistant;