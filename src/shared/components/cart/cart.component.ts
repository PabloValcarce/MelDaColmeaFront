import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { NavComponent } from '../nav/nav.component';
import { FooterComponent } from '../footer/footer.component';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [
    CommonModule,
    NavComponent,
    FooterComponent,
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
  
  translate: TranslateService = inject(TranslateService);
  cartForm!: FormGroup;
 

  increaseQuantity() {
    this.quantity++;
    this.cartForm.get('cantidad')?.setValue(this.quantity);
  }

  // Disminuir la cantidad
  decreaseQuantity() {
    if (this.quantity > 1) {
      this.quantity--;
      this.cartForm.get('cantidad')?.setValue(this.quantity);
    }
  }

  // Calcular el precio total
  totalPrice() {
    return this.product.price * this.quantity;
  }

}
