export class InvalidCharError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "InvalidCharError";
    Object.setPrototypeOf(this, new.target.prototype);
  }
}
