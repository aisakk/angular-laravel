import { Component } from '@angular/core';
import { FormRegistroComponent } from '../../component/form-registro/form-registro.component';
@Component({
  selector: 'app-registro-empleado',
  standalone: true,
  imports: [FormRegistroComponent],
  templateUrl: './registro-empleado.component.html',
  styleUrl: './registro-empleado.component.css'
})
export class RegistroEmpleadoComponent {

}
