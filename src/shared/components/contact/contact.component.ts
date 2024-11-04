import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { NavComponent } from '../nav/nav.component';

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [
    CommonModule,
    NavComponent
  ],
  templateUrl: './contact.component.html',
  styleUrl: './contact.component.css'
})
export class ContactComponent {

}
