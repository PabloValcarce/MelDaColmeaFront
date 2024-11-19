import { Component, Inject, PLATFORM_ID, Renderer2 } from '@angular/core';
import { NavComponent } from '../nav/nav.component';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { LoginComponent } from '../login/login.component';
import { FooterComponent } from '../footer/footer.component';
import { ContactComponent } from '../contact/contact.component';

@Component({
  selector: 'app-home-page',
  standalone: true,
  imports: [
    CommonModule,
    NavComponent,
    LoginComponent,
    FooterComponent,
    ContactComponent
  ],
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css']  // Cambié styleUrl a styleUrls
})
export class HomePageComponent {

  constructor(
    @Inject(PLATFORM_ID) private platformId: Object,
    private renderer: Renderer2
  ) {}

  ngOnInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      this.setBackground();
    }
  }

  setBackground(): void {
    // Crear un div que servirá como fondo
    const backgroundDiv = this.renderer.createElement('div');
    
    // Establecer estilos del fondo en el div
    this.renderer.setStyle(backgroundDiv, 'position', 'absolute');
    this.renderer.setStyle(backgroundDiv, 'top', '0');
    this.renderer.setStyle(backgroundDiv, 'left', '0');
    this.renderer.setStyle(backgroundDiv, 'right', '0');
    this.renderer.setStyle(backgroundDiv, 'bottom', '0');
    this.renderer.setStyle(backgroundDiv, 'background-image', 'url(assets/hexagono.png)');
    this.renderer.setStyle(backgroundDiv, 'background-repeat', 'no-repeat');
    this.renderer.setStyle(backgroundDiv, 'background-size', 'cover');
    this.renderer.setStyle(backgroundDiv, 'background-position', 'center');
    this.renderer.setStyle(backgroundDiv, 'transform', 'scaleX(-1)');  // Voltear el fondo horizontalmente
    this.renderer.setStyle(backgroundDiv, 'z-index', '-1');  // Colocar el fondo detrás del contenido
    this.renderer.setStyle(backgroundDiv, 'height', '100vh');  // Asegurarse de que el fondo cubra toda la pantalla
    this.renderer.setStyle(backgroundDiv, 'width', '100%');  // Asegurarse de que el fondo cubra toda la pantalla

    // Agregar el div como hijo del body
    this.renderer.appendChild(document.body, backgroundDiv);
  }
}