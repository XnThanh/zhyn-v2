export class LevelNotFoundError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "LevelNotFoundError";
    Object.setPrototypeOf(this, new.target.prototype);
  }
}
