import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { NavComponent } from '../nav/nav.component';
import { FooterComponent } from '../footer/footer.component';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { FormGroup } from '@angular/forms';
import { CartFormComponent } from './cart-form/cart-form.component';
import { ActivatedRoute, NavigationEnd, Router, RouterModule } from '@angular/router';
import { Subscription } from 'rxjs';
import { CartService } from '../../services/cart.service';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    NavComponent,
    FooterComponent,
    CartFormComponent,
    TranslateModule
  ],
  providers: [TranslateService],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.css'
})
export class CartComponent {

  product = {
    name: 'Tarro de Miel',
    price: 10.00
  };
  quantity: number = 1;
  isFormPage = false;
  private routeSub!: Subscription;

  translate: TranslateService = inject(TranslateService);
  cart!: FormGroup;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private cartService: CartService
  ) { }
  
  ngOnInit() {
    // Suscribirse a los cambios de la URL para detectar cuándo estamos en la ruta /cart/form
    this.routeSub = this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        // Si la ruta es '/cart/form', ocultamos el contenido del padre
        this.isFormPage = this.router.url.includes('cart/form');
      }
    });
  }

  ngOnDestroy() {
    // Limpiar la suscripción cuando el componente se destruya
    if (this.routeSub) {
      this.routeSub.unsubscribe();
    }
  }

  increaseQuantity() {
    this.quantity++;
    this.cartService.setQuantity(this.quantity); // Actualizar cantidad en el servicio
  }

  decreaseQuantity() {
    if (this.quantity > 1) {
      this.quantity--;
      this.cartService.setQuantity(this.quantity); // Actualizar cantidad en el servicio
    }
  }

  totalPrice() {
    return this.quantity * this.product.price;
  }


}
