import { ISendButton } from '../../http/dto/send-button-schema'
import { WppRepository } from '../repositories/wpp-repository'
import { MessageNotSentError } from '../../use-cases/errors/message-not-sent-error'

export class SendButton {
  constructor(private wpp: WppRepository) {}

  async execute(data: ISendButton) {
    try {
      const result = await this.wpp.sendButton({
        ...data,
        phoneNumber: data.phoneNumber + '@c.us',
      })

      return result
    } catch (err) {
      console.error('Error sending button:', err)
      throw new MessageNotSentError()
    }
  }
}
