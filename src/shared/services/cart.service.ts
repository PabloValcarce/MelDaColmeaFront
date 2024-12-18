import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {  Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  private apiUrl ='http://localhost:8080/api/sheets/insert';


  constructor(private http:HttpClient) { }

  insertOrder(formData:any):Observable<any>{

    const rowData = [
      formData.nombre,
      formData.cantidad,
      formData.email,
      formData.telefono,
      formData.direccion,
      formData.cp,
      formData.localidad,
      formData.provincia,
      formData.cif
    ]

    return this.http.post<any>(this.apiUrl,rowData);
    
  }
}
