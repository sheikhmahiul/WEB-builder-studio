<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\PortfolioProject;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class PortfolioController extends Controller
{
    /**
     * List active portfolio projects (public).
     */
    public function index(): JsonResponse
    {
        $projects = PortfolioProject::where('is_active', true)
            ->orderBy('sort_order')
            ->get();
        return response()->json($projects);
    }

    /**
     * List all portfolio projects including inactive (admin).
     */
    public function indexAll(): JsonResponse
    {
        $projects = PortfolioProject::orderBy('sort_order')->get();
        return response()->json($projects);
    }

    /**
     * Create a new portfolio project (admin).
     */
    public function store(Request $request): JsonResponse
    {
        $validated = $request->validate([
            'title'       => 'required|string|max:255',
            'description' => 'nullable|string',
            'image_url'   => 'nullable|string|max:500',
            'link'        => 'nullable|string|max:500',
            'category'    => 'nullable|string|max:100',
            'is_active'   => 'boolean',
            'sort_order'  => 'integer|min:0',
        ]);

        $project = PortfolioProject::create($validated);

        return response()->json($project, 201);
    }

    /**
     * Show a single portfolio project.
     */
    public function show(PortfolioProject $portfolio): JsonResponse
    {
        return response()->json($portfolio);
    }

    /**
     * Update a portfolio project (admin).
     */
    public function update(Request $request, PortfolioProject $portfolio): JsonResponse
    {
        $validated = $request->validate([
            'title'       => 'string|max:255',
            'description' => 'nullable|string',
            'image_url'   => 'nullable|string|max:500',
            'link'        => 'nullable|string|max:500',
            'category'    => 'nullable|string|max:100',
            'is_active'   => 'boolean',
            'sort_order'  => 'integer|min:0',
        ]);

        $portfolio->update($validated);

        return response()->json($portfolio);
    }

    /**
     * Delete a portfolio project (admin).
     */
    public function destroy(PortfolioProject $portfolio): JsonResponse
    {
        $portfolio->delete();

        return response()->json(['message' => 'Portfolio project deleted.']);
    }
}
