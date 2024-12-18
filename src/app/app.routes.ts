import { Routes } from '@angular/router';
import { HomePageComponent } from '../shared/components/home-page/home-page.component';
import { ContactComponent } from '../shared/components/contact/contact.component';
import { LoginComponent } from '../shared/components/login/login.component';
import { CartComponent } from '../shared/components/cart/cart.component';

export const routes: Routes = [
    { path: '', component: HomePageComponent },
    { path: 'contact', component: ContactComponent },
    { path: 'login', component: LoginComponent },
    { path: 'cart', component: CartComponent },

];
