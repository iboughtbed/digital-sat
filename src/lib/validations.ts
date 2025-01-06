import { z } from "zod";

export const testSchema = z.object({
  type: z.enum(["verbal", "math"]),
  questions: z.array(
    z.object({
      question: z.string(),
      options: z
        .array(z.string())
        .length(4)
        .describe(
          "Four possible answers to the question. Only one should be correct.",
        ),
      answer: z
        .enum(["A", "B", "C", "D"])
        .describe(
          "The correct answer, where A is the first option, B is the second, and so on.",
        ),
    }),
  ),
});
