import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { NavComponent } from '../nav/nav.component';
import { FooterComponent } from '../footer/footer.component';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import Swal from 'sweetalert2';
import { CartService } from '../../services/cart.service';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [
    CommonModule,
    NavComponent,
    FooterComponent,
    FormsModule,
    ReactiveFormsModule,
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
  Toast = Swal.mixin({
    toast: true,
    position: "top-end",
    showConfirmButton: false,
    timer: 4000,
    timerProgressBar: true,
    didOpen: (toast) => {
      toast.onmouseenter = Swal.stopTimer;
      toast.onmouseleave = Swal.resumeTimer;
    }
  });

  constructor(
    private fb: FormBuilder,
    private cartService: CartService,) { }


  ngOnInit(): void {
    // Crear el formulario con campos y validaciones
    this.cartForm = this.fb.group({
      cliente: ['', Validators.required],    // Cliente: requerido
      concepto: ['', Validators.required],   // Concepto: requerido
      cantidad: [null, [Validators.required, Validators.min(1)]],  // Cantidad: requerido, mínimo 1
    });
  }

  // Método para enviar el formulario
  onSubmit(): void {
    if (this.cartForm.valid) {

      const formData = this.cartForm.value;

      const loading = Swal.fire({
        title: 'Procesando...',
        text: 'Estamos procesando tu pedido, por favor espera.',
        icon: 'info',
        showConfirmButton: false,
        allowOutsideClick: false,
        didOpen: () => {
          Swal.showLoading(); // Mostrar el spinner de carga
        }
      })

      this.cartService.insertOrder(formData).subscribe(
        response => {
          console.log(response);
          
          this.Toast.fire({
            icon: "success",
            title: "Pedido realizado con éxito"
          })
          this.cartForm.reset();

        },
        error => {
          this.Toast.fire({
            icon: "error",
            title: "Error al realizar el pedido"
          })
          console.error('Error al realizar el pedido', error);
        }
      )
    }
  }

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
