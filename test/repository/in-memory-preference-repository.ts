import { Preference } from '../../src/entities/preference/preference'
import { PreferenceRepository } from '../../src/repositories/preferenceRepository'

export class InMemoryPreferenceRepository implements PreferenceRepository {
  public preferences: Preference[] = []

  async findById(contactId: string): Promise<Preference | null> {
    const preference = this.preferences.find((c) => c.id === contactId)

    if (!preference) {
      return null
    }

    return preference
  }

  async listAll(): Promise<Preference[] | null> {
    const preferencesCopy = [...this.preferences]

    return preferencesCopy
  }

  async create(preference: Preference): Promise<Preference> {
    this.preferences.push(preference)

    return preference
  }

  async save(preference: Preference): Promise<void> {
    const index = this.preferences.findIndex((c) => c.id === preference.id)

    if (index >= 0) {
      this.preferences[index] = preference
    }
  }
}
