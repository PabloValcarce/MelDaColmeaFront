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
  showLoginBox:boolean = true;
  showRegisterBox:boolean = false;

  // Definir las vistas de los formularios y contenedores con ViewChild
  @ViewChild('formularioLogin') formulario_login!: ElementRef;
  @ViewChild('formularioRegister') formulario_register!: ElementRef;
  @ViewChild('contenedorLoginRegister') contenedor_login_register!: ElementRef;
  @ViewChild('cajaTraseraLogin') caja_trasera_login!: ElementRef;
  @ViewChild('cajaTraseraRegister') caja_trasera_register!: ElementRef;

  constructor(
    @Inject(PLATFORM_ID) private platformId: Object,
    private renderer: Renderer2
  ) {}

  ngOnInit() {
    // Establecer estilos de fondo en el body
    if (isPlatformBrowser(this.platformId)) {
      this.isMobile = window.innerWidth <= 850;
      this.renderer.setStyle(document.body, 'background-color', '#121212');
      this.renderer.setStyle(document.body, 'height', '70%');
    }
    this.updateLayout();
  }
  @HostListener('window:resize', ['$event'])
  onResize(event: any) {
    this.updateLayout();
  }
  // Actualiza el estado basado en el tamaño de la ventana
  updateLayout() {
    this.isMobile = window.innerWidth <= 850;
    if (!this.isMobile) {
      // Si estamos en una pantalla grande, mostramos ambas cajas
      this.showLoginBox = true;
      this.showRegisterBox = true;
    } else {
      // Si estamos en una pantalla pequeña, mostramos solo la caja de login por defecto
      this.showLoginBox = true;
      this.showRegisterBox = false;
    }
  }
  ngAfterViewInit() {
    // Asegurarse de que los elementos se hayan inicializado
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
    // Maneja el inicio de sesión
    console.log('Iniciar sesión');
  }

  onRegister() {
    // Maneja el registro
    console.log('Registrarse');
  }

  // anchoPage() {
  //   if (window.innerWidth > 850) {
  //     this.renderer.setStyle(this.caja_trasera_register.nativeElement, 'display', 'block');
  //     this.renderer.setStyle(this.caja_trasera_login.nativeElement, 'display', 'block');
  //   } else {
  //     this.renderer.setStyle(this.caja_trasera_register.nativeElement, 'display', 'block');
  //     this.renderer.setStyle(this.caja_trasera_register.nativeElement, 'opacity', '1');
  //     this.renderer.setStyle(this.caja_trasera_login.nativeElement, 'display', 'none');
  //     this.renderer.setStyle(this.formulario_login.nativeElement, 'display', 'block');
  //     this.renderer.setStyle(this.contenedor_login_register.nativeElement, 'left', '0px');
  //     this.renderer.setStyle(this.formulario_register.nativeElement, 'display', 'none');
  //   }
  // }

  // register() {
  //   if (window.innerWidth > 850) {
  //     this.renderer.setStyle(this.formulario_register.nativeElement, 'display', 'block');
  //     this.renderer.setStyle(this.contenedor_login_register.nativeElement, 'left', '410px');
  //     this.renderer.setStyle(this.formulario_login.nativeElement, 'display', 'none');
  //     this.renderer.setStyle(this.caja_trasera_register.nativeElement, 'opacity', '0');
  //     this.renderer.setStyle(this.caja_trasera_login.nativeElement, 'opacity', '1');
  //   } else {
  //     this.renderer.setStyle(this.formulario_register.nativeElement, 'display', 'block');
  //     this.renderer.setStyle(this.contenedor_login_register.nativeElement, 'left', '0px');
  //     this.renderer.setStyle(this.formulario_login.nativeElement, 'display', 'none');
  //     this.renderer.setStyle(this.caja_trasera_register.nativeElement, 'display', 'none');
  //     this.renderer.setStyle(this.caja_trasera_login.nativeElement, 'display', 'block');
  //     this.renderer.setStyle(this.caja_trasera_login.nativeElement, 'opacity', '1');
  //   }
  // }

  // iniciarSesion() {
  //   if (window.innerWidth > 850) {
  //     this.renderer.setStyle(this.formulario_login.nativeElement, 'display', 'block');
  //     this.renderer.setStyle(this.contenedor_login_register.nativeElement, 'left', '10px');
  //     this.renderer.setStyle(this.formulario_register.nativeElement, 'display', 'none');
  //     this.renderer.setStyle(this.caja_trasera_register.nativeElement, 'opacity', '1');
  //     this.renderer.setStyle(this.caja_trasera_login.nativeElement, 'opacity', '0');
  //   } else {
  //     this.renderer.setStyle(this.formulario_login.nativeElement, 'display', 'block');
  //     this.renderer.setStyle(this.contenedor_login_register.nativeElement, 'left', '0px');
  //     this.renderer.setStyle(this.formulario_register.nativeElement, 'display', 'none');
  //     this.renderer.setStyle(this.caja_trasera_register.nativeElement, 'display', 'block');
  //     this.renderer.setStyle(this.caja_trasera_login.nativeElement, 'display', 'none');
  //   }
  // }
}
