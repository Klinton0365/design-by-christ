<?php

namespace App\Http\Controllers\Api\Admin;

use App\Http\Controllers\Controller;
use App\Http\Requests\FaqRequest;
use App\Http\Resources\FaqResource;
use App\Models\Faq;
use Illuminate\Http\Resources\Json\AnonymousResourceCollection;
use Illuminate\Http\Response;

class FaqController extends Controller
{
    public function index(): AnonymousResourceCollection
    {
        $faqs = Faq::query()->orderBy('sort_order')->get();

        return FaqResource::collection($faqs);
    }

    public function store(FaqRequest $request): FaqResource
    {
        $faq = Faq::create($request->validated());

        return new FaqResource($faq);
    }

    public function show(Faq $faq): FaqResource
    {
        return new FaqResource($faq);
    }

    public function update(FaqRequest $request, Faq $faq): FaqResource
    {
        $faq->update($request->validated());

        return new FaqResource($faq->refresh());
    }

    public function destroy(Faq $faq): Response
    {
        $faq->delete();

        return response()->noContent();
    }
}
