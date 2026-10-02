// Comprehensive Indian DGCA Ground School Presets & Knowledge Base
// Grounded strictly in DGCA CARs, Aircraft Rules 1937, AIP India, and IMD Aviation Weather

export const DGCA_SUBJECTS = [
  { id: 'air_regs', name: 'Air Regulations', icon: 'Scale', carCode: 'Aircraft Rules 1937 / CAR Sec 7 & 8', color: 'sky' },
  { id: 'met', name: 'Aviation Meteorology', icon: 'CloudLightning', carCode: 'IMD Aviation / ICAO Annex 3', color: 'cyan' },
  { id: 'nav', name: 'Air Navigation', icon: 'Compass', carCode: 'AIP India ENR / CAR Sec 8 Ser S', color: 'amber' },
  { id: 'tech_gen', name: 'Technical General', icon: 'Cpu', carCode: 'CAR Sec 2 Airworthiness / CAR-145', color: 'emerald' },
  { id: 'rtr', name: 'Radio Telephony RTR(A)', icon: 'Radio', carCode: 'WPC COP / ICAO Annex 10 Doc 9432', color: 'indigo' },
];

export const DGCA_PRESETS = {
  'air_regs': {
    title: 'DGCA VFR Weather Minima & Class D/G Airspace Regulations in India',
    subject: 'air_regs',
    rawNotes: `DGCA India CAR Section 8 Series C Part I & Aircraft Rules 1937 (Rule 68):
- Indian Airspace is classified according to ICAO Annex 11: Classes D, E, and G. Class A/B/C are designated in controlled terminal/FIR zones.
- Visual Flight Rules (VFR) Weather Minima:
  * At and above 10,000 ft (3,050 m) AMSL:
    - Flight Visibility: 8 km (8,000 meters).
    - Distance from Cloud: 1,500 m horizontally, 1,000 ft (300 m) vertically.
  * Below 10,000 ft (3,050 m) AMSL and above 3,000 ft (900 m) AMSL (or above 1,000 ft above terrain, whichever is higher):
    - Flight Visibility: 5 km (5,000 meters).
    - Distance from Cloud: 1,500 m horizontally, 1,000 ft (300 m) vertically.
  * Below 3,000 ft (900 m) AMSL in Class G (Uncontrolled) Airspace:
    - Flight Visibility: 5 km (or 1.5 km for helicopters / low speed aircraft flying at 140 knots IAS or less).
    - Distance from Cloud: Clear of clouds and with the surface in sight at all times.
- Special VFR (SVFR) under DGCA India:
  * Permitted inside a Control Zone (CTR) during daytime only.
  * Ground visibility must not be less than 1,500 meters (or 800m for helicopters).
  * Ceiling not less than 600 feet (180 meters).
  * Continuous two-way radio communication with ATC on assigned VHF frequency mandatory.
- Indian Semi-Circular Cruising Levels:
  * Magnetic Track 000° to 179° (Eastbound): Odd Flight Levels + 500 ft for VFR (e.g., FL 55, FL 75, FL 95).
  * Magnetic Track 180° to 359° (Westbound): Even Flight Levels + 500 ft for VFR (e.g., FL 65, FL 85, FL 105).`,
    carReferences: [
      { code: 'Aircraft Rules 1937, Rule 68', title: 'Rules of the Air in Indian Sovereign Territory' },
      { code: 'CAR Section 8 Series C Part I', title: 'All Weather Operations & Visual Meteorological Conditions (VMC)' },
      { code: 'AIP India ENR 1.4', title: 'ATS Airspace Classification & Indian FIR Flight Rules' },
      { code: 'ICAO Annex 2 / Annex 11', title: 'Rules of the Air and Air Traffic Services Standards' }
    ],
    summaries: {
      eli5: `✈️ **VFR Basics for Indian Pilots (Like You're 5!):**
Imagine flying is like driving a bicycle in the sky. If you fly by looking outside through your cockpit window, that is called **VFR (Visual Flight Rules)**.

1. **The Giant Ruler Rule**: When you fly super high (above 10,000 feet, where the big jets cruise), you must be able to see at least **8 kilometers ahead**—like seeing 80 football fields in a row!
2. **Cloud Bubble**: You can't touch or hide inside fluffy clouds! You must stay at least 1,500 meters away sideways and 1,000 feet above or below them.
3. **Down Low in Quiet Country Skies (Class G)**: If you fly low near the trees (under 3,000 feet), you just have to stay completely **clear of clouds** and make sure you can always see the ground.
4. **Traffic Lanes**: Going East (towards Kolkata)? Pick an **Odd** level like FL 55. Going West (towards Mumbai)? Pick an **Even** level like FL 65 so planes never bump into each other!`,
      physics: `📐 **VFR Atmospheric & Kinematic Boundaries (Physics Graduate Perspective):**
Visual Meteorological Conditions (VMC) are defined to ensure human optical reaction time t_react coupled with aircraft kinematic closure rate V_closure allows adequate collision avoidance buffer:

1. **Optical Sight Line & Extinction Coefficients (Vis ≥ 8 km at ≥ 10,000 ft AMSL)**:
   - At high true airspeeds (TAS), closure rates between two opposing aircraft can exceed 400 m/s (M ≈ 0.6).
   - The 8 km visibility requirement provides approximately 20 seconds total decision time (t_decision = D / V_closure).
2. **Atmospheric Aerosol Boundary & Cloud Separation**:
   - Cloud boundaries harbor microphysical saturation droplets and localized turbulence gradients.
   - The required 1,500 m horizontal and 300 m (1,000 ft) vertical buffer ensures an aircraft emerging from a convective cloud will not encounter a VFR traffic conflict within standard visual scanning latency.
3. **Vector Vectoring via Semi-Circular Rule**:
   - Tracks 000° - 179° use (2n+1) × 1,000 + 500 ft AMSL.
   - Tracks 180° - 359° use (2n) × 1,000 + 500 ft AMSL, providing a continuous 1,000 ft vertical geometric separation between opposite-direction flights.`,
      instructor: `👨‍✈️ **Senior DGCA Flight Instructor Briefing (CPL / ATPL Standard):**
Pay close attention to these high-yield points that DGCA examiners repeatedly test in Pariksha Air Regulations:

- **VMC Thresholds by Altitude**:
  * **≥ 10,000 ft AMSL**: Mandatory **8 km flight visibility**. Cloud separation is **1,500 m horizontal and 1,000 ft vertical**. (Watch out for DGCA trick questions swapping 8 km with 5 km!).
  * **< 10,000 ft AMSL down to 3,000 ft AMSL (or 1,000 ft AGL)**: **5 km flight visibility**, maintaining the same 1,500 m / 1,000 ft cloud cushion.
  * **< 3,000 ft AMSL in Class G Airspace**: Flight visibility is 5 km. However, for aircraft operating at ≤ 140 knots indicated airspeed, minimum visibility is relaxed to **1,500 meters**, provided the aircraft remains **clear of clouds with the surface in sight**.
- **Special VFR (SVFR) Strict DGCA Constraints**:
  * Can **ONLY** be authorized within a Control Zone (CTR) by ATC.
  * Ceiling must be **≥ 600 ft (180 m)** and ground visibility **≥ 1,500 m** (DGCA CAR Sec 8 Ser C).
  * In India, SVFR is strictly **prohibited at night** unless specifically approved by DGCA Headquarters for specified operators.
- **Semi-Circular Rule in Indian FIRs**:
  * Eastbound (000° - 179° Magnetic): Odd Flight Levels + 500 ft (FL 55, 75, 95...).
  * Westbound (180° - 359° Magnetic): Even Flight Levels + 500 ft (FL 65, 85, 105...).`
    },
    diagrams: {
      flowchart: `graph TD
    A["VFR Flight in Indian Airspace"] --> B{"Is Altitude >= 10,000 ft AMSL?"}
    B -- "YES" --> C["VMC Minima:<br/>Visibility: 8 km<br/>Clouds: 1,500m H / 1,000ft V"]
    B -- "NO" --> D{"Is Altitude >= 3,000 ft AMSL or 1,000 ft AGL?"}
    D -- "YES" --> E["VMC Minima:<br/>Visibility: 5 km<br/>Clouds: 1,500m H / 1,000ft V"]
    D -- "NO (Below 3,000 ft)" --> F{"Controlled vs Uncontrolled Airspace?"}
    F -- "Class D / CTR" --> G["Standard: 5 km Vis<br/>Special VFR: 1,500m Vis & 600ft Ceiling"]
    F -- "Class G Uncontrolled" --> H["Speed <= 140 KIAS?<br/>Vis: 1,500m<br/>Clear of Clouds & Surface in Sight"]`,
      mindmap: `mindmap
  root((DGCA VFR Regulations))
    VMC Weather Minima
      Above 10000 ft
        8 km Visibility
        1500m Horizontal
        1000ft Vertical
      Below 10000 ft
        5 km Visibility
        1500m Horizontal
        1000ft Vertical
      Below 3000 ft Class G
        1500m if <= 140 kts
        Clear of Clouds
        Surface in Sight
    Special VFR Rules
      CTR Zone Only
      Daytime Only in India
      Ceiling >= 600 ft
      Visibility >= 1500 m
      ATC Clearance Mandatory
    Cruising Levels
      Track 000-179 Mag
        Odd + 500 ft (FL 55, 75)
      Track 180-359 Mag
        Even + 500 ft (FL 65, 85)
    Regulatory Backing
      Aircraft Rules 1937 R.68
      CAR Sec 8 Series C Part I
      AIP India ENR 1.4`,
      process: `graph LR
    P1["Flight Planning VFR"] --> P2["Check METAR/TAF at Station"]
    P2 --> P3{"Meets VMC Minima?"}
    P3 -- "No" --> P4{"Inside CTR & Day?"}
    P4 -- "Yes" --> P5["Request Special VFR<br/>(Vis >= 1.5km, CIG >= 600ft)"]
    P4 -- "No" --> P6["Cancel VFR / Divert / File IFR"]
    P3 -- "Yes" --> P7["Select Semicircular Cruising Level"]
    P7 --> P8["Maintain 2-Way ATC & VFR Watch"]`
    },
    quizzes: [
      {
        id: 'q1',
        question: 'Under DGCA Civil Aviation Requirements (CAR) Section 8 Series C, what is the minimum flight visibility required for a VFR flight operating at Flight Level 115 within Indian Airspace?',
        options: ['5 kilometers', '8 kilometers', '10 kilometers', '1.5 kilometers'],
        correctIndex: 1,
        explanation: 'According to DGCA CAR Section 8 Series C Part I and AIP India, at and above 10,000 ft (3,050 m) AMSL, the minimum flight visibility for VMC is 8 km (with 1,500 m horizontal and 1,000 ft vertical cloud separation). Below 10,000 ft AMSL, it reduces to 5 km.'
      },
      {
        id: 'q2',
        question: 'In India, an aircraft operating under Visual Flight Rules (VFR) in Class G airspace below 3,000 ft AMSL at an indicated airspeed of 130 knots must maintain what minimum cloud clearance?',
        options: [
          '1,500 meters horizontally and 1,000 feet vertically',
          'Clear of clouds and in sight of the ground or water',
          '3,000 meters horizontally and 500 feet vertically',
          '500 feet below cloud base and 1 nautical mile horizontal'
        ],
        correctIndex: 1,
        explanation: 'Under Indian Aircraft Rules and AIP ENR 1.4, when flying in Class G (uncontrolled) airspace at or below 3,000 ft AMSL (or 1,000 ft above terrain), if operating at 140 knots IAS or less, the pilot must remain "clear of clouds and with the surface in sight". The 1,500m/1,000ft buffer only applies at higher altitudes or higher airspeeds.'
      },
      {
        id: 'q3',
        question: 'What are the absolute minimum meteorological conditions required for ATC to authorize a Special VFR (SVFR) flight within an Indian Control Zone (CTR)?',
        options: [
          'Ground visibility not less than 5 km, ceiling not less than 1,000 ft',
          'Ground visibility not less than 1,500 m, ceiling not less than 600 ft',
          'Flight visibility not less than 800 m, ceiling not less than 300 ft',
          'Ground visibility not less than 3 km, ceiling not less than 800 ft'
        ],
        correctIndex: 1,
        explanation: 'DGCA CAR Section 8 stipulates that Special VFR may only be granted during daytime within a CTR if the ground visibility is not less than 1,500 meters (1.5 km) and the cloud ceiling is not less than 600 feet (180 m).'
      },
      {
        id: 'q4',
        question: 'A pilot is flying a VFR cross-country flight from Delhi (VIDP) to Mumbai (VABB) on a magnetic track of 210°. Which of the following is a legal VFR cruising level in Indian Airspace?',
        options: ['Flight Level 70', 'Flight Level 65', 'Flight Level 75', 'Flight Level 80'],
        correctIndex: 1,
        explanation: 'According to the Indian Semi-Circular cruising rules: For magnetic tracks between 180° and 359° (Westbound), VFR flights fly at Even Flight Levels + 500 ft (e.g. FL 45, FL 65, FL 85). FL 65 is an even level + 500 ft. FL 70 and FL 80 are IFR levels, and FL 75 is an eastbound VFR level.'
      },
      {
        id: 'q5',
        question: 'Under Indian Aircraft Rules 1937, what is the maximum permissible airspeed for VFR flights operating in Class D airspace below 10,000 ft AMSL unless otherwise authorized by ATC?',
        options: ['200 knots IAS', '250 knots IAS', '300 knots IAS', 'No speed limitation applies'],
        correctIndex: 1,
        explanation: 'In accordance with ICAO Annex 11 adopted in AIP India ENR 1.4, the maximum indicated airspeed (IAS) for all VFR and IFR operations below 10,000 ft AMSL in airspace classes C, D, E, and G is 250 knots IAS unless specifically approved otherwise by ATC.'
      }
    ]
  },
  'met': {
    title: 'Tropical Meteorology: Monsoons, Nor\'westers (Kalbaishakhi) & CAT IIIB at VIDP',
    subject: 'met',
    rawNotes: `DGCA Aviation Meteorology Syllabus & IMD (India Meteorological Department) Procedures:
- Southwest (SW) Monsoon (June to September):
  * Triggered by intense heating of Tibetan Plateau creating Tibetan Anticyclone.
  * Inter-Tropical Convergence Zone (ITCZ) shifts northward to Indo-Gangetic Plains.
  * Somali Jet (Findlater Jet) carries moist southwesterly flow from Indian Ocean.
  * Associated hazards: Severe embedded Cumulonimbus (CB), severe low-level turbulence, torrential rain reducing flight visibility < 800m.
- Nor'westers (Kalbaishakhi) in Gangetic West Bengal, Odisha, and Assam:
  * Highly violent pre-monsoon convective squalls (March to May).
  * Travel northwest to southeast at speeds up to 50-60 knots.
  * Hallmarks: Roll cloud (Arctus), microbursts, severe downdrafts exceeding 4,000 fpm, hail, extreme lightning.
- Western Disturbances (December to February):
  * Extratropical low pressure systems originating over Mediterranean Sea moving eastwards.
  * Cause widespread dense radiation/advection fog over northern Indian plains (Indira Gandhi International Airport VIDP, Amritsar, Lucknow).
- CAT IIIB ILS Operations at Delhi (VIDP):
  * Decision Height (DH): Below 50 ft (15 m) or NO Decision Height.
  * Runway Visual Range (RVR): Minimum 50 meters, up to 175 meters.
  * Requires Surface Movement Guidance and Control System (SMGCS) and centerline lighting.
- METAR / SPECI Decoding in India:
  * RVR format: R28/0150V0250D (Runway 28 RVR varying between 150m and 250m with downward trend).
  * Cavok: Visibility >= 10 km, no clouds below 5,000 ft or minimum sector altitude, no CB/TCU, no significant weather.`,
    carReferences: [
      { code: 'IMD CAMD Aviation Circular 2024', title: 'Civil Aviation Meteorological Procedures & Coding' },
      { code: 'DGCA CAR Section 8 Series C Part I', title: 'Low Visibility Operations (CAT II / CAT IIIA / CAT IIIB)' },
      { code: 'AIP India Supplement - VIDP LVO', title: 'Delhi Airport Low Visibility Procedures (LVP)' }
    ],
    summaries: {
      eli5: `⛈️ **Aviation Weather in India (Simple Pilot Guide):**
1. **The Great Summer Rain Monster (SW Monsoon)**: From June to September, giant wet winds blow from the Indian ocean onto the country. They build giant Cumulonimbus clouds (storm clouds) up to 50,000 feet!
2. **Kalbaishakhi (Nor'westers)**: In Kolkata and Bengal around April/May, black storm clouds strike suddenly from the North-West like thunder hammers. Always avoid these clouds by at least 20 nautical miles!
3. **Delhi Winter Fog (Western Disturbances)**: In December and January, cold damp air settles over Delhi airport (VIDP). Pilots cannot see their hands in front of their faces!
4. **CAT IIIB Magic**: Special super-accurate autopilots and radio beams allow modern airliners to land in Delhi even when visibility is as tiny as **50 meters** (half a runway width)!`,
      physics: `🌡️ **Thermodynamic & Synoptic Analysis (Physics Perspective):**
1. **Convective Available Potential Energy (CAPE) during Kalbaishakhi**:
   - High insolation over Chota Nagpur plateau generates extreme surface sensible heat flux.
   - Advection of warm moist air from the Bay of Bengal undercuts dry mid-tropospheric westerlies, creating explosive instability (CAPE > 3,500 J/kg, Lifted Index < -7).
   - Downdrafts driven by evaporative cooling generate density currents (gust fronts) with surface wind shifts exceeding 50 kts.
2. **Radiation Fog Mechanics at VIDP**:
   - Radiational cooling of the boundary layer under clear anticyclonic conditions behind a Western Disturbance.
   - Temperature drops to dewpoint (T - T_d ≤ 1°C) in a calm wind regime (2-5 kts optimal for mixing without dispersion).
   - Aerosol particle concentration acts as cloud condensation nuclei (CCN), resulting in high optical extinction coefficients (Vis < 100 m).`,
      instructor: `👨‍✈️ **DGCA Flight Instructor Briefing - Meteorology High-Yield Points:**
- **Monsoon Depression Trajectory**: SW Monsoon depressions form in the Head Bay of Bengal and move West-Northwest along the monsoon trough, delivering torrential precipitation to Central India.
- **Nor'wester (Kalbaishakhi) Recognition**:
  * Originates from the **Northwest quadrant** (hence Nor'wester).
  * Peak activity: **Afternoon to early evening (1500 to 2000 IST)**.
  * Aircraft must maintain a minimum **20 NM lateral clearance** from severe thunderstorm echoes.
- **CAT IIIB Precision Approach Minimums (DGCA Exam Favorite)**:
  * **CAT I**: DH ≥ 200 ft, RVR ≥ 550 m.
  * **CAT II**: DH 100 ft - 200 ft, RVR ≥ 300 m.
  * **CAT IIIA**: DH < 100 ft (or no DH), RVR ≥ 175 m.
  * **CAT IIIB**: DH < 50 ft (or no DH), RVR **50 m ≤ RVR < 175 m**.
- **Altimeter Subscale Rules in India**:
  * **QNH**: Altimeter reads elevation above mean sea level when on the ground.
  * **QFE**: Altimeter reads height above airfield datum (reads ZERO on runway touch-down zone).
  * **QNE**: 1013.25 hPa set when climbing through Transition Altitude (reads Flight Levels).`
    },
    diagrams: {
      flowchart: `graph TD
    A["Approaching VIDP Delhi in Winter Fog"] --> B{"Current RVR at Touchdown Zone?"}
    B -- "RVR >= 550m" --> C["Fly Standard CAT I ILS<br/>(Decision Height: 200 ft)"]
    B -- "300m <= RVR < 550m" --> D["Fly CAT II ILS<br/>(Decision Height: 100 ft)"]
    B -- "175m <= RVR < 300m" --> E["Fly CAT IIIA ILS<br/>(DH < 100 ft or No DH)"]
    B -- "50m <= RVR < 175m" --> F["Execute CAT IIIB Autoland<br/>(DH < 50 ft, Auto-rollout)"]
    B -- "RVR < 50m" --> G["Below All Landing Minima<br/>Initiate Go-Around to Alternate (Jaipur/Lucknow)"]`,
      mindmap: `mindmap
  root((DGCA Aviation Met))
    Tropical Systems
      SW Monsoon
        June to Sept
        Somali Jet
        Tibetan Anticyclone
        Heavy Embedded CB
      NE Monsoon
        Oct to Dec
        Impacts Tamil Nadu & Coastal AP
      Nor'westers Kalbaishakhi
        March to May
        Gangetic Plains & Bengal
        Severe Microbursts
        Afternoon Squalls
    Low Visibility & Fog
      Western Disturbances
        Winter Dec-Feb
        Dense Radiation Fog
      CAT IIIB Minima
        RVR 50m to 175m
        DH < 50 ft or None
        VIDP Delhi primary hub
    Altimetry & Pressures
      QNH - Elevation AMSL
      QFE - Height Above Aerodrome
      QNE - 1013.25 hPa Standard FL`,
      process: `graph LR
    S1["Western Disturbance Passes VIDP"] --> S2["Night Clear Skies & Calm Winds (2-5 kts)"]
    S2 --> S3["Rapid Ground Radiational Cooling"]
    S3 --> S4["Temperature drops to Dewpoint (T = Td)"]
    S4 --> S5["Aerosols + Moisture form Dense Radiation Fog"]
    S5 --> S6["LVP (Low Visibility Procedures) Initiated at Airport"]`
    },
    quizzes: [
      {
        id: 'qm1',
        question: 'What are the prescribed Runway Visual Range (RVR) limits for an ILS Category IIIB (CAT IIIB) precision approach under DGCA CAR Section 8?',
        options: [
          'RVR not less than 300 meters',
          'RVR between 175 meters and 300 meters',
          'RVR between 50 meters and 175 meters',
          'RVR not less than 550 meters'
        ],
        correctIndex: 2,
        explanation: 'Under DGCA CAR Section 8 Series C Part I, Category IIIB operations permit approaches with a Decision Height lower than 50 ft (15 m), or no Decision Height, and a Runway Visual Range (RVR) of 50 meters to less than 175 meters.'
      },
      {
        id: 'qm2',
        question: 'Nor\'westers (locally called Kalbaishakhi) observed in Bengal, Odisha, and Assam during the pre-monsoon season generally move in which direction?',
        options: [
          'From Southwest to Northeast',
          'From Northwest to Southeast',
          'From East to West',
          'From South to North'
        ],
        correctIndex: 1,
        explanation: 'Nor\'westers originate in the Chota Nagpur plateau and move predominantly from the Northwest towards the Southeast (hence the name Nor\'wester).'
      },
      {
        id: 'qm3',
        question: 'When an aircraft altimeter subscale is set to QFE at Indira Gandhi International Airport (VIDP, elevation 777 ft AMSL), what will the altimeter indicate upon touchdown on the runway?',
        options: [
          '777 feet',
          'Zero feet',
          '1013.25 feet',
          'Pressure altitude'
        ],
        correctIndex: 1,
        explanation: 'QFE is the atmospheric pressure at aerodrome elevation (or runway threshold). When an altimeter is set to QFE, it indicates height above that reference datum, which reads 0 feet upon touchdown.'
      },
      {
        id: 'qm4',
        question: 'Which synoptic weather feature is primarily responsible for generating the dense winter fog and light precipitation over Northern India between December and February?',
        options: [
          'Tropical Easterly Jet Stream',
          'Western Disturbances originating from the Mediterranean region',
          'Somali Low-Level Jet',
          'Depressions from the Arabian Sea'
        ],
        correctIndex: 1,
        explanation: 'Western Disturbances are shallow extratropical cyclonic circulations that travel eastwards from the Mediterranean across the Middle East into Northwest India, causing extensive radiation and advection fog in the Indo-Gangetic plains.'
      }
    ]
  },
  'nav': {
    title: '1-in-60 Rule Calculations & GAGAN Augmented Navigation',
    subject: 'nav',
    rawNotes: `DGCA Air Navigation Syllabus (General Navigation & Radio Aids):
- The 1-in-60 Rule:
  * Trigonometric approximation: 1 NM off track after 60 NM flown represents a 1° Track Error (since tan(1°) ≈ 1/60 = 0.01667).
  * Formulae:
    1. Track Error Angle (TE) = (Distance Off Track × 60) / Distance Flown
    2. Closing Angle (CA) = (Distance Off Track × 60) / Distance To Go
    3. Total Correction to Steer to Destination = Track Error Angle + Closing Angle
- GAGAN (GPS Aided GEO Augmented Navigation):
  * Developed jointly by Airports Authority of India (AAI) and Indian Space Research Organisation (ISRO).
  * Space Segment: GSAT-8 (PRN 127), GSAT-10 (PRN 128), and GSAT-15 (PRN 132).
  * Ground Segment: 15 Indian Reference Stations (INRES), Master Control Centre (INMCC) at Bengaluru, and Indian Navigation Land Uplink Stations (INLUS).
  * Performance: Provides APV 1.0 / APV 1.5 and Category I precision approach capability over the entire Indian Flight Information Regions (FIRs).
  * DGCA Mandate (CAR Section 8 Series S Part VIII): All aircraft registered in India on or after 1st July 2021 must be equipped with GAGAN-enabled avionics.
- Convergence and Great Circles:
  * Earth Convergency = Change in Longitude (dLong) × sin(Mean Latitude).
  * Convergency on Equator = 0. Convergency at Poles = dLong.
  * Conversion Angle = 1/2 × Earth Convergency.
  * Rhumb line cuts all meridians at the same constant angle; Great circle represents the shortest distance between two points on the sphere.`,
    carReferences: [
      { code: 'DGCA CAR Section 8 Series S Part VIII', title: 'Mandatory GAGAN Equipment for Indian Registered Aircraft' },
      { code: 'AIP India ENR 4.1', title: 'Radio Navigation Aids & SBAS (GAGAN) Implementation' },
      { code: 'ICAO Doc 9613', title: 'Performance Based Navigation (PBN) Manual' }
    ],
    summaries: {
      eli5: `🧭 **Navigation Secrets for Future Pilots:**
1. **The Magic 1-in-60 Trick**: If you are flying to Jaipur and after 60 miles you find you are 1 mile off to the right, your compass heading was wrong by exactly **1 degree**!
2. **How to Get Back on Track**:
   - Step 1: Turn your plane back by the mistake you made (Track Error).
   - Step 2: Turn a little extra to aim straight at your target airport (Closing Angle). Add them together and turn your steering wheel!
3. **GAGAN (India's Super GPS)**:
   - India's ISRO and AAI put special satellites (GSAT-8 and GSAT-10) in space that make GPS super-accurate down to a few centimeters!
   - Now pilots can land safely at mountain airports like Shimla or Leh even in cloudy weather!`,
      physics: `📐 **Mathematical Derivation & Geodetic Principles:**
1. **Small-Angle Approximation of 1-in-60**:
   - For an arc length s on a circle of radius R: s = R · θ (radians).
   - Since 1 radian = 180° / π ≈ 57.2958° ≈ 60°:
   - Therefore, θ° ≈ (s × 60) / R.
   - Substituting s = Distance Off Track and R = Distance Flown, we get:
     Track Error (TE)° = (Distance Off Track × 60) / Distance Flown
     Closing Angle (CA)° = (Distance Off Track × 60) / Distance To Go
     Alter Heading = TE + CA
2. **GAGAN Differential Ionospheric Delay Correction**:
   - The equatorial ionosphere over India suffers from severe Equatorial Ionospheric Anomaly (EIA) and plasma bubbles.
   - GAGAN uses dual-frequency measurements from 15 Indian Reference Stations (INRES) to compute grid ionospheric vertical delays (GIVD) broadcast via geostationary PRN 127/128/132.`,
      instructor: `👨‍✈️ **Senior DGCA Navigation Instructor High-Yield Points:**
- **Step-by-step 1-in-60 Calculation**:
  * *Example Exam Question*: "You have flown 120 NM and are 4 NM right of track. Destination is 60 NM ahead. What heading change is needed to fly directly to destination?"
  * TE = (4 × 60) / 120 = 240 / 120 = 2°.
  * CA = (4 × 60) / 60 = 240 / 60 = 4°.
  * Total Correction = 2° + 4° = 6° to the LEFT.
- **GAGAN System Architecture (Tested in Tech Gen & Nav)**:
  * Built jointly by **ISRO and AAI**.
  * Space satellites: **GSAT-8, GSAT-10, GSAT-15**.
  * Ground INMCC is located at **Bengaluru (Kundalahalli)**.
  * In India, GAGAN delivers **APV 1.0** approaches (Approach with Vertical Guidance).
- **Rhumb Line vs Great Circle**:
  * Great circle track changes continuously except along the Equator and Meridians.
  * In the Northern Hemisphere, Great Circle lies to the **North** of the Rhumb line.`
    },
    diagrams: {
      flowchart: `graph TD
    A["Aircraft Off Track Detected"] --> B["Compute Track Error Angle (TE):<br/>TE = (Off-Track Dist * 60) / Dist Flown"]
    B --> C["Compute Closing Angle (CA):<br/>CA = (Off-Track Dist * 60) / Dist To Go"]
    C --> D{"Goal: Parallel Track OR Fly to Destination?"}
    D -- "Parallel Original Track" --> E["Alter Heading by TE towards track"]
    D -- "Fly Direct to Destination" --> F["Alter Heading by (TE + CA) towards track"]
    F --> G["Cross-check with GAGAN GNSS Avionics"]`,
      mindmap: `mindmap
  root((DGCA Air Navigation))
    1 in 60 Rule
      TE = Off-Track x 60 / Flown
      CA = Off-Track x 60 / To Go
      Total Alteration = TE + CA
      Small Angle tan approximation
    GAGAN System
      Joint ISRO + AAI
      Space Segment
        GSAT-8 PRN 127
        GSAT-10 PRN 128
        GSAT-15 PRN 132
      Ground Segment
        15 INRES Stations
        INMCC Bengaluru
      Mandated post July 2021
    Earth Geometry
      Earth Convergency = dLong x sin(Lat)
      Conversion Angle = 1/2 Convergency
      Great Circle = Shortest Path
      Rhumb Line = Constant Heading`,
      process: `graph LR
    G1["GPS Constellation Broadcasts Signal"] --> G2["15 Indian Reference Stations (INRES) Detect Ionospheric Delay"]
    G2 --> G3["INMCC Bengaluru Computes Correction Vector"]
    G3 --> G4["Uplinked via INLUS to GSAT-8/10/15"]
    G4 --> G5["Aircraft GAGAN Receiver achieves Sub-Meter Precision"]`
    },
    quizzes: [
      {
        id: 'qn1',
        question: 'After flying 90 NM along a planned track of 085°, an aircraft fixes its position 3 NM to the right of track. The remaining distance to destination is 45 NM. What heading must the pilot steer to fly directly to the destination?',
        options: ['089°', '079°', '081°', '091°'],
        correctIndex: 1,
        explanation: 'Track Error (TE) = (3 × 60) / 90 = 180 / 90 = 2° Right. Closing Angle (CA) = (3 × 60) / 45 = 180 / 45 = 4°. Total correction = 2° + 4° = 6° to the Left. New heading to steer = 085° - 6° = 079°.'
      },
      {
        id: 'qn2',
        question: 'Under DGCA regulations, which joint bodies developed GAGAN (GPS Aided GEO Augmented Navigation) for Indian sovereign airspace?',
        options: [
          'DRDO and Indian Air Force',
          'Airports Authority of India (AAI) and Indian Space Research Organisation (ISRO)',
          'DGCA and Ministry of Civil Aviation',
          'National Aerospace Laboratories (NAL) and HAL'
        ],
        correctIndex: 1,
        explanation: 'GAGAN was conceived and deployed jointly by the Airports Authority of India (AAI) and the Indian Space Research Organisation (ISRO) to provide seamless satellite-based augmentation across Indian Flight Information Regions (FIRs).'
      },
      {
        id: 'qn3',
        question: 'At Latitude 30° North, what is the Earth Convergency between two longitudes separated by 20°?',
        options: ['20°', '10°', '17.32°', '5°'],
        correctIndex: 1,
        explanation: 'Earth Convergency = Change in Longitude × sin(Latitude). Convergency = 20° × sin(30°) = 20° × 0.5 = 10°.'
      }
    ]
  },
  'tech_gen': {
    title: 'High Altitude Aerodynamics: Mach Tuck, Coffin Corner & TCAS II v7.1',
    subject: 'tech_gen',
    rawNotes: `DGCA Technical General (Principles of Flight & Aircraft Systems):
- High Altitude Aerodynamics:
  * Critical Mach Number ($M_{crit}$): The free-stream Mach number at which airflow over any part of the aircraft first reaches the speed of sound (Mach 1.0).
  * Shock Stall / Mach Tuck: As speed exceeds $M_{crit}$, a normal shock wave forms on the upper wing surface, causing boundary layer separation. The center of pressure moves aft, and downwash over the horizontal stabilizer decreases, causing an uncontrollable nose-down pitching moment called **Mach Tuck**.
  * Coffin Corner (Q-Corner): At high altitudes, low indicated stall speed ($V_S$) increases with altitude (due to lower density and compressibility), while high-speed buffet limit ($M_{MO}$) decreases. The margin between low speed stall and high speed shock stall narrows to a few knots.
- TCAS II Version 7.1 Mandate under DGCA CAR Section 8 Series S Part I:
  * Mandated for all turbine-engine airplanes having a maximum certificated take-off mass exceeding 5,700 kg or authorized to carry more than 19 passengers.
  * Critical safety improvement over Version 7.0: Replaced the confusing "Adjust Vertical Speed" RA with the clear, unequivocal "Level Off, Level Off" aural advisory.
  * Reversal RA logic: If one aircraft fails to comply with an RA, TCAS II v7.1 can coordinate a reversal RA (e.g. converting a Climb RA to a Descend RA).
  * Pilot Action on TCAS RA: Follow the RA immediately, disregard conflicting ATC instructions, notify ATC as soon as practical ("Delhi Radar, VT-ABC, TCAS RA").`,
    carReferences: [
      { code: 'DGCA CAR Section 8 Series S Part I', title: 'Airborne Collision Avoidance System (ACAS II / TCAS II v7.1)' },
      { code: 'DGCA CAR Section 2 Series I Part V', title: 'Flight Data Recorders & Aircraft Cockpit Instrumentation' },
      { code: 'ICAO Annex 10 Vol IV', title: 'Surveillance and Collision Avoidance Systems' }
    ],
    summaries: {
      eli5: `✈️ **How Big Jets Fly High and Avoid Crashes:**
1. **Mach Tuck (The Nose Dip)**: When jet planes fly super fast near the speed of sound, invisible air walls (shockwaves) form on the wings. This pushes the plane's nose down. Modern jets have computer trim systems called "Mach Trimmers" that automatically keep the nose up!
2. **The Dangerous Coffin Corner**: High up at 40,000 feet, if you fly just 5 knots too slow, you fall out of the sky (stall). If you fly 5 knots too fast, shockwaves break your wings. Pilots must stay in a tiny sweet spot!
3. **TCAS II v7.1 (Your Cockpit Guardian)**:
   - If another airplane gets dangerously close, your cockpit computer shouts **"CLIMB, CLIMB!"** while telling the other pilot **"DESCEND, DESCEND!"**
   - In India, by law, you MUST obey this computer voice even if the human air traffic controller tells you to do the opposite!`,
      physics: `🚀 **Compressibility & Wave Drag Dynamics:**
1. **Shock Wave Genesis and Center of Pressure Drift**:
   - As $M_\infty \to M_{crit}$, local acceleration over the maximum camber induces supersonic velocity ($M_{local} > 1$).
   - Recompression to subsonic velocity produces a normal shock wave. The severe adverse pressure gradient causes shock-induced boundary layer separation.
   - The resultant loss of aft circulation shifts the aerodynamic center ($AC$) from $25\% \bar{c}$ aft toward $50\% \bar{c}$, generating a powerful nose-down pitching moment:
     $$\Delta C_m = -C_L \cdot \Delta x_{cp}$$
2. **TCAS II v7.1 Tau ($\tau$) Dimension**:
   - TCAS computes collision risk using Tau ($\tau$), the ratio of slant range to range closure rate:
     $$\tau = -\frac{r}{\dot{r}}$$
   - When $\tau < 25\text{ to }35\text{ seconds}$, a Resolution Advisory (RA) is triggered.`,
      instructor: `👨‍✈️ **DGCA Flight Instructor Technical General Review:**
- **Mach Trimmer Failure Procedure**: If the Mach Trimmer is inoperative, the aircraft operating ceiling or maximum Mach number is restricted (usually to $M_{MO} - 0.05$ or specific MEL limits).
- **TCAS II Version 7.1 Golden Rules (DGCA Pariksha Guaranteed Question)**:
  * In the event of a conflict between an **ATC clearance** and a **TCAS Resolution Advisory (RA)**, the pilot **MUST comply with the TCAS RA immediately**.
  * TCAS v7.1 changed "Adjust Vertical Speed" to **"LEVEL OFF, LEVEL OFF"**.
  * The time available to respond to an initial RA is **5 seconds**, and for a reversal RA is **2.5 seconds**.`
    },
    diagrams: {
      flowchart: `graph TD
    A["Traffic Collision Threat Detected"] --> B{"Tau (Range / Closure Rate) < 35 sec?"}
    B -- "Traffic Advisory (TA)" --> C["Aural: 'TRAFFIC, TRAFFIC'<br/>Visually scan traffic display"]
    B -- "Resolution Advisory (RA)" --> D{"Does RA Conflict with ATC Clearance?"}
    D -- "YES" --> E["DISREGARD ATC!<br/>Follow TCAS RA within 5 seconds"]
    D -- "NO" --> E
    E --> F["Fly into Green Fly-To arc on PFD / VSI"]
    F --> G["Report to ATC: 'Callsign, TCAS RA'"]
    G --> H["Clear of Conflict: Return to assigned ATC level"]`,
      mindmap: `mindmap
  root((DGCA Tech Gen High Altitude))
    Aerodynamics
      Critical Mach Mcrit
      Mach Tuck
        Aft CP shift
        Reduced downwash
        Mach Trimmer compensation
      Coffin Corner
        Vs increases with altitude
        Mmo decreases
        Narrow aerodynamic envelope
    TCAS II v7.1 CAR Sec 8
      Mandatory for MTOW > 5700kg
      Level Off aural replaces Adjust VS
      Response time: 5s initial, 2.5s reversal
      Priority: TCAS RA overrides ATC`
    },
    quizzes: [
      {
        id: 'qt1',
        question: 'Under DGCA CAR Section 8 Series S Part I, what is the mandatory pilot action when an Air Traffic Controller issues a descent clearance that directly contradicts a TCAS II Resolution Advisory (RA) to climb?',
        options: [
          'Follow the ATC clearance since human controllers have radar separation',
          'Follow the TCAS RA immediately and notify ATC as soon as practical',
          'Ask ATC for confirmation before taking any vertical action',
          'Level off and request immediate clarification from both aircraft'
        ],
        correctIndex: 1,
        explanation: 'DGCA regulations and ICAO Doc 8168 stipulate that pilots must follow a TCAS Resolution Advisory immediately, even if it contradicts an ATC clearance. The controller cannot see the onboard collision avoidance computations.'
      },
      {
        id: 'qt2',
        question: 'What aerodynamic phenomenon causes "Mach Tuck" in high-speed jet transport aircraft as speed exceeds Critical Mach Number (Mcrit)?',
        options: [
          'Forward shift of the Center of Pressure causing an uncontrollable pitch-up',
          'Rearward movement of the shock wave and Center of Pressure combined with decreased downwash on the horizontal stabilizer',
          'Flow separation on the rudder causing directional instability',
          'Engine thrust reduction caused by compressor stall at supersonic intake speeds'
        ],
        correctIndex: 1,
        explanation: 'Mach Tuck occurs when the shock wave forms on the upper wing surface and moves rearward with increasing speed, shifting the Center of Pressure aft and reducing the downwash over the tailplane, inducing an uncommanded pitch-down.'
      }
    ]
  },
  'rtr': {
    title: 'Distress, Urgency & Indian Transponder Emergency Codes (WPC/DGCA)',
    subject: 'rtr',
    rawNotes: `DGCA & WPC India Radio Telephony RTR(A) Protocols:
- Emergency Transponder Mode 3/A Squawk Codes:
  * **7500**: Hijacking / Unlawful Interference with aircraft.
  * **7600**: Radio Failure / Loss of Two-Way Communication (NORDO).
  * **7700**: General Distress / Emergency (MAYDAY situation).
- Priority of Radio Messages (ICAO Annex 10 Doc 9432):
  1. Distress calls, distress messages, and distress traffic (MAYDAY).
  2. Urgency messages (PAN PAN).
  3. Communications relating to direction finding.
  4. Flight safety messages (Air Traffic Control clearances).
  5. Meteorological messages.
  6. Flight regularity messages.
- Standard Indian Distress Transmission Format:
  "MAYDAY, MAYDAY, MAYDAY. Delhi Radar, Air India 101, Boeing 787, Engine Failure and Fire, Forced Descent Passing FL 180, Heading 120, POB 242, Endurance 3 Hours, Squawking 7700."`,
    carReferences: [
      { code: 'WPC Ministry of Communications', title: 'Certificate of Proficiency in Radio Telephony RTR(A)' },
      { code: 'DGCA CAR Section 8 Series S Part II', title: 'SSR Transponder Operating Procedures in Indian Airspace' }
    ],
    summaries: {
      eli5: `📻 **Radio Codes Pilots Must Never Forget:**
- **7500 - Man with a gun**: Somebody hijacked the airplane!
- **7600 - Radio nix**: Your radio broke and nobody can hear you!
- **7700 - Falling from heaven**: Big emergency like an engine fire!
- **MAYDAY x3**: Utmost danger, immediate help needed.
- **PAN PAN x3**: Serious problem (like low fuel or sick passenger), but the plane is still safely flying.`,
      physics: `📡 **Radio Propagation & SSR Interrogation:**
- Secondary Surveillance Radar (SSR) pulses operate at 1030 MHz (Interrogation from ground station) and 1090 MHz (Aircraft reply).
- Mode 3/A encodes 12-bit framing pulses giving 4096 discrete octal codes ($8^4 = 4096$).
- Special Pulse Position (SPI) or Ident pulse is triggered when pilot presses IDENT button on audio panel.`,
      instructor: `👨‍✈️ **DGCA Flight Instructor RTR(A) Checklist:**
- Memorize the mnemonic: **75 - Taken alive (Hijack), 76 - Technical fix (Radio failure), 77 - Going to heaven (Emergency)**.
- If suffering complete radio failure in VMC within Indian airspace:
  * Set transponder to **7600**.
  * Continue flight in VMC, land at nearest suitable aerodrome, and report arrival immediately to ATC.`
    },
    diagrams: {
      flowchart: `graph TD
    A["In-Flight Emergency Occurs"] --> B{"Life-Threatening Immediate Danger?"}
    B -- "YES" --> C["Transmit MAYDAY x3 on Guard 121.5 / ATC<br/>Squawk 7700"]
    B -- "NO (Urgent Situation)" --> D["Transmit PAN PAN x3<br/>State Nature of Problem"]
    D --> E["Maintain Altitude & Request ATC Priority"]
    C --> F["State Position, POB, Fuel Remaining, Intentions"]`,
      mindmap: `mindmap
  root((DGCA RTR(A) Radio Rules))
    Transponder Codes
      7500 Hijacking
      7600 Radio Failure
      7700 General Distress
    Priority Calls
      1. Distress MAYDAY
      2. Urgency PAN PAN
      3. Direction Finding
      4. Flight Safety ATC
      5. MET Messages
    Emergency Frequencies
      121.5 MHz VHF Guard
      243.0 MHz Military Guard`
    },
    quizzes: [
      {
        id: 'qr1',
        question: 'Under DGCA and WPC Radio Telephony guidelines, which 4-digit SSR transponder code must a pilot squawk when experiencing an unlawful interference (hijacking)?',
        options: ['7700', '7600', '7500', '7000'],
        correctIndex: 2,
        explanation: 'Transponder code 7500 specifically indicates unlawful interference (hijack). 7600 denotes radio communication failure, and 7700 denotes general emergency.'
      }
    ]
  }
};
