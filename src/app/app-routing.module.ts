import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {AuthGuard} from './_guard/auth.guard';

const routes: Routes = [
    {
        path: '',
        redirectTo: 'home',
        pathMatch: 'full'
    },
    {
        path: 'home',
        loadChildren: './home/home.module#HomePageModule'
    },
    {
        path: 'auth',
        loadChildren: './auth/auth.module#AuthPageModule'
    },
    {
        path: 'auth/:action',
        loadChildren: './auth/auth.module#AuthPageModule'
    },
    {
        path: 'event/create',
        loadChildren: './event/creation/creation.module#CreationPageModule',
        canActivate: [AuthGuard]
    },
    {
        path: 'event/detail',
        loadChildren: './event/detail/detail.module#DetailPageModule'
    },

];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule {
}
