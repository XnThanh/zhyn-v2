export class CharNotRegisteredError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "CharNotRegisteredError";
    Object.setPrototypeOf(this, new.target.prototype);
  }
}
