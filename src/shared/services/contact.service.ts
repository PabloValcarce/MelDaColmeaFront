import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ContactService {

  private apiUrl = 'http://localhost:8080/contacto/send';

  constructor(private http:HttpClient) { }

  sendContact(formData:any):Observable<any>{

    return this.http.post<any>(this.apiUrl,formData);

  }
}
