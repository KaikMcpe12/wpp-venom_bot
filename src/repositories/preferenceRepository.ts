import { Preference } from '../entities/preference/preference'

export abstract class PreferenceRepository {
  abstract findById(contactId: string): Promise<Preference | null>
  abstract create(preference: Preference): Promise<Preference | null>
  abstract listAll(): Promise<Preference[] | null>
  abstract save(preference: Preference): Promise<void>
}
