import { customAlphabet } from "nanoid";

const CATEGORY_MAP = {
  DATA_SCIENCE: "DSA",
  HUMAN_RESOURCES: "HRM",
  FULL_STACK: "FSD",
  MERN_STACK: "MERN",
  GRAPHIC_DESIGN: "GRD",
  UI_UX: "UIX",
  DIGITAL_MARKETING: "DMK",
};

// 2. Create a custom alphabet (Removing 0, O, 1, l, I to avoid user errors)
const alphabet = "23456789ABCDEFGHJKLMNPQRSTUVWXYZ";
const generateRandomStr = customAlphabet(alphabet, 6);

/**
 * Generates a professional Contest ID
 * @param {string} categoryKey - The key from CATEGORY_MAP
 * @returns {string} - e.g., "MERN-4F7K2P"
 */
export const createContestID = (domain) => {
  const prefix = CATEGORY_MAP[domain] || "GEN"; // Default to GEN for General
  const randomStr = generateRandomStr();

  return `${prefix}-${randomStr}`;
};
