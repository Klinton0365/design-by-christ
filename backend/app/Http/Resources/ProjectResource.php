<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;
use Illuminate\Support\Collection;
use Illuminate\Support\Facades\Storage;

class ProjectResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        $images = $this->whenLoaded('images');
        $coverImage = $images instanceof Collection
            ? ($images->firstWhere('is_cover', true) ?? $images->first())
            : null;

        return [
            'id' => $this->id,
            'title' => $this->title,
            'slug' => $this->slug,
            'category' => $this->category,
            'client' => $this->client,
            'tags' => $this->tags ?? [],
            'project_date' => $this->project_date?->toDateString(),
            'external_link' => $this->external_link,
            'description' => $this->description,
            'is_published' => $this->is_published,
            'show_on_home' => $this->show_on_home,
            'sort_order' => $this->sort_order,
            'cover_image_url' => $coverImage
                ? Storage::disk('public')->url($coverImage->image_path)
                : null,
            'images' => ProjectImageResource::collection($images),
            'created_at' => $this->created_at?->toIso8601String(),
        ];
    }
}
