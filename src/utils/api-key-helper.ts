/**
 * Simple API key validation
 * No user accounts needed - just check if request includes the secret key
 */

// Load secret key from environment variable
const API_SECRET_KEY = Deno.env.get("API_SECRET_KEY") || "";

/**
 * Validates that the provided API key matches the server's secret key
 * @param apiKey - The API key from the request
 * @throws Error if key is missing or invalid
 */
export function requireApiKey(apiKey: string | undefined): void {
  if (!apiKey) {
    throw new Error("API key is required");
  }

  if (apiKey !== API_SECRET_KEY) {
    throw new Error("Invalid API key");
  }
}

/**
 * Get the secret API key (for testing/development only)
 * DO NOT expose this in production APIs!
 */
export function getApiKey(): string {
  return API_SECRET_KEY;
}
