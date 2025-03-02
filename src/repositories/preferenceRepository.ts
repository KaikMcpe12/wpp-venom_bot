import { Preference } from "../entities/preference/preference";

export abstract class PreferenceRepository {
    abstract findById(userId: string): Promise<Preference | null>
    abstract createPreference(preference: Preference): Promise<Preference | null>
    abstract save(preference: Preference): Promise<void>
}