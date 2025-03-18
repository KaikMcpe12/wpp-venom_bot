import { ISendButton } from '../../http/dto/send-button-schema'
import { WppRepository } from '../../wpp/repositories/wpp-repository'

export class SendButton {
  constructor(private wpp: WppRepository) {}

  async execute(data: ISendButton) {
    const result = await this.wpp.sendButton({
      ...data,
      numberPhone: data.numberPhone + '@c.us',
    })

    if (!result) {
      return new Error('Message not sent')
    }

    return result
  }
}
