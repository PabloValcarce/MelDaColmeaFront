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
  styleUrl: './home-page.component.css'
})
export class HomePageComponent {

  constructor(
    @Inject(PLATFORM_ID) private platformId: Object
    , private renderer: Renderer2) {

  }
  ngOnInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      this.renderer.setStyle(document.body, 'background-color', 'black')
    }
  }

}
