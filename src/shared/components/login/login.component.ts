import { CommonModule, isPlatformBrowser } from '@angular/common';
import { Component, HostListener, Inject,PLATFORM_ID } from '@angular/core';
import { RouterModule } from '@angular/router';
import { NavComponent } from '../nav/nav.component';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    NavComponent
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  isLoginView: boolean = true;
  isMobile: boolean = false;

  constructor(@Inject(PLATFORM_ID) private platformId: Object) {
    if (isPlatformBrowser(this.platformId)) {
      this.isMobile = window.innerWidth <= 850;
      
    }
  }
  changeBackground() {
    document.body.classList.add('new-background');
  }
  toggleView(view: string) {
    this.isLoginView = (view === 'login');
  }

  onLogin() {
    // Maneja el inicio de sesión
    console.log('Iniciar sesión');
  }

  onRegister() {
    // Maneja el registro
    console.log('Registrarse');
  }  
}
