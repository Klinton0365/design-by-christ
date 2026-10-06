<?php

namespace App\Http\Controllers\Api\Admin;

use App\Http\Controllers\Controller;
use App\Http\Resources\ProjectImageResource;
use App\Models\Project;
use App\Models\ProjectImage;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\AnonymousResourceCollection;
use Illuminate\Http\Response;
use Illuminate\Support\Facades\Storage;

class ProjectImageController extends Controller
{
    public function store(Request $request, Project $project): AnonymousResourceCollection
    {
        $request->validate([
            'images' => ['required', 'array', 'min:1'],
            'images.*' => ['image', 'max:5120'],
        ]);

        $nextSortOrder = (int) $project->images()->max('sort_order') + 1;
        $hasCover = $project->images()->where('is_cover', true)->exists();

        foreach ($request->file('images') as $i => $file) {
            $project->images()->create([
                'image_path' => $file->store('projects', 'public'),
                'is_cover' => ! $hasCover && $i === 0,
                'sort_order' => $nextSortOrder + $i,
            ]);
        }

        return ProjectImageResource::collection($project->images()->orderBy('sort_order')->get());
    }

    public function update(Request $request, Project $project, ProjectImage $image): ProjectImageResource
    {
        $data = $request->validate([
            'is_cover' => ['sometimes', 'boolean'],
            'sort_order' => ['sometimes', 'integer'],
        ]);

        if ($request->boolean('is_cover')) {
            $project->images()->where('id', '!=', $image->id)->update(['is_cover' => false]);
        }

        $image->update($data);

        return new ProjectImageResource($image);
    }

    public function destroy(Project $project, ProjectImage $image): Response
    {
        Storage::disk('public')->delete($image->image_path);
        $image->delete();

        return response()->noContent();
    }
}
