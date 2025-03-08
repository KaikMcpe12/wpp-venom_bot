import { Preference } from '../../../entities/preference/preference'
import { ContactRepository } from '../../../repositories/contactRepository'
import { PreferenceRepository } from '../../../repositories/preferenceRepository'

interface IRequestPreference {
  phoneNumber: string
}

export class ListPreference {
  constructor(
    private preferenceRepository: PreferenceRepository,
    private contactRepository: ContactRepository,
  ) {}

  async execute(
    requestPreference: IRequestPreference,
  ): Promise<Preference[] | null> {
    const { phoneNumber } = requestPreference

    if (!phoneNumber) throw new Error('Invalid phone number')

    const contact = await this.contactRepository.findByPhoneNumber(phoneNumber)

    if (!contact) throw new Error('User not found')

    const preferences = await this.preferenceRepository.listAll(contact.id)

    return preferences.length ? preferences : null
  }
}
