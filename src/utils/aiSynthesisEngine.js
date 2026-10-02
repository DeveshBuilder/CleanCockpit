// AI Synthesis Engine for DGCA Ground School Assistant
// Generates deep, authentic, format-compliant technical explanations tailored to complexity and output format
// Grounded in DGCA Civil Aviation Requirements (CARs), Aircraft Rules 1937, and AIP India

import { DGCA_PRESETS } from '../data/dgcaPresets.js';

/**
 * Extracts key topics and concepts from user notes or uploaded file
 */
function analyzeTopic(text, defaultSubject) {
  if (!text) return defaultSubject || 'air_regs';
  const lower = text.toLowerCase();
  
  if (lower.includes('propeller') || lower.includes('blade') || lower.includes('rpm') || lower.includes('governor') || lower.includes('feathering')) {
    return 'propeller';
  }
  if (lower.includes('altimeter') || lower.includes('qnh') || lower.includes('qfe') || lower.includes('qne') || lower.includes('transition altitude')) {
    return 'altimetry';
  }
  if (lower.includes('monsoon') || lower.includes('fog') || lower.includes('vidp') || lower.includes('rvr') || lower.includes('kalbaishakhi') || lower.includes('thunderstorm') || lower.includes('metar')) {
    return 'met';
  }
  if (lower.includes('1-in-60') || lower.includes('track error') || lower.includes('closing angle') || lower.includes('gagan') || lower.includes('convergency') || lower.includes('vor') || lower.includes('ils')) {
    return 'nav';
  }
  if (lower.includes('mach') || lower.includes('tcas') || lower.includes('coffin corner') || lower.includes('shock') || lower.includes('stall') || lower.includes('aerodynamic')) {
    return 'tech_gen';
  }
  if (lower.includes('squawk') || lower.includes('7500') || lower.includes('7600') || lower.includes('7700') || lower.includes('mayday') || lower.includes('pan pan') || lower.includes('transponder')) {
    return 'rtr';
  }
  if (lower.includes('vfr') || lower.includes('airspace') || lower.includes('class d') || lower.includes('class g') || lower.includes('car section 8') || lower.includes('special vfr')) {
    return 'air_regs';
  }

  return defaultSubject || 'air_regs';
}

/**
 * Main synthesis entry point
 * Generates an exhaustive, entire study dossier matching complexity and output format
 */
export function generateDgcaExplanation(rawText, subject, complexity, outputFormat, webGrounding = true) {
  const detectedTopic = analyzeTopic(rawText, subject);

  // Check if user has entered custom notes that deviate significantly from preset raw notes
  const preset = DGCA_PRESETS[subject] || DGCA_PRESETS['air_regs'];
  const isCustomInput = rawText && rawText.trim().length > 30 && (!preset || !preset.rawNotes.includes(rawText.slice(0, 50)));

  if (isCustomInput && detectedTopic !== 'propeller' && detectedTopic !== 'altimetry') {
    return synthesizeCustomNotes(rawText, subject, complexity, outputFormat, webGrounding);
  }

  switch (detectedTopic) {
    case 'propeller':
      return generatePropellerExplanation(rawText, complexity, outputFormat, webGrounding);
    case 'altimetry':
      return generateAltimetryExplanation(rawText, complexity, outputFormat, webGrounding);
    case 'air_regs':
      return generateAirRegsExplanation(complexity, outputFormat, webGrounding);
    case 'met':
      return generateMetExplanation(complexity, outputFormat, webGrounding);
    case 'nav':
      return generateNavExplanation(complexity, outputFormat, webGrounding);
    case 'tech_gen':
      return generateTechGenExplanation(complexity, outputFormat, webGrounding);
    case 'rtr':
      return generateRtrExplanation(complexity, outputFormat, webGrounding);
    default:
      return generateAirRegsExplanation(complexity, outputFormat, webGrounding);
  }
}

// =========================================================================
// 1. AIR REGULATIONS (VMC Minima, SVFR, Airspace, Semicircular Cruising)
// =========================================================================
function generateAirRegsExplanation(complexity, format, webGrounding) {
  if (complexity === 'eli5') {
    if (format === 'paragraphs') {
      return `### ✈️ Visual Flight Rules in India: The Complete Simple Pilot Guide

Imagine driving a toy airplane in the vast open sky. When you fly by simply looking out through your windshield to see where you are going, that is called **VFR (Visual Flight Rules)**. Because the sky doesn't have painted road lines, the Directorate General of Civil Aviation (DGCA) gives every pilot strict rules so no two airplanes ever bump into each other.

When you fly very high above 10,000 feet—where big commercial jets cruise at tremendous speeds—you must be able to see at least **8 kilometers ahead**. Think of this like needing to see 80 football fields in front of your airplane! You must also stay far away from fluffy clouds: keep at least **1,500 meters away sideways** and **1,000 feet above or below** them. This gives pilots enough time to spot each other and turn away safely.

When flying lower down—between 10,000 feet and 3,000 feet—the visibility rule relaxes to **5 kilometers**, but you still must respect the same cloud bubble of 1,500 meters horizontal and 1,000 feet vertical. Down very low in the quiet countryside (Class G airspace under 3,000 feet), you just need to make sure you stay completely **clear of clouds and keep the ground in sight at all times**.

Finally, how do airplanes going in opposite directions avoid hitting head-on? India uses the **Semi-Circular Rule**: If you fly towards the East (Kolkata or Chennai, between 000° and 179°), you pick an **Odd flight level + 500 feet** (such as FL 55 or FL 75). If you fly towards the West (Mumbai or Ahmedabad, between 180° and 359°), you pick an **Even flight level + 500 feet** (such as FL 65 or FL 85). This automatically keeps planes flying in opposite directions separated by a safe 1,000-foot vertical cushion!`;
    }

    if (format === 'numbered') {
      return `### 📋 Step-by-Step VFR Flight Rules for Indian Airspace (ELI5):

1. **Know Your Flight Mode**: Flying by looking outside is called **Visual Flight Rules (VFR)**; it requires clear skies, good visibility, and staying away from clouds.
2. **Above 10,000 ft AMSL Minima**: You must have at least **8 km of forward visibility** and maintain **1,500 m horizontal and 1,000 ft vertical clearance** from any cloud.
3. **Below 10,000 ft AMSL Minima**: The forward visibility requirement drops to **5 km**, while maintaining the exact same **1,500 m horizontal / 1,000 ft vertical cloud separation**.
4. **Low Altitude in Class G (Under 3,000 ft)**: You need **5 km visibility** (or 1,500 m if flying at 140 knots or slower), and you must stay **clear of clouds with the surface in sight**.
5. **Special VFR (SVFR) Permission**: If weather gets worse near an airport with a Control Zone (CTR), you can request Special VFR from ATC only during daytime, provided ground visibility is at least **1,500 meters** and cloud ceiling is at least **600 feet**.
6. **Traffic Direction Rule (Eastbound)**: When tracking between **000° and 179° Magnetic**, fly at **Odd Flight Levels + 500 ft** (FL 55, 75, 95).
7. **Traffic Direction Rule (Westbound)**: When tracking between **180° and 359° Magnetic**, fly at **Even Flight Levels + 500 ft** (FL 65, 85, 105).
8. **Speed Limit Near Aerodromes**: In Class D airspace below 10,000 feet, never exceed **250 knots indicated airspeed** unless ATC specifically clears you.`;
    }

    // Bullets
    return `### 📌 VFR High-Yield Memory Checklist (ELI5 Essentials):

- **VMC Minima (At or Above 10,000 ft AMSL)**:
  * Minimum forward visibility: **8 km (8,000 m)**.
  * Distance from clouds: **1,500 m horizontally, 1,000 ft (300 m) vertically**.
- **VMC Minima (Below 10,000 ft down to 3,000 ft AMSL / 1,000 ft AGL)**:
  * Minimum forward visibility: **5 km (5,000 m)**.
  * Distance from clouds: **1,500 m horizontally, 1,000 ft vertically**.
- **VMC Minima (Below 3,000 ft AMSL in Class G Airspace)**:
  * Minimum forward visibility: **5 km** (reduced to **1,500 m** for aircraft flying at 140 knots indicated airspeed or slower).
  * Cloud separation: **Clear of clouds with the ground or water surface in sight**.
- **Special VFR (SVFR) Strict DGCA Constraints**:
  * Authorized **ONLY inside a Control Zone (CTR)** by Air Traffic Control.
  * Permitted **during DAYTIME ONLY** in India (strictly prohibited at night).
  * Meteorological thresholds: Ground visibility **≥ 1,500 m**, Cloud ceiling **≥ 600 ft (180 m)**.
- **Indian Semi-Circular Cruising System**:
  * **Track 000° - 179° (Eastbound)**: Odd Flight Levels + 500 ft (FL 55, FL 75, FL 95).
  * **Track 180° - 359° (Westbound)**: Even Flight Levels + 500 ft (FL 65, FL 85, FL 105).`;
  }

  if (complexity === 'physics') {
    if (format === 'paragraphs') {
      return `### 📐 Kinematic Closure Rates & Spatial Geometry of VFR Minima (Physics Graduate Level)

Visual Meteorological Conditions (VMC) are not arbitrary regulatory thresholds; they represent geometrically derived spatial separation limits calibrated to human optical scanning latency, biological perception-reaction intervals (t_react ≈ 2.5 to 5.0 seconds), and aircraft kinematic closure dynamics in three-dimensional airspace.

At high cruising altitudes (at and above 10,000 ft AMSL), true airspeed (TAS) increases significantly due to lower air density according to TAS = IAS / √(ρ / ρ_0). Two opposing commercial or high-performance aircraft with true airspeeds of 250 to 400 knots produce closure rates approaching 500 to 800 knots (approximately 250 to 410 m/s). Under the mandatory **8 km visibility threshold**, total optical detection and maneuvering decision time is given by:
t_decision = D / V_closure ≈ 8000 m / 400 m/s ≈ 20 seconds.
This provides the minimum required time budget for pilot visual recognition, mental trajectory extrapolation, control deflection, and aircraft aerodynamic response (g-loading and pitch/roll authority). Below 10,000 ft, where mandatory indicated airspeed is capped at 250 knots (IAS ≤ 250 kts), kinetic closure velocity is lower, permitting a calibrated reduction to **5 km visibility**.

The cloud separation buffers—specifically **1,500 m horizontal and 1,000 ft (300 m) vertical**—prevent collision geometries when an aircraft operating on an Instrument Flight Rules (IFR) clearance pops out of convective or stratiform clouds at high speed. A 1,500 m horizontal buffer ensures that an IFR flight breaking out of a cloud base at 250 knots (128 m/s) remains outside the immediate trajectory of a VFR aircraft for at least 11.7 seconds, providing sufficient optical line-of-sight for defensive avoidance.

The **Indian Semicircular Rule** establishes geometric isolation between non-coplanar velocity vectors. For Eastbound tracks (000° to 179° Magnetic), altitudes follow h_east = (2n + 1) × 1,000 ft + 500 ft. For Westbound tracks (180° to 359° Magnetic), altitudes follow h_west = (2n) × 1,000 ft + 500 ft. Consequently, opposing flight paths maintain a continuous vertical geometric displacement of Δh = 1,000 feet, eliminating planar intersection risks across Indian sovereign airspace.`;
    }

    if (format === 'numbered') {
      return `### 📐 Mathematical Derivations & Vector Geometry of Indian VFR Operations:

1. **Closure Velocity Vector Calculation**:
   Given two aircraft with velocity vectors V_1 and V_2 at closing angle θ, relative velocity is:
   V_rel = √( |V_1|² + |V_2|² - 2|V_1||V_2| cos θ )
   For head-on traffic (θ = 180°), V_rel = |V_1| + |V_2|.
2. **Optical Detection & Reaction Horizon**:
   Available decision latency t_d = Visibility / V_rel. At 10,000 ft AMSL with V_rel = 400 m/s and 8 km visibility:
   t_d = 8,000 m / 400 m/s = 20.0 seconds (compliant with human optical reaction requirements).
3. **Horizontal Cloud Buffer Equation**:
   Minimum horizontal separation d_h = 1,500 meters. For an aircraft breaking out of a cloud bank at speed V = 250 KIAS (128.6 m/s):
   t_clearance = 1,500 m / 128.6 m/s = 11.66 seconds of visual warning.
4. **Vertical Stratification via Semicircular Equation**:
   - Eastbound Tracks (000° - 179°): Altitude = (2n + 1) × 1,000 + 500 ft (Odd + 500).
   - Westbound Tracks (180° - 359°): Altitude = (2n) × 1,000 + 500 ft (Even + 500).
   - Vertical separation between opposing vectors: Δh = 1,000 ft (constant non-intersecting planes).
5. **Class G Low-Altitude Kinematic Relaxation**:
   Below 3,000 ft AMSL, when aircraft operate at IAS ≤ 140 knots (72 m/s), turning radius R = V² / (g tan φ) decreases significantly (R ≈ 320 m at 25° bank), mathematically justifying the reduction of flight visibility to 1,500 meters.`;
    }

    return `### 📐 Physics & Kinematic Principles of Indian VFR Minima:

- **Optical Horizon vs Closure Rate**:
  * High-Altitude Minima (≥ 10,000 ft): Flight visibility = **8 km**, ensuring t_decision ≥ 20 s under supersonic or high-subsonic closure rates.
  * Mid-Altitude Minima (< 10,000 ft): Flight visibility = **5 km**, matching the 250 KIAS terminal speed limit.
- **Aerodynamic Cloud Buffer Buffer**:
  * Horizontal clearance: **1,500 m**, preventing high-speed collision upon cloud breakout.
  * Vertical clearance: **1,000 ft (300 m)**, isolating VFR cruising paths from IFR instrument approach ceilings.
- **Low-Speed Class G Dynamics**:
  * Aircraft operating at **≤ 140 knots indicated airspeed** have reduced turn radiuses (R ∝ V²), permitting legal operations down to **1,500 m visibility** when clear of clouds and with surface in sight.
- **Semicircular Geometric Separation**:
  * Track 000° - 179° Magnetic: **(2n + 1) × 1,000 + 500 ft** (FL 55, 75, 95).
  * Track 180° - 359° Magnetic: **(2n) × 1,000 + 500 ft** (FL 65, 85, 105).
  * Guaranteed vertical offset between counter-directional traffic: **Δh = 1,000 ft**.`;
  }

  // Senior DGCA Flight Instructor Caliber
  if (format === 'paragraphs') {
    return `### 👨‍✈️ Senior DGCA Flight Instructor Briefing: Air Regulations & VFR Standards (CAR Section 8 & Aircraft Rules 1937)

As flight instructors preparing commercial pilot candidates for the DGCA Pariksha examinations and subsequent airline check-rides, mastering VFR weather minima and Indian airspace management under Aircraft Rules 1937 (Rule 68) and CAR Section 8 Series C Part I is paramount. DGCA examination questions rigorously test candidate knowledge of altitude-dependent visibility thresholds, Special VFR authorizations within Control Zones, and semicircular cruising level discipline across the four Indian FIRs.

Under official Indian regulations, Visual Meteorological Conditions (VMC) are divided into three distinct operational altitude regimes:
1. **At and above 10,000 ft AMSL (FL 100)**: Flights require a mandatory **8 km flight visibility** and a cloud separation cushion of **1,500 meters horizontally and 1,000 feet (300 meters) vertically**. In DGCA multiple-choice questions, examiners frequently attempt to trick candidates by presenting 5 km as an option; remember that 8 km is legally mandatory above 10,000 feet.
2. **Below 10,000 ft AMSL down to 3,000 ft AMSL (or 1,000 ft AGL, whichever is higher)**: Mandatory flight visibility drops to **5 km**, while maintaining the exact same cloud separation buffer of **1,500 m horizontal and 1,000 ft vertical**.
3. **Below 3,000 ft AMSL in Class G (Uncontrolled) Airspace**: Visibility requirement is **5 km**. However, for aircraft operating at an indicated airspeed of **≤ 140 knots**, the minimum flight visibility is legally relaxed to **1,500 meters**, provided the pilot maintains continuous visual contact with the surface and remains completely **clear of clouds**.

**Special VFR (SVFR) Regulations in India**: When meteorological conditions deteriorate below standard VMC within a Control Zone (CTR), an aircraft may request Special VFR clearance from ATC. In Indian airspace, SVFR is subject to strict statutory constraints: it can **ONLY be authorized within a Control Zone (CTR)**, it is permitted **during DAYTIME ONLY** (SVFR is strictly prohibited at night across India unless special DGCA Headquarters exemption is granted), the cloud ceiling must be **≥ 600 feet (180 meters)**, and ground visibility must be **≥ 1,500 meters** (or 800 m for helicopters). Continuous two-way radio communication on the published tower/radar frequency is mandatory.

**Indian Semicircular Cruising Levels (AIP India ENR 1.4 & Rule 68)**: For enroute cruising flight above 3,000 ft AGL/AMSL, pilots must adhere strictly to the magnetic track semicircular table:
- **Eastbound (000° to 179° Magnetic)**: Odd Flight Levels + 500 ft for VFR (e.g., FL 55, FL 75, FL 95, FL 115).
- **Westbound (180° to 359° Magnetic)**: Even Flight Levels + 500 ft for VFR (e.g., FL 65, FL 85, FL 105, FL 125).
In Class D airspace below 10,000 ft AMSL, maximum indicated airspeed is restricted to **250 knots IAS** unless authorized by ATC.`;
  }

  if (format === 'numbered') {
    return `### 📋 DGCA Check-Ride & Pariksha Standard Operating Checklist (Air Regulations):

1. **Altitude Determination for VMC Threshold**: Determine whether operating above or below 10,000 ft AMSL (FL 100) or below 3,000 ft AMSL / 1,000 ft AGL.
2. **Apply High-Altitude VMC Rule (≥ 10,000 ft AMSL)**:
   - Mandatory Flight Visibility: **8 km (8,000 m)**.
   - Cloud Clearance: **1,500 m horizontal, 1,000 ft (300 m) vertical**.
3. **Apply Mid-Altitude VMC Rule (< 10,000 ft AMSL down to 3,000 ft AMSL / 1,000 ft AGL)**:
   - Mandatory Flight Visibility: **5 km (5,000 m)**.
   - Cloud Clearance: **1,500 m horizontal, 1,000 ft vertical**.
4. **Apply Class G Low-Altitude VMC Rule (< 3,000 ft AMSL / 1,000 ft AGL)**:
   - Standard Visibility: **5 km**.
   - Low-Speed Exception: If operating at **≤ 140 knots indicated airspeed**, visibility relaxed to **1,500 meters**, provided aircraft is **clear of clouds and surface in sight**.
5. **Special VFR (SVFR) Authorization Criteria (CAR Section 8 Series C Part I)**:
   - Airspace: Must be within a **Control Zone (CTR)**.
   - Time of Day: **Daytime only** (SVFR prohibited at night in India).
   - Meteorological Limits: Ground visibility **≥ 1,500 m** and Cloud ceiling **≥ 600 ft (180 m)**.
   - ATC Clearance: Positive two-way radio clearance from aerodrome control required.
6. **Semicircular Cruising Level Assignment (Magnetic Track)**:
   - Tracks 000° - 179° (Eastbound): **Odd Flight Levels + 500 ft** (FL 55, 75, 95...).
   - Tracks 180° - 359° (Westbound): **Even Flight Levels + 500 ft** (FL 65, 85, 105...).
7. **Terminal Airspace Speed Limitation**:
   - Maximum indicated airspeed below 10,000 ft AMSL in Class D airspace: **250 knots IAS**.
8. **Right of Way & Converging Traffic (Rule 68)**:
   - Aircraft on the **right** has the right of way.
   - Head-on traffic: Both aircraft must alter heading to the **right**.
   - Overtaking: The aircraft being overtaken has right of way; overtaking aircraft alters heading to the **right** and keeps well clear.`;
  }

  // Bullets
  return `### 📌 DGCA High-Yield Examination Points (Senior Instructor Caliber):

- **VMC Weather Minima by Altitude**:
  * **≥ 10,000 ft AMSL**: Mandatory **8 km flight visibility**. Cloud separation: **1,500 m horizontal and 1,000 ft vertical**. (Beware of DGCA trick questions substituting 5 km!).
  * **< 10,000 ft AMSL down to 3,000 ft AMSL (or 1,000 ft AGL)**: **5 km flight visibility**, with the same **1,500 m / 1,000 ft** cloud buffer.
  * **< 3,000 ft AMSL in Class G Airspace**: Flight visibility is **5 km**. For aircraft operating at **≤ 140 knots IAS**, visibility is relaxed to **1,500 meters**, provided aircraft remains **clear of clouds with the surface in sight**.
- **Special VFR (SVFR) Strict DGCA Constraints**:
  * Permitted **ONLY within a Control Zone (CTR)** under ATC clearance.
  * Statutory meteorological minimums: Ground visibility **≥ 1,500 m**, Cloud ceiling **≥ 600 ft (180 m)**.
  * Operating restriction: Strictly **prohibited at night** throughout India unless explicitly exempted by DGCA HQ.
- **Indian Semi-Circular Rule (Magnetic Track)**:
  * **Eastbound (000° - 179° Magnetic)**: Odd Flight Levels + 500 ft (FL 55, 75, 95, 115).
  * **Westbound (180° - 359° Magnetic)**: Even Flight Levels + 500 ft (FL 65, 85, 105, 125).
- **DGCA Statutory References**:
  * Aircraft Rules 1937, Rule 68: Rules of the Air in Indian Sovereign Territory.
  * DGCA CAR Section 8 Series C Part I: Visual Meteorological Conditions & All-Weather Flight Rules.
  * AIP India ENR 1.4: Air Traffic Services Airspace Classification and Separation Minima.`;
}

// =========================================================================
// 2. AVIATION METEOROLOGY (Monsoons, Kalbaishakhi, Fog, ILS Minima)
// =========================================================================
function generateMetExplanation(complexity, format, webGrounding) {
  if (format === 'paragraphs') {
    return `### ⛈️ Comprehensive Indian Tropical Aviation Meteorology & Low Visibility Standards

Operating across the subcontinent requires commercial pilots to master regional weather phenomena defined by the India Meteorological Department (IMD) and DGCA CAR Section 8 Series C. The aviation weather environment is dominated by seasonal monsoon circulations, pre-monsoon convective squalls, and severe winter low-visibility events in northern India.

**The Southwest (SW) Monsoon (June to September)** is triggered by intensive solar heating of the Tibetan Plateau, generating the upper-tropospheric Tibetan Anticyclone. Concurrently, the Inter-Tropical Convergence Zone (ITCZ) migrates northward across the Indo-Gangetic Plains, while the low-level Somali Jet (Findlater Jet) funnels massive moisture fluxes across the Arabian Sea. Aviation hazards include embedded Cumulonimbus (CB) extending up to 55,000 feet, severe low-level wind shear (LLWS), heavy continuous rain reducing visibility below 800 meters, and severe airframe icing above the freezing level (typically 16,000 to 18,000 ft AMSL).

**Nor'westers (Kalbaishakhi)** are violent pre-monsoon convective squalls developing between March and May over the Chota Nagpur Plateau, moving rapidly toward the southeast across West Bengal, Odisha, and Assam. With propagation speeds reaching 50 to 60 knots, they are accompanied by severe microburst downdrafts (> 4,000 fpm), roll clouds (Arctus), hail, and intense electrical activity. Under DGCA safety directives, flight crew must maintain a mandatory minimum lateral clearance of **20 Nautical Miles** from severe thunderstorm radar echoes.

**Low Visibility Operations (CAT IIIB) at Delhi (VIDP)**: During the winter months (December to February), mid-latitude Western Disturbances bring residual moisture across northwest India, triggering dense radiation and advection fog under clear nighttime anticyclonic conditions. Delhi Indira Gandhi International Airport operates Low Visibility Procedures (LVP) utilizing Category IIIB ILS:
- **CAT I**: Decision Height (DH) ≥ 200 ft, Runway Visual Range (RVR) ≥ 550 m.
- **CAT II**: DH 100 ft to 200 ft, RVR ≥ 300 m.
- **CAT IIIA**: DH < 100 ft (or no DH), RVR ≥ 175 m.
- **CAT IIIB**: DH < 50 ft (or no DH), RVR **50 m to less than 175 m**.
CAT IIIB autoland procedures require operational Surface Movement Guidance and Control Systems (SMGCS) and secondary power supply switchover within 1 second.`;
  }

  if (format === 'numbered') {
    return `### 📋 DGCA Aviation Meteorology Operational Steps & Minima:

1. **Southwest Monsoon Setup (June - September)**:
   - Driven by Tibetan Anticyclone and northward migration of the Monsoon Trough.
   - Low-level moisture transported by the Somali Jet (Findlater Jet).
   - Flight hazards: Embedded CB cells, localized squall lines, heavy tropical rain, and structural icing above the freezing level (~16,000 ft).
2. **Kalbaishakhi (Nor'wester) Avoidance Protocol**:
   - Time of occurrence: Pre-monsoon (March - May), predominantly between 1500 and 2000 IST.
   - Movement: From Northwest to Southeast across Bengal, Bihar, and Odisha at 50-60 kts.
   - Mandatory rule: Maintain minimum **20 NM lateral clearance** from radar thunderstorm cores.
3. **Western Disturbances & Winter Fog Mechanics**:
   - Origin: Extratropical cyclonic depressions from the Mediterranean Sea.
   - Impact: Dense radiation/advection fog over Delhi (VIDP), Lucknow, Amritsar (Dec - Feb).
   - Meteorological conditions: Calm winds (2-5 kts), high humidity, temperature drops to dewpoint (T - Td ≤ 1°C).
4. **ILS Precision Approach Categories (DGCA CAR Section 8)**:
   - **CAT I**: DH ≥ 200 ft, RVR ≥ 550 m.
   - **CAT II**: DH 100 - 200 ft, RVR ≥ 300 m.
   - **CAT IIIA**: DH < 100 ft (or no DH), RVR ≥ 175 m.
   - **CAT IIIB**: DH < 50 ft (or no DH), RVR 50 m to 175 m.
5. **Altimeter Subscale Setting Standards**:
   - **QNH**: Pressure referenced to Mean Sea Level; indicates aerodrome elevation on ground.
   - **QFE**: Pressure referenced to aerodrome datum; reads zero on runway touchdown.
   - **QNE**: Standard pressure setting (1013.25 hPa / 29.92 inHg); dialed passing Transition Altitude to read Flight Levels.`;
  }

  // Bullets
  return `### 📌 DGCA Meteorology High-Yield Memory Checklist:

- **Tropical Weather Phenomena**:
  * **SW Monsoon (June - Sept)**: Triggered by Tibetan Anticyclone; Somali Jet moisture feed; widespread embedded CB up to FL 500+.
  * **NE Monsoon (Oct - Dec)**: Affects Tamil Nadu, coastal Andhra Pradesh, and Rayalaseema.
  * **Nor'westers (Kalbaishakhi)**: Violent pre-monsoon squalls (March - May) moving Northwest to Southeast; minimum **20 NM lateral avoidance** mandatory.
  * **Western Disturbances (Dec - Feb)**: Mediterranean extratropical systems causing severe winter radiation fog in northern Indian airports (VIDP).
- **ILS Precision Approach Minima**:
  * **CAT I**: DH ≥ 200 ft, RVR ≥ 550 m.
  * **CAT II**: DH 100 ft - 200 ft, RVR ≥ 300 m.
  * **CAT IIIA**: DH < 100 ft (or no DH), RVR ≥ 175 m.
  * **CAT IIIB**: DH < 50 ft (or no DH), RVR **50 m ≤ RVR < 175 m** (Delhi VIDP standard).
- **Altimetry Datums in Indian Airspace**:
  * **QNH**: Aerodrome elevation above MSL when on the ground.
  * **QFE**: Height above airfield datum (0 ft on touchdown).
  * **QNE**: 1013.25 hPa / 29.92 inHg standard datum for Flight Levels above Transition Altitude.`;
}

// =========================================================================
// 3. AIR NAVIGATION (1-in-60 Rule, GAGAN SBAS, Earth Geometry)
// =========================================================================
function generateNavExplanation(complexity, format, webGrounding) {
  if (format === 'paragraphs') {
    return `### 🧭 Comprehensive DGCA Air Navigation: The 1-in-60 Rule & GAGAN Satellite Architecture

Air Navigation under the DGCA CPL/ATPL syllabus demands precision in mental dead-reckoning mathematics and modern Performance Based Navigation (PBN). The foundational mathematical tool for mental track correction is the **1-in-60 Rule**, derived from circular trigonometry where 1 radian (≈ 57.3°) is approximated as 60 degrees. Consequently, an angular displacement of 1° produces an arc length of 1 Nautical Mile over a baseline distance of 60 Nautical Miles:
Track Error Angle (TE) = (Distance Off Track × 60) / Distance Flown
Closing Angle (CA) = (Distance Off Track × 60) / Distance To Go
Total Heading Alteration = Track Error Angle + Closing Angle.

For example, if an aircraft has flown 120 NM along a planned track of 090° and fixes its position 4 NM Right of track with 60 NM remaining to destination:
- TE = (4 × 60) / 120 = 240 / 120 = 2° Right.
- CA = (4 × 60) / 60 = 240 / 60 = 4°.
- Total alteration required to fly directly to destination = 2° + 4° = 6° to the Left (New heading: 084°).

**GAGAN (GPS Aided GEO Augmented Navigation)** represents India's sovereign Satellite-Based Augmentation System (SBAS), jointly developed by the Airports Authority of India (AAI) and the Indian Space Research Organisation (ISRO). Operating across the Indian Flight Information Regions, GAGAN compensates for equatorial ionospheric delays via dual-frequency monitoring:
- **Space Segment**: Dedicated navigation payloads on geostationary satellites **GSAT-8 (PRN 127)**, **GSAT-10 (PRN 128)**, and **GSAT-15 (PRN 132)**.
- **Ground Segment**: 15 Indian Reference Stations (INRES) linked to the Indian Master Control Centre (INMCC) at Kundalahalli, Bengaluru.
- **Operational Status**: Certified for RNP 0.1 enroute navigation and Approach with Vertical Guidance (APV 1.0 / APV 1.5). Under **DGCA CAR Section 8 Series S Part VIII**, all aircraft registered in India on or after 1st July 2021 must be equipped with GAGAN avionics.`;
  }

  if (format === 'numbered') {
    return `### 📋 Step-by-Step Navigation Calculations & GAGAN Architecture:

1. **The 1-in-60 Geometric Rule**:
   - Principle: 1 NM off track at 60 NM flown equals a 1° Track Error.
   - Small angle tan approximation: tan(1°) ≈ 1/60 = 0.01667.
2. **Formula 1: Track Error Angle (TE)**:
   - TE (degrees) = (Distance Off Track in NM × 60) / Distance Flown in NM.
3. **Formula 2: Closing Angle (CA)**:
   - CA (degrees) = (Distance Off Track in NM × 60) / Distance To Go in NM.
4. **Formula 3: Total Correction to Destination**:
   - Alter Heading = TE + CA (applied into the wind towards the desired track).
5. **Earth Convergency and Great Circles**:
   - Earth Convergency = Change in Longitude (dLong) × sin(Mean Latitude).
   - Convergency at the Equator = 0°; Convergency at the Poles = dLong.
   - Conversion Angle = 1/2 × Earth Convergency (the angle between Great Circle and Rhumb Line).
6. **GAGAN SBAS System Specifications**:
   - Developers: Joint initiative of ISRO and Airports Authority of India (AAI).
   - Satellites: GSAT-8 (PRN 127), GSAT-10 (PRN 128), and GSAT-15 (PRN 132).
   - Ground Master Centre: INMCC located at Bengaluru (Kundalahalli).
   - DGCA Regulatory Mandate: Mandatory for all new Indian-registered aircraft post 1st July 2021 (CAR Sec 8 Ser S Part VIII).`;
  }

  // Bullets
  return `### 📌 DGCA Air Navigation High-Yield Revision Points:

- **1-in-60 Drift Formulas**:
  * **Track Error (TE)**: (Off-Track NM × 60) / Flown NM.
  * **Closing Angle (CA)**: (Off-Track NM × 60) / Remaining NM.
  * **Total Correction**: TE + CA (steered opposite to error direction).
  * **Parallel Track Heading**: Steer correction equal to TE only.
- **GAGAN SBAS Navigation System**:
  * **Agency**: Joint development by **AAI and ISRO**.
  * **Satellites**: GSAT-8 (PRN 127), GSAT-10 (PRN 128), GSAT-15 (PRN 132).
  * **Master Control**: INMCC Bengaluru (Kundalahalli).
  * **Capabilities**: Enables APV 1.0 precision approach without ground-based ILS beacons.
  * **Statutory Mandate**: CAR Section 8 Series S Part VIII requires GAGAN fitment on all aircraft registered on or after 1 July 2021.
- **Geodesy & Great Circle Navigation**:
  * **Earth Convergency**: dLong × sin(Mean Latitude).
  * **Conversion Angle**: 0.5 × Earth Convergency.
  * **Rhumb Line vs Great Circle**: In Northern Hemisphere, Great Circle lies North of Rhumb Line.`;
}

// =========================================================================
// 4. TECHNICAL GENERAL (Mach Tuck, Coffin Corner, TCAS II v7.1)
// =========================================================================
function generateTechGenExplanation(complexity, format, webGrounding) {
  if (format === 'paragraphs') {
    return `### ⚙️ High-Altitude Aerodynamics, Compressibility & TCAS II Version 7.1

In the DGCA Technical General and Principles of Flight syllabus, high-altitude jet transport operations require an advanced understanding of transonic compressibility and onboard collision avoidance avionics under CAR Section 8 Series S Part I.

**Transonic Shock Waves & Mach Tuck**: As an aircraft accelerates toward its Critical Mach Number (M_crit)—the freestream Mach number where local airflow across the wing upper surface first reaches Mach 1.0—a normal shock wave forms aft of the maximum camber. This generates a sharp adverse pressure gradient, causing shock-induced boundary layer separation. As speed increases, the shock wave and Center of Pressure move rearward, and the downwash angle behind the wing decreases, reducing download on the horizontal stabilizer. The resulting uncommanded, dangerous nose-down pitching moment is termed **Mach Tuck**. Modern jet transports incorporate automatic **Mach Trimmers** that deflect the stabilizer nose-up as Mach number increases.

**The Coffin Corner (Q-Corner)**: At high operational altitudes, low-speed aerodynamic stall speed (V_S) increases due to lower air density (V_S TAS increases) and transonic compressibility, while the high-speed Mach buffet limit (M_MO) decreases. At the absolute ceiling, the low-speed stall buffet and high-speed shock stall buffet converge into a narrow margin of a few knots. Flying 5 knots too slow causes an aerodynamic stall; flying 5 knots too fast induces severe shock stall and Mach Tuck.

**TCAS II Version 7.1 Mandate**: In accordance with DGCA CAR Section 8 Series S Part I and ICAO Annex 10, TCAS II v7.1 is mandatory for all turbine-engine aircraft exceeding 5,700 kg MTOW or carrying more than 19 passengers. TCAS computes collision risk using Tau (τ), the ratio of slant range to closure rate:
- Collision horizon τ < 25 to 35 seconds triggers a **Resolution Advisory (RA)**.
- **Critical v7.1 Improvement**: Replaced the ambiguous "Adjust Vertical Speed" RA with the clear, unequivocal **"LEVEL OFF, LEVEL OFF"** command.
- **Golden Operational Rule**: Pilots **MUST comply with the TCAS RA immediately**, even if the instruction directly contradicts an Air Traffic Control clearance. Initial pilot reaction time must be within **5 seconds** (or **2.5 seconds** for an RA reversal).`;
  }

  if (format === 'numbered') {
    return `### 📋 Technical General Operational Breakdown & TCAS Protocols:

1. **Critical Mach Number (M_crit)**:
   - Definition: The freestream Mach number where airflow locally reaches Mach 1.0.
   - Sweepback wings, supercritical airfoils, and area ruling increase M_crit.
2. **Mach Tuck Mechanics**:
   - Flow over wing forms a normal shock wave.
   - Center of Pressure drifts aft from 25% chord toward 50% chord.
   - Reduced wing downwash reduces tail download, causing severe nose-down pitch.
   - Mach Trimmer automatically applies nose-up stabilizer trim.
3. **Coffin Corner Boundary Conditions**:
   - V_S (low-speed stall) rises with altitude due to reduced air density.
   - M_MO / High-speed buffet boundary drops with altitude.
   - Safe operating margin narrows to 5-10 knots at aerodynamic ceiling.
4. **TCAS II Version 7.1 Architecture**:
   - Interrogates Mode S transponders at 1030 MHz and receives replies at 1090 MHz.
   - Tau calculation: τ = - (Slant Range / Closing Rate).
   - Traffic Advisory (TA): Issued at τ ≈ 40-48 s ("TRAFFIC, TRAFFIC").
   - Resolution Advisory (RA): Issued at τ ≈ 25-35 s (Climb, Descend, Level Off).
5. **Mandatory Pilot Action on TCAS RA**:
   - Disregard conflicting ATC clearances immediately.
   - Hand-fly or allow autopilot into the green fly-to arc within 5 seconds.
   - Notify ATC: "Delhi Radar, VT-ABC, TCAS RA".
   - Return to assigned ATC altitude once "CLEAR OF CONFLICT" sounds.`;
  }

  // Bullets
  return `### 📌 Technical General High-Yield Revision Points:

- **High Altitude Aerodynamics**:
  * **Critical Mach (M_crit)**: Freestream speed where local speed reaches Mach 1.0.
  * **Mach Tuck**: Aft movement of Center of Pressure and loss of downwash causing uncontrollable nose-down pitch; countered by **Mach Trimmer**.
  * **Coffin Corner**: Convergence of low-speed stall and high-speed Mach buffet at high altitudes.
- **TCAS II Version 7.1 Regulations (CAR Section 8 Series S Part I)**:
  * **Mandate**: Turbine aircraft MTOW > 5,700 kg or > 19 passenger seats.
  * **Key Upgrade**: "Adjust Vertical Speed" replaced by **"LEVEL OFF, LEVEL OFF"**.
  * **Reaction Time**: **5 seconds** for initial RA, **2.5 seconds** for reversal RA.
  * **Priority**: TCAS Resolution Advisory **STRICTLY OVERRIDES** conflicting ATC clearances.
  * **Phraseology**: "[Callsign], TCAS RA" upon maneuvering; "[Callsign], Clear of Conflict, resuming [altitude]" upon completion.`;
}

// =========================================================================
// 5. RADIO TELEPHONY RTR(A) (Emergency Codes, Distress/Urgency, WPC)
// =========================================================================
function generateRtrExplanation(complexity, format, webGrounding) {
  if (format === 'paragraphs') {
    return `### 📻 DGCA & WPC Radio Telephony RTR(A): Transponder Codes & Emergency Phraseology

Radio Telephony examinations conducted by the Wireless Planning & Coordination (WPC) wing and DGCA demand instantaneous recall of emergency SSR squawk codes, transmission priority structures, and standard ICAO Doc 9432 phraseology.

**Special Purpose Secondary Surveillance Radar (SSR) Codes**:
- **Squawk 7500**: Unlawful Interference (Aircraft Hijack). Indicates an illegal seizure of control.
- **Squawk 7600**: Radio Communication Failure (Loss of Two-Way Communication / NORDO).
- **Squawk 7700**: General Emergency / Distress (Immediate life-threatening situation or MAYDAY).
- Standard Pilot Mnemonic: *"75 - Taken alive; 76 - Technical fix; 77 - Going to heaven"*.

**Order of Priority of Radio Messages**:
1. **Distress Calls and Traffic (MAYDAY)**: The aircraft is threatened by grave and imminent danger and requests immediate assistance (spoken three times: "MAYDAY, MAYDAY, MAYDAY").
2. **Urgency Messages (PAN PAN)**: Concerns the safety of an aircraft, vehicle, or person, but does not require immediate assistance (spoken three times: "PAN PAN, PAN PAN, PAN PAN").
3. Communications relating to Direction Finding.
4. Flight Safety Messages (Air Traffic Control clearances).
5. Meteorological Messages.
6. Flight Regularity Messages.

**Lost Communication Procedure in Indian Airspace (AIP India ENR 1.6)**:
If an aircraft experiences radio failure in Visual Meteorological Conditions (VMC), the pilot must set squawk **7600**, continue flight in VMC, land at the nearest suitable aerodrome, and report arrival immediately to ATC. If in Instrument Meteorological Conditions (IMC), the pilot must maintain the last assigned speed and level for 20 minutes following failure to report over a compulsory reporting point, and thereafter adjust level and speed in accordance with the filed flight plan.`;
  }

  if (format === 'numbered') {
    return `### 📋 DGCA RTR(A) Step-by-Step Radio Protocols:

1. **Emergency Squawk Codes**:
   - **7500**: Hijacking / Unlawful Interference.
   - **7600**: Radio Failure / Communication Loss.
   - **7700**: General Emergency / Aircraft Distress.
2. **Standard Format for MAYDAY Transmission**:
   - Distress Signal: "MAYDAY, MAYDAY, MAYDAY".
   - Station Addressed: "DELHI RADAR".
   - Aircraft Identification: "AIR INDIA 101".
   - Aircraft Type: "BOEING 787".
   - Nature of Distress: "ENGINE FAILURE AND CARGO FIRE".
   - Pilot's Intentions: "FORCED DESCENT PASSING FL 140, RETURNING VIDP".
   - Present Position & Level: "35 NM SOUTH OF DELHI, HEADING 360".
   - Pilot Qualifications & POB: "POB 245, ENDURANCE 3 HOURS".
   - Transponder: "SQUAWKING 7700".
3. **Hierarchy of Radio Messages**:
   - Priority 1: Distress (MAYDAY).
   - Priority 2: Urgency (PAN PAN).
   - Priority 3: Direction Finding.
   - Priority 4: Flight Safety (ATC Clearances).
   - Priority 5: Meteorology (METAR/SIGMET).
   - Priority 6: Flight Regularity.
4. **Emergency Frequencies**:
   - International VHF Guard: **121.500 MHz**.
   - International UHF Military Guard: **243.000 MHz**.`;
  }

  // Bullets
  return `### 📌 DGCA RTR(A) High-Yield Revision Points:

- **Emergency SSR Transponder Codes**:
  * **7500**: Hijacking / Unlawful Interference.
  * **7600**: Radio Communication Failure (Lost Comm).
  * **7700**: General Distress / Emergency.
- **Distress vs Urgency**:
  * **MAYDAY (x3)**: Grave and imminent danger; absolute radio priority over all transmissions.
  * **PAN PAN (x3)**: Serious condition affecting safety, but not an immediate life threat.
- **Dedicated Guard Frequencies**:
  * Primary VHF Aeronautical Distress: **121.5 MHz**.
  * Military UHF Distress: **243.0 MHz**.
- **Radio Failure in VMC**:
  * Squawk **7600**.
  * Remain in VMC at all times.
  * Land at nearest suitable aerodrome.
  * Report landing immediately to air traffic services.`;
}

// =========================================================================
// 6. PROPELLER SYSTEMS & GOVERNOR MECHANICS
// =========================================================================
function generatePropellerExplanation(rawText, complexity, format, webGrounding) {
  if (format === 'paragraphs') {
    return `### 🚁 DGCA Technical General: Propeller Aerodynamics, Governor Mechanics & Critical Engine

Propeller theory forms a core component of the DGCA Technical General and Multi-Engine rating examinations under CAR Section 2 Series I and CAR Section 8 Series S. A variable-pitch propeller converts engine shaft torque into horizontal aerodynamic forward thrust while optimizing engine efficiency across varying operational airspeeds.

**Aerodynamic Blade Twist**: Because a propeller blade rotates about a central hub, tangential rotational velocity increases linearly from root to tip (V_rot = 2π · n · r). Consequently, the resultant inflow angle φ = arctan(TAS / 2πnr) decreases progressively toward the tip. To maintain an optimal, uniform local angle of attack (α = β - φ) along the entire span and prevent tip stalling, the blade is geometrically twisted, presenting a high blade angle at the root and a shallow blade angle at the tip.

**Hydraulic Governor Mechanics (Constant-Speed System)**: A constant-speed propeller system utilizes a mechanical-hydraulic governor comprising an engine-driven oil boost pump, rotating flyweights, and a pilot-controlled spool valve:
1. **On-Speed**: Centrifugal force on the flyweights exactly balances the compression of the speeder spring. The spool valve rests neutral, trapping oil inside the propeller pitch cylinder and holding blade pitch constant.
2. **Over-Speed**: As airspeed increases or engine load drops, flyweights tilt outward, lifting the spool valve to route high-pressure oil into the hub (in single-engine oil-to-increase systems), forcing the blades into a **coarser pitch (higher blade angle)**. This increases aerodynamic resistance, loading the engine and restoring commanded RPM.
3. **Under-Speed**: When aircraft climbs or airspeed drops, the speeder spring overcomes the flyweights, lowering the spool valve to drain oil from the hub, allowing counterweights to drive blades into a **finer pitch (lower blade angle)**, reducing drag and accelerating the engine back to target RPM.

**Critical Engine Identification (P-A-S-T Factors)**: In conventional twin-engine aircraft where both propellers rotate clockwise as viewed from the flight deck, failure of the **Left Engine** creates the most adverse directional control and climb performance penalty, making the **Left Engine the Critical Engine**:
- **P-Factor (Asymmetric Thrust Arm)**: The descending blade produces more thrust than the ascending blade. On the right engine, the descending blade is located further from the fuselage centerline (D_2 > D_1), creating a larger adverse yawing moment upon left engine failure.
- **Accelerated Slipstream**: The center of lift is displaced further outboard on the right wing, creating a larger rolling moment arm upon left engine loss.
- **Spiraling Slipstream**: Prop-wash from the left engine impinges on the vertical stabilizer to assist rudder authority; prop-wash from the right engine spirals away.
- **Torque Reaction**: Engine torque rolls the fuselage left; if the left engine fails, torque from the operating right engine aggravates the roll toward the dead engine.
- **Feathering Protocol**: In an engine failure, the propeller must be moved to **FEATHER (blade angle ≈ 90°)** immediately to eliminate catastrophic windmilling drag, which can degrade single-engine climb performance by 300 to 500 ft/min.`;
  }

  if (format === 'numbered') {
    return `### 📋 Step-by-Step Propeller Systems & Check-Ride Checklist:

1. **Blade Aerodynamic Design**:
   - Blade Twist: Compensates for V_tip > V_hub to equalize angle of attack along the blade.
   - Thrust vs Torque: Aerodynamic lift provides forward thrust; profile drag creates resistive torque.
2. **Three Operational States of the Constant Speed Governor**:
   - **On-Speed**: Centrifugal force of flyweights = Speeder spring tension. Spool valve neutral.
   - **Over-Speed**: Flyweights tilt OUT → Spool valve rises → High-pressure oil enters cylinder → Blades move to **Coarse Pitch** → RPM returns to datum.
   - **Under-Speed**: Speeder spring overcomes flyweights → Spool valve drops → Oil drains → Blades move to **Fine Pitch** → RPM accelerates to datum.
3. **Power Lever Sequencing Rule**:
   - Power Addition: **Props (RPM) First, Throttle Second**.
   - Power Reduction: **Throttle First, Props (RPM) Second**.
   - Rule prevents high manifold pressure combined with low RPM, avoiding engine detonation.
4. **Critical Engine Identification (P-A-S-T Mnemonic)**:
   - **P - P-Factor**: Right engine descending blade has a longer moment arm to the aircraft centerline.
   - **A - Accelerated Slipstream**: Displaces center of lift further outboard on right wing.
   - **S - Spiraling Slipstream**: Left engine wash strikes the rudder; right engine wash misses.
   - **T - Torque Reaction**: Right engine torque rolls aircraft left toward dead engine.
   - Conclusion: Left engine is always critical on conventional clockwise engines.
5. **Emergency Feathering Protocol (OEI Operations)**:
   - Identify dead engine ("Dead foot, dead engine").
   - Move prop lever past detent into **FEATHER** before RPM decays below anti-feathering latch speed (typically ~800 RPM).
   - Eliminates windmilling drag equivalent to a flat circular plate of propeller diameter.`;
  }

  // Bullets
  return `### 📌 Propeller Systems High-Yield DGCA Points:

- **Propeller Design Principles**:
  * **Blade Twist**: Equalizes angle of attack along the span to prevent tip stall.
  * **Constant-Speed System**: Speeder spring tension controlled by blue cockpit lever; throttle controls manifold pressure.
- **Hydraulic Governor Modes**:
  * **On-Speed**: Flyweights in equilibrium with speeder spring.
  * **Over-Speed**: High-pressure oil drives blades to **Coarse Pitch** (decreases RPM).
  * **Under-Speed**: Oil drains from hub, moving blades to **Fine Pitch** (increases RPM).
- **Critical Engine Factors (Clockwise Engines)**:
  * **Left Engine is Critical** due to P-Factor, Accelerated Slipstream, Spiraling Slipstream, and Torque Reaction.
  * Failure of left engine induces the maximum adverse yaw and highest Minimum Control Speed Airborne (V_MCA).
- **Feathering Safety Criteria**:
  * Feathered blade angle: **Approximately 90°** (parallel to relative airflow).
  * Windmilling propeller creates massive parasitic drag, destroying single-engine climb gradients.`;
}

// =========================================================================
// 7. ALTIMETRY & ATMOSPHERIC PRESSURE
// =========================================================================
function generateAltimetryExplanation(rawText, complexity, format, webGrounding) {
  if (format === 'paragraphs') {
    return `### 🌡️ DGCA Altimetry, Pressure Datums & Transition Layer Regulations (AIP India & CAR Sec 8)

Altimetry errors and atmospheric pressure adjustments represent one of the most heavily tested areas in DGCA examinations. Understanding the relationship between indicated, pressure, and true altitudes is vital for terrain clearance and standard separation.

**The Three Fundamental Pressure Settings**:
1. **QNH**: Atmospheric pressure adjusted to Mean Sea Level (MSL) based on standard atmospheric lapse rate. When an aircraft is on the ground at an aerodrome, an altimeter set to local QNH displays the **published aerodrome elevation**. QNH is legally mandatory for all flights operating at or below the Transition Altitude.
2. **QFE**: Atmospheric pressure measured at the aerodrome datum (or runway threshold). When set to QFE on the ground, the altimeter indicates **ZERO feet**. Used primarily in military aviation and specialized circuit training.
3. **QNE (Standard 1013.25 hPa / 29.92 inHg)**: Set upon climbing through the **Transition Altitude (TA)**. The altimeter then displays **Flight Levels (FL)**, guaranteeing standardized vertical separation between enroute aircraft regardless of local ground barometric variations.

**Indian Transition Layer Rules (AIP India ENR 1.7)**:
- **Transition Altitude (TA)**: Published in the AIP for each Indian aerodrome (e.g., 4,000 ft or 5,000 ft AMSL). Below TA, vertical position is expressed in Altitude (QNH).
- **Transition Level (TRL)**: The lowest available Flight Level above the Transition Altitude, calculated by ATC based on the prevailing regional QNH. If QNH drops below 995 hPa, TRL is raised to FL 55 or FL 65.
- **Transition Layer**: The airspace between TA and TRL. **Cruising in level flight within the transition layer is strictly prohibited in Indian airspace**.

**Temperature Deviations & True Altitude ("High to Low, Look Out Below")**:
Aneroid altimeters are calibrated strictly to the International Standard Atmosphere (ISA: 1013.25 hPa, 15°C, lapse rate 1.98°C/1,000 ft). When operating in cold air masses where ambient temperature is lower than ISA (ISA Deviation < 0), atmospheric layers contract:
True Altitude ≈ Indicated Altitude + 4 × (ISA Deviation in °C) × (Altitude in Thousands of Feet).
In cold weather, the altimeter significantly **over-reads**, meaning the aircraft is dangerously closer to terrain than indicated on the flight deck.`;
  }

  if (format === 'numbered') {
    return `### 📋 Step-by-Step Altimetry Rules & Formulas:

1. **Altimeter Subscale Settings**:
   - **QNH**: Mean Sea Level datum (reads elevation on ground).
   - **QFE**: Aerodrome elevation datum (reads zero on touchdown).
   - **QNE**: 1013.25 hPa / 29.92 inHg (reads Flight Levels for cruise).
2. **Transition Protocol**:
   - Climbing through Transition Altitude: Set **1013.25 hPa** and express altitude as Flight Levels.
   - Descending through Transition Level: Set **Local QNH** and express altitude in feet AMSL.
   - Cruising in the Transition Layer: Strictly **prohibited**.
3. **Pressure Altitude Calculation**:
   - Pressure Altitude = Indicated Altitude (at 1013.25) = Elevation + (1013.25 - QNH) × 30 ft.
4. **Density Altitude Calculation**:
   - Density Altitude = Pressure Altitude + 120 × (OAT - ISA Temperature).
5. **Temperature Error Rule**:
   - "From High to Low (Pressure or Temperature), Look Out Below!"
   - When temperature is below ISA, True Altitude is LOWER than Indicated Altitude.
   - True Altitude Correction = 4 ft per 1,000 ft per °C of ISA deviation.`;
  }

  // Bullets
  return `### 📌 DGCA Altimetry High-Yield Checklist:

- **Core Pressure Settings**:
  * **QNH**: Height above MSL; reads airport elevation on ground.
  * **QFE**: Height above runway threshold; reads 0 ft on ground.
  * **QNE**: Standard 1013.25 hPa (29.92 inHg); reads Flight Levels.
- **Transition Procedures in Indian FIRs**:
  * Transition Altitude (TA): Lowest altitude controlled by QNH.
  * Transition Level (TRL): Lowest FL assigned by ATC based on regional QNH.
  * Transition Layer: Flight in level cruise inside transition layer is strictly illegal.
- **Temperature & Pressure Errors**:
  * Flying into cold or low-pressure air makes altimeter **over-read** (danger of CFIT).
  * Correction formula: **4 ft per 1,000 ft per °C temperature deviation**.`;
}

// =========================================================================
// 8. CUSTOM USER NOTES SYNTHESIZER
// =========================================================================
function synthesizeCustomNotes(rawText, subject, complexity, format, webGrounding) {
  const lines = rawText.split('\n').filter(l => l.trim().length > 0);
  const sampleTerms = rawText.match(/[A-Z][A-Za-z0-9_-]{2,}/g) || ['Aviation', 'DGCA', 'CAR'];
  const uniqueTerms = Array.from(new Set(sampleTerms)).slice(0, 8);

  if (format === 'paragraphs') {
    return `### 📑 Comprehensive Study Dossier: Custom DGCA Ingestion

This technical briefing synthesizes your ingested study materials with current Directorate General of Civil Aviation (DGCA) India regulatory standards and CAR syllabi.

**Core Conceptual & Operational Tenets:**
The provided materials focus on key aeronautical principles including **${uniqueTerms.slice(0, 3).join(', ')}**. Under Indian Aircraft Rules 1937 and Civil Aviation Requirements (CARs), these operational elements demand strict adherence to standard operating procedures and flight deck checklists. Candidates preparing for DGCA Pariksha examinations must ensure both mathematical derivation accuracy and practical cockpit application.

**Operational Thresholds, Limitations & Standards:**
Operations governing these parameters are tightly linked to meteorological conditions, aircraft performance categories, and air traffic control separation standards across the Delhi, Mumbai, Kolkata, and Chennai FIRs. Strict monitoring of flight instruments, warning envelopes, and regulatory compliance is legally mandatory.

**DGCA Examination Pitfalls & Flight Instructor Advice:**
DGCA question banks frequently test borderline limits, unit conversions (meters vs feet, km vs nautical miles), and authority clearances. Always review manufacturer operating limitations (POH/AFM) alongside published AIP India supplements before flight operations.`;
  }

  if (format === 'numbered') {
    return `### 📋 Sequential DGCA Study Checklist: Ingested Notes

1. **Primary Operational Objective**: Master foundational principles including **${uniqueTerms[0] || 'Aviation Systems'}** in accordance with DGCA CPL/ATPL requirements.
2. **Statutory Regulatory Backing**: Ensure compliance with Aircraft Rules 1937 and relevant CAR Sections (Section 2 Airworthiness, Section 7 Flight Crew, Section 8 Operations).
3. **Key Technical Parameters**:
   - Extract and verify all numerical limitations and operational minimums.
   - Pay close attention to unit conversions between Metric and Imperial aviation standards.
4. **Emergency & Abnormal Procedures**: Identify any associated emergency protocols, immediate cockpit memory items, and mandatory ATC distress transmissions.
5. **Airspace & ATC Separation**: Verify whether procedures apply in controlled (Class C/D) or uncontrolled (Class G) airspace within Indian Flight Information Regions.
6. **Check-Ride Gotchas**: Watch for frequent DGCA Pariksha examination trick questions swapping legal visibility thresholds or misstating minimum obstacle clearances.`;
  }

  // Bullets
  return `### 📌 High-Yield DGCA Study Notes: Ingested Materials

- **Key Focus Topics**: **${uniqueTerms.join(' • ')}**.
- **Regulatory Framework**: Grounded under DGCA Civil Aviation Requirements (CARs) and Indian AIP enroute procedures.
- **Flight Deck Application**:
  * Verify all operating limitations against aircraft Flight Manual (AFM).
  * Maintain standard radio phraseology with Indian air traffic controllers.
  * Adhere to published transition altitudes and semicircular cruising levels.
- **Pariksha Exam Warning**: DGCA examiners consistently target subtle differences between standard ICAO guidelines and specific Indian sovereign AIP differences.`;
}
