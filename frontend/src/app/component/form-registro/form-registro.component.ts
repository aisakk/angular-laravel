import { Component } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgIf, NgClass } from '@angular/common';
import { RegistroServiceService } from './registro-service.service';
@Component({
  selector: 'app-form-registro',
  standalone: true,
  imports: [ReactiveFormsModule, NgIf, NgClass, NgClass],
  templateUrl: './form-registro.component.html',
  styleUrl: './form-registro.component.css'
})
export class FormRegistroComponent {
  registroForm: FormGroup;
  idAleatorio: Number = Math.floor(Math.random() * 1000);
  mensajeAlerta: string | null = null;
  alertaTipo: 'success' | 'error' | null = null;

  constructor(private formBuilder: FormBuilder, private service: RegistroServiceService) {
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

  ngDoCheck() {
    this.generarCorreoElectronico()
  }

  fechaIngresoValidator(control: any) {
    const fechaIngreso = new Date(control.value);
    const fechaActual = new Date();
    fechaActual.setMonth(fechaActual.getMonth() - 1); // Restar un mes a la fecha actual
    return fechaIngreso <= fechaActual ? null : { fechaInvalida: true };
  }



  onSubmit() {
    this.service.guardarRegistro(this.registroForm.value).subscribe({
      next: data => {
        this.mensajeAlerta = 'Registro guardado exitosamente';
        this.alertaTipo = 'success';
        console.log(data)
      },
      error: error => {
        let mensajeError = 'Hubo un error al guardar el registro';
        if (error.error && typeof error.error === 'object') {
          mensajeError += `: ${error.error.message || JSON.stringify(error.error)}`;
        } else {
          mensajeError += `: ${error.message || error.statusText}`;
        }
        this.mensajeAlerta = mensajeError;
        this.alertaTipo = 'error';
        console.error('There was an error!', error);
      }
    });
    this.registroForm.patchValue({
      primerApellido: '',
      segundoApellido: '',
      primerNombre: '',
      otrosNombres: '',
      numeroIdentificacion: '',
      correoElectronico: '',
      fechaIngreso: ''
    })
  }
  cerrarAlerta() {
    this.mensajeAlerta = null;
    this.alertaTipo = null;
  }

  generarCorreoElectronico() {
    const primerNombre = this.registroForm.get('primerNombre')?.value;
    const primerApellido = this.registroForm.get('primerApellido')?.value;
    const paisEmpleo = this.registroForm.get('paisEmpleo')?.value === 'Colombia' ? 'global.com.co' : 'global.com.us';
    // Lógica para generar el correo electrónico

    const correoElectronico = `${primerNombre}.${primerApellido}.${this.idAleatorio}@${paisEmpleo}`;
    this.registroForm.get('correoElectronico')?.setValue(correoElectronico);
  }
}
