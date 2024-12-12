import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { NavComponent } from '../../nav/nav.component';
import { FooterComponent } from '../../footer/footer.component';

@Component({
  selector: 'app-cart-form',
  standalone: true,
  imports: [
    CommonModule,
    NavComponent,
    FooterComponent,
  ],
  templateUrl: './cart-form.component.html',
  styleUrl: './cart-form.component.css'
})
export class CartFormComponent {

}
