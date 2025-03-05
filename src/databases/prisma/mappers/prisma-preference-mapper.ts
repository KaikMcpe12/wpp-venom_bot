import { Preference } from '../../../entities/preference/preference'
import { Preference as IPreference } from '@prisma/client'

export class PrismaPreferenceMapper {
  static toPrisma(preference: Preference): IPreference {
    return {
      id: preference.id,
      contactId: preference.contactId,
      preferences: preference.content,
      createdAt: preference.createdAt,
      updatedAt: preference.updatedAt,
    }
  }

  static toDomain(raw: IPreference): Preference {
    return new Preference(
      {
        content: raw.preferences,
        createdAt: raw.createdAt,
        updatedAt: raw.updatedAt,
      },
      raw.contactId,
      raw.id,
    )
  }
}
