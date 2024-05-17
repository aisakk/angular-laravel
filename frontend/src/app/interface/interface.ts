export interface RegistroFormData {
    primerApellido: string;
    segundoApellido: string;
    primerNombre: string;
    otrosNombres?: string;
    paisEmpleo: string;
    tipoIdentificacion: string;
    numeroIdentificacion: string;
    correoElectronico?: string;
    fechaIngreso: string | Date;
    area: string;
    estado: string;
    fechaRegistro: Date | string;
  }

 export interface ConsultaRegistro {
    id: number|string;
    primer_apellido: string;
    segundo_apellido: string;
    primer_nombre: string;
    otros_nombres: string;
    pais: string;
    tipo_identificacion: string;
    numero_identificacion: string;
    correo_electronico: string;
    fecha_ingreso: string;
    area: string;
    estado: string;
    fecha_registro: string;
  }
  
  