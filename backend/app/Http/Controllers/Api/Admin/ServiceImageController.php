<?php

namespace App\Http\Controllers\Api\Admin;

use App\Http\Controllers\Controller;
use App\Http\Resources\ServiceImageResource;
use App\Models\Service;
use App\Models\ServiceImage;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\AnonymousResourceCollection;
use Illuminate\Http\Response;
use Illuminate\Support\Facades\Storage;

class ServiceImageController extends Controller
{
    public function store(Request $request, Service $service): AnonymousResourceCollection
    {
        $request->validate([
            'images' => ['required', 'array', 'min:1'],
            'images.*' => ['image', 'max:5120'],
        ]);

        $nextSortOrder = (int) $service->images()->max('sort_order') + 1;

        foreach ($request->file('images') as $i => $file) {
            $service->images()->create([
                'image_path' => $file->store('services', 'public'),
                'sort_order' => $nextSortOrder + $i,
            ]);
        }

        return ServiceImageResource::collection($service->images()->orderBy('sort_order')->get());
    }

    public function destroy(Service $service, ServiceImage $image): Response
    {
        Storage::disk('public')->delete($image->image_path);
        $image->delete();

        return response()->noContent();
    }
}
