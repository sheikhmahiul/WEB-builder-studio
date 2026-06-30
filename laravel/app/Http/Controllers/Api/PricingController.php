<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\PricingTier;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class PricingController extends Controller
{
    /**
     * List all pricing tiers ordered by sort_order.
     */
    public function index(): JsonResponse
    {
        $tiers = PricingTier::orderBy('sort_order')->get();
        return response()->json($tiers);
    }

    /**
     * Create a new pricing tier (admin).
     */
    public function store(Request $request): JsonResponse
    {
        $validated = $request->validate([
            'slug'        => 'required|string|max:255|unique:pricing_tiers,slug',
            'icon'        => 'required|string|max:10',
            'name'        => 'required|string|max:255',
            'price'       => 'required|string|max:255',
            'price_label' => 'required|string|max:255',
            'tagline'     => 'required|string|max:500',
            'featured'    => 'boolean',
            'features'    => 'required|array',
            'features.*'  => 'string',
            'bonuses'     => 'required|array',
            'bonuses.*'   => 'string',
            'benefits'    => 'required|array',
            'benefits.*'  => 'string',
            'sort_order'  => 'integer|min:0',
        ]);

        $tier = PricingTier::create($validated);

        return response()->json($tier, 201);
    }

    /**
     * Show a single pricing tier.
     */
    public function show(PricingTier $pricing): JsonResponse
    {
        return response()->json($pricing);
    }

    /**
     * Update a pricing tier (admin).
     */
    public function update(Request $request, PricingTier $pricing): JsonResponse
    {
        $validated = $request->validate([
            'slug'        => 'string|max:255|unique:pricing_tiers,slug,' . $pricing->id,
            'icon'        => 'string|max:10',
            'name'        => 'string|max:255',
            'price'       => 'string|max:255',
            'price_label' => 'string|max:255',
            'tagline'     => 'string|max:500',
            'featured'    => 'boolean',
            'features'    => 'array',
            'features.*'  => 'string',
            'bonuses'     => 'array',
            'bonuses.*'   => 'string',
            'benefits'    => 'array',
            'benefits.*'  => 'string',
            'sort_order'  => 'integer|min:0',
        ]);

        $pricing->update($validated);

        return response()->json($pricing);
    }

    /**
     * Delete a pricing tier (admin).
     */
    public function destroy(PricingTier $pricing): JsonResponse
    {
        $pricing->delete();

        return response()->json(['message' => 'Pricing tier deleted.']);
    }
}
