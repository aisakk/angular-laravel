<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreEmpleadoRequest;
use App\Http\Requests\UpdateEmpleadoRequest;
use App\Models\Empleado;
use Illuminate\Http\Request;

class EmpleadoController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        //
        $consulta = Empleado::all();
        return response()->json($consulta, 200);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreEmpleadoRequest $request)
    {
        //
       $registro = Empleado::create([
            'primer_apellido' => $request->primerApellido,
            'segundo_apellido' =>$request->segundoApellido,
            'primer_nombre'=> $request->primerNombre,
            'otros_nombres'=> $request->otrosNombres,
            'pais'=> $request->paisEmpleo,
            'tipo_identificacion'=> $request->tipoIdentificacion,
            'numero_identificacion'=> $request->numeroIdentificacion,
            'correo_electronico'=> $request->correoElectronico,
            'fecha_ingreso'=> $request->fechaIngreso,
            'area'=> $request->area,
            'estado'=> $request->estado,
            'fecha_registro'=> $request->fechaRegistro
        ]);
        return response()->json($request->all(), 201);
        ;
    }

    /**
     * Display the specified resource.
     */
    public function show(Empleado $empleado)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Empleado $empleado)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateEmpleadoRequest $request, Empleado $empleado, $id)
    {
        //
        $empleado = Empleado::find($id);
        $empleado->primer_apellido = $request->primerApellido;
        $empleado->segundo_apellido = $request->segundoApellido;
        $empleado->primer_nombre =$request->primerNombre;
        $empleado->otros_nombres = $request->otrosNombres;
        $empleado->pais = $request->paisEmpleo;
        $empleado->tipo_identificacion = $request->tipoIdentificacion;
        $empleado->numero_identificacion = $request->numeroIdentificacion;
        $empleado->correo_electronico = $request->correoElectronico;
        $empleado->fecha_ingreso= $request->fechaIngreso;
        $empleado->area = $request->area;
        $empleado->estado = $request->estado;
        $empleado->fecha_registro = $request->fechaRegistro;
        $empleado->save();

        $consulta = Empleado::all();
        return response()->json([
            "mensaje" => "Actualizacion exitosa",
            "registros" => $consulta
        ], 200);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Empleado $empleado, $id)
    {
        //
        $eliminar = Empleado::find($id);
        $eliminar->delete();
        $registros = Empleado::all();
        return response()->json([
            "mensaje" => "Registro Eliminado",
            "registros" => $registros
        ], 200);
        
    }
}
