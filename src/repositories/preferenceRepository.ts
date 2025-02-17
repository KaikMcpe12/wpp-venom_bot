export abstract class PreferenceRepository {
    abstract findByUserId(userId: string): Preference
    abstract createPreference(preference: Preference): Preference
}