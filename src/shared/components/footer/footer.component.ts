import { CommonModule, isPlatformBrowser } from '@angular/common';
import { Component, HostListener, Inject, PLATFORM_ID } from '@angular/core';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [
    CommonModule
  ],
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.css'
})
export class FooterComponent {

  footerVisible:boolean = false

  constructor(@Inject(PLATFORM_ID) private platformId: Object) { }

  @HostListener('window:scroll', [])
onScroll() {
  if (isPlatformBrowser(this.platformId)) {
    const documentHeight = document.documentElement.scrollHeight;
    const windowHeight = window.innerHeight;
    const scrollPosition = window.scrollY;

    if(windowHeight >= documentHeight){
      this.footerVisible = true;
    }

    // Si el usuario está cerca del final de la página, mostramos el footer
    if (scrollPosition + windowHeight >= documentHeight - 50 && !this.footerVisible) {
      this.footerVisible = true;  // Solo activar una vez
    }
  }
}
}
