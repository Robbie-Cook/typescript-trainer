export const challenges = [
  `type Challenge = {
  a: number;
};

// Your task: Edit challenge to ensure it meets the following conditions
type Test = Expect<Equals<Challenge, { a: number; b: string }>>;
`,
  `type Challenge = {
  x: boolean;
};

// Your task: Edit challenge to ensure it meets the following conditions
type Test = Expect<Equals<Challenge, { x: boolean; y: string[] }>>;`,
  `type Challenge = {
  name: string;
};

// Your task: Edit challenge to ensure it meets the following conditions
type Test = Expect<Equals<Challenge, { name: string; age: number }>>;
`,
  `type Challenge = {
  id: number;
};

// Your task: Edit challenge to ensure it meets the following conditions
type Test = Expect<Equals<Challenge, { id: number; active: boolean }>>;
`,
  `type Challenge = {
  title: string;
};

// Your task: Edit challenge to ensure it meets the following conditions
type Test = Expect<Equals<Challenge, { title: string; tags: string[] }>>;
`,
  `// Intermediate Challenge 1: Optional Properties
type Challenge = {
  name: string;
  age?: number;
};

// Your task: Ensure the following conditions
type Test = Expect<Equals<Challenge, { name: string; age?: number }>>;
`,
  `// Intermediate Challenge 2: Readonly Properties
type Challenge = {
  readonly id: number;
  name: string;
};

// Your task: Ensure the following conditions
type Test = Expect<Equals<Challenge, { readonly id: number; name: string }>>;
`,
  `// Intermediate Challenge 3: Index Signatures
type Challenge = {
  [key: string]: number;
};

// Your task: Ensure the following conditions
type Test = Expect<Equals<Challenge, { [key: string]: number }>>;
`,
  `// Advanced Challenge 1: Conditional Types
type Challenge<T> = T extends string ? "string" : "not string";

// Your task: Ensure the following conditions
type Test1 = Expect<Equals<Challenge<string>, "string">>;
type Test2 = Expect<Equals<Challenge<number>, "not string">>;
`,
  `// Advanced Challenge 2: Mapped Types
type Challenge<T> = {
  [K in keyof T]: T[K] extends number ? "number" : "other";
};

// Your task: Ensure the following conditions
type Test1 = Expect<Equals<Challenge<{ a: number; b: string }>, { a: "number"; b: "other" }>>;
type Test2 = Expect<Equals<Challenge<{ x: boolean; y: number }>, { x: "other"; y: "number" }>>;
`,
  `// Advanced Challenge 3: Recursive Types
type Challenge<T> = T extends (infer U)[] ? Challenge<U> : T;

// Your task: Ensure the following conditions
type Test1 = Expect<Equals<Challenge<number[]>, number>>;
type Test2 = Expect<Equals<Challenge<string[][]>, string>>;
`,
  `// Advanced Challenge 4: Tuple Types
type Challenge<T> = T extends [infer A, infer B] ? [B, A] : T;

// Your task: Ensure the following conditions
type Test1 = Expect<Equals<Challenge<[number, string]>, [string, number]>>;
type Test2 = Expect<Equals<Challenge<[boolean, number]>, [number, boolean]>>;
`,
  `// Maestro Challenge 1: Union Types
type Challenge<T> = T extends string | number ? "primitive" : "non-primitive";

// Your task: Ensure the following conditions
type Test1 = Expect<Equals<Challenge<string>, "primitive">>;
type Test2 = Expect<Equals<Challenge<object>, "non-primitive">>;
`,
  `// Maestro Challenge 2: Distributive Conditional Types
type Challenge<T> = T extends any[] ? T[number] : T;

// Your task: Ensure the following conditions
type Test1 = Expect<Equals<Challenge<string[]>, string>>;
type Test2 = Expect<Equals<Challenge<number>, number>>;
`,
  `// Maestro Challenge 3: Infer in Conditional Types
type Challenge<T> = T extends { a: infer U; b: infer U } ? U : never;

// Your task: Ensure the following conditions
type Test1 = Expect<Equals<Challenge<{ a: string; b: string }>, string>>;
type Test2 = Expect<Equals<Challenge<{ a: number; b: number }>, number>>;
`,
];
