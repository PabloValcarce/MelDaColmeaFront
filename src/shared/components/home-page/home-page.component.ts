import { Component, inject } from '@angular/core';
import { NavComponent } from '../nav/nav.component';
import { CommonModule } from '@angular/common';
import { FooterComponent } from '../footer/footer.component';
import { TranslateModule, TranslateService} from '@ngx-translate/core';
import { RouterModule } from '@angular/router';
import { HomePageDirective } from '../../directives/home-page.directive';

@Component({
  selector: 'app-home-page',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    NavComponent,
    FooterComponent,
    TranslateModule,
    HomePageDirective
  ],
  providers:[TranslateService],
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css']  // Cambié styleUrl a styleUrls
})
export class HomePageComponent {
  translate:TranslateService = inject(TranslateService);  

}