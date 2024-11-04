import { Routes } from '@angular/router';
import { HomePageComponent } from '../shared/components/home-page/home-page.component';
import { LoginComponent } from '../shared/components/login/login.component';


export const routes: Routes = [
    {path:'',component:HomePageComponent},
    {path:'login', component:LoginComponent}
];
