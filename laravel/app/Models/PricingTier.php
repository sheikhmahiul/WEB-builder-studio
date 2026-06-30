<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class PricingTier extends Model
{
    protected $fillable = [
        'slug',
        'icon',
        'name',
        'price',
        'price_label',
        'tagline',
        'featured',
        'features',
        'bonuses',
        'benefits',
        'sort_order',
    ];

    protected function casts(): array
    {
        return [
            'featured' => 'boolean',
            'features' => 'array',
            'bonuses' => 'array',
            'benefits' => 'array',
        ];
    }
}
