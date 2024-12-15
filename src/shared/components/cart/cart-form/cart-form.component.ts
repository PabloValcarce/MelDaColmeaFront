import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { NavComponent } from '../../nav/nav.component';
import { FooterComponent } from '../../footer/footer.component';
import Swal from 'sweetalert2';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CartService } from '../../../services/cart.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-cart-form',
  standalone: true,
  imports: [
    CommonModule,
    NavComponent,
    FooterComponent,
    ReactiveFormsModule
  ],
  templateUrl: './cart-form.component.html',
  styleUrl: './cart-form.component.css'
})
export class CartFormComponent {

  quantity: number = 1;

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
    private router:Router,
    private cartService: CartService,
  ) { }


  ngOnInit(): void {
    this.cartForm = this.fb.group({
      nombre: ['', Validators.required],
      cantidad: [0, Validators.required],
      email: ['', [Validators.required, Validators.email]], // Valida el formato de correo electrónico
      telefono: ['', [Validators.required, Validators.pattern(/^[0-9]{9}$/)]], // Valida que sean 9 dígitos
      direccion: ['', Validators.required],
      cp: ['', Validators.required],
      localidad: ['', Validators.required],
      provincia: ['', Validators.required],
      cif: ['', Validators.required],
    });
    // Suscribirse al observable para recibir el valor de quantity
    this.cartService.quantity$.subscribe(quantity => {
      // Actualizar el campo cantidad del formulario cuando quantity cambie
      this.cartForm.patchValue({ cantidad: quantity });
    });
  }

  // Método para enviar el formulario
  onSubmit(): void {
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
}
