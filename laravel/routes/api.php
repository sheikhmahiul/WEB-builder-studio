<?php

use App\Http\Controllers\Api\AuthController;
use App\Http\Controllers\Api\ContactController;
use App\Http\Controllers\Api\PortfolioController;
use App\Http\Controllers\Api\PricingController;
use App\Http\Controllers\Api\ServiceController;
use App\Http\Controllers\Api\TestimonialController;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| Public API Routes (no authentication required)
|--------------------------------------------------------------------------
*/

// Auth
Route::post('/register', [AuthController::class, 'register']);
Route::post('/login', [AuthController::class, 'login']);
Route::post('/forgot-password', [AuthController::class, 'forgotPassword']);
Route::post('/reset-password', [AuthController::class, 'resetPassword']);

// Public data endpoints
Route::get('/services', [ServiceController::class, 'index']);
Route::get('/pricing', [PricingController::class, 'index']);
Route::get('/testimonials', [TestimonialController::class, 'index']);
Route::get('/portfolio', [PortfolioController::class, 'index']);

// Contact form submission (rate-limited: 5 per minute)
Route::post('/contact', [ContactController::class, 'store'])
    ->middleware('throttle:5,1');

/*
|--------------------------------------------------------------------------
| Protected API Routes (authentication required)
|--------------------------------------------------------------------------
*/

Route::middleware('auth:sanctum')->group(function () {
    // Auth
    Route::post('/logout', [AuthController::class, 'logout']);
    Route::get('/user', [AuthController::class, 'user']);

    // Services CRUD (admin)
    Route::post('/services', [ServiceController::class, 'store']);
    Route::get('/services/{service}', [ServiceController::class, 'show']);
    Route::put('/services/{service}', [ServiceController::class, 'update']);
    Route::delete('/services/{service}', [ServiceController::class, 'destroy']);

    // Pricing CRUD (admin)
    Route::post('/pricing', [PricingController::class, 'store']);
    Route::get('/pricing/{pricing}', [PricingController::class, 'show']);
    Route::put('/pricing/{pricing}', [PricingController::class, 'update']);
    Route::delete('/pricing/{pricing}', [PricingController::class, 'destroy']);

    // Testimonials CRUD (admin)
    Route::get('/admin/testimonials', [TestimonialController::class, 'indexAll']);
    Route::post('/testimonials', [TestimonialController::class, 'store']);
    Route::get('/testimonials/{testimonial}', [TestimonialController::class, 'show']);
    Route::put('/testimonials/{testimonial}', [TestimonialController::class, 'update']);
    Route::delete('/testimonials/{testimonial}', [TestimonialController::class, 'destroy']);

    // Contact submissions (admin)
    Route::get('/contact', [ContactController::class, 'index']);
    Route::get('/contact/{contact}', [ContactController::class, 'show']);
    Route::patch('/contact/{contact}/read', [ContactController::class, 'markRead']);
    Route::delete('/contact/{contact}', [ContactController::class, 'destroy']);

    // Portfolio CRUD (admin)
    Route::get('/admin/portfolio', [PortfolioController::class, 'indexAll']);
    Route::post('/portfolio', [PortfolioController::class, 'store']);
    Route::get('/portfolio/{portfolio}', [PortfolioController::class, 'show']);
    Route::put('/portfolio/{portfolio}', [PortfolioController::class, 'update']);
    Route::delete('/portfolio/{portfolio}', [PortfolioController::class, 'destroy']);
});
