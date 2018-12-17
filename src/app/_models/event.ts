import {User} from './user';
import {noUndefined} from '@angular/compiler/src/util';

export class Event {
    private _id: number;
    private _owner: User;
    private _name: string;
    private _place: string;
    private _start: Date;
    private _end: string;
    private _participant: Array<User>;

    constructor(input: any) {
        Object.assign(this, input);
    }


    get id(): number {
        return this._id;
    }

    set id(value: number) {
        this._id = value;
    }

    get owner(): User {
        return this._owner;
    }

    set owner(value: User) {
        this._owner = value;
    }

    get name(): string {
        return this._name;
    }

    set name(value: string) {
        this._name = value;
    }

    get place(): string {
        return this._place;
    }

    set place(value: string) {
        this._place = value;
    }

    get start(): Date {
        return this._start;
    }

    set start(value: Date) {
        this._start = value;
    }

    get end(): string {
        return this._end;
    }

    set end(value: string) {
        this._end = value;
    }

    get participant(): Array<User> {
        return this._participant;
    }

    set participant(value: Array<User>) {
        this._participant = value;
    }

    public isParticipant(user: User): boolean {
        return !(this.participant.find((element) => {
            return element.id === user.id;
        }) === undefined);
    }
}
