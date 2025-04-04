import { ISendText } from '../../http/dto/send-text-schem'
import { PhoneFormatterVenom } from '../../utils/phoneNumberFormatterVenom'
import { WppRepository } from '../../wpp/repositories/wpp-repository'

export class SendText {
  constructor(private wpp: WppRepository) {}

  async execute(data: ISendText) {
    const result = await this.wpp.sendMessage({
      numberPhone: PhoneFormatterVenom.format(data.numberPhone),
      message: data.message,
    })

    if (!result) {
      throw new Error('Message not sent')
    }

    return result
  }
}
