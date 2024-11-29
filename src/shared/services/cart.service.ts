import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  private apiUrl ='http://localhost:8080/api/sheets/insert';

  constructor(private http:HttpClient) { }

  insertOrder(formData:any):Observable<any>{

    const rowData = [
      formData.cliente,
      formData.concepto,
      formData.cantidad
    ]

    return this.http.post<any>(this.apiUrl,rowData);
    
  }
}
