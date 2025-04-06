export class ContactAlredyExistsError extends Error {
  constructor() {
    super('Contact already exists')
  }
}
