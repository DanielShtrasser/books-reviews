<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

class BookFactory extends Factory
{
    public function definition()
    {
        return [
            'title' => $this->faker->sentence(3),
            'author' => $this->faker->name,
            'year' => $this->faker->year,
            'genre' => $this->faker->randomElement(['Фантастика', 'Детектив', 'Роман', 'Научная литература', 'Поэзия']),
            'description' => $this->faker->paragraph,
        ];
    }
}