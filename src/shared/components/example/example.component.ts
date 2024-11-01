import { Component } from '@angular/core';
import { ApiService } from '../../services/api.service';
import { CommonModule } from '@angular/common';
import { Role } from '../../interfaces/role';
import { catchError, tap } from 'rxjs';

@Component({
  selector: 'app-example',
  standalone: true,
  imports: [
    CommonModule
  ],
  templateUrl: './example.component.html',
  styleUrl: './example.component.css'
})
export class ExampleComponent {

  roles: Role[] = [];

  constructor(private apiService: ApiService) { }

  ngOnInit(): void {
    this.getRoles();
  }

  getRoles(): void {
    this.apiService.getRoles().pipe(
      tap(rolesJson => {
        this.roles = rolesJson;
      })
      , catchError(err => {
        return err
      }
      )
    ).subscribe();
  }

}
