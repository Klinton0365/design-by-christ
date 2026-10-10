<?php

namespace App\Http\Controllers\Api\Admin;

use App\Http\Controllers\Controller;
use App\Http\Requests\ServiceRequest;
use App\Http\Resources\ServiceResource;
use App\Models\Service;
use Illuminate\Http\Resources\Json\AnonymousResourceCollection;
use Illuminate\Http\Response;
use Illuminate\Support\Facades\Storage;

class ServiceController extends Controller
{
    public function index(): AnonymousResourceCollection
    {
        $services = Service::query()->orderBy('sort_order')->get();

        return ServiceResource::collection($services);
    }

    public function store(ServiceRequest $request): ServiceResource
    {
        $data = $request->safe()->except(['image', 'detail_image']);

        if ($request->hasFile('image')) {
            $data['image_path'] = $request->file('image')->store('services', 'public');
        }

        if ($request->hasFile('detail_image')) {
            $data['detail_image_path'] = $request->file('detail_image')->store('services', 'public');
        }

        $service = Service::create($data);

        return new ServiceResource($service->refresh());
    }

    public function show(Service $service): ServiceResource
    {
        return new ServiceResource($service);
    }

    public function update(ServiceRequest $request, Service $service): ServiceResource
    {
        $data = $request->safe()->except(['image', 'detail_image']);

        if ($request->hasFile('image')) {
            if ($service->image_path) {
                Storage::disk('public')->delete($service->image_path);
            }
            $data['image_path'] = $request->file('image')->store('services', 'public');
        }

        if ($request->hasFile('detail_image')) {
            if ($service->detail_image_path) {
                Storage::disk('public')->delete($service->detail_image_path);
            }
            $data['detail_image_path'] = $request->file('detail_image')->store('services', 'public');
        }

        $service->update($data);

        return new ServiceResource($service->refresh());
    }

    public function destroy(Service $service): Response
    {
        if ($service->image_path) {
            Storage::disk('public')->delete($service->image_path);
        }

        if ($service->detail_image_path) {
            Storage::disk('public')->delete($service->detail_image_path);
        }

        $service->delete();

        return response()->noContent();
    }
}
