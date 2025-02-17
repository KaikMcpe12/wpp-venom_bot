import { Replace } from "../../helpers/Replace";

export interface PreferenceProps {
    content: string;
    updatedAt: Date,
    createdAt: Date
}

export class Preference {
    private propsPreferences: PreferenceProps

    constructor(
        propsPreferences: Replace<PreferenceProps, { updatedAt?: Date, createdAt?: Date }>,
        private _userId: string
    ){
        this.propsPreferences = {
            ...propsPreferences,
            createdAt: propsPreferences.createdAt ?? new Date(),
            updatedAt: propsPreferences.updatedAt ?? new Date()
        }
    }

    public get id(): string {
        return this._userId
    }

    public set content(preference: string) {
        this.propsPreferences.content = preference
    }

    public get content(): string {
        return this.propsPreferences.content
    }

    public get updatedAt(): Date {
        return this.propsPreferences.updatedAt;
    }

    public get createdAt(): Date {
        return this.propsPreferences.createdAt;
    }
}