import { CommonModule, isPlatformBrowser } from '@angular/common';
import { Component, Inject, PLATFORM_ID, Renderer2 } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { NavComponent } from '../nav/nav.component';
import { ContactService } from '../../services/contact.service';
import { FooterComponent } from '../footer/footer.component';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    NavComponent,
    FooterComponent,

  ],
  templateUrl: './contact.component.html',
  styleUrl: './contact.component.css'
})
export class ContactComponent {
  contactForm!: FormGroup;
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
    @Inject(PLATFORM_ID) private platformId: Object,
    private renderer: Renderer2,
    private contactService: ContactService,
    private fb: FormBuilder
  ) { }
  ngOnInit(): void {
    this.contactForm = this.fb.group({
      name: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      subject: ['', [Validators.required]],
      message: ['', [Validators.required]]
    });
  }
  onSubmit(): void {
    if (this.contactForm.valid) {

      const formData = this.contactForm.value;

      const loading = Swal.fire({
        title: 'Procesando...',
        text: 'Estamos enviando tu mensaje, por favor espera.',
        icon: 'info',
        showConfirmButton: false,
        allowOutsideClick: false,
        didOpen: () => {
          Swal.showLoading(); // Mostrar el spinner de carga
        }
      })

      this.contactService.sendContact(formData).subscribe(
        response => {
          console.log('Correo enviado con éxito', response);
          this.Toast.fire({
            icon: "success",
            title: "Mensaje enviado con éxito"
          })
          this.contactForm.reset();

        },
        error => {
          this.Toast.fire({
            icon: "error",
            title: "Error al enviar el mensaje"
          })
          console.error('Error al enviar el correo', error);
        }
      );
    }
  }
}
