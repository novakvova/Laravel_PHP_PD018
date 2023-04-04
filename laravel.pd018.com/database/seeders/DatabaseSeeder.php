<?php

namespace Database\Seeders;

// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        //\App\Models\Category::factory(10)->create();

//         \App\Models\Category::factory()->create([
//             'name' => 'Test User',
//             'description' => 'Hello appp',
//         ]);

        $this->call([
            CategorySeeder::class,
        ]);
    }
}
