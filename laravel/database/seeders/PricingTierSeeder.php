<?php

namespace Database\Seeders;

use App\Models\PricingTier;
use Illuminate\Database\Seeder;

class PricingTierSeeder extends Seeder
{
    public function run(): void
    {
        $tiers = [
            [
                'slug'        => 'landing',
                'icon'        => '🥉',
                'name'        => 'Simple Landing Page',
                'price'       => '৳1,999',
                'price_label' => 'Starter',
                'tagline'     => 'Convert visitors with a premium one-page site.',
                'featured'    => false,
                'features'    => [
                    'Premium Landing Page Design',
                    'Mobile Responsive Layout',
                    'Contact Form',
                    'WhatsApp Integration',
                    'Basic SEO Setup',
                    'SSL Security Setup',
                    'Fast Loading Optimization',
                ],
                'bonuses' => [
                    'Lifetime After-Sales Support',
                    'Lifetime Technical Guidance',
                    'Website Launch Assistance',
                ],
                'benefits' => ['More Leads', 'Build Trust', 'Professional Presence'],
                'sort_order' => 1,
            ],
            [
                'slug'        => 'ecommerce',
                'icon'        => '🥈',
                'name'        => 'E-Commerce Website',
                'price'       => '৳5,999',
                'price_label' => 'Sell Online',
                'tagline'     => 'Full storefront with cart, checkout & admin.',
                'featured'    => true,
                'features'    => [
                    'Premium E-commerce Design',
                    'Product Management',
                    'Category Management',
                    'Shopping Cart & Checkout',
                    'Cash on Delivery',
                    'WhatsApp Order Integration',
                    'Admin Dashboard',
                    'Mobile Responsive Layout',
                    'Basic SEO Setup',
                    'SSL Security Setup',
                ],
                'bonuses' => [
                    'FREE 1 Year Domain',
                    'Lifetime Technical Guidance',
                    'Free SSL Certificate',
                    'Website Launch Assistance',
                ],
                'benefits' => ['Sell 24/7', 'Easy Order Management', 'More Revenue', 'Grow Online'],
                'sort_order' => 2,
            ],
            [
                'slug'        => 'custom',
                'icon'        => '👑',
                'name'        => 'Custom Build Website',
                'price'       => '৳?????',
                'price_label' => "Let's Talk",
                'tagline'     => 'Amra je kono web custom vabe build kore dite pari.',
                'featured'    => false,
                'features'    => [
                    'Fully Custom Premium Design',
                    'Unlimited Pages',
                    'Advanced Admin Panel',
                    'Dynamic CMS & Blog System',
                    'Custom Features & Logic',
                    'Advanced SEO',
                    'Performance Optimization',
                    'SSL Security Setup',
                ],
                'bonuses' => [
                    'FREE 1 Year Domain',
                    'Lifetime Technical Guidance',
                    'Free SSL Certificate',
                    'Website Launch Assistance',
                ],
                'benefits' => [
                    'Tailored to your needs',
                    'Premium Brand Authority',
                    'More Conversions',
                    'Long-Term Business Growth',
                ],
                'sort_order' => 3,
            ],
        ];

        foreach ($tiers as $tier) {
            PricingTier::create($tier);
        }
    }
}
