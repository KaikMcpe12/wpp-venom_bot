import { Preference as IPreference } from '@prisma/client'
import { Replace } from '../../helpers/Replace'
import { Preference } from '../../entities/preference/preference'

export type RawPreference = Replace<
  IPreference,
  { id?: string; contactId: string; updatedAt?: Date; createdAt?: Date }
>

export class AiPreferenceMapper {
  static toRaw(preference: Preference): RawPreference {
    return {
      id: preference.id,
      contactId: preference.contactId,
      preferences: preference.content,
      updatedAt: preference.updatedAt,
      createdAt: preference.createdAt,
    }
  }

  static toDomain(raw: RawPreference): Preference {
    return new Preference(
      {
        content: raw.preferences,
        createdAt: raw.createdAt,
        updatedAt: raw.updatedAt,
      },
      raw.contactId,
    )
  }
}
