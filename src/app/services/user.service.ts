import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {API_URL} from '../app.config';

@Injectable({
    providedIn: 'root'
})
export class UserService {

    constructor(private _http: HttpClient) {
    }

    retrieve(id: number) {
        return this._http.get(API_URL + `/api/user/${id}/`);
    }

    retrieve_full(id: number, token: string) {
        const httpOptions = {
            headers: new HttpHeaders({
                'Content-Type': 'application/json',
                'Authorization': 'JWT ' + token   // this is our token from the UserService (see Part 1)
            })
        };
        return this._http.get(API_URL + `/api/user/${id}/detail-full/`, httpOptions);
    }
}
