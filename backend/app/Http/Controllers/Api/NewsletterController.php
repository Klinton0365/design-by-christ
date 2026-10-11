<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\StoreNewsletterSubscriberRequest;
use App\Http\Resources\NewsletterSubscriberResource;
use App\Models\NewsletterSubscriber;
use Illuminate\Http\JsonResponse;

class NewsletterController extends Controller
{
    public function store(StoreNewsletterSubscriberRequest $request): JsonResponse
    {
        $subscriber = NewsletterSubscriber::create($request->validated());

        return (new NewsletterSubscriberResource($subscriber))
            ->response()
            ->setStatusCode(201);
    }
}
