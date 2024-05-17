import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { RegistroFormData } from './registro-interface';
import { Observable } from 'rxjs';
import { HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class RegistroServiceService {
  csrfToken = document.querySelector('meta[name="csrf-token"]')?.getAttribute('content');
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type':  'application/json',
      /* 'X-CSRF-TOKEN': this.csrfToken || '' */
    })
  };
  constructor(private http: HttpClient) { }
  ngOnInit(){
    /* this.csrfToken = this.getCSRFToken(); */
  }
  /* private getCSRFToken(): string {
    const csrfTag: HTMLMetaElement | null = document.querySelector('meta[name="csrf-token"]');
    return csrfTag ? csrfTag.content : '';
  } */

  guardarRegistro(registro: RegistroFormData){
   return this.http.post<RegistroFormData>('http://localhost:8000/api/registro-academy', registro, this.httpOptions)
  }
  consultarRegistro(){
    return this.http.get<any>('http://localhost:8000/api/consulta-academy')
  }
}
