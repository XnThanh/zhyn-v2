/**
 * LLM Integration for Database
 *
 * Handles the generateSentences functionality using Google's Gemini API.
 * The LLM prompt is hardwired with user preferences and doesn't take external hints.
 */

import { GoogleGenerativeAI } from "@google/generative-ai";

/**
 * Configuration for API access
 */
export interface Config {
  apiKey: string;
}

export class GeminiLLM {
  private apiKey: string;
  private temperature: number;

  constructor(config: Config, vocabSize?: number) {
    this.apiKey = config.apiKey;
    this.temperature = this.computeTemperature(vocabSize ?? 0);
  }

  private computeTemperature(vocabSize: number): number {
    if (vocabSize <= 10) return 0.9;
    if (vocabSize <= 20) return 0.6;
    if (vocabSize <= 50) return 0.3;
    return 0.1;
  }

  async executeLLM(prompt: string): Promise<string> {
    try {
      // Initialize Gemini AI
      const genAI = new GoogleGenerativeAI(this.apiKey);
      const model = genAI.getGenerativeModel({
        model: "gemini-2.5-flash-lite",
        generationConfig: {
          maxOutputTokens: 1000,
          temperature: this.temperature,
          responseMimeType: "application/json",
        },
      });
      // Execute the LLM
      const result = await model.generateContent(prompt);
      const response = await result.response;
      const text = response.text();
      return text;
    } catch (error) {
      console.error("❌ Error calling Gemini API:", (error as Error).message);
      throw error;
    }
  }
}
