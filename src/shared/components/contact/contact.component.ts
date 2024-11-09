import { CommonModule, isPlatformBrowser } from '@angular/common';
import { Component, Inject, PLATFORM_ID, Renderer2 } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { NavComponent } from '../nav/nav.component';
import { ContactService} from '../../services/contact-service.service';

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [
    CommonModule,
    NavComponent,
    FormsModule,
    ReactiveFormsModule

  ],
  templateUrl: './contact.component.html',
  styleUrl: './contact.component.css'
})
export class ContactComponent {
  contactForm!: FormGroup;

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
      subject:['',[Validators.required]],
      message: ['', [Validators.required]]
    });

    // Establecer estilos de fondo en el body
    if (isPlatformBrowser(this.platformId)) {
      this.renderer.setStyle(document.body, 'background-image', "url(assets/contact2.jpg)");
      this.renderer.setStyle(document.body, 'background-repeat', "no-repeat");
      this.renderer.setStyle(document.body, 'background-size', "cover");
      this.renderer.setStyle(document.body, 'background-position', "center");
      this.renderer.setStyle(document.body, 'height', '70%');
    }
  }

  // Método que se ejecuta cuando el formulario se envía
  onSubmit(): void {
    if (this.contactForm.valid) {
      const formData = this.contactForm.value;
      this.contactService.sendContact(formData).subscribe(
        response => {
          console.log('Correo enviado con éxito', response);
          // Mostrar un mensaje de éxito
        },
        error => {
          console.error('Error al enviar el correo', error);
          // Mostrar un mensaje de error
        }
      );
    }
  }
}
