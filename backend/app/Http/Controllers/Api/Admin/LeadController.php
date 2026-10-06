<?php

namespace App\Http\Controllers\Api\Admin;

use App\Http\Controllers\Controller;
use App\Http\Resources\LeadResource;
use App\Models\Lead;
use Illuminate\Http\Resources\Json\AnonymousResourceCollection;

class LeadController extends Controller
{
    public function index(): AnonymousResourceCollection
    {
        $leads = Lead::query()
            ->latest()
            ->paginate(25);

        return LeadResource::collection($leads);
    }
}
