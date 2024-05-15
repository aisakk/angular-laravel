import { Routes } from '@angular/router';
import { RegistroEmpleadoComponent } from './page/registro-empleado/registro-empleado.component';
import { ConsultaEmpleadoComponent } from './page/consulta-empleado/consulta-empleado.component';
export const routes: Routes = [
    { path: '', component: ConsultaEmpleadoComponent},
    { path:'registro', component: RegistroEmpleadoComponent}
];
