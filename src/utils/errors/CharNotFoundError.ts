export class CharNotFoundError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "CharNotFoundError";
    Object.setPrototypeOf(this, new.target.prototype);
  }
}
