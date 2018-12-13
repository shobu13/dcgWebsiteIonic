import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {AuthService} from './auth.service';
import {API_URL} from '../app.config';

@Injectable({
    providedIn: 'root'
})
export class UserService {

    constructor(private _http: HttpClient, private _auth: AuthService) {
    }

    retrieve(id: number, observable: Boolean) {
        if (observable) {
            return this._http.get(API_URL + `/api/user/${id}/`);
        } else {
            this._http.get(API_URL + `/api/user/${id}/`).subscribe(
                data => {
                    return data;
                },
                err => {
                    return err;
                }
            );
        }
    }
}
