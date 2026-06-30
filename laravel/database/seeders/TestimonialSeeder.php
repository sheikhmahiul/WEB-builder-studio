<?php

namespace Database\Seeders;

use App\Models\Testimonial;
use Illuminate\Database\Seeder;

class TestimonialSeeder extends Seeder
{
    public function run(): void
    {
        $testimonials = [
            [
                'quote' => "WEBbuilder Studio transformed our brand's digital presence. The new site is not just beautiful, it's a lead generation machine.",
                'name'  => 'Sarah Jenkins',
                'role'  => 'CEO, Luxa Brand',
                'stars' => 5,
            ],
            [
                'quote' => 'The process was seamless and the result exceeded our expectations. Truly premium digital craftsmanship.',
                'name'  => 'David Chen',
                'role'  => 'Founder, Elevate Architecture',
                'stars' => 5,
            ],
            [
                'quote' => 'Our online sales doubled within the first month of launching the new e-commerce platform.',
                'name'  => 'Aisha Khan',
                'role'  => 'Director, Aurum Jewelers',
                'stars' => 5,
            ],
        ];

        foreach ($testimonials as $testimonial) {
            Testimonial::create($testimonial);
        }
    }
}
