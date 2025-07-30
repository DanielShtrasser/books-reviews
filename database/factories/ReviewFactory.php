<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

class ReviewFactory extends Factory
{
    public function definition()
    {
        return [
            'username' => $this->faker->userName,
            'rating' => $this->faker->numberBetween(1, 5),
            'comment' => $this->faker->optional()->paragraph,
        ];
    }
}