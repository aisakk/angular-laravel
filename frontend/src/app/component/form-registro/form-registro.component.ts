import { Component } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgIf, NgClass, NgStyle } from '@angular/common';
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
  constructor(private formBuilder: FormBuilder) {
    this.registroForm = this.formBuilder.group({
      primerApellido: ['', [Validators.required, Validators.pattern(/^[A-Z]+$/), Validators.maxLength(20)]],
      segundoApellido: ['', [Validators.required, Validators.pattern(/^[A-Z]+$/), Validators.maxLength(20)]],
      primerNombre: ['', [Validators.required, Validators.pattern(/^[A-Z]+$/), Validators.maxLength(20)]],
      otrosNombres: ['', [Validators.pattern(/^[A-Z ]+$/), Validators.maxLength(50)]],
      paisEmpleo: ['Colombia', Validators.required],
      tipoIdentificacion: ['Cédula de Ciudadanía', Validators.required],
      numeroIdentificacion: ['', [Validators.required, Validators.maxLength(20), Validators.pattern(/^[0-9]+$/)]],
      correoElectronico: [''],
      fechaIngreso: ['', [Validators.required,  this.fechaIngresoValidator ]],
      area: ['Administración', Validators.required],
      estado: ['Activo'],
      fechaRegistro: [{ value: new Date(), disabled: true }]
    });
  }

  ngDoCheck(){
    this.generarCorreoElectronico()
  }

  fechaIngresoValidator(control:any) {
    const fechaIngreso = new Date(control.value);
    const fechaActual = new Date();
    fechaActual.setMonth(fechaActual.getMonth() - 1); // Restar un mes a la fecha actual
    return fechaIngreso <= fechaActual ? null : { fechaInvalida: true };
  }



  onSubmit() {
    console.log(this.registroForm.valid);
  /*   if (this.registroForm.valid) {
      // Lógica para enviar el formulario
      console.log(this.registroForm.value);
    } else {
      // Marcar todos los campos como tocados para mostrar los mensajes de error
      this.markFormGroupTouched(this.registroForm);
    } */
  }

  markFormGroupTouched(formGroup: FormGroup) {
    Object.values(formGroup.controls).forEach(control => {
      control.markAsTouched();
      if (control instanceof FormGroup) {
        this.markFormGroupTouched(control);
      }
    });
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
