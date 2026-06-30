<?php

namespace Database\Seeders;

use App\Models\Service;
use Illuminate\Database\Seeder;

class ServiceSeeder extends Seeder
{
    public function run(): void
    {
        $services = [
            [
                'icon'        => '✶',
                'title'       => 'Landing Pages',
                'description' => 'Single-page sites engineered to convert. Hero, offer, social proof, contact — all calibrated.',
                'points'      => ['Premium UI design', 'Mobile responsive', 'SEO foundations', 'WhatsApp integration'],
                'sort_order'  => 1,
            ],
            [
                'icon'        => '◈',
                'title'       => 'E-Commerce',
                'description' => 'Full storefronts with cart, checkout, COD and admin. Sell while you sleep.',
                'points'      => ['Product & category mgmt', 'Order tracking', 'Admin dashboard', 'WhatsApp orders'],
                'sort_order'  => 2,
            ],
            [
                'icon'        => '❖',
                'title'       => 'Booking & Business',
                'description' => 'Service businesses get appointment booking, inquiry forms and maps — fully managed.',
                'points'      => ['Appointment booking', 'Inquiry forms', 'Google Maps', '5–10 pages'],
                'sort_order'  => 3,
            ],
            [
                'icon'        => '✦',
                'title'       => 'Company Websites',
                'description' => 'Flagship brand presence with CMS, blog, portfolio, team — built to scale.',
                'points'      => ['Dynamic CMS', 'Blog system', 'Lead generation', 'Google Analytics'],
                'sort_order'  => 4,
            ],
        ];

        foreach ($services as $service) {
            Service::create($service);
        }
    }
}
