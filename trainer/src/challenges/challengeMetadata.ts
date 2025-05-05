import { challenges } from './challenges';

export interface ChallengeMetadata {
  id: number;
  difficulty: 'beginner' | 'intermediate' | 'advanced' | 'maestro';
  category: string;
  description: string;
}

// Helper function to generate metadata for intermediate challenges
const generateIntermediateMetadata = (startIndex: number, count: number): ChallengeMetadata[] => {
  const categories = [
    'Utility Types',
    'Type Manipulation',
    'Conditional Types',
    'Mapped Types',
    'Template Literals',
    'Type Inference',
    'Type Guards',
    'Advanced Types'
  ];

  return Array.from({ length: count }, (_, i) => ({
    id: startIndex + i,
    difficulty: 'intermediate',
    category: categories[i % categories.length],
    description: `Intermediate challenge focusing on ${categories[i % categories.length].toLowerCase()}`
  }));
};

// Basic challenge metadata
const basicMetadata: ChallengeMetadata[] = [
  { id: 0, difficulty: 'beginner', category: 'Basic Types', description: 'Add a property to an object type' },
  { id: 1, difficulty: 'beginner', category: 'Basic Types', description: 'Add a property to an object type' },
  { id: 2, difficulty: 'beginner', category: 'Basic Types', description: 'Add a property to an object type' },
  { id: 3, difficulty: 'beginner', category: 'Basic Types', description: 'Add a property to an object type' },
  { id: 4, difficulty: 'beginner', category: 'Basic Types', description: 'Add a property to an object type' },
];

// Advanced challenge metadata
const advancedMetadata: ChallengeMetadata[] = [
  { id: challenges.length - 7, difficulty: 'advanced', category: 'Conditional Types', description: 'Create a conditional type' },
  { id: challenges.length - 6, difficulty: 'advanced', category: 'Mapped Types', description: 'Create a mapped type' },
  { id: challenges.length - 5, difficulty: 'advanced', category: 'Recursive Types', description: 'Create a recursive type' },
  { id: challenges.length - 4, difficulty: 'advanced', category: 'Tuple Types', description: 'Manipulate tuple types' },
  { id: challenges.length - 3, difficulty: 'maestro', category: 'Union Types', description: 'Work with union types' },
  { id: challenges.length - 2, difficulty: 'maestro', category: 'Distributive Types', description: 'Create distributive conditional types' },
  { id: challenges.length - 1, difficulty: 'maestro', category: 'Infer', description: 'Use infer in conditional types' },
];

// Generate metadata for intermediate challenges
const intermediateMetadata = generateIntermediateMetadata(
  basicMetadata.length,
  challenges.length - basicMetadata.length - advancedMetadata.length
);

export const challengeMetadata: ChallengeMetadata[] = [
  ...basicMetadata,
  ...intermediateMetadata,
  ...advancedMetadata,
];

export const getChallengeOfTheDay = (): number => {
  // Get the current date in YYYY-MM-DD format
  const today = new Date().toISOString().split('T')[0];
  
  // Convert date to a number by removing hyphens and converting to integer
  const dateNum = parseInt(today.replace(/-/g, ''));
  
  // Use a prime number for better distribution
  const prime = 31;
  
  // Calculate a hash that will be evenly distributed
  const hash = (dateNum * prime) % challenges.length;
  
  // Ensure we get a positive number
  return Math.abs(hash);
}; 