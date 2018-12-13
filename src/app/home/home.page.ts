import {Component, OnDestroy, OnInit} from '@angular/core';
import {AuthService} from '../services/auth.service';
import {EventService} from '../services/event.service';
import {UserService} from '../services/user.service';

@Component({
    selector: 'app-home',
    templateUrl: 'home.page.html',
    styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit, OnDestroy {
    private token_expiration: number;
    private token_expiration_hour: number;
    private token_expiration_minutes: number;
    private token_expiration_seconds: number;
    private interval: any;
    private _eventsList: any;

    constructor(private _auth: AuthService, private _event: EventService, private _user: UserService) {
    }

    ngOnInit() {
        this.interval = setInterval(() => {
            if (this._auth.username) {
                this.token_expiration = this._auth.token_expires.getTime() - Date.now();
                this.token_expiration_seconds = Math.floor((this.token_expiration / 1000) % 60);
                this.token_expiration_minutes = Math.floor((this.token_expiration / (1000 * 60)) % 60);
                this.token_expiration_hour = Math.floor((this.token_expiration / (1000 * 60 * 60)) % 24);

            } else {
                this.token_expiration = null;
            }
        }, 1000);
        this._event.list().subscribe(
            data => {
                this._eventsList = data;
            },
            err => {
                console.log('err');
                console.log(err);
            }
        );
        console.log(this._eventsList);
    }

    ngOnDestroy() {
        if (this.interval) {
            clearInterval(this.interval);
        }
    }

}
