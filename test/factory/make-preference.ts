import {
  Preference,
  PreferenceProps,
} from '../../src/entities/preference/preference'

type Override = Partial<PreferenceProps>

export function makePreference(_id: string, override: Override = {}) {
  return new Preference(
    {
      content: 'I like the green',
      ...override,
    },
    _id,
  )
}
