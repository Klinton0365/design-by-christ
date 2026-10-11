<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Resources\ProjectResource;
use App\Models\Project;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\AnonymousResourceCollection;

class ProjectController extends Controller
{
    public function index(Request $request): AnonymousResourceCollection
    {
        $categories = Project::query()
            ->published()
            ->distinct()
            ->orderBy('category')
            ->pluck('category');

        $projects = Project::query()
            ->published()
            ->with('images')
            ->when($request->query('category'), fn ($q, $category) => $q->where('category', $category))
            ->when($request->boolean('home'), fn ($q) => $q->showOnHome())
            ->orderBy('sort_order')
            ->paginate(8)
            ->withQueryString();

        return ProjectResource::collection($projects)->additional([
            'categories' => $categories,
        ]);
    }

    public function show(string $slug): ProjectResource
    {
        $project = Project::query()
            ->published()
            ->with('images')
            ->where('slug', $slug)
            ->firstOrFail();

        return new ProjectResource($project);
    }
}
