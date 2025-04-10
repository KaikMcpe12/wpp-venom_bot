import { IGetAllContacts } from '../../http/dto/get-all-contact-schema'
import { ISendButton } from '../../http/dto/send-button-schema'
import { ISendList } from '../../http/dto/send-list-schema'
import { ISendText } from '../../http/dto/send-text-schem'

export abstract class WppRepository {
  abstract getAllContacts(): Promise<IGetAllContacts[]>
  abstract sendText(data: ISendText): Promise<object>
  abstract sendList(data: ISendList): Promise<object>
  abstract sendButton(data: ISendButton): Promise<object>
}
