export class LLMRetryableError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "LLMRetryableError";
    Object.setPrototypeOf(this, new.target.prototype);
  }
}
