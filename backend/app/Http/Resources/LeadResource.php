<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class LeadResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->id,
            'name' => $this->name,
            'email' => $this->email,
            'phone' => $this->phone,
            'project_type' => $this->project_type,
            'subject' => $this->subject,
            'message' => $this->message,
            'source' => $this->source,
            'status' => $this->status,
            'page_path' => $this->page_path,
            'created_at' => $this->created_at?->toIso8601String(),
        ];
    }
}
