import { randomUUID } from "crypto"
import { Replace } from "../../helpers/Replace"

export interface UserProps {
    name: string,
    phonenumber: string,
    botstatus: boolean,
    updatedAt: Date,
    createdAt: Date
    // preferences: preferences[]
}

export class User{
    private _id: string
    private props: UserProps

    constructor(
        props: Replace<UserProps, { updatedAt?: Date, createdAt?: Date }>,
        id?: string
    ){
        this._id = id ?? randomUUID()
        this.props = {
            ...props,
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
}