<?php

namespace App\Http\Controllers\Api\Admin;

use App\Http\Controllers\Controller;
use App\Http\Requests\ProjectRequest;
use App\Http\Resources\ProjectResource;
use App\Models\Project;
use Illuminate\Http\Resources\Json\AnonymousResourceCollection;
use Illuminate\Http\Response;
use Illuminate\Support\Facades\Storage;

class ProjectController extends Controller
{
    public function index(): AnonymousResourceCollection
    {
        $projects = Project::query()->with('images')->orderBy('sort_order')->get();

        return ProjectResource::collection($projects);
    }

    public function store(ProjectRequest $request): ProjectResource
    {
        $project = Project::create($request->validated());

        return new ProjectResource($project->refresh()->load('images'));
    }

    public function show(Project $project): ProjectResource
    {
        return new ProjectResource($project->load('images'));
    }

    public function update(ProjectRequest $request, Project $project): ProjectResource
    {
        $project->update($request->validated());

        return new ProjectResource($project->refresh()->load('images'));
    }

    public function destroy(Project $project): Response
    {
        foreach ($project->images as $image) {
            Storage::disk('public')->delete($image->image_path);
        }

        $project->delete();

        return response()->noContent();
    }
}
