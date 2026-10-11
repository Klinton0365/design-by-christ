<?php

namespace App\Http\Controllers\Api\Admin;

use App\Http\Controllers\Controller;
use App\Http\Resources\LeadResource;
use App\Models\Lead;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\AnonymousResourceCollection;
use Illuminate\Validation\Rule;

class LeadController extends Controller
{
    private const STATUSES = ['new', 'follow-up', 'closed'];

    public function index(): AnonymousResourceCollection
    {
        $leads = Lead::query()
            ->latest()
            ->paginate(25);

        return LeadResource::collection($leads);
    }

    public function updateStatus(Request $request, Lead $lead): LeadResource
    {
        $data = $request->validate([
            'status' => ['required', 'string', Rule::in(self::STATUSES)],
        ]);

        $lead->update($data);

        return new LeadResource($lead);
    }
}
