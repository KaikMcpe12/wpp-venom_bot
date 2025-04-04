import { Whatsapp } from 'venom-bot'
import { ISendButton } from '../../http/dto/send-button-schema'
import { ISendList } from '../../http/dto/send-list-schema'
import { ISendText } from '../../http/dto/send-text-schem'
import { WppRepository } from './wpp-repository'

export class WppVenomRepository implements WppRepository {
  constructor(private wpp: Whatsapp) {}

  async getAllContacts() {
    const venomContacts = await this.wpp.getAllContacts()

    const contacts = venomContacts
      .filter((contact) => contact.isUser)
      .map((contact) => ({
        id: contact.id._serialized,
        name: contact.name,
        phoneNumber: contact.id.user,
      }))

    return contacts
  }

  async sendMessage(data: ISendText) {
    try {
      const result = await this.wpp.sendText(data.numberPhone, data.message)

      return result
    } catch (err: Error | any) {
      console.log(err)
      throw new Error('Message not sent', err)
    }
  }

  async sendList(data: ISendList) {
    try {
      const result = await this.wpp.sendListMenu(
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
      const result = await this.wpp.sendButtons(
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
