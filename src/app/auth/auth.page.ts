import {Component, OnInit} from '@angular/core';
import {AuthService} from '../services/auth.service';

@Component({
    selector: 'app-auth',
    templateUrl: './auth.page.html',
    styleUrls: ['./auth.page.scss'],
})
export class AuthPage implements OnInit {

    private user: any;

    constructor(private _authService: AuthService) {
    }

    ngOnInit() {
        this.user = {
            username: '',
            password: ''
        };
    }

    login() {
        this._authService.login({'username': this.user.username, 'password': this.user.password}).subscribe(
            data => {
                console.log("Co ok !");
            },
            err => {
                console.log("co aps ok");
            }
        );
    }

    refreshToken() {
        this._authService.refreshToken();
    }

    logout() {
        this._authService.logout();
    }

}
