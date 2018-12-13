import {Component, OnInit} from '@angular/core';

import {Platform} from '@ionic/angular';
import {SplashScreen} from '@ionic-native/splash-screen/ngx';
import {StatusBar} from '@ionic-native/status-bar/ngx';
import {AuthService} from './services/auth.service';

@Component({
    selector: 'app-root',
    templateUrl: 'app.component.html'
})
export class AppComponent {
    private appPagesLogged = [
        {
            title: 'Accueil',
            url: '/home',
            icon: 'home'
        },
        {
            title: 'Deconnexion',
            url: '/auth/logout',
            icon: 'power'
        }
    ];

    private appPagesNotLogged = [
        {
            title: 'Accueil',
            url: '/home',
            icon: 'home'
        },
        {
            title: 'Connexion',
            url: '/auth',
            icon: 'contact'
        }
    ];

    public appPages = this.appPagesNotLogged;


    constructor(
        private platform: Platform,
        private splashScreen: SplashScreen,
        private statusBar: StatusBar,
        private _auth: AuthService
    ) {
        this.initializeApp();
    }

    initializeApp() {
        this.platform.ready().then(() => {
            this.statusBar.styleDefault();
            this.splashScreen.hide();
        });
    }

    setAppPages() {
        if (this._auth.token_expires) {
            this.appPages = this.appPagesLogged;
        } else {
            this.appPages = this.appPagesNotLogged;
        }
    }

}
