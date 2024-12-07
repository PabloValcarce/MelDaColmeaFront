import { CommonModule, DOCUMENT, isPlatformBrowser } from '@angular/common';
import { Component, inject, Inject, PLATFORM_ID, Renderer2 } from '@angular/core';
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

    constructor(private renderer: Renderer2, @Inject(DOCUMENT) private document: Document) { }

    ngOnInit() {
        // Usamos Renderer2 para agregar el event listener al documento
        this.renderer.listen(this.document, 'click', this.onClickOutsideMenu.bind(this));
    }

    ngOnDestroy() {
        // Asegúrate de eliminar el event listener cuando el componente se destruya
        // Aunque con Renderer2 se maneja de forma segura
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

        this.isLanguageMenuOpen = !this.isLanguageMenuOpen;

    }
    toggleMenu() {
        this.isMenuOpen = !this.isMenuOpen
    }
    onClickOutsideMenu(event: MouseEvent) {
        const menu = document.getElementById('navbar');
        if (menu && !menu.contains(event.target as Node)) {
            this.isMenuOpen = false; // Cierra el menú si el clic fue fuera de él
        }
    }


}
