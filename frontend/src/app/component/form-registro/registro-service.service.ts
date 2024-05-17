import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { RegistroFormData } from '../../interface/interface';
import { Observable } from 'rxjs';
import { HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class RegistroServiceService {
  url = "http://localhost:8000"
  csrfToken = document.querySelector('meta[name="csrf-token"]')?.getAttribute('content');
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type':  'application/json',
    })
  };
  constructor(private http: HttpClient) { }
  ngOnInit(){
    /* this.csrfToken = this.getCSRFToken(); */
  }
 

  guardarRegistro(registro: RegistroFormData){
   return this.http.post<RegistroFormData>(`${this.url}/api/registro-academy`, registro, this.httpOptions)
  }
  consultarRegistro(){
    return this.http.get<any>(`${this.url}/api/consulta-academy`)
  }
  eliminarRegistro(id:string|number){
    return this.http.delete<any>(`${this.url}/api/delete-academy/${id}`, this.httpOptions)
  }

  editarRegistros(id:string|number, registro:any){
    return this.http.put<any>(`${this.url}/api/update-academy/${id}`, registro, this.httpOptions)
  }
}
