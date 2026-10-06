<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Resources\BlogPostResource;
use App\Models\BlogPost;
use Illuminate\Http\Resources\Json\AnonymousResourceCollection;

class BlogPostController extends Controller
{
    public function index(): AnonymousResourceCollection
    {
        $posts = BlogPost::query()
            ->published()
            ->latest('published_at')
            ->paginate(9);

        return BlogPostResource::collection($posts);
    }

    public function show(string $slug): BlogPostResource
    {
        $post = BlogPost::query()
            ->published()
            ->where('slug', $slug)
            ->firstOrFail();

        return new BlogPostResource($post);
    }
}
