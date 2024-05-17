import { Component } from '@angular/core';
import { RegistroServiceService } from '../../component/form-registro/registro-service.service';
import { NgIf, NgFor, NgClass } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FormBuilder, FormGroup, Validators  } from '@angular/forms'; 
import {ConsultaRegistro} from '../../interface/interface';
@Component({
  selector: 'app-tabla',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule, NgIf, NgFor, NgClass],
  templateUrl: './tabla.component.html',
  styleUrl: './tabla.component.css'
})
export class TablaComponent {
  registroForm: FormGroup;
  registros:Array<ConsultaRegistro>=[]
  registrosFiltrados: Array<ConsultaRegistro> = [];
  mostrarModalEliminar = false;
  mostrarModalEditar = false;
  empleadoSeleccionado: any;
  idAleatorio: Number = Math.floor(Math.random() * 1000);
  searchTerm: string = '';
  alertaTipo: 'success' | 'error' | null = null;
  totalRegistros = 100;
  registrosPorPagina = 10;
  paginaActual = 1;
  mensajeAlerta: string | null = null;

  constructor(private servicio: RegistroServiceService, private formBuilder: FormBuilder){
    this.registroForm = this.formBuilder.group({
      primerApellido: ['', [Validators.required, Validators.pattern(/^[A-Z]+$/), Validators.maxLength(20)]],
      segundoApellido: ['', [Validators.required, Validators.pattern(/^[A-Z]+$/), Validators.maxLength(20)]],
      primerNombre: ['', [Validators.required, Validators.pattern(/^[A-Z]+$/), Validators.maxLength(20)]],
      otrosNombres: ['', [Validators.pattern(/^[A-Z ]+$/), Validators.maxLength(50)]],
      paisEmpleo: ['Colombia', Validators.required],
      tipoIdentificacion: ['Cédula de Ciudadanía', Validators.required],
      numeroIdentificacion: ['', [Validators.required, Validators.maxLength(20), Validators.pattern(/^[0-9]+$/)]],
      correoElectronico: [''],
      fechaIngreso: ['', [Validators.required, this.fechaIngresoValidator]],
      area: ['Administración', Validators.required],
      estado: ['Activo'],
      fechaRegistro: [new Date().toISOString().split('T')[0], { value: new Date(), disabled: true }]
    });
  }

  ngOnInit(){
   this.consultarRegistrosTable()
  }
  ngDoCheck() {
    this.generarCorreoElectronico()
    this.filterTable(this.searchTerm)
  }
  obtenerRegistrosPaginados(): any[] {
    const indiceInicial = (this.paginaActual - 1) * this.registrosPorPagina;
    const indiceFinal = indiceInicial + this.registrosPorPagina;
    return this.registrosFiltrados.slice(indiceInicial, indiceFinal);
  }

  // Método para cambiar a la página anterior
  irPaginaAnterior() {
    if (this.paginaActual > 1) {
      this.paginaActual--;
    }
  }

  // Método para cambiar a la página siguiente
  irPaginaSiguiente() {
    const ultimaPagina = Math.ceil(this.registros.length / this.registrosPorPagina);
    if (this.paginaActual < ultimaPagina) {
      this.paginaActual++;
    }
  }
  
  calcularRangoRegistros(): string {
    const inicio = (this.paginaActual - 1) * this.registrosPorPagina + 1;
    const fin = Math.min(this.paginaActual * this.registrosPorPagina, this.totalRegistros);
    return `${inicio}-${fin}`;
  }

  filterTable(searchTerm: string) {
    if (searchTerm) {
      this.registrosFiltrados = this.registros.filter(registro =>
        Object.values(registro).some(val =>
          val && val.toString().toLowerCase().includes(searchTerm.toLowerCase())
        )
      );
    } else {
       this.registrosFiltrados = [...this.registros];
    }
}

  fechaIngresoValidator(control: any) {
    const fechaIngreso = new Date(control.value);
    const fechaActual = new Date();
    fechaActual.setMonth(fechaActual.getMonth() - 1); // Restar un mes a la fecha actual
    return fechaIngreso <= fechaActual ? null : { fechaInvalida: true };
  }

  consultarRegistrosTable(){
    this.servicio.consultarRegistro().subscribe({
      next: data=>{
        this.registros = data
      },
      error: error =>{
        let mensajeError = 'Hubo un error al consultar los registro';
        if (error.error && typeof error.error === 'object') {
          mensajeError += `: ${error.error.message || JSON.stringify(error.error)}`;
        } else {
          mensajeError += `: ${error.message || error.statusText}`;
        }
        this.mensajeAlerta = mensajeError;
        this.alertaTipo = 'error';
        console.log(error)
      }
    })
  }
  abrirModalEliminar() {
    this.mostrarModalEliminar = true;
  }

  cerrarModalEliminar() {
    this.mostrarModalEliminar = false;
  }

  confirmarEliminacion(id:string|number) {
    // Lógica para eliminar el empleado
    this.servicio.eliminarRegistro(id).subscribe({
      next: data=>{
        this.mensajeAlerta = 'Registro eliminado exitosamente';
        this.alertaTipo = 'success';
        this.registros = data.registros
      },
      error: error =>{
        let mensajeError = 'Hubo un error al eliminar el registro';
        if (error.error && typeof error.error === 'object') {
          mensajeError += `: ${error.error.message || JSON.stringify(error.error)}`;
        } else {
          mensajeError += `: ${error.message || error.statusText}`;
        }
        this.mensajeAlerta = mensajeError;
        this.alertaTipo = 'error';
        console.log(error)
      }
    })
    this.cerrarModalEliminar();
  }

  abrirModalEditar(empleado:any) {
    this.empleadoSeleccionado = empleado;
    this.mostrarModalEditar = true;
  }

  cerrarModalEditar() {
    this.mostrarModalEditar = false;
  }

  guardarCambios(id:any) {
    // Lógica para guardar los cambios del empleado
    this.servicio.editarRegistros(id,this.registroForm.value).subscribe({
      next: data =>{
        this.mensajeAlerta = 'Registro actualizado exitosamente';
        this.alertaTipo = 'success';
        this.registros = data.registros
        
      },
      error: error => {
        let mensajeError = 'Hubo un error al actualizar el registro';
        if (error.error && typeof error.error === 'object') {
          mensajeError += `: ${error.error.message || JSON.stringify(error.error)}`;
        } else {
          mensajeError += `: ${error.message || error.statusText}`;
        }
        this.mensajeAlerta = mensajeError;
        this.alertaTipo = 'error';
        console.log(error)
      }
    }) 
   
    this.cerrarModalEditar();
  }
  generarCorreoElectronico() {
    const primerNombre = this.registroForm.get('primerNombre')?.value;
    const primerApellido = this.registroForm.get('primerApellido')?.value;
    const paisEmpleo = this.registroForm.get('paisEmpleo')?.value === 'Colombia' ? 'global.com.co' : 'global.com.us';
    // Lógica para generar el correo electrónico

    const correoElectronico = `${primerNombre}.${primerApellido}.${this.idAleatorio}@${paisEmpleo}`;
    this.registroForm.get('correoElectronico')?.setValue(correoElectronico);
  }

  cerrarAlerta() {
    this.mensajeAlerta = null;
    this.alertaTipo = null;
  }
}
