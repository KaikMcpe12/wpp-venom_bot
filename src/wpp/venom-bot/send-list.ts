import { ISendList } from '../../http/dto/send-list-schema'
import { PhoneFormatterVenom } from '../../utils/phoneNumberFormatterVenom'
import { WppRepository } from '../repositories/wpp-repository'
import { MessageNotSentError } from '../../use-cases/errors/message-not-sent-error'

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
