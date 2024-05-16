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
  