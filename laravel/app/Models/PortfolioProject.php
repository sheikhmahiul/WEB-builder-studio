<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class PortfolioProject extends Model
{
    protected $fillable = [
        'title',
        'description',
        'image_url',
        'link',
        'category',
        'is_active',
        'sort_order',
    ];

    protected function casts(): array
    {
        return [
            'is_active' => 'boolean',
        ];
    }
}
