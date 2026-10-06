<?php

namespace App\Http\Controllers\Api\Admin;

use App\Http\Controllers\Controller;
use App\Http\Requests\BlogPostRequest;
use App\Http\Resources\BlogPostResource;
use App\Models\BlogPost;
use Illuminate\Http\Resources\Json\AnonymousResourceCollection;
use Illuminate\Http\Response;
use Illuminate\Support\Facades\Storage;

class BlogPostController extends Controller
{
    public function index(): AnonymousResourceCollection
    {
        $posts = BlogPost::query()->latest('created_at')->get();

        return BlogPostResource::collection($posts);
    }

    public function store(BlogPostRequest $request): BlogPostResource
    {
        $data = $request->safe()->except('cover_image');

        if ($request->hasFile('cover_image')) {
            $data['cover_image_path'] = $request->file('cover_image')->store('blog', 'public');
        }

        $post = BlogPost::create($data);

        return new BlogPostResource($post->refresh());
    }

    public function show(BlogPost $blogPost): BlogPostResource
    {
        return new BlogPostResource($blogPost);
    }

    public function update(BlogPostRequest $request, BlogPost $blogPost): BlogPostResource
    {
        $data = $request->safe()->except('cover_image');

        if ($request->hasFile('cover_image')) {
            if ($blogPost->cover_image_path) {
                Storage::disk('public')->delete($blogPost->cover_image_path);
            }
            $data['cover_image_path'] = $request->file('cover_image')->store('blog', 'public');
        }

        $blogPost->update($data);

        return new BlogPostResource($blogPost->refresh());
    }

    public function destroy(BlogPost $blogPost): Response
    {
        if ($blogPost->cover_image_path) {
            Storage::disk('public')->delete($blogPost->cover_image_path);
        }

        $blogPost->delete();

        return response()->noContent();
    }
}
