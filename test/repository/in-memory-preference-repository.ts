import { Preference } from '../../src/entities/preference/preference'
import { PreferenceRepository } from '../../src/databases/repositories/preferenceRepository'

export class InMemoryPreferenceRepository implements PreferenceRepository {
  public preferences: Preference[] = []

  async findById(contactId: string): Promise<Preference | null> {
    const preference = this.preferences.find((c) => c.id === contactId)

    if (!preference) {
      return null
    }

    return preference
  }

  async listAll(contactId: string): Promise<Preference[]> {
    const preferencesCopy = this.preferences.filter(
      (c) => c.contactId === contactId,
    )

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
