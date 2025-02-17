import { randomUUID } from "crypto"
import { Replace } from "../../helpers/Replace"
import { Preference } from "../preference/preference"

export interface ContactProps {
    name: string,
    phonenumber: string,
    botstatus: boolean,
    updatedAt: Date,
    createdAt: Date
    preferences?: string[]
}

export class Contact {
    private _id: string;
    private props: ContactProps;
    private _preferences: Preference[] = [];

    constructor(
        props: Replace<ContactProps, { updatedAt?: Date, createdAt?: Date, botstatus?: boolean, }>,
        id?: string
    ){
        this._id = id ?? randomUUID()
        this.props = {
            ...props,
            botstatus: props.botstatus ?? true,
            createdAt: props.createdAt ?? new Date(),
            updatedAt: props.updatedAt ?? new Date()
        }
    }

    public get id() {
        return this._id;
    }

    public set name(name: string) {
        this.props.name = name;
    }

    public get name(): string {
        return this.props.name;
    }

    public set phonenumber(phonenumber: string) {
        this.props.phonenumber = phonenumber;
    }

    public get phonenumber(): string {
        return this.props.phonenumber;
    }

    public turnoffbot() {
        this.props.botstatus = false;
    }

    public turnonbot() {
        this.props.botstatus = true;
    }

    public get botstatus(): boolean {
        return this.props.botstatus;
    }

    public get updatedAt(): Date {
        return this.props.updatedAt;
    }

    public get createdAt(): Date {
        return this.props.createdAt;
    }

    public get preferences(): string[] {
        return this._preferences.map(preference => preference.content);
    }

    public set preferences(preference: string[]) {
        this._preferences = preference.map(content => new Preference({ content }, this._id));
    }
}