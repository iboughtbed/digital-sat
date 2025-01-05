export type Test = {
  type: "verbal" | "math";
  duration: number; 
  questions: Question[];
}

export type Question = {
  index: number;
  type: "multiple-choice" | "free-response";
  prompt: string;
  options?: QuestionOption[];
  // answer?: string | number
}

export type QuestionOption = {
  text: string;
  isAnswer: boolean;
}