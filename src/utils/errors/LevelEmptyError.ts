export class LevelEmptyError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "LevelEmptyError";
    Object.setPrototypeOf(this, new.target.prototype);
  }
}
