import React, { useState, useEffect, useRef } from 'react';
import { ChevronDown, ChevronUp, Beaker, ShieldCheck, FileCheck, Waves, FlaskConical } from 'lucide-react';

const LabTestsInfo = () => {
  const [activeTest, setActiveTest] = useState(null);
  const [visibleCards, setVisibleCards] = useState([]);
  const cardRefs = useRef([]);

  useEffect(() => {
    const observers = cardRefs.current.map((ref, index) => {
      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              setVisibleCards((prev) => [...new Set([...prev, index])]);
            }
          });
        },
        { threshold: 0.1 }
      );

      if (ref) observer.observe(ref);
      return observer;
    });

    return () => {
      observers.forEach((observer) => observer.disconnect());
    };
  }, []);

  const tests = [
    {
      id: 'nsf42',
      name: 'NSF 42',
      title: 'Aesthetic Effects Standard',
      icon: <Waves size={28} />,
      overview: 'NSF/ANSI Standard 42 addresses aesthetic impurities in drinking water that are non-health related. This standard ensures that water treatment systems effectively reduce chlorine, taste, odor, and particulate matter.',
      usage: [
        'Certification of drinking water treatment units for aesthetic contaminant reduction',
        'Testing residential and commercial water filters',
        'Verification of chlorine taste and odor reduction claims',
        'Evaluation of particulate filtration efficiency',
        'Quality assurance for point-of-use water treatment devices'
      ],
      procedure: [
        'Initial product evaluation and material review to ensure compliance with safety requirements',
        'Challenge water preparation with specific concentrations of test contaminants including chlorine at 2.0 mg/L',
        'Performance testing over multiple cycles to measure reduction capacity',
        'Influent and effluent water sampling at predetermined intervals',
        'Laboratory analysis using approved analytical methods such as spectrophotometry for chlorine',
        'Structural integrity testing including pressure, temperature, and cycling tests',
        'Material safety extraction testing to ensure no contaminant leaching',
        'Data compilation and statistical analysis to verify percentage reduction claims',
        'Final report generation with pass or fail determination'
      ],
      keyParameters: [
        'Chlorine Reduction: Minimum 50% reduction required',
        'Taste and Odor: Must meet sensory standards',
        'Particulate Class: Ratings from I to VI based on size removal',
        'Rated Service Capacity: Volume of water treated before replacement',
        'Flow Rate: Gallons per minute at specified pressure'
      ],
      duration: 'Typically 4-8 weeks depending on product complexity and testing requirements'
    },
    {
      id: 'nsf61',
      name: 'NSF 61',
      title: 'Drinking Water System Components - Health Effects',
      icon: <ShieldCheck size={28} />,
      overview: 'NSF/ANSI Standard 61 establishes minimum health effects requirements for materials, components, and products that contact drinking water. It ensures that products do not contribute contaminant levels that would pose health risks.',
      usage: [
        'Certification of pipes, fittings, and plumbing materials',
        'Testing water treatment chemicals and additives',
        'Evaluation of protective coatings and linings',
        'Assessment of mechanical devices like valves and meters',
        'Verification of point-of-use and point-of-entry treatment systems'
      ],
      procedure: [
        'Product formulation review and material safety data collection',
        'Sample preparation including cleaning and conditioning per protocol',
        'Extraction testing using standardized water at controlled pH and temperature',
        'Extended contact time exposure, typically 18-hour cycles',
        'Collection of extraction water samples at specified intervals including day 1, 3, 5, and up to 16 days',
        'Chemical analysis via ICP-MS, ICP-OES, or GC-MS for trace contaminants',
        'Testing for heavy metals including lead, arsenic, mercury, chromium, and cadmium',
        'Organic compound analysis including volatile and semi-volatile compounds',
        'Toxicological evaluation comparing results against maximum allowable levels',
        'Composite analysis for multi-component systems',
        'Final certification report with detailed analytical data'
      ],
      keyParameters: [
        'Lead: Maximum 5 μg/L after extraction',
        'Total Organic Carbon (TOC): Varies by product type',
        'pH Impact: Must not significantly alter water pH',
        'Extraction Temperature: 20°C or 60°C depending on application',
        'Contact Time: Standardized exposure periods'
      ],
      duration: 'Generally 8-12 weeks including extraction cycles and analytical testing'
    },
    {
      id: 'prop65',
      name: 'PROP 65',
      title: 'California Proposition 65',
      icon: <FileCheck size={28} />,
      overview: 'Proposition 65, officially known as the Safe Drinking Water and Toxic Enforcement Act of 1986, requires businesses to provide warnings about significant exposures to chemicals that cause cancer, birth defects, or other reproductive harm.',
      usage: [
        'Product safety labeling for California market compliance',
        'Chemical exposure assessment for consumer products',
        'Testing of materials for listed carcinogenic substances',
        'Reproductive toxicity evaluation',
        'Supply chain chemical disclosure verification'
      ],
      procedure: [
        'Comprehensive material declaration and bill of materials review',
        'Laboratory analysis for Prop 65 listed chemicals exceeding 1000 substances',
        'Sample extraction using appropriate solvents based on product matrix',
        'Analytical testing via GC-MS, LC-MS, or ICP-MS methodologies',
        'Testing for common triggers including phthalates, lead, cadmium, and formaldehyde',
        'Quantification against Safe Harbor Levels for each chemical',
        'Exposure assessment calculations based on intended use patterns',
        'Risk characterization for potential human contact scenarios',
        'Documentation of analytical certificates and chain of custody',
        'Warning label requirement determination',
        'Compliance report with recommendations for product modifications if needed'
      ],
      keyParameters: [
        'Safe Harbor Levels: Chemical-specific threshold concentrations',
        'Maximum Allowable Dose Level (MADL): For reproductive toxins',
        'No Significant Risk Level (NSRL): For carcinogens',
        'Detection Limits: Must be below regulatory thresholds',
        'Exposure Duration: Daily exposure assumptions'
      ],
      duration: '4-6 weeks for standard screening, longer for comprehensive testing'
    },
    {
      id: 'fcc',
      name: 'FCC',
      title: 'Food Chemicals Codex',
      icon: <Beaker size={28} />,
      overview: 'FCC provides internationally recognized standards for the identity, purity, and quality of food ingredients including food chemicals, processing aids, and food contact substances. It is published by the United States Pharmacopeia.',
      usage: [
        'Quality verification of food-grade chemicals and additives',
        'Testing of food processing aids and enzymes',
        'Certification of pharmaceutical excipients used in food',
        'Evaluation of nutritional supplements and fortification ingredients',
        'Water treatment chemicals used in food processing'
      ],
      procedure: [
        'Sample reception and identity confirmation through preliminary tests',
        'Physical property testing including appearance, color, odor assessment',
        'Chemical identification using spectroscopic methods like IR, NMR, or UV-Vis',
        'Purity analysis through chromatographic techniques including HPLC and GC',
        'Heavy metals testing via atomic absorption or ICP methods',
        'Residual solvents determination by gas chromatography',
        'Microbiological testing for total plate count, yeast, and mold if applicable',
        'Loss on drying to determine moisture content',
        'Residue on ignition or sulfated ash determination',
        'Specific gravity, pH, and refractive index measurements',
        'Assay determination using titration or instrumental analysis',
        'Certificate of Analysis generation against FCC monograph specifications'
      ],
      keyParameters: [
        'Identity: Must match FCC monograph specifications',
        'Purity: Minimum percentage of active ingredient',
        'Heavy Metals: Typically less than 10-20 ppm',
        'Arsenic: Usually less than 3 ppm',
        'Lead: Typically less than 2 ppm'
      ],
      duration: '2-4 weeks depending on the complexity of the ingredient and required tests'
    },
    {
      id: 'ep',
      name: 'EP',
      title: 'Extraction Procedure Toxicity Test',
      icon: <FlaskConical size={28} />,
      overview: 'The Extraction Procedure (EP) Toxicity Test, now largely replaced by TCLP (Toxicity Characteristic Leaching Procedure), determines if waste exhibits the characteristic of toxicity. It simulates landfill leaching conditions.',
      usage: [
        'Hazardous waste characterization and classification',
        'Determination of proper waste disposal methods',
        'Environmental compliance for solid waste management',
        'Soil contamination assessment',
        'Leachability testing of industrial byproducts'
      ],
      procedure: [
        'Waste sample collection using approved sampling protocols',
        'Sample preparation including drying and size reduction to pass 9.5mm sieve',
        'Solid-liquid ratio determination at 1:16 weight-to-volume',
        'Extraction fluid selection based on waste alkalinity using 0.5N acetic acid',
        'pH adjustment to 5.0 if necessary',
        'Continuous agitation extraction for 24 hours at room temperature',
        'Filtration through 0.45 micron filter under pressure',
        'Extract preservation with nitric acid for metals analysis',
        'Analysis via atomic absorption, ICP, or other approved methods',
        'Testing for regulatory metals including arsenic, barium, cadmium, chromium, lead, mercury, selenium, and silver',
        'Comparison of results against regulatory thresholds',
        'Waste classification determination and disposal recommendations'
      ],
      keyParameters: [
        'Arsenic: Regulatory level 5.0 mg/L',
        'Barium: Regulatory level 100.0 mg/L',
        'Cadmium: Regulatory level 1.0 mg/L',
        'Chromium: Regulatory level 5.0 mg/L',
        'Lead: Regulatory level 5.0 mg/L',
        'Mercury: Regulatory level 0.2 mg/L',
        'Selenium: Regulatory level 1.0 mg/L',
        'Silver: Regulatory level 5.0 mg/L'
      ],
      duration: '3-5 days including extraction time and analytical procedures'
    }
  ];

  const toggleTest = (testId) => {
    setActiveTest(activeTest === testId ? null : testId);
  };

  return (
    <div className="container">
      <style>{`
        * {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
        }

        body {
          font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Helvetica', 'Arial', sans-serif;
          background: #f5f5f5;
          color: #2c3e50;
          line-height: 1.6;
        }

        .container {
          max-width: 1200px;
          margin: 0 auto;
          background: #ffffff;
          min-height: 100vh;
        }

        .header {
          background: #ffffff;
          padding: 50px 40px;
          border-bottom: 4px solid #8dc63f;
        }

        .header h1 {
          font-size: 2.5rem;
          color: #2c3e50;
          margin-bottom: 10px;
          font-weight: 600;
        }

        .header p {
          font-size: 1.1rem;
          color: #7f8c8d;
          font-weight: 400;
        }

        .tests-wrapper {
          padding: 40px;
        }

        .tests-grid {
          display: grid;
          gap: 20px;
        }

        .test-card {
          background: #ffffff;
          border: 1px solid #e0e0e0;
          border-radius: 8px;
          overflow: hidden;
          transition: all 0.4s ease;
          opacity: 0;
          transform: translateY(30px);
        }

        .test-card.visible {
          opacity: 1;
          transform: translateY(0);
        }

        .test-card:hover {
          box-shadow: 0 8px 24px rgba(141, 198, 63, 0.15);
          transform: translateY(-4px);
          border-color: #8dc63f;
        }

        .test-header {
          padding: 24px 28px;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: space-between;
          background: #fafafa;
          border-bottom: 1px solid #e0e0e0;
          transition: background 0.2s ease;
        }

        .test-header:hover {
          background: #f5f5f5;
        }

        .test-header-left {
          display: flex;
          align-items: center;
          gap: 20px;
        }

        .test-icon {
          width: 50px;
          height: 50px;
          background: #8dc63f;
          display: flex;
          align-items: center;
          justify-content: center;
          color: #ffffff;
          border-radius: 6px;
          flex-shrink: 0;
          transition: all 0.3s ease;
        }

        .test-card:hover .test-icon {
          transform: scale(1.1) rotate(5deg);
          box-shadow: 0 4px 12px rgba(141, 198, 63, 0.4);
        }

        .test-title-section h2 {
          font-size: 1.5rem;
          margin-bottom: 4px;
          color: #2c3e50;
          font-weight: 600;
        }

        .test-title-section p {
          color: #7f8c8d;
          font-size: 0.95rem;
          font-weight: 400;
        }

        .toggle-icon {
          transition: transform 0.3s ease;
          color: #7f8c8d;
          flex-shrink: 0;
        }

        .toggle-icon.active {
          transform: rotate(180deg);
        }

        .test-content {
          max-height: 0;
          overflow: hidden;
          transition: max-height 0.4s ease;
        }

        .test-content.active {
          max-height: 6000px;
        }

        .test-content-inner {
          padding: 32px 28px;
        }

        .section {
          margin-bottom: 32px;
        }

        .section:last-child {
          margin-bottom: 0;
        }

        .section-title {
          font-size: 1.15rem;
          color: #2c3e50;
          margin-bottom: 16px;
          font-weight: 600;
          padding-bottom: 8px;
          border-bottom: 2px solid #8dc63f;
        }

        .section-content {
          color: #555555;
          line-height: 1.7;
          font-size: 0.95rem;
        }

        .list {
          list-style: none;
          padding: 0;
        }

        .list li {
          padding: 14px 16px 14px 36px;
          position: relative;
          margin-bottom: 8px;
          background: #fafafa;
          border-left: 3px solid #8dc63f;
          color: #555555;
          font-size: 0.95rem;
          line-height: 1.6;
          transition: all 0.3s ease;
        }

        .list li:hover {
          background: #f0f9e8;
          transform: translateX(8px);
          border-left-width: 5px;
          box-shadow: 0 2px 8px rgba(141, 198, 63, 0.1);
        }

        .list li:before {
          content: "•";
          position: absolute;
          left: 16px;
          color: #8dc63f;
          font-weight: bold;
          font-size: 1.2rem;
        }

        .parameters-grid {
          display: grid;
          gap: 12px;
          margin-top: 16px;
        }

        .parameter-item {
          padding: 16px;
          background: #fafafa;
          color: #2c3e50;
          border-left: 3px solid #8dc63f;
          font-size: 0.95rem;
          line-height: 1.6;
          transition: all 0.3s ease;
        }

        .parameter-item:hover {
          background: #f0f9e8;
          transform: translateX(8px);
          border-left-width: 5px;
          box-shadow: 0 2px 8px rgba(141, 198, 63, 0.1);
        }

        .duration-badge {
          display: inline-block;
          padding: 12px 24px;
          background: #8dc63f;
          color: #ffffff;
          font-weight: 500;
          margin-top: 12px;
          font-size: 0.95rem;
          border-radius: 4px;
        }

        @media (max-width: 768px) {
          .header {
            padding: 30px 20px;
          }

          .header h1 {
            font-size: 1.8rem;
          }

          .header p {
            font-size: 1rem;
          }

          .tests-wrapper {
            padding: 20px;
          }

          .test-header {
            padding: 20px;
          }

          .test-header-left {
            gap: 15px;
          }

          .test-icon {
            width: 45px;
            height: 45px;
          }

          .test-title-section h2 {
            font-size: 1.25rem;
          }

          .test-content-inner {
            padding: 24px 20px;
          }

          .section-title {
            font-size: 1.05rem;
          }

          .section-content,
          .list li,
          .parameter-item {
            font-size: 0.9rem;
          }
        }
      `}</style>

      <div className="header">
        <h1>Laboratory Test Methods</h1>
        <p>Industry-standard testing procedures and compliance requirements</p>
      </div>

      <div className="tests-wrapper">
        <div className="tests-grid">
          {tests.map((test, index) => (
            <div 
              key={test.id} 
              className={`test-card ${visibleCards.includes(index) ? 'visible' : ''}`}
              ref={(el) => (cardRefs.current[index] = el)}
              style={{ transitionDelay: `${index * 0.1}s` }}
            >
              <div className="test-header" onClick={() => toggleTest(test.id)}>
                <div className="test-header-left">
                  <div className="test-icon">
                    {test.icon}
                  </div>
                  <div className="test-title-section">
                    <h2>{test.name}</h2>
                    <p>{test.title}</p>
                  </div>
                </div>
                <div className={`toggle-icon ${activeTest === test.id ? 'active' : ''}`}>
                  {activeTest === test.id ? <ChevronUp size={24} /> : <ChevronDown size={24} />}
                </div>
              </div>

              <div className={`test-content ${activeTest === test.id ? 'active' : ''}`}>
                <div className="test-content-inner">
                  <div className="section">
                    <h3 className="section-title">Overview</h3>
                    <p className="section-content">{test.overview}</p>
                  </div>

                  <div className="section">
                    <h3 className="section-title">Usage and Applications</h3>
                    <ul className="list">
                      {test.usage.map((item, index) => (
                        <li key={index}>{item}</li>
                      ))}
                    </ul>
                  </div>

                  <div className="section">
                    <h3 className="section-title">Testing Procedure</h3>
                    <ul className="list">
                      {test.procedure.map((step, index) => (
                        <li key={index}>{step}</li>
                      ))}
                    </ul>
                  </div>

                  <div className="section">
                    <h3 className="section-title">Key Parameters and Standards</h3>
                    <div className="parameters-grid">
                      {test.keyParameters.map((param, index) => (
                        <div key={index} className="parameter-item">
                          {param}
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="section">
                    <h3 className="section-title">Testing Duration</h3>
                    <p className="section-content">
                      <span className="duration-badge">{test.duration}</span>
                    </p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default LabTestsInfo;