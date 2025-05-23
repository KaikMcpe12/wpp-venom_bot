import z from 'zod'
import { Replace } from '../../helpers/Replace'

export const getAllContactsSchema = z.object({
  id: z.string(),
  name: z.string(),
  phoneNumber: z.string(),
})

export type IGetAllContacts = Replace<
  z.infer<typeof getAllContactsSchema>,
  { phoneNumber: string }
>

// {
//   id: {
//     server: 'c.us',
//     user: '5511957206558',
//     _serialized: '5511957206558@c.us'
//   },
//   name: 'Caio',
//   shortName: 'Caio',
//   pushname: 'Caio',
//   type: 'in',
//   isBusiness: false,
//   isEnterprise: false,
//   isSmb: false,
//   isContactSyncCompleted: 0,
//   textStatusLastUpdateTime: -1,
//   syncToAddressbook: true,
//   isUser: true,
//   profilePicThumbObj: {},
//   msgs: null
// },
