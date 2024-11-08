import { CommonModule, isPlatformBrowser } from '@angular/common';
import { Component, Inject, PLATFORM_ID } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-nav',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule
  ],
  templateUrl: './nav.component.html',
  styleUrl: './nav.component.css'
})
export class NavComponent {

    isMenuOpen = false;

    constructor(@Inject(PLATFORM_ID) private platformId: Object) {}

    toggleMenu() {
        this.isMenuOpen = !this.isMenuOpen;
    }

    onScroll() {
        if (isPlatformBrowser(this.platformId)) {
            const navbar = document.getElementById('navbar');
            if (navbar) {
                navbar.style.backgroundColor = window.scrollY > 50 ? 'rgba(58, 54, 43, 1)' : 'rgba(58, 54, 43, 0.75)';
            }
        }
    }

    ngOnInit() {
        if (isPlatformBrowser(this.platformId)) {
            window.addEventListener('scroll', this.onScroll.bind(this));
        }
    }

    ngOnDestroy() {
        if (isPlatformBrowser(this.platformId)) {
            window.removeEventListener('scroll', this.onScroll.bind(this));
        }
    }
}
