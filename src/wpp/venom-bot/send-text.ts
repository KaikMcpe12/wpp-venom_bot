import { ISendText } from '../../http/dto/send-text-schem'
import { PhoneFormatterVenom } from '../../utils/phoneNumberFormatterVenom'
import { WppRepository } from '../repositories/wpp-repository'
import { MessageNotSentError } from '../../use-cases/errors/message-not-sent-error'

export class SendText {
  constructor(private wpp: WppRepository) {}

  async execute(data: ISendText) {
    try {
      const result = await this.wpp.sendText({
        phoneNumber: PhoneFormatterVenom.format(data.phoneNumber),
        message: data.message,
      })

      return result
    } catch {
      throw new MessageNotSentError()
    }
  }
}
