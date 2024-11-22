import { CommonModule, isPlatformBrowser } from '@angular/common';
import { Component, inject, Inject, PLATFORM_ID } from '@angular/core';
import { RouterModule } from '@angular/router';
import { TranslateModule, TranslateService } from '@ngx-translate/core';

@Component({
    selector: 'app-nav',
    standalone: true,
    imports: [
        CommonModule,
        RouterModule,
        TranslateModule,
    ],
    templateUrl: './nav.component.html',
    styleUrl: './nav.component.css'
})
export class NavComponent {

    translate: TranslateService = inject(TranslateService);
    isMenuOpen: boolean = false;
    isLanguageMenuOpen: boolean = false;
    languages: string[] = ['es', 'en', 'fr', 'de', 'gal'];

    constructor(@Inject(PLATFORM_ID) private platformId: Object) { }

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


    switchLanguage(language: string) {
        this.translate.use(language);
        this.isLanguageMenuOpen = false;
    }

    getFlagImage(language: string = this.translate.currentLang): string {
        const flagImages: { [key: string]: string } = {
            'es': 'assets/flags/es.svg',
            'gal': 'assets/flags/gal.svg',
            'en': 'assets/flags/en.svg',
            'fr': 'assets/flags/fr.svg',
            'de': 'assets/flags/de.svg'
        };
        return flagImages[language] || 'assets/flags/gal.svg'; // Ruta por defecto si no se encuentra
    }

    toggleLanguageMenu() {
        if (this.isMenuOpen) {
            this.isMenuOpen = false;
        }
        this.isLanguageMenuOpen = !this.isLanguageMenuOpen;
        const languageSelector = document.querySelector('.language-selector');
        if (languageSelector) {
            if (this.isLanguageMenuOpen) {
                languageSelector.classList.add('open');
            } else {
                languageSelector.classList.remove('open');
            }
        }
    }


    toggleMenu() {
        if (this.isLanguageMenuOpen) {
            this.isLanguageMenuOpen = false;
        }
        this.isMenuOpen = !this.isMenuOpen
    }

    onScroll() {
        if (isPlatformBrowser(this.platformId)) {
            const navbar = document.getElementById('navbar');
            if (navbar) {
                navbar.style.backgroundColor = window.scrollY > 50 ? 'rgba(58, 54, 43, 1)' : 'rgba(58, 54, 43, 0.75)';
            }
        }
    }

}
