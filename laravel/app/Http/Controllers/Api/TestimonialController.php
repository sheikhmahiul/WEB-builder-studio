<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Testimonial;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class TestimonialController extends Controller
{
    /**
     * List active testimonials (public).
     */
    public function index(): JsonResponse
    {
        $testimonials = Testimonial::where('is_active', true)->get();
        return response()->json($testimonials);
    }

    /**
     * List all testimonials including inactive (admin).
     */
    public function indexAll(): JsonResponse
    {
        $testimonials = Testimonial::all();
        return response()->json($testimonials);
    }

    /**
     * Create a new testimonial (admin).
     */
    public function store(Request $request): JsonResponse
    {
        $validated = $request->validate([
            'quote'     => 'required|string',
            'name'      => 'required|string|max:255',
            'role'      => 'required|string|max:255',
            'stars'     => 'integer|min:1|max:5',
            'is_active' => 'boolean',
        ]);

        $testimonial = Testimonial::create($validated);

        return response()->json($testimonial, 201);
    }

    /**
     * Show a single testimonial.
     */
    public function show(Testimonial $testimonial): JsonResponse
    {
        return response()->json($testimonial);
    }

    /**
     * Update a testimonial (admin).
     */
    public function update(Request $request, Testimonial $testimonial): JsonResponse
    {
        $validated = $request->validate([
            'quote'     => 'string',
            'name'      => 'string|max:255',
            'role'      => 'string|max:255',
            'stars'     => 'integer|min:1|max:5',
            'is_active' => 'boolean',
        ]);

        $testimonial->update($validated);

        return response()->json($testimonial);
    }

    /**
     * Delete a testimonial (admin).
     */
    public function destroy(Testimonial $testimonial): JsonResponse
    {
        $testimonial->delete();

        return response()->json(['message' => 'Testimonial deleted.']);
    }
}
