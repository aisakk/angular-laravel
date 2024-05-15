<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Empleado>
 */
class EmpleadoFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'primer_apellido' => $this->faker->lastName,
            'segundo_apellido' => $this->faker->lastName,
            'primer_nombre' => $this->faker->firstName,
            'otros_nombres' => $this->faker->optional()->firstName,
            'pais' => $this->faker->randomElement(['Colombia', 'Estados Unidos']),
            'tipo_identificacion' => $this->faker->randomElement(['Cédula de Ciudadanía', 'Cédula de Extranjería', 'Pasaporte', 'Permiso Especial']),
            'numero_identificacion' => $this->faker->unique()->randomNumber(8),
            'correo_electronico' => $this->faker->unique()->safeEmail,
            'fecha_ingreso' => $this->faker->date(),
            'area' => $this->faker->randomElement(['Administración', 'Financiera', 'Compras', 'Infraestructura', 'Operación', 'Talento Humano', 'Servicios Varios']),
            'estado' => 'Activo',
            'fecha_registro' => now(),
            'created_at' => now(),
            'updated_at' => now(),
        ];
    }
}
