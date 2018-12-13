import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {AuthService} from './auth.service';
import {API_URL} from '../app.config';

@Injectable({
    providedIn: 'root'
})
export class EventService {

    constructor(private _http: HttpClient, private _authService: AuthService) {
    }

    list() {
        return this._http.get(API_URL + '/api/events/');
    }

    toDate(date: string) {
        return new Date(date);
    }
}
