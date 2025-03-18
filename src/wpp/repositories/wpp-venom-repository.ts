import { ISendButton } from '../../http/dto/send-button-schema'
import { ISendList } from '../../http/dto/send-list-schema'
import { ISendText } from '../../http/dto/send-text-schem'
import { Venom } from '../../lib/wpp-venom'
import { WppRepository } from './wpp-repository'

export class WppVenomRepository implements WppRepository {
  constructor(private wpp: Venom) {}

  async getAllContacts(): Promise<void> {
    const contacts = await this.wpp.client.getAllContacts()

    console.log(contacts)
  }

  async sendMessage(data: ISendText) {
    try {
      const result = await this.wpp.client.sendText(
        data.numberPhone,
        data.message,
      )

      return result
    } catch (err: Error | any) {
      console.log(err)
      throw new Error('Message not sent', err)
    }
  }

  async sendList(data: ISendList) {
    try {
      const result = await this.wpp.client.sendListMenu(
        data.numberPhone,
        data.title,
        data.subTitle,
        data.description,
        data.menuName,
        data.list,
      )

      return result
    } catch (err: Error | any) {
      console.log(err)
      throw new Error('Message not sent', err)
    }
  }

  async sendButton(data: ISendButton) {
    try {
      const result = await this.wpp.client.sendButtons(
        data.numberPhone,
        data.title,
        data.description,
        data.buttons,
      )

      return result
    } catch (err: Error | any) {
      console.log(err)
      throw new Error('Message not sent', err)
    }
  }
}
