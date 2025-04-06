export class WppNotInicializedError extends Error {
  constructor() {
    super('WPP Venom is not initialized')
  }
}
