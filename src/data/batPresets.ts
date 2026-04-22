export interface BatPreset {
  id: string;

  // Header identity
  brand: string;
  model: string;
  type: string;
  testNumber: string;
  overallScore: string;
  ratingTier: string;
  ratingLabel: string;

  // 3D model
  profile: [number, number][];
  wood: {
    baseColor: string;
    edgeColor: string;
    grainColor: string;
    knotColor: string;
    handleTint: string;
  };
  material: {
    roughness: number;
    metalness: number;
    envMapIntensity: number;
  };
  scale?: number;

  // Performance panel
  stats: {
    exitVelocity: string;
    distance: string;
    launchAngle: string;
    batSpeed: string;
  };
  seasonHomeRuns: { year: string; hr: number }[];

  // Player score panel
  attributes: { attribute: string; value: number }[];
  verdict: string;
}

export const batPresets: BatPreset[] = [
  {
    id: "classic",
    brand: "LOUISVILLE SLUGGER",
    model: "SUPRA",
    type: "TWO-PIECE COMPOSITE",
    testNumber: "#0427",
    overallScore: "4.31",
    ratingTier: "GC GOLD",
    ratingLabel: "GAMECHANGER",

    profile: [
      [0.0, -1.85],
      [0.08, -1.84],
      [0.16, -1.82],
      [0.21, -1.78],
      [0.22, -1.74],
      [0.2, -1.7],
      [0.15, -1.66],
      [0.12, -1.6],
      [0.105, -1.5],
      [0.1, -1.3],
      [0.1, -0.9],
      [0.1, -0.5],
      [0.105, -0.2],
      [0.115, 0.05],
      [0.14, 0.3],
      [0.18, 0.55],
      [0.22, 0.8],
      [0.26, 1.05],
      [0.295, 1.25],
      [0.315, 1.45],
      [0.32, 1.6],
      [0.318, 1.72],
      [0.3, 1.8],
      [0.22, 1.84],
      [0.12, 1.855],
      [0.0, 1.86],
    ],
    wood: {
      baseColor: "#c4914f",
      edgeColor: "#a8733f",
      grainColor: "60, 35, 15",
      knotColor: "50, 25, 10",
      handleTint: "25, 15, 8",
    },
    material: { roughness: 1.0, metalness: 0.0, envMapIntensity: 0.6 },

    stats: {
      exitVelocity: "114.2",
      distance: "412",
      launchAngle: "27.8",
      batSpeed: "78.4",
    },
    seasonHomeRuns: [
      { year: "'19", hr: 14 },
      { year: "'20", hr: 9 },
      { year: "'21", hr: 22 },
      { year: "'22", hr: 28 },
      { year: "'23", hr: 31 },
      { year: "'24", hr: 37 },
      { year: "'25", hr: 42 },
    ],

    attributes: [
      { attribute: "Pop", value: 87 },
      { attribute: "Contact", value: 80 },
      { attribute: "Control", value: 78 },
      { attribute: "Balance", value: 85 },
      { attribute: "Sweet Spot", value: 86 },
      { attribute: "Feel", value: 78 },
    ],
    verdict: "BALANCED",
  },

  {
    id: "fungo",
    brand: "MARUCCI",
    model: "FUNGO PRO",
    type: "ONE-PIECE ASH",
    testNumber: "#0512",
    overallScore: "3.87",
    ratingTier: "GC SILVER",
    ratingLabel: "SPECIALIST",

    profile: [
      [0.0, -2.0],
      [0.07, -1.99],
      [0.14, -1.97],
      [0.18, -1.93],
      [0.19, -1.89],
      [0.17, -1.85],
      [0.13, -1.81],
      [0.1, -1.74],
      [0.09, -1.6],
      [0.085, -1.3],
      [0.085, -0.9],
      [0.085, -0.4],
      [0.088, -0.1],
      [0.095, 0.2],
      [0.11, 0.5],
      [0.13, 0.75],
      [0.155, 1.0],
      [0.18, 1.2],
      [0.21, 1.4],
      [0.23, 1.55],
      [0.24, 1.7],
      [0.238, 1.82],
      [0.22, 1.9],
      [0.17, 1.95],
      [0.1, 1.97],
      [0.0, 1.98],
    ],
    wood: {
      baseColor: "#e0c68a",
      edgeColor: "#c9a876",
      grainColor: "80, 55, 25",
      knotColor: "70, 45, 20",
      handleTint: "40, 25, 12",
    },
    material: { roughness: 0.9, metalness: 0.0, envMapIntensity: 0.6 },

    stats: {
      exitVelocity: "98.6",
      distance: "345",
      launchAngle: "32.1",
      batSpeed: "82.7",
    },
    seasonHomeRuns: [
      { year: "'19", hr: 6 },
      { year: "'20", hr: 4 },
      { year: "'21", hr: 10 },
      { year: "'22", hr: 12 },
      { year: "'23", hr: 15 },
      { year: "'24", hr: 18 },
      { year: "'25", hr: 21 },
    ],

    attributes: [
      { attribute: "Pop", value: 55 },
      { attribute: "Contact", value: 92 },
      { attribute: "Control", value: 95 },
      { attribute: "Balance", value: 88 },
      { attribute: "Sweet Spot", value: 72 },
      { attribute: "Feel", value: 94 },
    ],
    verdict: "CONTROL",
  },

  {
    id: "power",
    brand: "DEMARINI",
    model: "VOODOO",
    type: "TWO-PIECE ALLOY",
    testNumber: "#0689",
    overallScore: "4.52",
    ratingTier: "GC PLATINUM",
    ratingLabel: "GAMECHANGER",

    profile: [
      [0.0, -1.8],
      [0.09, -1.79],
      [0.18, -1.76],
      [0.24, -1.72],
      [0.25, -1.67],
      [0.23, -1.63],
      [0.17, -1.58],
      [0.13, -1.5],
      [0.115, -1.35],
      [0.11, -1.1],
      [0.11, -0.7],
      [0.115, -0.3],
      [0.13, 0.0],
      [0.16, 0.25],
      [0.2, 0.5],
      [0.25, 0.7],
      [0.3, 0.9],
      [0.335, 1.05],
      [0.35, 1.2],
      [0.358, 1.35],
      [0.36, 1.5],
      [0.355, 1.62],
      [0.33, 1.7],
      [0.26, 1.76],
      [0.14, 1.79],
      [0.0, 1.8],
    ],
    wood: {
      baseColor: "#b0b8c8",
      edgeColor: "#8a92a4",
      grainColor: "60, 65, 75",
      knotColor: "50, 55, 65",
      handleTint: "30, 32, 40",
    },
    material: { roughness: 0.3, metalness: 0.85, envMapIntensity: 1.2 },

    stats: {
      exitVelocity: "118.7",
      distance: "438",
      launchAngle: "25.3",
      batSpeed: "76.1",
    },
    seasonHomeRuns: [
      { year: "'19", hr: 22 },
      { year: "'20", hr: 18 },
      { year: "'21", hr: 35 },
      { year: "'22", hr: 40 },
      { year: "'23", hr: 44 },
      { year: "'24", hr: 48 },
      { year: "'25", hr: 53 },
    ],

    attributes: [
      { attribute: "Pop", value: 96 },
      { attribute: "Contact", value: 65 },
      { attribute: "Control", value: 60 },
      { attribute: "Balance", value: 70 },
      { attribute: "Sweet Spot", value: 82 },
      { attribute: "Feel", value: 62 },
    ],
    verdict: "POWER",
  },

  {
    id: "youth",
    brand: "EASTON",
    model: "GHOST X",
    type: "ONE-PIECE COMPOSITE",
    testNumber: "#0733",
    overallScore: "4.05",
    ratingTier: "GC GOLD",
    ratingLabel: "TOP PROSPECT",
    scale: 1.15,

    profile: [
      [0.0, -1.4],
      [0.07, -1.39],
      [0.14, -1.37],
      [0.18, -1.34],
      [0.19, -1.31],
      [0.17, -1.28],
      [0.13, -1.25],
      [0.105, -1.18],
      [0.095, -1.05],
      [0.09, -0.8],
      [0.09, -0.45],
      [0.09, -0.1],
      [0.095, 0.1],
      [0.11, 0.3],
      [0.135, 0.5],
      [0.165, 0.68],
      [0.2, 0.85],
      [0.23, 1.0],
      [0.255, 1.12],
      [0.27, 1.22],
      [0.275, 1.32],
      [0.272, 1.4],
      [0.255, 1.46],
      [0.2, 1.49],
      [0.11, 1.5],
      [0.0, 1.505],
    ],
    wood: {
      baseColor: "#e8c47a",
      edgeColor: "#d4a95a",
      grainColor: "90, 65, 30",
      knotColor: "80, 55, 25",
      handleTint: "50, 35, 15",
    },
    material: { roughness: 0.85, metalness: 0.0, envMapIntensity: 0.6 },

    stats: {
      exitVelocity: "102.4",
      distance: "368",
      launchAngle: "29.5",
      batSpeed: "80.2",
    },
    seasonHomeRuns: [
      { year: "'19", hr: 8 },
      { year: "'20", hr: 11 },
      { year: "'21", hr: 16 },
      { year: "'22", hr: 20 },
      { year: "'23", hr: 24 },
      { year: "'24", hr: 27 },
      { year: "'25", hr: 30 },
    ],

    attributes: [
      { attribute: "Pop", value: 75 },
      { attribute: "Contact", value: 82 },
      { attribute: "Control", value: 80 },
      { attribute: "Balance", value: 84 },
      { attribute: "Sweet Spot", value: 78 },
      { attribute: "Feel", value: 83 },
    ],
    verdict: "ALL-ROUND",
  },
];
