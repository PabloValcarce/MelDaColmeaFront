import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
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
