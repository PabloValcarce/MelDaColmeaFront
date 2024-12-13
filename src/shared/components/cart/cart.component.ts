import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { NavComponent } from '../nav/nav.component';
import { FooterComponent } from '../footer/footer.component';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { FormGroup } from '@angular/forms';
import { CartFormComponent } from './cart-form/cart-form.component';
import { ActivatedRoute, NavigationEnd, Router, RouterModule } from '@angular/router';
import { Subscription } from 'rxjs';

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
  quantity = 1;
  isFormPage = false;
  private routeSub!: Subscription;

  translate: TranslateService = inject(TranslateService);
  cart!: FormGroup;
 
  constructor(private route: ActivatedRoute, private router: Router) {}
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
    this.cart.get('cantidad')?.setValue(this.quantity);
  }

  // Disminuir la cantidad
  decreaseQuantity() {
    if (this.quantity > 1) {
      this.quantity--;
      this.cart.get('cantidad')?.setValue(this.quantity);
    }
  }

  // Calcular el precio total
  totalPrice() {
    return this.product.price * this.quantity;
  }

 

}
