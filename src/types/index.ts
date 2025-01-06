export type VerbalTest = {
  type: "verbal";
  // duration?: number;
  questions: VerbalQuestion[];
};

export type VerbalQuestion = {
  question: string;
  options: string[];
  answer: string;
};

export type MathTest = {
  type: "math";
  questions: MathQuestion[];
};

export type MathQuestion = {
  type: "mcq" | "free"; // mcq is multiple choice question
  question: string;
  options?: string[];
  answer: string;
};

export type Test = MathTest | VerbalTest;
