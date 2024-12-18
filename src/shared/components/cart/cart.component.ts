import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { NavComponent } from '../nav/nav.component';
import { FooterComponent } from '../footer/footer.component';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import {  Router, RouterModule } from '@angular/router';
import { CartService } from '../../services/cart.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    NavComponent,
    FooterComponent,
    TranslateModule,
    ReactiveFormsModule
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
  translate: TranslateService = inject(TranslateService);

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
  cartForm!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private cartService: CartService
  ) { }
  
  ngOnInit(): void {
    this.cartForm = this.fb.group({
      nombre: ['', Validators.required],
      cantidad: [0, Validators.required],
      telefono: ['', [Validators.required, Validators.pattern(/^[0-9]{9}$/)]], // Valida que sean 9 dígitos
      direccion: ['', Validators.required],
      cp: ['', Validators.required],
    });
   
    // Suscribirse al observable para recibir el valor de quantity
  }
    // Método para enviar el formulario
    onSubmit(): void {
      this.cartForm.patchValue({ cantidad: this.quantity });
      console.log(this.cartForm);
      if (this.cartForm.valid) {
  
        const formData = this.cartForm.value;
  
        Swal.fire({
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
  
            Swal.fire({
              title: "Pedido realizado con éxito",
              icon: "success",
              allowOutsideClick: false,
            }).then((result)=>{
              this.cartForm.reset();
              this.router.navigate(['/cart']);
  
            })
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
  }

  decreaseQuantity() {
    if (this.quantity > 1) {
      this.quantity--;
    }
  }

  totalPrice() {
    return this.quantity * this.product.price;
  }


}
