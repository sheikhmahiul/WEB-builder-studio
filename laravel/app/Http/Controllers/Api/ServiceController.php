<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Service;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class ServiceController extends Controller
{
    /**
     * List all services ordered by sort_order.
     */
    public function index(): JsonResponse
    {
        $services = Service::orderBy('sort_order')->get();
        return response()->json($services);
    }

    /**
     * Create a new service (admin).
     */
    public function store(Request $request): JsonResponse
    {
        $validated = $request->validate([
            'icon'        => 'required|string|max:10',
            'title'       => 'required|string|max:255',
            'description' => 'required|string',
            'points'      => 'required|array',
            'points.*'    => 'string',
            'sort_order'  => 'integer|min:0',
        ]);

        $service = Service::create($validated);

        return response()->json($service, 201);
    }

    /**
     * Show a single service.
     */
    public function show(Service $service): JsonResponse
    {
        return response()->json($service);
    }

    /**
     * Update a service (admin).
     */
    public function update(Request $request, Service $service): JsonResponse
    {
        $validated = $request->validate([
            'icon'        => 'string|max:10',
            'title'       => 'string|max:255',
            'description' => 'string',
            'points'      => 'array',
            'points.*'    => 'string',
            'sort_order'  => 'integer|min:0',
        ]);

        $service->update($validated);

        return response()->json($service);
    }

    /**
     * Delete a service (admin).
     */
    public function destroy(Service $service): JsonResponse
    {
        $service->delete();

        return response()->json(['message' => 'Service deleted.']);
    }
}
