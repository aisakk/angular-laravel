<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreEmpleadoRequest;
use App\Http\Requests\UpdateEmpleadoRequest;
use App\Models\Empleado;

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
    public function update(UpdateEmpleadoRequest $request, Empleado $empleado)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Empleado $empleado)
    {
        //
    }
}
