import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  private apiUrl ='http://localhost:8080/api/sheets/insert';

  private quantitySubject = new BehaviorSubject<number>(1); // Valor inicial de quantity
  quantity$ = this.quantitySubject.asObservable(); // Observable para que otros componentes se suscriban

  constructor(private http:HttpClient) { }

  setQuantity(quantity: number): void {
    this.quantitySubject.next(quantity); // Actualizar el valor de quantity
  }

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
