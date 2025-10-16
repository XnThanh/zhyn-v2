// @deno-types="../../types/opencc-js.d.ts"
import { Converter } from "opencc-js";

/**
 * Check if character is Traditional Chinese
 */
export function isTraditional(text: string): boolean {
  const converter = Converter({ from: "cn", to: "tw" });

  // If converting to Traditional changes the text, it's not pure Traditional
  const converted = converter(text);
  return converted === text;
}

/**
 * Converts to Traditional Chinese
 */
export function toTraditional(text: string): string {
  const converter = Converter({ from: "cn", to: "tw" });
  return converter(text);
}
