import { ISendList } from '../../http/dto/send-list-schema'
import { PhoneFormatterVenom } from '../../utils/phoneNumberFormatterVenom'
import { WppRepository } from '../../wpp/repositories/wpp-repository'

export class SendList {
  constructor(private wpp: WppRepository) {}

  async execute(data: ISendList) {
    const result = await this.wpp.sendList({
      ...data,
      numberPhone: PhoneFormatterVenom.format(data.numberPhone),
    })

    if (!result) {
      throw new Error('Message not sent')
    }

    return result
  }
}
