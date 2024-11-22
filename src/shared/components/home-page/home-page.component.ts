import { Component, inject, Inject, PLATFORM_ID, Renderer2 } from '@angular/core';
import { NavComponent } from '../nav/nav.component';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { LoginComponent } from '../login/login.component';
import { FooterComponent } from '../footer/footer.component';
import { ContactComponent } from '../contact/contact.component';
import { TranslateModule, TranslateService} from '@ngx-translate/core';

@Component({
  selector: 'app-home-page',
  standalone: true,
  imports: [
    CommonModule,
    NavComponent,
    LoginComponent,
    FooterComponent,
    ContactComponent,
    TranslateModule
  ],
  providers:[TranslateService],
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css']  // Cambié styleUrl a styleUrls
})
export class HomePageComponent {
  translate:TranslateService = inject(TranslateService);  

}