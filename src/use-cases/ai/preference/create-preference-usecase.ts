import { Preference } from '../../../entities/preference/preference'
import { ContactRepository } from '../../../databases/repositories/contactRepository'
import { PreferenceRepository } from '../../../databases/repositories/preferenceRepository'
import { sanitizePhoneNumber } from '../../../utils/sanitizePhoneNumber'

interface IRequestPreference {
  phoneNumber: string
  content: string
}

export class CreatePreference {
  constructor(
    private preferenceRepository: PreferenceRepository,
    private contactRepository: ContactRepository,
  ) {}

  public async execute(
    requestPreference: IRequestPreference,
  ): Promise<Preference> {
    const { content, phoneNumber } = requestPreference

    const sanitizedPhoneNumber = sanitizePhoneNumber(phoneNumber)

    if (!content) throw new Error('Invalid preference data')

    const contact =
      await this.contactRepository.findByPhoneNumber(sanitizedPhoneNumber)

    if (!contact) throw new Error('User not found')

    const preference = new Preference({ content }, contact.id)

    const response = await this.preferenceRepository.create(preference)

    if (!response) throw new Error('Failed to create preference')

    return response
  }
}
