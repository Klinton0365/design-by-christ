<?php

namespace App\Http\Controllers\Api\Admin;

use App\Http\Controllers\Controller;
use App\Http\Resources\NewsletterSubscriberResource;
use App\Models\NewsletterSubscriber;
use Illuminate\Http\Resources\Json\AnonymousResourceCollection;

class NewsletterSubscriberController extends Controller
{
    public function index(): AnonymousResourceCollection
    {
        $subscribers = NewsletterSubscriber::query()->latest()->get();

        return NewsletterSubscriberResource::collection($subscribers);
    }
}
