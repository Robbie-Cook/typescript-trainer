import { intermediateGeneratedChallenges } from "./intermediateGeneratedChallenges";

// Basic challenges for beginners
const basicChallenges = [
  `type Challenge = {
  a: number;
};

// Your task: Edit challenge to ensure it meets the following conditions
type Test = Expect<Equals<Challenge, { a: number; b: string }>>;
type NotTest = Expect<Not<Equals<Challenge, { a: number }>>>;`,
  `type Challenge = {
  x: boolean;
};

// Your task: Edit challenge to ensure it meets the following conditions
type Test = Expect<Equals<Challenge, { x: boolean; y: string[] }>>;
type NotTest = Expect<Not<Equals<Challenge, { x: boolean }>>>;`,
  `type Challenge = {
  name: string;
};

// Your task: Edit challenge to ensure it meets the following conditions
type Test = Expect<Equals<Challenge, { name: string; age: number }>>;
type NotTest = Expect<Not<Equals<Challenge, { name: string }>>>;`,
  `type Challenge = {
  id: number;
};

// Your task: Edit challenge to ensure it meets the following conditions
type Test = Expect<Equals<Challenge, { id: number; active: boolean }>>;
type NotTest = Expect<Not<Equals<Challenge, { id: number }>>>;`,
  `type Challenge = {
  title: string;
};

// Your task: Edit challenge to ensure it meets the following conditions
type Test = Expect<Equals<Challenge, { title: string; tags: string[] }>>;
type NotTest = Expect<Not<Equals<Challenge, { title: string }>>>;`,
  `// Intermediate Challenge 1: Optional Properties
type Challenge = {
  name: string;
  // Add optional property age
};

// Your task: Ensure the following conditions
type Test = Expect<Equals<Challenge, { name: string; age?: number }>>;
type NotTest = Expect<Not<Equals<Challenge, { name: string }>>>;`,

  `// Intermediate Challenge 2: Readonly Properties
type Challenge = {
  name: string;
};

// Your task: Ensure the following conditions
type Test = Expect<Equals<Challenge, { readonly id: number; name: string }>>;
type NotTest = Expect<Not<Equals<Challenge, { name: string }>>>;`,

  `// Intermediate Challenge 4: Type Guards in Functions
// Hint: Use a type guard function with the 'is' keyword to check if
// a value is of a specific type.
type Challenge = unknown;

// Your task: Ensure the following conditions
type Test1 = Expect<Equals<ReturnType<Challenge>, boolean>>;
type Test2 = Expect<Equals<Challenge("string"), true>>;
type Test3 = Expect<Equals<Challenge(123), false>>;
type NotTest1 = Expect<Not<Equals<Challenge("string"), false>>>;
type NotTest2 = Expect<Not<Equals<Challenge(123), true>>>;`,

  `// Intermediate Challenge 3: Index Signatures
type Challenge = {
};

// Your task: Ensure the following conditions
type Test = Expect<Equals<Challenge, { [key: string]: number }>>;
type NotTest = Expect<Not<Equals<Challenge, { a: number }>>>;`,
];

// Advanced challenges
const advancedChallenges = [
  `// Advanced Challenge 1: Conditional Types
// Make the Challenge type return "string" if T is string, otherwise return "not string"
type Challenge<T> = unknown;

// Your task: Ensure the following conditions
type Test1 = Expect<Equals<Challenge<string>, "string">>;
type Test2 = Expect<Equals<Challenge<number>, "not string">>;
type NotTest1 = Expect<Not<Equals<Challenge<string>, "not string">>>;
type NotTest2 = Expect<Not<Equals<Challenge<number>, "string">>>;`,
  `// Advanced Challenge 2: Mapped Types
// Hint: Use a mapped type to iterate over the keys of T and 
// conditionally transform the values based on their type.
// You can use conditional types to check if a type extends another type.

type Challenge<T> = unknown;

// Your task: Ensure the following conditions
type Test1 = Expect<Equals<Challenge<{ a: number; b: string }>, { a: "number"; b: "other" }>>;
type Test2 = Expect<Equals<Challenge<{ x: boolean; y: number }>, { x: "other"; y: "number" }>>;
type NotTest1 = Expect<Not<Equals<Challenge<{ a: number; b: string }>, { a: "other"; b: "number" }>>>;
type NotTest2 = Expect<Not<Equals<Challenge<{ x: boolean; y: number }>, { x: "number"; y: "other" }>>>;`,
  `// Advanced Challenge 3: Recursive Types
// Hint: Use a recursive type to handle nested arrays. 
// You can use conditional types to check if a type extends 
// an array and then recursively extract the element type.
type Challenge<T> = unknown;

// Your task: Ensure the following conditions
type Test1 = Expect<Equals<Challenge<number[]>, number>>;
type Test2 = Expect<Equals<Challenge<string[][]>, string>>;
type NotTest1 = Expect<Not<Equals<Challenge<number[]>, string>>>;
type NotTest2 = Expect<Not<Equals<Challenge<string[][]>, number>>>;`,
  `// Advanced Challenge 4: Tuple Types
// Hint: Use TypeScript's tuple manipulation to swap the elements of the tuple.
type Challenge<T> = unknown

// Your task: Ensure the following conditions
type Test1 = Expect<Equals<Challenge<[number, string]>, [string, number]>>;
type Test2 = Expect<Equals<Challenge<[boolean, number]>, [number, boolean]>>;
type NotTest1 = Expect<Not<Equals<Challenge<[number, string]>, [number, string]>>>;
type NotTest2 = Expect<Not<Equals<Challenge<[boolean, number]>, [boolean, number]>>>;`,
  `// Maestro Challenge 1: Union Types
// Hint: Use a conditional type to check if T extends a primitive type 
// (string, number, boolean, etc.) and return "primitive" or "non-primitive"
// accordingly.
type Challenge<T> = unknown;

// Your task: Ensure the following conditions
type Test1 = Expect<Equals<Challenge<string>, "primitive">>;
type Test2 = Expect<Equals<Challenge<object>, "non-primitive">>;
type NotTest1 = Expect<Not<Equals<Challenge<string>, "non-primitive">>>;
type NotTest2 = Expect<Not<Equals<Challenge<object>, "primitive">>>;`,
  `// Maestro Challenge 2: Distributive Conditional Types
  // Hint: Use conditional types to extract the element type if T is an array, 
  // otherwise return T itself.
type Challenge<T> = unknown;

// Your task: Ensure the following conditions
type Test1 = Expect<Equals<Challenge<string[]>, string>>;
type Test2 = Expect<Equals<Challenge<number>, number>>;
type NotTest1 = Expect<Not<Equals<Challenge<string[]>, number>>>;
type NotTest2 = Expect<Not<Equals<Challenge<number>, string>>>;`,

  `// Maestro Challenge 3: Infer in Conditional Types
// Hint: Use the infer keyword in a conditional type to extract the common type 
// of properties a and b.
type Challenge<T> = unknown;

// Your task: Ensure the following conditions
type Test1 = Expect<Equals<Challenge<{ a: string; b: string }>, string>>;
type Test2 = Expect<Equals<Challenge<{ a: number; b: number }>, number>>;
type NotTest1 = Expect<Not<Equals<Challenge<{ a: string; b: string }>, number>>>;
type NotTest2 = Expect<Not<Equals<Challenge<{ a: number; b: number }>, string>>>;`,
];

// Combine all challenges
export const challenges = [
  ...basicChallenges,
  ...intermediateGeneratedChallenges,
  ...advancedChallenges,
];
