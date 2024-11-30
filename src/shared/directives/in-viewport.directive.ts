import { Directive, ElementRef, Renderer2, HostListener, OnInit, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

@Directive({
  selector: '[appInViewport]',
  standalone: true
})
export class InViewportDirective implements OnInit {
  private triggerMargin: number = 200; // Valor por defecto

  constructor(
    private el: ElementRef,
    private renderer: Renderer2,
    @Inject(PLATFORM_ID) private platformId: Object // Inyectamos la plataforma
  ) {}

  ngOnInit() {
    // Solo ejecutamos el código relacionado con el navegador si estamos en el navegador
    if (isPlatformBrowser(this.platformId)) {
      this.updateTriggerMargin(); // Establece el margen inicial
      this.renderer.addClass(this.el.nativeElement, 'fade-in');
    }
  }

  @HostListener('window:scroll', [])
  onWindowScroll() {
    if (isPlatformBrowser(this.platformId)) {
      const rect = this.el.nativeElement.getBoundingClientRect();
      const windowHeight = window.innerHeight;  // Altura de la ventana

      // Verificamos si el elemento está visible según su altura y la altura de la ventana
      const isVisible = rect.top < windowHeight - this.triggerMargin && rect.bottom >= 0;

      if (isVisible) {
        this.renderer.addClass(this.el.nativeElement, 'active');
      }
    }
  }

  @HostListener('window:resize', [])
  onWindowResize() {
    if (isPlatformBrowser(this.platformId)) {
      this.updateTriggerMargin(); // Ajusta el margen al cambiar el tamaño de la ventana
    }
  }

  private updateTriggerMargin() {
    if (isPlatformBrowser(this.platformId)) {
      const windowHeight = window.innerHeight;  // Altura de la ventana

      // Establecemos el triggerMargin en función de la altura de la ventana
      if (windowHeight > 900) {
        this.triggerMargin = 300; // Pantallas grandes
      } else if (windowHeight > 600) {
        this.triggerMargin = 200; // Pantallas medianas
      } else {
        this.triggerMargin = 100; // Pantallas pequeñas
      }
    }
  }
}
