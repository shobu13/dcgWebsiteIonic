import {Component, OnDestroy, OnInit} from '@angular/core';
import {AuthService} from '../services/auth.service';
import {EventService} from '../services/event.service';
import {UserService} from '../services/user.service';
import {Event} from '../_models/event';
import {containerRefreshStart} from '@angular/core/src/render3';
import {and} from '@angular/router/src/utils/collection';

@Component({
    selector: 'app-home',
    templateUrl: 'home.page.html',
    styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {
    private _eventsList: Event[];
    private n = 0;

    constructor(private _auth: AuthService, private _event: EventService, private _user: UserService) {
        this._eventsList = [];
    }

    ngOnInit() {
        this.getEvents();
    }

    getEvents() {
        this._event.list().subscribe(
            (data: Array<Object>) => {
                for (const event of data) {
                    this._eventsList.push(new Event(event));
                }
            },
            err => {
                console.log('err');
                console.log(err);
            }
        );
    }

    getEventButtonColor(event: Event): String {
        if (this._auth.isAuth() && this._auth.user !== null) {
            if (event.isParticipant(this._auth.user)) {
                return 'success';
            }
        }
    }
}
