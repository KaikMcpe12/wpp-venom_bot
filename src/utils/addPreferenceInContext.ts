import { IAiService } from '../ai/interface/IAiService'
import { Preference } from '../entities/preference/preference'

export function addPreferenceContext(
  preferences: Preference[] | null,
  aiClient: IAiService,
) {
  const preferenceList =
    preferences && preferences.map((preference) => `- ${preference.content}\n`)

  const newContext = `${aiClient.context}\n\nPreferências do contato:\n${preferenceList}`

  aiClient.context = newContext
}
