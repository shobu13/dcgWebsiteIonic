import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {API_URL} from '../app.config';
import {User} from '../_models/user';
import {UserService} from './user.service';

@Injectable({
    providedIn: 'root'
})
export class AuthService {

    private _httpOptions: any;

    private _token: string;

    private _token_expires: Date;

    private _user: User;

    private _errors: any = [];

    constructor(private http: HttpClient, private _userService: UserService) {
        this._httpOptions = {
            headers: new HttpHeaders({'Content-Type': 'application/json'})
        };
    }


    get httpOptions(): any {
        return this._httpOptions;
    }

    set httpOptions(value: any) {
        this._httpOptions = value;
    }

    get token(): string {
        return this._token;
    }

    set token(value: string) {
        this._token = value;
    }

    get token_expires(): Date {
        return this._token_expires;
    }

    set token_expires(value: Date) {
        this._token_expires = value;
    }

    get user(): User {
        return this._user;
    }

    set user(value: User) {
        this._user = value;
    }

    get errors(): any {
        return this._errors;
    }

    set errors(value: any) {
        this._errors = value;
    }

    public updateData(token) {
        this._token = token;
        this._errors = [];

        // split à partire d'une regex
        const token_parts = this._token.split(/\./);
        const token_decoded = JSON.parse(window.atob(token_parts[1]));
        this._token_expires = new Date(token_decoded.exp * 1000);
        this._userService.retrieve_full(token_decoded.user_id, this._token).subscribe(
            data => {
                this._user = new User(data);
            },
            err => {
                console.log(err);
            }
        );
    }

    public login(user) {
        return this.http.post(API_URL + '/api-token-auth/', JSON.stringify(user), this._httpOptions);
    }

    public refreshToken() {
        this.http.post(API_URL + '/api-token-refresh/', JSON.stringify({token: this._token}), this._httpOptions).subscribe(
            data => {
                this.updateData(data['token']);
                console.log('refresh !');
            },
            err => {
                this._errors = err['error'];
                console.log('Meh');
            }
        );
    }

    public logout() {
        this._token = null;
        this._token_expires = null;
        this._user = null;
    }

    public isAuth() {
        return !(this.user === undefined);
    }

}
