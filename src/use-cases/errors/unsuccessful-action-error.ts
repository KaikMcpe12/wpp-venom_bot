export class UnsuccessfulActionError extends Error {
  constructor() {
    super('Unsuccessful action, try again')
  }
}
