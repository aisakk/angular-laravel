import { Component } from '@angular/core';
import { RegistroServiceService } from '../../component/form-registro/registro-service.service';
import { NgIf, NgFor, NgClass } from '@angular/common';
import { FormsModule } from '@angular/forms'; 
import {ConsultaRegistro} from '../form-registro/registro-interface';
@Component({
  selector: 'app-tabla',
  standalone: true,
  imports: [FormsModule, NgIf, NgFor, NgClass],
  templateUrl: './tabla.component.html',
  styleUrl: './tabla.component.css'
})
export class TablaComponent {
  registros:Array<ConsultaRegistro>=[]
  constructor(private servicio: RegistroServiceService){}
  ngOnInit(){
   this.consultarRegistrosTable()
  }
  consultarRegistrosTable(){
    this.servicio.consultarRegistro().subscribe({
      next: data=>{
        this.registros = data
        console.log(this.registros)
      },
      error: error =>{
        console.log(error)
      }
    })
  }
}
