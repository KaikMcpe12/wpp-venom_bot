import { ISendButton } from '../../http/dto/send-button-schema'
import { WppRepository } from '../../wpp/repositories/wpp-repository'
import { MessageNotSentError } from '../errors/message-not-sent-error'

export class SendButton {
  constructor(private wpp: WppRepository) {}

  async execute(data: ISendButton) {
    try {
      const result = await this.wpp.sendButton({
        ...data,
        phoneNumber: data.phoneNumber + '@c.us',
      })

      return result
    } catch {
      throw new MessageNotSentError()
    }
  }
}
