import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {API_URL} from '../app.config';
import {observable} from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class AuthService {

    private httpOptions: any;

    public token: string;

    public token_expires: Date;

    public username: string;

    public errors: any = [];

    constructor(private http: HttpClient) {
        this.httpOptions = {
            headers: new HttpHeaders({'Content-Type': 'application/json'})
        };
    }

    public login(user) {
        const logger = this.http.post(API_URL + '/api-token-auth/', JSON.stringify(user), this.httpOptions);
        logger.subscribe(
            data => {
                this.updateData(data['token']);
                console.log('connected !');
            },
            err => {
                this.errors = err['error'];
                console.log('Meh');
            }
        );
        return logger;
    }

    public refreshToken() {
        this.http.post(API_URL + '/api-token-refresh/', JSON.stringify({token: this.token}), this.httpOptions).subscribe(
            data => {
                this.updateData(data['token']);
                console.log('refresh !');
            },
            err => {
                this.errors = err['error'];
                console.log('Meh');
            }
        );
    }

    public logout() {
        this.token = null;
        this.token_expires = null;
        this.username = null;
    }

    private updateData(token) {
        this.token = token;
        this.errors = [];

        // split à partire d'une regex
        const token_parts = this.token.split(/\./);
        const token_decoded = JSON.parse(window.atob(token_parts[1]));
        this.token_expires = new Date(token_decoded.exp * 1000);
        this.username = token_decoded.username;
    }
}
