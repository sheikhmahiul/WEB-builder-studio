<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('pricing_tiers', function (Blueprint $table) {
            $table->id();
            $table->string('slug')->unique();
            $table->string('icon', 10);
            $table->string('name');
            $table->string('price');
            $table->string('price_label');
            $table->string('tagline');
            $table->boolean('featured')->default(false);
            $table->json('features');
            $table->json('bonuses');
            $table->json('benefits');
            $table->unsignedInteger('sort_order')->default(0);
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('pricing_tiers');
    }
};
