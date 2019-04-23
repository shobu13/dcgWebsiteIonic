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
        const action = this._route.snapshot.params['action'];
        if (action === 'logout') {
            const menu = document.querySelector('ion-menu-controller');
            console.log('logout');
            console.log(menu);
            menu.close();
            this._authService.logout();
            this._app.setAppPages();
            this._router.navigate(['home']);
        }
    }

    login() {
        // TODO ligne suivante pue la mort
        this._authService.login({'username': this.user.username, 'password': this.user.password}).subscribe(
            data => {
                this._authService.updateData(data['token']);
                console.log('connected !');
                console.log('Co ok !');
                this._app.setAppPages();
                this._router.navigate(['home']);
            },
            err => {
                console.log('co aps ok');
                this._authService.errors = err['error'];
                console.log('Meh');
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
