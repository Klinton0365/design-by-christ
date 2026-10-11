<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\StoreLeadRequest;
use App\Http\Resources\LeadResource;
use App\Mail\LeadConfirmation;
use App\Mail\NewLeadNotification;
use App\Models\Lead;
use Illuminate\Http\JsonResponse;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Mail;

class LeadController extends Controller
{
    public function store(StoreLeadRequest $request): JsonResponse
    {
        $lead = Lead::create([
            ...$request->validated(),
            'status' => 'new',
            'ip_address' => $request->ip(),
            'user_agent' => $request->userAgent(),
        ]);

        $this->sendNotifications($lead);

        return (new LeadResource($lead))
            ->response()
            ->setStatusCode(201);
    }

    /**
     * Email delivery is best-effort: the lead is already safely stored, so a
     * mail failure (bad SMTP creds, provider outage) must never surface as a
     * failed submission to whoever just filled out the form.
     */
    private function sendNotifications(Lead $lead): void
    {
        try {
            Mail::to($lead->email)->send(new LeadConfirmation($lead));
        } catch (\Throwable $e) {
            Log::error('Failed to send lead confirmation email', [
                'lead_id' => $lead->id,
                'error' => $e->getMessage(),
            ]);
        }

        try {
            if ($adminAddress = config('mail.admin_address')) {
                Mail::to($adminAddress)->send(new NewLeadNotification($lead));
            }
        } catch (\Throwable $e) {
            Log::error('Failed to send new lead admin notification', [
                'lead_id' => $lead->id,
                'error' => $e->getMessage(),
            ]);
        }
    }
}
