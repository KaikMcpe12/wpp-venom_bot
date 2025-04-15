import { ISendList } from '../../http/dto/send-list-schema'
import { PhoneFormatterVenom } from '../../utils/phoneNumberFormatterVenom'
import { WppRepository } from '../../wpp/repositories/wpp-repository'
import { MessageNotSentError } from '../errors/message-not-sent-error'

export class SendList {
  constructor(private wpp: WppRepository) {}

  async execute(data: ISendList) {
    try {
      const result = await this.wpp.sendList({
        ...data,
        phoneNumber: PhoneFormatterVenom.format(data.phoneNumber),
      })

      return result
    } catch {
      throw new MessageNotSentError()
    }
  }
}
