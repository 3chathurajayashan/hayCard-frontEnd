 import React, { useState } from 'react';
import { Search, AlertTriangle, Shield, Droplet, Wind, Eye, Users, Home } from 'lucide-react';

const ElementGuidelines = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedElement, setSelectedElement] = useState(null);

  const elementData = {
    hydrogen: { name: 'Hydrogen', symbol: 'H', hazardLevel: 'High', guidelines: ['Extremely flammable gas - keep away from ignition sources', 'Store cylinders in well-ventilated, cool areas away from oxidizers', 'Use only non-sparking tools and explosion-proof equipment', 'Ensure proper grounding of all equipment to prevent static discharge', 'Monitor for leaks using soap solution, never use flames', 'Maintain adequate ventilation to prevent accumulation', 'Wear safety goggles and flame-resistant clothing', 'Keep fire extinguishers readily available'], videos: [{ id: 'yBLdQ1a4-JI', title: 'Hydrogen Gas Safety in Laboratory' }, { id: 'RQmqcaS5LIM', title: 'Handling Flammable Gases Safely' }] },
    helium: { name: 'Helium', symbol: 'He', hazardLevel: 'Low', guidelines: ['Non-toxic and non-flammable, generally safe to handle', 'Store cylinders upright and secured to prevent tipping', 'Use in well-ventilated areas to prevent asphyxiation risk', 'Never inhale helium intentionally - can cause oxygen deprivation', 'Wear safety goggles when working with pressurized cylinders', 'Check regulators and connections for proper sealing', 'Keep cylinders away from heat sources', 'Follow proper cylinder handling and transport procedures'], videos: [{ id: 'RQmqcaS5LIM', title: 'Inert Gas Handling Procedures' }] },
    lithium: { name: 'Lithium', symbol: 'Li', hazardLevel: 'Extreme', guidelines: ['Store under mineral oil or in an inert atmosphere (argon)', 'Never expose to water - violent reaction will occur', 'Use in a dry, inert atmosphere glove box when possible', 'Wear thermal-resistant gloves, face shield, and lab coat', 'Keep Class D fire extinguisher nearby (for metal fires)', 'Cut only small pieces and handle with dry forceps', 'Dispose of waste lithium by careful reaction with alcohol', 'Ensure no moisture in containers or work area'], videos: [{ id: 'ODf_sPexS2Q', title: 'Lithium Handling Safety Protocols' }] },
    beryllium: { name: 'Beryllium', symbol: 'Be', hazardLevel: 'Extreme', guidelines: ['Highly toxic - causes chronic beryllium disease', 'Always work in a certified fume hood with HEPA filtration', 'Wear full PPE including respirator, gloves, and protective clothing', 'Never generate dust or fumes', 'Maximum exposure limit: 0.2 μg/m³ (8-hour TWA)', 'Implement medical surveillance program for exposed workers', 'Clean work areas with HEPA vacuums only', 'Dispose only through specialized hazardous waste channels'], videos: [{ id: 'RQmqcaS5LIM', title: 'Beryllium Safety and Handling' }] },
    boron: { name: 'Boron', symbol: 'B', hazardLevel: 'Low', guidelines: ['Generally safe in elemental form, avoid inhalation of dust', 'Wear safety goggles, gloves, and lab coat', 'Use in well-ventilated area when heating', 'Boron compounds may be more hazardous - check SDS', 'Avoid skin contact with boron compounds', 'Store in cool, dry place away from oxidizers', 'Clean up spills promptly to prevent dust formation', 'Wash hands thoroughly after handling'], videos: [{ id: 'RQmqcaS5LIM', title: 'Metalloid Handling in the Lab' }] },
    carbon: { name: 'Carbon', symbol: 'C', hazardLevel: 'Low', guidelines: ['Generally safe to handle in solid form', 'Wear basic PPE: gloves, safety goggles, and lab coat', 'Avoid inhalation of carbon dust or powder', 'Ensure adequate ventilation when heating carbon compounds', 'Carbon monoxide hazard: use gas detectors when burning carbon', 'Store in a cool, dry place away from oxidizing agents', 'Activated carbon is non-toxic but avoid dust inhalation', 'Clean up spills promptly to prevent slipping hazards'], videos: [{ id: 'RQmqcaS5LIM', title: 'Working Safely with Carbon Materials' }] },
    nitrogen: { name: 'Nitrogen', symbol: 'N', hazardLevel: 'Medium', guidelines: ['Asphyxiation hazard in enclosed spaces - ensure ventilation', 'Liquid nitrogen causes severe frostbite - wear insulated gloves', 'Use face shield when pouring liquid nitrogen', 'Never seal liquid nitrogen in a closed container', 'Store dewars in well-ventilated areas', 'Allow warmed equipment to reach room temperature gradually', 'Ensure oxygen monitors are installed in storage areas', 'Handle with tongs or insulated gloves at all times'], videos: [{ id: 'T39RLN7PLfg', title: 'Liquid Nitrogen Safety Training' }] },
    oxygen: { name: 'Oxygen', symbol: 'O', hazardLevel: 'High', guidelines: ['Strong oxidizer - keep away from flammable materials', 'Never use oil or grease on oxygen equipment', 'Store cylinders away from combustibles and fuel gases', 'Enriched oxygen atmospheres increase fire risk dramatically', 'Use oxygen-compatible materials for all fittings', 'Never smoke or allow flames near oxygen sources', 'Ensure proper ventilation to prevent oxygen enrichment', 'Check for leaks with soapy water, never with flames'], videos: [{ id: 'RQmqcaS5LIM', title: 'Oxygen Safety in the Laboratory' }] },
    fluorine: { name: 'Fluorine', symbol: 'F', hazardLevel: 'Extreme', guidelines: ['Extremely toxic and reactive - handle only in specialized facilities', 'Use specialized equipment made of nickel or Monel alloys', 'Work only in certified fume hood with HF scrubber', 'Wear full chemical-resistant suit and supplied-air respirator', 'Keep calcium gluconate gel available for HF burns', 'Maximum exposure: 0.1 ppm (8-hour TWA)', 'Never work alone when handling fluorine', 'Emergency procedures must be rehearsed regularly'], videos: [{ id: 'RQmqcaS5LIM', title: 'Fluorine Gas Handling Protocols' }] },
    neon: { name: 'Neon', symbol: 'Ne', hazardLevel: 'Low', guidelines: ['Inert gas - minimal hazards under normal conditions', 'Asphyxiation risk in confined spaces without ventilation', 'Store cylinders properly secured and upright', 'Wear safety goggles when handling compressed gas', 'Ensure adequate ventilation in work areas', 'Check cylinder pressure regularly', 'Use proper regulators and pressure gauges', 'Follow standard compressed gas handling procedures'], videos: [{ id: 'RQmqcaS5LIM', title: 'Noble Gas Handling Safety' }] },
    sodium: { name: 'Sodium', symbol: 'Na', hazardLevel: 'Extreme', guidelines: ['Store under mineral oil or kerosene at all times', 'Handle with dry forceps - never touch with bare hands', 'Keep away from water and moisture - explosive reaction', 'Work behind a safety shield in a fume hood', 'Wear safety goggles, face shield, and fire-resistant lab coat', 'Have Class D fire extinguisher readily available', 'Cut small pieces using a clean, dry knife', 'Neutralize waste by slow addition to ethanol or isopropanol'], videos: [{ id: 'ODf_sPexS2Q', title: 'Sodium Metal: Safe Handling Techniques' }] },
    magnesium: { name: 'Magnesium', symbol: 'Mg', hazardLevel: 'High', guidelines: ['Flammable metal - keep away from ignition sources', 'Magnesium fires cannot be extinguished with water', 'Use Class D fire extinguisher for magnesium fires', 'Avoid generating dust or fine particles', 'Store in cool, dry place away from oxidizers', 'Wear safety goggles and non-synthetic clothing', 'Use non-sparking tools when handling', 'Sand or dry powder for spill cleanup, never water'], videos: [{ id: 'RQmqcaS5LIM', title: 'Magnesium Safety in the Laboratory' }] },
    aluminum: { name: 'Aluminum', symbol: 'Al', hazardLevel: 'Low', guidelines: ['Generally safe in bulk form', 'Aluminum powder is flammable - avoid ignition sources', 'Wear basic PPE: safety goggles, gloves, and lab coat', 'Avoid inhalation of aluminum dust', 'Do not mix aluminum powder with oxidizers', 'Store powdered aluminum in sealed, grounded containers', 'Use in well-ventilated areas', 'Keep away from acids and bases in powder form'], videos: [{ id: 'RQmqcaS5LIM', title: 'Aluminum Handling in the Lab' }] },
    silicon: { name: 'Silicon', symbol: 'Si', hazardLevel: 'Low', guidelines: ['Generally safe to handle in solid form', 'Silicon dust may irritate respiratory system', 'Wear dust mask when grinding or cutting silicon', 'Use safety goggles to prevent eye irritation', 'Ensure good ventilation when processing', 'Store in dry conditions', 'Handle silicon wafers carefully - sharp edges', 'Follow standard laboratory safety procedures'], videos: [{ id: 'RQmqcaS5LIM', title: 'Silicon and Semiconductor Safety' }] },
    phosphorus: { name: 'Phosphorus', symbol: 'P', hazardLevel: 'Extreme', guidelines: ['White phosphorus: extremely toxic and spontaneously flammable', 'Store white phosphorus under water at all times', 'Red phosphorus: less reactive but still hazardous', 'Work in fume hood with fire suppression nearby', 'Wear full PPE including face shield and thermal gloves', 'Never allow white phosphorus to dry out', 'Burns cause severe tissue damage - seek immediate medical care', 'Dispose through certified hazardous waste only'], videos: [{ id: 'RQmqcaS5LIM', title: 'Phosphorus Allotrope Safety' }] },
    sulfur: { name: 'Sulfur', symbol: 'S', hazardLevel: 'Low', guidelines: ['Combustible solid - keep away from ignition sources', 'Sulfur dust can form explosive mixtures with air', 'Use in well-ventilated area to avoid SO2 fumes', 'Wear safety goggles, gloves, and lab coat', 'Avoid generating dust clouds', 'Store in cool, dry place away from oxidizers', 'Ground all equipment to prevent static buildup', 'Clean up spills carefully to prevent dust formation'], videos: [{ id: 'RQmqcaS5LIM', title: 'Sulfur Handling and Storage' }] },
    chlorine: { name: 'Chlorine', symbol: 'Cl', hazardLevel: 'Extreme', guidelines: ['Use only in a certified fume hood with adequate ventilation', 'Wear respirator approved for chlorine gas', 'Use gas-tight goggles and rubber gloves', 'Store cylinders upright in a cool, well-ventilated area', 'Never mix with ammonia or other incompatible chemicals', 'Maximum exposure: 0.5 ppm (15-minute exposure limit)', 'Install chlorine gas detector in work area', 'Have emergency neutralizing agent (sodium thiosulfate) available'], videos: [{ id: 'RQmqcaS5LIM', title: 'Chlorine Gas Safety Procedures' }] },
    argon: { name: 'Argon', symbol: 'Ar', hazardLevel: 'Low', guidelines: ['Inert gas - primary hazard is asphyxiation', 'Ensure adequate ventilation in all work areas', 'Install oxygen monitors in storage and use areas', 'Store cylinders properly secured and upright', 'Wear safety goggles when handling compressed gas', 'Check regulators and connections regularly', 'Use proper cylinder handling equipment', 'Never work in confined spaces without ventilation'], videos: [{ id: 'RQmqcaS5LIM', title: 'Argon Gas Safety Training' }] },
    potassium: { name: 'Potassium', symbol: 'K', hazardLevel: 'Extreme', guidelines: ['Store under mineral oil - extremely reactive with water', 'More reactive than sodium - handle with extreme caution', 'Use only in inert atmosphere or under oil', 'Wear face shield, thermal gloves, and fire-resistant clothing', 'Have Class D fire extinguisher immediately available', 'Work behind safety shield in fume hood', 'Cut only tiny pieces with dry, clean knife', 'Dispose by slow reaction with t-butanol'], videos: [{ id: 'ODf_sPexS2Q', title: 'Potassium Metal Safety Protocols' }] },
    calcium: { name: 'Calcium', symbol: 'Ca', hazardLevel: 'High', guidelines: ['Reactive with water - produces flammable hydrogen gas', 'Store under mineral oil or in inert atmosphere', 'Wear safety goggles, gloves, and lab coat', 'Keep away from moisture and oxidizers', 'Use in well-ventilated fume hood', 'Have fire extinguisher nearby', 'Handle with dry forceps or tools', 'Dispose properly through hazardous waste channels'], videos: [{ id: 'RQmqcaS5LIM', title: 'Calcium Metal Handling' }] },
    scandium: { name: 'Scandium', symbol: 'Sc', hazardLevel: 'Low', guidelines: ['Low toxicity but avoid inhalation of dust', 'Scandium powder may be flammable', 'Wear safety goggles, gloves, and lab coat', 'Use in well-ventilated area', 'Store in cool, dry place', 'Avoid contact with strong acids', 'Handle powder forms carefully to prevent dust', 'Follow standard laboratory safety procedures'], videos: [{ id: 'RQmqcaS5LIM', title: 'Rare Earth Metal Safety' }] },
    titanium: { name: 'Titanium', symbol: 'Ti', hazardLevel: 'Low', guidelines: ['Generally safe in bulk form', 'Titanium powder is flammable - keep from ignition sources', 'Wear safety goggles and gloves', 'Avoid inhalation of titanium dust', 'Store powder in grounded, sealed containers', 'Use in well-ventilated areas', 'Keep away from strong oxidizers', 'Use non-sparking tools with powder'], videos: [{ id: 'RQmqcaS5LIM', title: 'Titanium Laboratory Safety' }] },
    vanadium: { name: 'Vanadium', symbol: 'V', hazardLevel: 'Medium', guidelines: ['Toxic if inhaled or ingested', 'Wear respiratory protection when handling powder', 'Use safety goggles, gloves, and lab coat', 'Work in well-ventilated fume hood', 'Avoid skin contact and inhalation', 'Store in sealed containers', 'Maximum exposure: 0.05 mg/m³ (respirable dust)', 'Wash hands thoroughly after handling'], videos: [{ id: 'RQmqcaS5LIM', title: 'Vanadium Compound Safety' }] },
    chromium: { name: 'Chromium', symbol: 'Cr', hazardLevel: 'High', guidelines: ['Hexavalent chromium (Cr VI) is highly toxic and carcinogenic', 'Always work in fume hood with adequate ventilation', 'Wear nitrile gloves, safety goggles, and lab coat', 'Use respiratory protection for dust or fumes', 'Maximum exposure Cr(VI): 0.005 mg/m³ (8-hour TWA)', 'Never heat chromium compounds without proper controls', 'Dispose through certified hazardous waste only', 'Regular medical monitoring for exposed workers'], videos: [{ id: 'RQmqcaS5LIM', title: 'Chromium Safety and Toxicity' }] },
    manganese: { name: 'Manganese', symbol: 'Mn', hazardLevel: 'Medium', guidelines: ['Toxic if inhaled - affects nervous system', 'Wear respiratory protection when handling powder or fumes', 'Use in well-ventilated fume hood', 'Wear safety goggles, gloves, and protective clothing', 'Maximum exposure: 0.2 mg/m³ (respirable fraction)', 'Avoid chronic exposure - causes manganism', 'Store in sealed containers', 'Medical monitoring recommended for regular users'], videos: [{ id: 'RQmqcaS5LIM', title: 'Manganese Exposure Prevention' }] },
    iron: { name: 'Iron', symbol: 'Fe', hazardLevel: 'Low', guidelines: ['Generally safe to handle in bulk form', 'Iron powder may be flammable when finely divided', 'Wear basic PPE: safety goggles, gloves, and lab coat', 'Use in ventilated area when heating', 'Store powder away from oxidizers', 'Ground containers to prevent static buildup', 'Clean up spills to prevent rust staining', 'Follow standard laboratory safety procedures'], videos: [{ id: 'RQmqcaS5LIM', title: 'Iron and Steel Laboratory Safety' }] },
    cobalt: { name: 'Cobalt', symbol: 'Co', hazardLevel: 'High', guidelines: ['Toxic and suspected carcinogen', 'Wear respiratory protection for dust and fumes', 'Use in fume hood with adequate ventilation', 'Wear nitrile gloves and safety goggles', 'Maximum exposure: 0.02 mg/m³ (8-hour TWA)', 'Avoid skin contact - may cause allergic reactions', 'Store in sealed containers', 'Dispose through hazardous waste channels'], videos: [{ id: 'RQmqcaS5LIM', title: 'Cobalt Safety in the Laboratory' }] },
    nickel: { name: 'Nickel', symbol: 'Ni', hazardLevel: 'High', guidelines: ['Known carcinogen and common allergen', 'Wear nitrile gloves to prevent skin contact', 'Use respiratory protection for dust and fumes', 'Work in fume hood when heating nickel', 'Maximum exposure: 1.5 mg/m³ (inhalable fraction)', 'Avoid chronic exposure - causes cancer', 'Many people develop nickel allergy', 'Medical monitoring for regularly exposed workers'], videos: [{ id: 'RQmqcaS5LIM', title: 'Nickel Allergy and Safety' }] },
    copper: { name: 'Copper', symbol: 'Cu', hazardLevel: 'Low', guidelines: ['Generally safe to handle in solid form', 'Copper dust may irritate respiratory system', 'Wear safety goggles, gloves, and lab coat', 'Use ventilation when heating copper', 'Some copper compounds are toxic - check SDS', 'Store in dry conditions to prevent corrosion', 'Wash hands after handling', 'Follow standard laboratory procedures'], videos: [{ id: 'RQmqcaS5LIM', title: 'Copper Metal Laboratory Safety' }] },
    zinc: { name: 'Zinc', symbol: 'Zn', hazardLevel: 'Low', guidelines: ['Generally safe but fumes can cause metal fume fever', 'Use fume hood when heating zinc', 'Wear safety goggles, gloves, and lab coat', 'Zinc powder is flammable - keep from ignition', 'Avoid inhalation of zinc oxide fumes', 'Store powder in sealed, grounded containers', 'Provide adequate ventilation', 'Symptoms of metal fume fever: flu-like, temporary'], videos: [{ id: 'RQmqcaS5LIM', title: 'Zinc Safety and Metal Fume Fever' }] },
    gallium: { name: 'Gallium', symbol: 'Ga', hazardLevel: 'Low', guidelines: ['Low toxicity but avoid ingestion', 'Melts slightly above room temperature (29.76°C)', 'Wear gloves - can stain skin', 'Do not store in glass - gallium expands when solidifying', 'Use safety goggles and lab coat', 'Clean spills promptly - slippery when melted', 'Store in plastic containers', 'Handle with care to avoid skin contact'], videos: [{ id: 'RQmqcaS5LIM', title: 'Gallium Properties and Safety' }] },
    germanium: { name: 'Germanium', symbol: 'Ge', hazardLevel: 'Low', guidelines: ['Low toxicity in elemental form', 'Some germanium compounds are toxic - check SDS', 'Wear safety goggles, gloves, and lab coat', 'Avoid inhalation of germanium dust', 'Use in well-ventilated area', 'Store in cool, dry place', 'Handle with standard laboratory precautions', 'Wash hands after handling'], videos: [{ id: 'RQmqcaS5LIM', title: 'Germanium Laboratory Safety' }] },
    arsenic: { name: 'Arsenic', symbol: 'As', hazardLevel: 'Extreme', guidelines: ['Always work in a fume hood with proper ventilation', 'Wear nitrile gloves, lab coat, and safety goggles at all times', 'Use a respirator mask rated for toxic dust and fumes', 'Never ingest, inhale, or allow skin contact', 'Store in a locked cabinet with clear hazard labeling', 'Dispose only through certified hazardous waste channels', 'Maximum exposure limit: 0.01 mg/m³ (8-hour TWA)', 'Have emergency shower and eyewash station nearby'], videos: [{ id: 'RQmqcaS5LIM', title: 'Arsenic Safety Procedures in Laboratory' }] },
    selenium: { name: 'Selenium', symbol: 'Se', hazardLevel: 'High', guidelines: ['Toxic by inhalation and ingestion', 'Work in fume hood with adequate ventilation', 'Wear nitrile gloves, safety goggles, and lab coat', 'Avoid generating dust or fumes', 'Maximum exposure: 0.2 mg/m³ (8-hour TWA)', 'Characteristic garlic odor indicates overexposure', 'Store in sealed containers away from acids', 'Dispose through hazardous waste channels'], videos: [{ id: 'RQmqcaS5LIM', title: 'Selenium Safety and Handling' }] },
    bromine: { name: 'Bromine', symbol: 'Br', hazardLevel: 'Extreme', guidelines: ['Highly corrosive and toxic liquid', 'Always use in fume hood with excellent ventilation', 'Wear full face shield, double nitrile gloves, and apron', 'Causes severe burns on contact', 'Maximum exposure: 0.1 ppm (8-hour TWA)', 'Keep sodium thiosulfate solution available for spills', 'Store in sealed, unbreakable containers', 'Never work alone when handling bromine'], videos: [{ id: 'RQmqcaS5LIM', title: 'Bromine Handling Safety' }] },
    krypton: { name: 'Krypton', symbol: 'Kr', hazardLevel: 'Low', guidelines: ['Inert gas - minimal hazards', 'Asphyxiation risk in confined spaces', 'Store cylinders properly secured', 'Wear safety goggles when handling compressed gas', 'Ensure adequate ventilation', 'Check cylinder pressure regularly', 'Use proper regulators', 'Follow standard gas cylinder procedures'], videos: [{ id: 'RQmqcaS5LIM', title: 'Noble Gas Safety' }] },
    rubidium: { name: 'Rubidium', symbol: 'Rb', hazardLevel: 'Extreme', guidelines: ['Extremely reactive alkali metal', 'Store under mineral oil in sealed ampules', 'More reactive than potassium', 'Handle only in inert atmosphere glove box', 'Wear full face shield and thermal gloves', 'Reacts violently with water', 'Keep Class D fire extinguisher available', 'Dispose through specialized channels'], videos: [{ id: 'ODf_sPexS2Q', title: 'Rubidium Safety Protocols' }] },
    strontium: { name: 'Strontium', symbol: 'Sr', hazardLevel: 'High', guidelines: ['Reactive with water and air', 'Store under mineral oil or kerosene', 'Wear safety goggles, gloves, and lab coat', 'Handle in well-ventilated fume hood', 'Keep away from moisture', 'Use dry tools and forceps', 'Have fire extinguisher nearby', 'Strontium-90 is radioactive - special precautions'], videos: [{ id: 'RQmqcaS5LIM', title: 'Alkaline Earth Metal Safety' }] },
    yttrium: { name: 'Yttrium', symbol: 'Y', hazardLevel: 'Low', guidelines: ['Low toxicity but powder is flammable', 'Wear safety goggles, gloves, and lab coat', 'Avoid inhalation of yttrium dust', 'Store powder in sealed containers', 'Use in well-ventilated area', 'Keep away from ignition sources', 'Handle with standard precautions', 'Some compounds may be more hazardous'], videos: [{ id: 'RQmqcaS5LIM', title: 'Rare Earth Element Safety' }] },
    zirconium: { name: 'Zirconium', symbol: 'Zr', hazardLevel: 'Medium', guidelines: ['Powder is highly flammable and pyrophoric', 'Store powder under inert atmosphere', 'Bulk metal is safe to handle', 'Wear safety goggles and gloves', 'Keep powder away from ignition sources', 'Use non-sparking tools', 'Work in well-ventilated area', 'Have Class D fire extinguisher available'], videos: [{ id: 'RQmqcaS5LIM', title: 'Zirconium Safety and Handling' }] },
    niobium: { name: 'Niobium', symbol: 'Nb', hazardLevel: 'Low', guidelines: ['Generally safe in bulk form', 'Powder may be flammable', 'Wear basic PPE when handling', 'Avoid inhalation of dust', 'Store in dry conditions', 'Use ventilation when processing', 'Low toxicity overall', 'Follow standard laboratory procedures'], videos: [{ id: 'RQmqcaS5LIM', title: 'Transition Metal Safety' }] },
    molybdenum: { name: 'Molybdenum', symbol: 'Mo', hazardLevel: 'Low', guidelines: ['Low toxicity in elemental form', 'Some compounds are more toxic', 'Wear safety goggles, gloves, and lab coat', 'Avoid inhalation of molybdenum dust', 'Use in well-ventilated area', 'Store in cool, dry place', 'Check SDS for specific compounds', 'Standard laboratory precautions apply'], videos: [{ id: 'RQmqcaS5LIM', title: 'Molybdenum Laboratory Safety' }] },
    technetium: { name: 'Technetium', symbol: 'Tc', hazardLevel: 'Extreme', guidelines: ['Radioactive element - all isotopes', 'Handle only in licensed radiological facility', 'Wear dosimetry badge at all times', 'Use shielding appropriate for beta/gamma radiation', 'Work behind lead shielding', 'Monitor contamination regularly', 'Follow NRC regulations strictly', 'Dispose through radioactive waste program'], videos: [{ id: 'RQmqcaS5LIM', title: 'Radioactive Material Safety' }] },
    ruthenium: { name: 'Ruthenium', symbol: 'Ru', hazardLevel: 'Medium', guidelines: ['Some compounds are toxic', 'Wear nitrile gloves and safety goggles', 'Use fume hood when heating', 'Ruthenium tetroxide is highly toxic and volatile', 'Store in sealed containers', 'Avoid skin contact and inhalation', 'Check SDS for specific compounds', 'Dispose through proper channels'], videos: [{ id: 'RQmqcaS5LIM', title: 'Platinum Group Metal Safety' }] },
    rhodium: { name: 'Rhodium', symbol: 'Rh', hazardLevel: 'Medium', guidelines: ['Some compounds cause allergic reactions', 'Wear gloves to prevent skin sensitization', 'Use safety goggles and lab coat', 'Work in ventilated area', 'Avoid inhalation of rhodium dust', 'Store properly sealed', 'Some rhodium compounds are carcinogenic', 'Medical monitoring for exposed workers'], videos: [{ id: 'RQmqcaS5LIM', title: 'Precious Metal Safety' }] },
    palladium: { name: 'Palladium', symbol: 'Pd', hazardLevel: 'Medium', guidelines: ['Can cause allergic reactions', 'Wear nitrile gloves and safety goggles', 'Avoid skin contact with compounds', 'Use fume hood when heating', 'Some compounds are toxic', 'Store in sealed containers', 'Monitor for skin sensitization', 'Follow standard precious metal procedures'], videos: [{ id: 'RQmqcaS5LIM', title: 'Palladium Handling Safety' }] },
    silver: { name: 'Silver', symbol: 'Ag', hazardLevel: 'Low', guidelines: ['Generally safe in metallic form', 'Silver compounds may be more toxic', 'Wear gloves to prevent argyria (skin discoloration)', 'Use safety goggles and lab coat', 'Silver nitrate is corrosive', 'Store away from light', 'Avoid prolonged skin contact', 'Dispose of compounds properly'], videos: [{ id: 'RQmqcaS5LIM', title: 'Silver Metal Safety' }] },
    cadmium: { name: 'Cadmium', symbol: 'Cd', hazardLevel: 'Extreme', guidelines: ['Highly toxic heavy metal and carcinogen', 'Never heat without excellent fume hood ventilation', 'Wear respirator for dust or fumes', 'Use nitrile gloves and full PPE', 'Maximum exposure: 0.005 mg/m³ (8-hour TWA)', 'Causes kidney damage and cancer', 'Medical monitoring required', 'Dispose only through hazardous waste'], videos: [{ id: 'RQmqcaS5LIM', title: 'Cadmium Toxicity and Safety' }] },
    indium: { name: 'Indium', symbol: 'In', hazardLevel: 'Medium', guidelines: ['Moderate toxicity', 'Wear safety goggles, gloves, and lab coat', 'Avoid inhalation of indium dust', 'Some compounds cause lung damage', 'Use in well-ventilated area', 'Store in sealed containers', 'Maximum exposure: 0.1 mg/m³', 'Check SDS for specific compounds'], videos: [{ id: 'RQmqcaS5LIM', title: 'Indium Safety Guidelines' }] },
    tin: { name: 'Tin', symbol: 'Sn', hazardLevel: 'Low', guidelines: ['Generally safe in metallic form', 'Organotin compounds are highly toxic', 'Wear gloves and safety goggles', 'Use fume hood for organotin work', 'Avoid inhalation of tin dust', 'Store in cool, dry place', 'Some tin compounds affect nervous system', 'Check SDS for specific compounds'], videos: [{ id: 'RQmqcaS5LIM', title: 'Tin Metal Safety' }] },
    antimony: { name: 'Antimony', symbol: 'Sb', hazardLevel: 'High', guidelines: ['Toxic heavy metal', 'Wear respiratory protection for dust', 'Use nitrile gloves and safety goggles', 'Work in fume hood when heating', 'Stibine gas is extremely toxic', 'Maximum exposure: 0.5 mg/m³', 'Store in sealed containers', 'Dispose through hazardous waste'], videos: [{ id: 'RQmqcaS5LIM', title: 'Antimony Safety' }] },
    tellurium: { name: 'Tellurium', symbol: 'Te', hazardLevel: 'High', guidelines: ['Toxic element', 'Causes garlic breath odor', 'Wear gloves and safety goggles', 'Use fume hood with good ventilation', 'Avoid skin contact and inhalation', 'Maximum exposure: 0.1 mg/m³', 'Store in sealed containers', 'Some compounds are more toxic'], videos: [{ id: 'RQmqcaS5LIM', title: 'Tellurium Handling' }] },
    iodine: { name: 'Iodine', symbol: 'I', hazardLevel: 'High', guidelines: ['Corrosive and toxic', 'Sublimes easily - use fume hood', 'Wear nitrile gloves and safety goggles', 'Causes burns on skin contact', 'Stains skin and clothing', 'Store in tightly sealed containers', 'Use sodium thiosulfate for spills', 'Avoid inhalation of vapors'], videos: [{ id: 'RQmqcaS5LIM', title: 'Iodine Safety Procedures' }] },
    xenon: { name: 'Xenon', symbol: 'Xe', hazardLevel: 'Low', guidelines: ['Inert gas - minimal hazards', 'Asphyxiation risk in confined spaces', 'Store cylinders properly', 'Wear safety goggles', 'Ensure adequate ventilation', 'Expensive - handle carefully', 'Use proper regulators', 'Standard gas cylinder procedures'], videos: [{ id: 'RQmqcaS5LIM', title: 'Noble Gas Safety' }] },
    cesium: { name: 'Cesium', symbol: 'Cs', hazardLevel: 'Extreme', guidelines: ['Most reactive alkali metal', 'Ignites spontaneously in air', 'Store in sealed glass ampules under inert gas', 'Handle only in glove box', 'Explosive reaction with water', 'Wear full protective equipment', 'Never allow air or moisture contact', 'Specialized disposal required'], videos: [{ id: 'ODf_sPexS2Q', title: 'Cesium Extreme Reactivity' }] },
    barium: { name: 'Barium', symbol: 'Ba', hazardLevel: 'High', guidelines: ['Toxic and reactive', 'Barium compounds are poisonous', 'Store under mineral oil', 'Wear gloves and safety goggles', 'Use fume hood', 'Reacts with water', 'Keep away from acids', 'Medical surveillance recommended'], videos: [{ id: 'RQmqcaS5LIM', title: 'Barium Safety' }] },
    lanthanum: { name: 'Lanthanum', symbol: 'La', hazardLevel: 'Medium', guidelines: ['Moderate toxicity', 'Powder is flammable', 'Wear safety goggles and gloves', 'Store away from oxidizers', 'Use in ventilated area', 'Avoid inhalation of dust', 'Keep away from moisture', 'Standard rare earth precautions'], videos: [{ id: 'RQmqcaS5LIM', title: 'Lanthanide Safety' }] },
    cerium: { name: 'Cerium', symbol: 'Ce', hazardLevel: 'Medium', guidelines: ['Powder is pyrophoric', 'Store under inert gas', 'Wear safety equipment', 'Keep from ignition sources', 'Use in fume hood', 'Avoid dust generation', 'Class D fire extinguisher nearby', 'Handle bulk metal carefully'], videos: [{ id: 'RQmqcaS5LIM', title: 'Cerium Handling Safety' }] },
    praseodymium: { name: 'Praseodymium', symbol: 'Pr', hazardLevel: 'Low', guidelines: ['Low toxicity', 'Wear basic PPE', 'Avoid inhalation of dust', 'Store in dry conditions', 'Use ventilation', 'Standard rare earth handling', 'Some compounds more hazardous', 'Follow lab procedures'], videos: [{ id: 'RQmqcaS5LIM', title: 'Rare Earth Safety' }] },
    neodymium: { name: 'Neodymium', symbol: 'Nd', hazardLevel: 'Low', guidelines: ['Low toxicity', 'Strong magnets - pinch hazard', 'Wear safety goggles and gloves', 'Keep magnets away from electronics', 'Powder may be flammable', 'Store properly', 'Use ventilation', 'Standard precautions'], videos: [{ id: 'RQmqcaS5LIM', title: 'Neodymium Magnet Safety' }] },
    promethium: { name: 'Promethium', symbol: 'Pm', hazardLevel: 'Extreme', guidelines: ['Radioactive element', 'Handle in licensed facility only', 'Wear dosimetry badge', 'Use shielding for beta radiation', 'Work behind barriers', 'Monitor contamination', 'Follow radiation safety protocols', 'Dispose through radioactive waste'], videos: [{ id: 'RQmqcaS5LIM', title: 'Radioactive Material Handling' }] },
    samarium: { name: 'Samarium', symbol: 'Sm', hazardLevel: 'Low', guidelines: ['Low toxicity', 'Wear basic PPE', 'Avoid dust inhalation', 'Store in dry place', 'Use ventilation', 'Standard rare earth handling', 'Some isotopes radioactive', 'Follow lab procedures'], videos: [{ id: 'RQmqcaS5LIM', title: 'Rare Earth Element Safety' }] },
    europium: { name: 'Europium', symbol: 'Eu', hazardLevel: 'Low', guidelines: ['Low toxicity', 'Wear gloves and goggles', 'Avoid inhalation', 'Store properly', 'Use ventilation', 'Standard precautions', 'Check compound toxicity', 'Follow lab procedures'], videos: [{ id: 'RQmqcaS5LIM', title: 'Lanthanide Safety' }] },
    gadolinium: { name: 'Gadolinium', symbol: 'Gd', hazardLevel: 'Medium', guidelines: ['Moderate toxicity', 'Used in MRI contrast agents', 'Wear gloves and goggles', 'Avoid dust inhalation', 'Some compounds nephrotoxic', 'Store sealed', 'Use ventilation', 'Medical surveillance if exposed'], videos: [{ id: 'RQmqcaS5LIM', title: 'Gadolinium Safety' }] },
    terbium: { name: 'Terbium', symbol: 'Tb', hazardLevel: 'Low', guidelines: ['Low toxicity', 'Wear basic PPE', 'Avoid dust inhalation', 'Store in dry conditions', 'Use ventilation', 'Standard rare earth handling', 'Follow lab procedures', 'Check compound safety'], videos: [{ id: 'RQmqcaS5LIM', title: 'Rare Earth Safety' }] },
    dysprosium: { name: 'Dysprosium', symbol: 'Dy', hazardLevel: 'Low', guidelines: ['Low toxicity', 'Wear safety equipment', 'Avoid inhalation', 'Store properly', 'Use ventilation', 'Standard precautions', 'Follow lab procedures', 'Check compound data'], videos: [{ id: 'RQmqcaS5LIM', title: 'Lanthanide Handling' }] },
    holmium: { name: 'Holmium', symbol: 'Ho', hazardLevel: 'Low', guidelines: ['Low toxicity', 'Wear gloves and goggles', 'Avoid dust', 'Store sealed', 'Use ventilation', 'Standard handling', 'Follow procedures', 'Check compound toxicity'], videos: [{ id: 'RQmqcaS5LIM', title: 'Rare Earth Safety' }] },
    erbium: { name: 'Erbium', symbol: 'Er', hazardLevel: 'Low', guidelines: ['Low toxicity', 'Wear basic PPE', 'Avoid inhalation', 'Store properly', 'Use ventilation', 'Standard precautions', 'Follow lab procedures', 'Check compounds'], videos: [{ id: 'RQmqcaS5LIM', title: 'Lanthanide Safety' }] },
    thulium: { name: 'Thulium', symbol: 'Tm', hazardLevel: 'Low', guidelines: ['Low toxicity', 'Wear safety equipment', 'Avoid dust', 'Store sealed', 'Use ventilation', 'Standard handling', 'Follow procedures', 'Check compound safety'], videos: [{ id: 'RQmqcaS5LIM', title: 'Rare Earth Handling' }] },
    ytterbium: { name: 'Ytterbium', symbol: 'Yb', hazardLevel: 'Low', guidelines: ['Low toxicity', 'Wear gloves and goggles', 'Avoid inhalation', 'Store properly', 'Use ventilation', 'Standard precautions', 'Follow lab procedures', 'Check compound data'], videos: [{ id: 'RQmqcaS5LIM', title: 'Lanthanide Safety' }] },
    lutetium: { name: 'Lutetium', symbol: 'Lu', hazardLevel: 'Low', guidelines: ['Low toxicity', 'Wear basic PPE', 'Avoid dust', 'Store sealed', 'Use ventilation', 'Standard handling', 'Follow procedures', 'Check compounds'], videos: [{ id: 'RQmqcaS5LIM', title: 'Rare Earth Safety' }] },
    hafnium: { name: 'Hafnium', symbol: 'Hf', hazardLevel: 'Medium', guidelines: ['Powder is flammable', 'Store properly', 'Wear safety equipment', 'Avoid ignition sources', 'Use ventilation', 'Keep from oxidizers', 'Class D extinguisher nearby', 'Standard precautions'], videos: [{ id: 'RQmqcaS5LIM', title: 'Hafnium Safety' }] },
    tantalum: { name: 'Tantalum', symbol: 'Ta', hazardLevel: 'Low', guidelines: ['Generally safe', 'Powder may be flammable', 'Wear basic PPE', 'Avoid dust inhalation', 'Store properly', 'Use ventilation', 'Standard handling', 'Follow lab procedures'], videos: [{ id: 'RQmqcaS5LIM', title: 'Tantalum Handling' }] },
    tungsten: { name: 'Tungsten', symbol: 'W', hazardLevel: 'Low', guidelines: ['Low toxicity', 'Some compounds more toxic', 'Wear safety equipment', 'Avoid dust inhalation', 'Store properly', 'Use ventilation', 'Check compound safety', 'Standard precautions'], videos: [{ id: 'RQmqcaS5LIM', title: 'Tungsten Safety' }] },
    rhenium: { name: 'Rhenium', symbol: 'Re', hazardLevel: 'Low', guidelines: ['Low toxicity', 'Some compounds toxic', 'Wear gloves and goggles', 'Avoid inhalation', 'Store sealed', 'Use ventilation', 'Check compound data', 'Follow procedures'], videos: [{ id: 'RQmqcaS5LIM', title: 'Rhenium Handling' }] },
    osmium: { name: 'Osmium', symbol: 'Os', hazardLevel: 'Extreme', guidelines: ['Osmium tetroxide extremely toxic', 'Always use fume hood', 'Wear full PPE and respirator', 'Causes severe eye damage', 'Store in sealed ampules', 'Maximum exposure: 0.002 mg/m³', 'Never heat without controls', 'Emergency procedures required'], videos: [{ id: 'RQmqcaS5LIM', title: 'Osmium Tetroxide Safety' }] },
    iridium: { name: 'Iridium', symbol: 'Ir', hazardLevel: 'Low', guidelines: ['Generally safe in metallic form', 'Some compounds toxic', 'Wear safety equipment', 'Avoid dust', 'Store properly', 'Use ventilation', 'Check compound safety', 'Standard precautions'], videos: [{ id: 'RQmqcaS5LIM', title: 'Platinum Group Metal Safety' }] },
    platinum: { name: 'Platinum', symbol: 'Pt', hazardLevel: 'Medium', guidelines: ['Can cause allergic reactions', 'Some compounds carcinogenic', 'Wear gloves to prevent sensitization', 'Use fume hood when heating', 'Avoid inhalation of dust', 'Medical monitoring recommended', 'Store properly', 'Check compound toxicity'], videos: [{ id: 'RQmqcaS5LIM', title: 'Platinum Handling Safety' }] },
    gold: { name: 'Gold', symbol: 'Au', hazardLevel: 'Low', guidelines: ['Generally safe in metallic form', 'Some compounds toxic', 'Wear basic PPE', 'Gold nanoparticles - check toxicity', 'Store properly', 'Use ventilation when heating', 'Standard precautions', 'Check compound safety'], videos: [{ id: 'RQmqcaS5LIM', title: 'Gold Metal Safety' }] },
    mercury: { name: 'Mercury', symbol: 'Hg', hazardLevel: 'Extreme', guidelines: ['Always work in a fume hood - mercury vapor is highly toxic', 'Use spill trays to contain any potential leaks', 'Wear nitrile gloves (double-glove recommended)', 'Never heat mercury unless absolutely necessary', 'Store in unbreakable, sealed containers in a cool area', 'Use mercury vapor monitor to check air quality', 'Maximum exposure: 0.025 mg/m³ (ceiling limit)', 'Have mercury spill kit readily available in lab'], videos: [{ id: 'RQmqcaS5LIM', title: 'Mercury Safety in the Laboratory' }] },
    thallium: { name: 'Thallium', symbol: 'Tl', hazardLevel: 'Extreme', guidelines: ['Extremely toxic heavy metal', 'Wear nitrile gloves and full PPE', 'Always use fume hood', 'Avoid all contact - absorbed through skin', 'Maximum exposure: 0.1 mg/m³', 'Causes neurological damage', 'Store in locked cabinet', 'Dispose through hazardous waste only'], videos: [{ id: 'RQmqcaS5LIM', title: 'Thallium Toxicity and Safety' }] },
    lead: { name: 'Lead', symbol: 'Pb', hazardLevel: 'High', guidelines: ['Avoid creating dust or fumes - neurotoxic hazard', 'Work in a fume hood when heating or processing', 'Wear nitrile gloves and never touch face while handling', 'Use HEPA vacuum for cleanup - never sweep lead dust', 'Wash hands thoroughly after handling', 'No eating, drinking, or cosmetic application in lead work areas', 'Monitor blood lead levels for workers with regular exposure', 'Dispose through certified hazardous waste program'], videos: [{ id: 'RQmqcaS5LIM', title: 'Lead Safety in Laboratory Settings' }] },
    bismuth: { name: 'Bismuth', symbol: 'Bi', hazardLevel: 'Low', guidelines: ['Low toxicity compared to other heavy metals', 'Wear basic PPE', 'Avoid inhalation of dust', 'Some compounds more toxic', 'Store properly', 'Use ventilation', 'Standard precautions', 'Check compound safety data'], videos: [{ id: 'RQmqcaS5LIM', title: 'Bismuth Safety' }] },
    polonium: { name: 'Polonium', symbol: 'Po', hazardLevel: 'Extreme', guidelines: ['Extremely radioactive and toxic', 'Handle only in specialized facilities', 'Wear full radiation protection', 'Use alpha radiation shielding', 'Strict contamination control', 'Dosimetry required', 'Follow NRC regulations', 'Specialized disposal required'], videos: [{ id: 'RQmqcaS5LIM', title: 'Extreme Radioactive Hazard' }] },
    astatine: { name: 'Astatine', symbol: 'At', hazardLevel: 'Extreme', guidelines: ['Highly radioactive halogen', 'Extremely rare and unstable', 'Handle only in specialized facilities', 'Full radiation protection required', 'Alpha and beta radiation hazard', 'Strict protocols required', 'Specialized containment', 'Follow radiation safety rules'], videos: [{ id: 'RQmqcaS5LIM', title: 'Radioactive Halogen Safety' }] },
    radon: { name: 'Radon', symbol: 'Rn', hazardLevel: 'Extreme', guidelines: ['Radioactive noble gas', 'Causes lung cancer', 'Ensure excellent ventilation', 'Monitor radon levels', 'Alpha radiation hazard', 'Accumulates in basements', 'Use radon detectors', 'Follow EPA guidelines'], videos: [{ id: 'RQmqcaS5LIM', title: 'Radon Gas Safety' }] },
    francium: { name: 'Francium', symbol: 'Fr', hazardLevel: 'Extreme', guidelines: ['Extremely radioactive and reactive', 'Extremely rare - rarely handled', 'Most reactive alkali metal', 'Requires specialized facility', 'Full radiation protection', 'Short half-life', 'Specialized protocols', 'Research use only'], videos: [{ id: 'RQmqcaS5LIM', title: 'Extreme Radioactive Elements' }] },
    radium: { name: 'Radium', symbol: 'Ra', hazardLevel: 'Extreme', guidelines: ['Highly radioactive', 'Alpha and gamma radiation', 'Handle in licensed facility only', 'Lead shielding required', 'Wear dosimetry badge', 'Strict contamination control', 'Causes bone cancer', 'Specialized disposal required'], videos: [{ id: 'RQmqcaS5LIM', title: 'Radium Safety Protocols' }] },
    actinium: { name: 'Actinium', symbol: 'Ac', hazardLevel: 'Extreme', guidelines: ['Highly radioactive actinide', 'Alpha and beta emitter', 'Handle in specialized facility', 'Lead and plastic shielding', 'Wear full protection', 'Contamination control critical', 'Follow radiation protocols', 'Specialized disposal'], videos: [{ id: 'RQmqcaS5LIM', title: 'Actinide Safety' }] },
    thorium: { name: 'Thorium', symbol: 'Th', hazardLevel: 'High', guidelines: ['Radioactive and toxic', 'Alpha radiation hazard', 'Wear gloves and respirator', 'Use fume hood', 'Store in shielded containers', 'Monitor exposure', 'Avoid inhalation and ingestion', 'Licensed facility required'], videos: [{ id: 'RQmqcaS5LIM', title: 'Thorium Handling Safety' }] },
    protactinium: { name: 'Protactinium', symbol: 'Pa', hazardLevel: 'Extreme', guidelines: ['Highly radioactive and toxic', 'Alpha emitter', 'Specialized facility required', 'Full radiation protection', 'Shielding necessary', 'Contamination control', 'Follow strict protocols', 'Specialized disposal'], videos: [{ id: 'RQmqcaS5LIM', title: 'Radioactive Actinide Safety' }] },
    uranium: { name: 'Uranium', symbol: 'U', hazardLevel: 'Extreme', guidelines: ['Radioactive and chemically toxic', 'Alpha radiation hazard', 'Handle in licensed facility', 'Wear gloves and respirator', 'Use shielding and containment', 'Monitor exposure levels', 'Avoid dust generation', 'Follow NRC regulations strictly'], videos: [{ id: 'RQmqcaS5LIM', title: 'Uranium Safety Procedures' }] },
    neptunium: { name: 'Neptunium', symbol: 'Np', hazardLevel: 'Extreme', guidelines: ['Highly radioactive actinide', 'Alpha and beta emitter', 'Specialized facility required', 'Full radiation protection', 'Strict contamination control', 'Shielding required', 'Follow protocols', 'Specialized disposal'], videos: [{ id: 'RQmqcaS5LIM', title: 'Transuranium Element Safety' }] },
    plutonium: { name: 'Plutonium', symbol: 'Pu', hazardLevel: 'Extreme', guidelines: ['Extremely radioactive and toxic', 'Alpha emitter - inhalation hazard', 'Handle only in glove box', 'Full radiation protection required', 'Strict security protocols', 'Contamination control critical', 'Licensed facility only', 'Specialized disposal required'], videos: [{ id: 'RQmqcaS5LIM', title: 'Plutonium Handling Protocols' }] },
    americium: { name: 'Americium', symbol: 'Am', hazardLevel: 'Extreme', guidelines: ['Highly radioactive', 'Alpha and gamma emitter', 'Used in smoke detectors (small amounts)', 'Specialized facility for research', 'Full radiation protection', 'Shielding required', 'Contamination control', 'Specialized disposal'], videos: [{ id: 'RQmqcaS5LIM', title: 'Americium Safety' }] },
    curium: { name: 'Curium', symbol: 'Cm', hazardLevel: 'Extreme', guidelines: ['Highly radioactive', 'Alpha emitter', 'Specialized facility required', 'Full protection required', 'Shielding necessary', 'Strict protocols', 'Contamination control', 'Specialized disposal'], videos: [{ id: 'RQmqcaS5LIM', title: 'Transuranium Safety' }] },
    berkelium: { name: 'Berkelium', symbol: 'Bk', hazardLevel: 'Extreme', guidelines: ['Highly radioactive', 'Research quantities only', 'Specialized facility', 'Full radiation protection', 'Shielding required', 'Strict protocols', 'Contamination control', 'Specialized disposal'], videos: [{ id: 'RQmqcaS5LIM', title: 'Heavy Actinide Safety' }] },
    californium: { name: 'Californium', symbol: 'Cf', hazardLevel: 'Extreme', guidelines: ['Highly radioactive', 'Neutron and alpha emitter', 'Specialized facility required', 'Full protection required', 'Heavy shielding necessary', 'Strict safety protocols', 'Contamination control', 'Specialized disposal'], videos: [{ id: 'RQmqcaS5LIM', title: 'Californium Neutron Source Safety' }] },
    einsteinium: { name: 'Einsteinium', symbol: 'Es', hazardLevel: 'Extreme', guidelines: ['Highly radioactive', 'Extremely rare', 'Research use only', 'Specialized facility', 'Full radiation protection', 'Strict protocols', 'Short half-life', 'Specialized disposal'], videos: [{ id: 'RQmqcaS5LIM', title: 'Heavy Actinide Handling' }] },
    fermium: { name: 'Fermium', symbol: 'Fm', hazardLevel: 'Extreme', guidelines: ['Highly radioactive', 'Extremely rare', 'Research quantities', 'Specialized facility', 'Full protection', 'Strict protocols', 'Short half-life', 'Specialized handling'], videos: [{ id: 'RQmqcaS5LIM', title: 'Synthetic Element Safety' }] },
    mendelevium: { name: 'Mendelevium', symbol: 'Md', hazardLevel: 'Extreme', guidelines: ['Highly radioactive', 'Synthetic element', 'Research use only', 'Specialized facility', 'Full protection required', 'Strict protocols', 'Very short half-life', 'Specialized procedures'], videos: [{ id: 'RQmqcaS5LIM', title: 'Synthetic Actinide Safety' }] },
    nobelium: { name: 'Nobelium', symbol: 'No', hazardLevel: 'Extreme', guidelines: ['Highly radioactive', 'Synthetic element', 'Research only', 'Specialized facility', 'Full protection', 'Strict safety protocols', 'Short half-life', 'Specialized handling'], videos: [{ id: 'RQmqcaS5LIM', title: 'Heavy Element Safety' }] },
    lawrencium: { name: 'Lawrencium', symbol: 'Lr', hazardLevel: 'Extreme', guidelines: ['Highly radioactive', 'Synthetic element', 'Research quantities only', 'Specialized facility required', 'Full radiation protection', 'Strict protocols', 'Very short half-life', 'Specialized procedures'], videos: [{ id: 'RQmqcaS5LIM', title: 'Synthetic Element Handling' }] },
    rutherfordium: { name: 'Rutherfordium', symbol: 'Rf', hazardLevel: 'Extreme', guidelines: ['Radioactive synthetic element', 'Research use only', 'Specialized facility', 'Full protection required', 'Strict safety protocols', 'Very short half-life', 'Limited information available', 'Follow radiation safety rules'], videos: [{ id: 'RQmqcaS5LIM', title: 'Transactinide Element Safety' }] },
    dubnium: { name: 'Dubnium', symbol: 'Db', hazardLevel: 'Extreme', guidelines: ['Radioactive synthetic element', 'Research only', 'Specialized facility', 'Full protection', 'Short half-life', 'Limited handling data', 'Follow strict protocols', 'Specialized procedures'], videos: [{ id: 'RQmqcaS5LIM', title: 'Synthetic Element Safety' }] },
    seaborgium: { name: 'Seaborgium', symbol: 'Sg', hazardLevel: 'Extreme', guidelines: ['Radioactive synthetic element', 'Research quantities', 'Specialized facility', 'Full protection', 'Very short half-life', 'Limited data', 'Strict protocols', 'Specialized handling'], videos: [{ id: 'RQmqcaS5LIM', title: 'Transactinide Safety' }] },
    bohrium: { name: 'Bohrium', symbol: 'Bh', hazardLevel: 'Extreme', guidelines: ['Radioactive synthetic element', 'Research only', 'Specialized facility', 'Full radiation protection', 'Extremely short half-life', 'Limited information', 'Strict safety protocols', 'Specialized procedures'], videos: [{ id: 'RQmqcaS5LIM', title: 'Heavy Element Handling' }] },
    hassium: { name: 'Hassium', symbol: 'Hs', hazardLevel: 'Extreme', guidelines: ['Radioactive synthetic element', 'Research use', 'Specialized facility', 'Full protection', 'Very short half-life', 'Limited data available', 'Follow strict protocols', 'Specialized handling'], videos: [{ id: 'RQmqcaS5LIM', title: 'Synthetic Element Safety' }] },
    meitnerium: { name: 'Meitnerium', symbol: 'Mt', hazardLevel: 'Extreme', guidelines: ['Radioactive synthetic element', 'Research only', 'Specialized facility', 'Full protection required', 'Extremely short half-life', 'Very limited data', 'Strict protocols', 'Specialized procedures'], videos: [{ id: 'RQmqcaS5LIM', title: 'Transactinide Handling' }] },
    darmstadtium: { name: 'Darmstadtium', symbol: 'Ds', hazardLevel: 'Extreme', guidelines: ['Radioactive synthetic element', 'Research quantities', 'Specialized facility', 'Full protection', 'Very short half-life', 'Limited information', 'Strict safety protocols', 'Specialized handling'], videos: [{ id: 'RQmqcaS5LIM', title: 'Heavy Synthetic Element Safety' }] },
    roentgenium: { name: 'Roentgenium', symbol: 'Rg', hazardLevel: 'Extreme', guidelines: ['Radioactive synthetic element', 'Research use only', 'Specialized facility', 'Full radiation protection', 'Short half-life', 'Limited data', 'Follow strict protocols', 'Specialized procedures'], videos: [{ id: 'RQmqcaS5LIM', title: 'Synthetic Element Safety' }] },
    copernicium: { name: 'Copernicium', symbol: 'Cn', hazardLevel: 'Extreme', guidelines: ['Radioactive synthetic element', 'Research only', 'Specialized facility required', 'Full protection', 'Very short half-life', 'Limited information available', 'Strict protocols', 'Specialized handling'], videos: [{ id: 'RQmqcaS5LIM', title: 'Transactinide Safety' }] },
    nihonium: { name: 'Nihonium', symbol: 'Nh', hazardLevel: 'Extreme', guidelines: ['Radioactive synthetic element', 'Research quantities', 'Specialized facility', 'Full protection required', 'Short half-life', 'Very limited data', 'Strict safety protocols', 'Specialized procedures'], videos: [{ id: 'RQmqcaS5LIM', title: 'Synthetic Element Handling' }] },
    flerovium: { name: 'Flerovium', symbol: 'Fl', hazardLevel: 'Extreme', guidelines: ['Radioactive synthetic element', 'Research use only', 'Specialized facility', 'Full protection', 'Very short half-life', 'Limited information', 'Strict protocols', 'Specialized handling'], videos: [{ id: 'RQmqcaS5LIM', title: 'Heavy Element Safety' }] },
    moscovium: { name: 'Moscovium', symbol: 'Mc', hazardLevel: 'Extreme', guidelines: ['Radioactive synthetic element', 'Research only', 'Specialized facility required', 'Full radiation protection', 'Short half-life', 'Very limited data', 'Follow strict protocols', 'Specialized procedures'], videos: [{ id: 'RQmqcaS5LIM', title: 'Synthetic Element Safety' }] },
    livermorium: { name: 'Livermorium', symbol: 'Lv', hazardLevel: 'Extreme', guidelines: ['Radioactive synthetic element', 'Research quantities', 'Specialized facility', 'Full protection required', 'Very short half-life', 'Limited information available', 'Strict safety protocols', 'Specialized handling'], videos: [{ id: 'RQmqcaS5LIM', title: 'Transactinide Handling' }] },
    tennessine: { name: 'Tennessine', symbol: 'Ts', hazardLevel: 'Extreme', guidelines: ['Radioactive synthetic element', 'Research use only', 'Specialized facility', 'Full protection', 'Extremely short half-life', 'Very limited data', 'Strict protocols', 'Specialized procedures'], videos: [{ id: 'RQmqcaS5LIM', title: 'Synthetic Halogen Safety' }] },
    oganesson: { name: 'Oganesson', symbol: 'Og', hazardLevel: 'Extreme', guidelines: ['Radioactive synthetic element', 'Research only', 'Specialized facility required', 'Full radiation protection', 'Very short half-life', 'Extremely limited information', 'Follow strict protocols', 'Specialized handling procedures'], videos: [{ id: 'RQmqcaS5LIM', title: 'Heaviest Element Safety' }] }
  };

  const filteredElements = Object.keys(elementData).filter(key =>
    elementData[key].name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    elementData[key].symbol.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleElementSelect = (key) => {
    setSelectedElement(elementData[key]);
    setSearchTerm('');
  };

  const getHazardColor = (level) => {
    switch(level) {
      case 'Extreme': return '#dc2626';
      case 'High': return '#ea580c';
      case 'Medium': return '#f59e0b';
      case 'Low': return '#10b981';
      default: return '#6b7280';
    }
  };

  return (
    <div style={styles.container}>
      <header style={styles.header}>
        <div style={styles.headerContent}>
          <div style={styles.logoSection}>
            <Shield size={40} color="#fff" />
            <div>
              <h1 style={styles.title}>Laboratory Safety Guidelines</h1>
              <p style={styles.subtitle}>Chemical Element Handling Protocols</p>
            </div>
          </div>
          <a href="/" style={styles.homeButton}>
            <Home size={20} />
            <span>Back to Home</span>
          </a>
        </div>
      </header>

      <main style={styles.main}>
        <div style={styles.searchSection}>
          <div style={styles.searchContainer}>
            <Search size={24} color="#64748b" style={styles.searchIcon} />
            <input
              type="text"
              placeholder="Search for an element (e.g., Arsenic, Carbon, Lithium)..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              style={styles.searchInput}
            />
          </div>

          {searchTerm && filteredElements.length > 0 && (
            <div style={styles.dropdown}>
              {filteredElements.map(key => (
                <div
                  key={key}
                  style={styles.dropdownItem}
                  onClick={() => handleElementSelect(key)}
                >
                  <span style={styles.elementSymbol}>{elementData[key].symbol}</span>
                  <span style={styles.elementName}>{elementData[key].name}</span>
                  <span 
                    style={{
                      ...styles.hazardBadge,
                      backgroundColor: getHazardColor(elementData[key].hazardLevel)
                    }}
                  >
                    {elementData[key].hazardLevel}
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>

        {!selectedElement ? (
          <div style={styles.welcomeSection}>
            <AlertTriangle size={64} color="#3b82f6" />
            <h2 style={styles.welcomeTitle}>Welcome to Lab Safety Guidelines</h2>
            <p style={styles.welcomeText}>
              Search for any chemical element above to view comprehensive safety guidelines, 
              handling procedures, and educational resources. We have guidelines for all 118 elements 
              in the periodic table.
            </p>
            <div style={styles.quickAccessGrid}>
              <h3 style={styles.quickAccessTitle}>Quick Access - Common Elements</h3>
              <div style={styles.elementGrid}>
                {['hydrogen', 'carbon', 'nitrogen', 'oxygen', 'sodium', 'magnesium', 'chlorine', 'iron', 'copper', 'zinc', 'silver', 'gold', 'mercury', 'lead', 'uranium'].map(key => (
                  <button
                    key={key}
                    style={styles.elementCard}
                    onClick={() => setSelectedElement(elementData[key])}
                  >
                    <span style={styles.cardSymbol}>{elementData[key].symbol}</span>
                    <span style={styles.cardName}>{elementData[key].name}</span>
                  </button>
                ))}
              </div>
            </div>
          </div>
        ) : (
          <div style={styles.detailsSection}>
            <div style={styles.elementHeader}>
              <div style={styles.elementTitleSection}>
                <span style={styles.largeSymbol}>{selectedElement.symbol}</span>
                <div>
                  <h2 style={styles.elementTitle}>{selectedElement.name}</h2>
                  <span 
                    style={{
                      ...styles.hazardLevel,
                      backgroundColor: getHazardColor(selectedElement.hazardLevel)
                    }}
                  >
                    {selectedElement.hazardLevel} Hazard
                  </span>
                </div>
              </div>
              <button 
                style={styles.backButton}
                onClick={() => setSelectedElement(null)}
              >
                ← Back to Search
              </button>
            </div>

            <div style={styles.contentGrid}>
              <div style={styles.guidelinesSection}>
                <h3 style={styles.sectionTitle}>
                  <Shield size={24} color="#3b82f6" />
                  Safety Guidelines
                </h3>
                <div style={styles.guidelinesList}>
                  {selectedElement.guidelines.map((guideline, index) => (
                    <div key={index} style={styles.guidelineItem}>
                      <div style={styles.guidelineNumber}>{index + 1}</div>
                      <p style={styles.guidelineText}>{guideline}</p>
                    </div>
                  ))}
                </div>

                <div style={styles.safetyIcons}>
                  <div style={styles.iconItem}>
                    <Droplet size={32} color="#3b82f6" />
                    <span style={styles.iconLabel}>Avoid Contact</span>
                  </div>
                  <div style={styles.iconItem}>
                    <Wind size={32} color="#3b82f6" />
                    <span style={styles.iconLabel}>Ventilation</span>
                  </div>
                  <div style={styles.iconItem}>
                    <Eye size={32} color="#3b82f6" />
                    <span style={styles.iconLabel}>Eye Protection</span>
                  </div>
                  <div style={styles.iconItem}>
                    <Users size={32} color="#3b82f6" />
                    <span style={styles.iconLabel}>Training Required</span>
                  </div>
                </div>
              </div>

              <div style={styles.videosSection}>
                <h3 style={styles.sectionTitle}>
                  <svg style={styles.youtubeIcon} viewBox="0 0 24 24" fill="#ff0000">
                    <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
                  </svg>
                  Educational Videos
                </h3>
                <div style={styles.videosList}>
                  {selectedElement.videos.map((video, index) => (
                    <a
                      key={index}
                      href={`https://www.youtube.com/watch?v=${video.id}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      style={styles.videoCard}
                    >
                      <img 
                        src={`https://img.youtube.com/vi/${video.id}/mqdefault.jpg`}
                        alt={video.title}
                        style={styles.videoThumbnail}
                      />
                      <div style={styles.videoInfo}>
                        <p style={styles.videoTitle}>{video.title}</p>
                        <span style={styles.watchButton}>Watch on YouTube →</span>
                      </div>
                    </a>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}
      </main>

      <footer style={styles.footer}>
        <p>Always consult with your lab supervisor and follow institutional safety protocols</p>
        <p style={styles.footerSmall}>© 2025 Laboratory Safety Guidelines. For educational purposes only.</p>
      </footer>
    </div>
  );
};

const styles = {
  container: {
    fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
    minHeight: '100vh',
    backgroundColor: '#f8fafc',
    display: 'flex',
    flexDirection: 'column',
  },
  header: {
    background: '#8dc63f',
    color: 'white',
    padding: '2rem',
    boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
  },
  headerContent: {
    maxWidth: '1200px',
    margin: '0 auto',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  logoSection: {
    display: 'flex',
    alignItems: 'center',
    gap: '1rem',
  },
  title: {
    margin: 0,
    fontSize: '2rem',
    fontWeight: '700',
  },
  subtitle: {
    margin: '0.25rem 0 0 0',
    fontSize: '1rem',
    opacity: 0.9,
  },
  homeButton: {
    display: 'flex',
    alignItems: 'center',
    gap: '0.5rem',
    padding: '0.75rem 1.5rem',
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    border: '2px solid white',
    borderRadius: '8px',
    color: 'white',
    textDecoration: 'none',
    fontSize: '1rem',
    fontWeight: '600',
    transition: 'all 0.3s ease',
    cursor: 'pointer',
  },
  main: {
    flex: 1,
    maxWidth: '1200px',
    margin: '0 auto',
    padding: '2rem',
    width: '100%',
  },
  searchSection: {
    position: 'relative',
    marginBottom: '2rem',
  },
  searchContainer: {
    position: 'relative',
    width: '100%',
  },
  searchIcon: {
    position: 'absolute',
    left: '1rem',
    top: '50%',
    transform: 'translateY(-50%)',
    pointerEvents: 'none',
  },
  searchInput: {
    width: '100%',
    padding: '1rem 1rem 1rem 3rem',
    fontSize: '1.1rem',
    border: '2px solid #e2e8f0',
    borderRadius: '12px',
    outline: 'none',
    transition: 'all 0.3s ease',
    boxShadow: '0 2px 4px rgba(0,0,0,0.05)',
  },
  dropdown: {
    position: 'absolute',
    top: '100%',
    left: 0,
    right: 0,
    backgroundColor: 'white',
    border: '2px solid #e2e8f0',
    borderRadius: '12px',
    marginTop: '0.5rem',
    boxShadow: '0 10px 25px rgba(0,0,0,0.1)',
    zIndex: 10,
    maxHeight: '400px',
    overflowY: 'auto',
  },
  dropdownItem: {
    padding: '1rem',
    display: 'flex',
    alignItems: 'center',
    gap: '1rem',
    cursor: 'pointer',
    borderBottom: '1px solid #f1f5f9',
    transition: 'background-color 0.2s',
  },
  elementSymbol: {
    fontSize: '1.5rem',
    fontWeight: '700',
    color: '#3b82f6',
    width: '50px',
    textAlign: 'center',
  },
  elementName: {
    flex: 1,
    fontSize: '1.1rem',
    color: '#1e293b',
  },
  hazardBadge: {
    padding: '0.25rem 0.75rem',
    borderRadius: '20px',
    color: 'white',
    fontSize: '0.85rem',
    fontWeight: '600',
  },
  welcomeSection: {
    textAlign: 'center',
    padding: '3rem 1rem',
  },
  welcomeTitle: {
    fontSize: '2rem',
    color: '#1e293b',
    marginTop: '1rem',
  },
  welcomeText: {
    fontSize: '1.1rem',
    color: '#64748b',
    maxWidth: '700px',
    margin: '1rem auto',
    lineHeight: 1.6,
  },
  quickAccessGrid: {
    marginTop: '3rem',
  },
  quickAccessTitle: {
    fontSize: '1.5rem',
    color: '#1e293b',
    marginBottom: '1.5rem',
  },
  elementGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(140px, 1fr))',
    gap: '1rem',
  },
  elementCard: {
    padding: '1.5rem',
    backgroundColor: 'white',
    border: '2px solid #e2e8f0',
    borderRadius: '12px',
    cursor: 'pointer',
    transition: 'all 0.3s ease',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: '0.5rem',
  },
  cardSymbol: {
    fontSize: '2rem',
    fontWeight: '700',
    color: '#3b82f6',
  },
  cardName: {
    fontSize: '0.95rem',
    color: '#64748b',
  },
  detailsSection: {
    backgroundColor: 'white',
    borderRadius: '16px',
    padding: '2rem',
    boxShadow: '0 4px 6px rgba(0,0,0,0.05)',
  },
  elementHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '2rem',
    paddingBottom: '1.5rem',
    borderBottom: '2px solid #f1f5f9',
  },
  elementTitleSection: {
    display: 'flex',
    alignItems: 'center',
    gap: '1.5rem',
  },
  largeSymbol: {
    fontSize: '4rem',
    fontWeight: '700',
    color: '#3b82f6',
  },
  elementTitle: {
    fontSize: '2rem',
    color: '#1e293b',
    margin: '0 0 0.5rem 0',
  },
  hazardLevel: {
    padding: '0.5rem 1rem',
    borderRadius: '20px',
    color: 'white',
    fontSize: '0.9rem',
    fontWeight: '600',
    display: 'inline-block',
  },
  backButton: {
    padding: '0.75rem 1.5rem',
    backgroundColor: '#f1f5f9',
    border: 'none',
    borderRadius: '8px',
    color: '#475569',
    fontSize: '1rem',
    cursor: 'pointer',
    transition: 'background-color 0.2s',
  },
  contentGrid: {
    display: 'grid',
    gridTemplateColumns: '1.5fr 1fr',
    gap: '2rem',
  },
  guidelinesSection: {
    display: 'flex',
    flexDirection: 'column',
    gap: '1.5rem',
  },
  sectionTitle: {
    fontSize: '1.5rem',
    color: '#1e293b',
    display: 'flex',
    alignItems: 'center',
    gap: '0.5rem',
    marginBottom: '1rem',
  },
  guidelinesList: {
    display: 'flex',
    flexDirection: 'column',
    gap: '1rem',
  },
  guidelineItem: {
    display: 'flex',
    gap: '1rem',
    padding: '1rem',
    backgroundColor: '#f8fafc',
    borderRadius: '8px',
    borderLeft: '4px solid #3b82f6',
  },
  guidelineNumber: {
    width: '32px',
    height: '32px',
    backgroundColor: '#3b82f6',
    color: 'white',
    borderRadius: '50%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontWeight: '700',
    flexShrink: 0,
  },
  guidelineText: {
    margin: 0,
    color: '#334155',
    lineHeight: 1.6,
    fontSize: '0.95rem',
  },
  safetyIcons: {
    display: 'grid',
    gridTemplateColumns: 'repeat(4, 1fr)',
    gap: '1rem',
    marginTop: '1rem',
  },
  iconItem: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: '0.5rem',
    padding: '1rem',
    backgroundColor: '#eff6ff',
    borderRadius: '8px',
  },
  iconLabel: {
    fontSize: '0.75rem',
    color: '#1e40af',
    fontWeight: '600',
    textAlign: 'center',
  },
  videosSection: {
    display: 'flex',
    flexDirection: 'column',
  },
  youtubeIcon: {
    width: '28px',
    height: '28px',
  },
  videosList: {
    display: 'flex',
    flexDirection: 'column',
    gap: '1rem',
  },
  videoCard: {
    display: 'block',
    backgroundColor: '#f8fafc',
    borderRadius: '8px',
    overflow: 'hidden',
    textDecoration: 'none',
    transition: 'transform 0.2s, box-shadow 0.2s',
    border: '1px solid #e2e8f0',
  },
  videoThumbnail: {
    width: '100%',
    height: 'auto',
    display: 'block',
  },
  videoInfo: {
    padding: '1rem',
  },
  videoTitle: {
    margin: '0 0 0.5rem 0',
    color: '#1e293b',
    fontSize: '0.95rem',
    fontWeight: '600',
    lineHeight: 1.4,
  },
  watchButton: {
    color: '#3b82f6',
    fontSize: '0.85rem',
    fontWeight: '600',
  },
  footer: {
    backgroundColor: '#1e293b',
    color: 'white',
    textAlign: 'center',
    padding: '2rem',
    marginTop: 'auto',
  },
  footerSmall: {
    fontSize: '0.85rem',
    opacity: 0.7,
    marginTop: '0.5rem',
  },
};

export default ElementGuidelines;