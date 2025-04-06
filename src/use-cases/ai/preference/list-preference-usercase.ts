import { Preference } from '../../../entities/preference/preference'
import { ContactRepository } from '../../../databases/repositories/contactRepository'
import { PreferenceRepository } from '../../../databases/repositories/preferenceRepository'
import { ResourceNotFoundError } from '../../errors/resource-not-found-error'

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

    const contact = await this.contactRepository.findByPhoneNumber(phoneNumber)

    if (!contact) throw new ResourceNotFoundError()

    const preferences = await this.preferenceRepository.listAll(contact.id)

    return preferences.length ? preferences : null
  }
}
