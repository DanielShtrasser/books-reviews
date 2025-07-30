<?php

namespace Database\Seeders;

use App\Models\Book;
use App\Models\Review;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    public function run()
    {
        Book::factory(20)
            ->has(Review::factory()->count(rand(0, 5)))
            ->create();
    }
}