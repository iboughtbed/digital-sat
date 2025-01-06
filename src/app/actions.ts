"use server";

import { generateObject } from "ai";
import { google } from "@ai-sdk/google";

import { db } from "~/server/db";
import { tests } from "~/server/db/schema";
import { testSchema } from "~/lib/validations";
import type { Test } from "~/types";

export async function upload(formData: FormData) {
  try {
    const file = formData.get("pdf-file");
    console.log("starting");

    if (!file || !(file instanceof File)) {
      throw new Error("No PDF file uploaded");
    }

    if (!file.type.includes("pdf")) {
      throw new Error("Uploaded file must be a PDF");
    }

    const arrayBuffer = await file.arrayBuffer();

    const result = await generateObject({
      model: google("gemini-1.5-flash"),
      schema: testSchema,
      messages: [
        {
          role: "system",
          content: `
            You are an assistant that reads a document.
            Your goal is to create a test section of the SAT based on the document.
            The test is either verbal or math section.
            Create a multiple choice test (with 4 questions).
          `,
        },
        {
          role: "user",
          content: [
            {
              type: "text",
              text: "generate a test for verbal section based on the document",
            },
            {
              type: "file",
              data: arrayBuffer,
              mimeType: "application/pdf",
            },
          ],
        },
      ],
    });

    const [createdTest] = await db
      .insert(tests)
      .values({
        test: result.object as Test,
      })
      .returning({ id: tests.id });

    if (!createdTest) {
      throw new Error("Could not save the test to database");
    }
  } catch (err) {
    console.log("error: ", err);
  }
}
