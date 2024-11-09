import { CommonModule, isPlatformBrowser } from '@angular/common';
import { Component, Inject, PLATFORM_ID, Renderer2, AfterViewInit, ViewChild, ElementRef, HostListener } from '@angular/core';
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
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements AfterViewInit {
  isLoginView: boolean = true;
  isMobile: boolean = false;
  showLoginBox: boolean = true;
  showRegisterBox: boolean = false;
  
  @ViewChild('formularioLogin') formulario_login!: ElementRef;
  @ViewChild('formularioRegister') formulario_register!: ElementRef;
  @ViewChild('contenedorLoginRegister') contenedor_login_register!: ElementRef;
  @ViewChild('cajaTraseraLogin') caja_trasera_login!: ElementRef;
  @ViewChild('cajaTraseraRegister') caja_trasera_register!: ElementRef;

  constructor(
    @Inject(PLATFORM_ID) private platformId: Object,
    private renderer: Renderer2
  ) { }

  ngOnInit() {
    // Establecer estilos de fondo en el body
    if (isPlatformBrowser(this.platformId)) {
      this.isMobile = window.innerWidth <= 850;
      this.renderer.setStyle(document.body, 'height', '70%');
    }
    this.updateLayout();
  }
  @HostListener('window:resize', ['$event'])
  onResize(event: any) {
    this.updateLayout();
  }
  updateLayout() {
    if (isPlatformBrowser(this.platformId)) {
      this.isMobile = window.innerWidth <= 850;
      if (!this.isMobile) {
        this.showLoginBox = true;
        this.showRegisterBox = true;
      } else {
        this.showLoginBox = true;
        this.showRegisterBox = false;
      }
    }
  }
  ngAfterViewInit() {
    if (isPlatformBrowser(this.platformId)) {
      // No necesitamos querySelector, ya que @ViewChild ya nos da acceso a los elementos
    }
  }

  toggleView(view: string) {
    this.isLoginView = (view === 'login');
    if (view === 'login') {
      this.showLoginBox = true;
      this.showRegisterBox = false;
    } else if (view === 'register') {
      this.showLoginBox = false;
      this.showRegisterBox = true;
    }
  }

  onLogin() {
    console.log('Iniciar sesión');
  }

  onRegister() {
    console.log('Registrarse');
  }
}
