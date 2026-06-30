<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    use WithoutModelEvents;

    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        // Create default admin user
        User::factory()->create([
            'name'  => 'Admin',
            'email' => 'admin@webbuilder.studio',
        ]);

        // Seed content data from frontend
        $this->call([
            ServiceSeeder::class,
            PricingTierSeeder::class,
            TestimonialSeeder::class,
        ]);
    }
}
