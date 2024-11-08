import { CommonModule, isPlatformBrowser } from '@angular/common';
import { Component, Inject, PLATFORM_ID, Renderer2 } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NavComponent } from '../nav/nav.component';

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [
    CommonModule,
    NavComponent,
    FormsModule
    
  ],
  templateUrl: './contact.component.html',
  styleUrl: './contact.component.css'
})
export class ContactComponent {
  contactForm = {
    name: '',
    email: '',
    subject: '',
    message: ''
  };
  constructor(
    @Inject(PLATFORM_ID) private platformId: Object,
    private renderer: Renderer2
  ){}
  ngOnInit() {
    // Establecer estilos de fondo en el body
    if (isPlatformBrowser(this.platformId)) {
      this.renderer.setStyle(document.body, 'background-image', "url(assets/contact2.jpg)");
      this.renderer.setStyle(document.body, 'height', '70%');
    }
  }

  // Método que se ejecuta cuando el formulario se envía
  onSubmit(): void {
    if (this.contactForm.name && this.contactForm.email && this.contactForm.subject && this.contactForm.message) {
      console.log('Formulario enviado:', this.contactForm);
      // Aquí puedes enviar el formulario a un servidor o hacer lo que sea necesario.
      alert('¡Mensaje enviado exitosamente!');
      // Limpiar el formulario
      this.contactForm = { name: '', email: '', subject: '', message: '' };
    } else {
      alert('Por favor, completa todos los campos.');
    }
  }
}
