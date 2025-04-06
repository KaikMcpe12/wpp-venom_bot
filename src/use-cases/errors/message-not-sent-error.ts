export class MessageNotSentError extends Error {
  constructor() {
    super('Message not sent')
  }
}
