import {Component, OnInit} from '@angular/core';
import {AuthService} from '../services/auth.service';
import {ActivatedRoute, Router} from '@angular/router';
import {AppComponent} from '../app.component';

@Component({
    selector: 'app-auth',
    templateUrl: './auth.page.html',
    styleUrls: ['./auth.page.scss'],
})
export class AuthPage implements OnInit {

    private user: any;

    constructor(private _authService: AuthService, private _router: Router, private _app: AppComponent, private _route: ActivatedRoute) {
    }

    ngOnInit() {
        this.user = {
            username: '',
            password: ''
        };
        let action = this._route.snapshot.params['action'];
        if (action === 'logout') {
            this._authService.logout();
            this._app.setAppPages();
            this._router.navigate(['home']);
        }
    }

    login() {
        this._authService.login({'username': this.user.username, 'password': this.user.password}).subscribe(
            data => {
                console.log('Co ok !');
                this._router.navigate(['home']);
                this._app.setAppPages();
            },
            err => {
                console.log('co aps ok');
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
