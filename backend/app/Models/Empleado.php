<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Empleado extends Model
{
    use HasFactory;

    public $timestamps = true;

    protected $fillable = [
        'primer_apellido',
        'segundo_apellido',
        'primer_nombre',
        'otros_nombres',
        'pais',
        'tipo_identificacion',
        'numero_identificacion',
        'correo_electronico',
        'fecha_ingreso',
        'area',
        'estado',
        'fecha_registro'
    ];
}
