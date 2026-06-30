<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\ContactSubmission;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class ContactController extends Controller
{
    /**
     * Submit a contact form (public, rate-limited).
     */
    public function store(Request $request): JsonResponse
    {
        $validated = $request->validate([
            'name'    => 'required|string|max:100',
            'email'   => 'required|email|max:255',
            'message' => 'required|string|max:1000',
        ]);

        $submission = ContactSubmission::create($validated);

        return response()->json([
            'message' => 'Your message has been sent successfully.',
            'data'    => $submission,
        ], 201);
    }

    /**
     * List all contact submissions (admin).
     */
    public function index(): JsonResponse
    {
        $submissions = ContactSubmission::orderByDesc('created_at')->get();
        return response()->json($submissions);
    }

    /**
     * Show a single contact submission (admin).
     */
    public function show(ContactSubmission $contact): JsonResponse
    {
        return response()->json($contact);
    }

    /**
     * Mark a contact submission as read (admin).
     */
    public function markRead(ContactSubmission $contact): JsonResponse
    {
        $contact->update(['is_read' => true]);

        return response()->json($contact);
    }

    /**
     * Delete a contact submission (admin).
     */
    public function destroy(ContactSubmission $contact): JsonResponse
    {
        $contact->delete();

        return response()->json(['message' => 'Contact submission deleted.']);
    }
}
