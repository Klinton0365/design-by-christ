<?php

use App\Http\Controllers\Api\Admin\AuthController;
use App\Http\Controllers\Api\Admin\BlogPostController as AdminBlogPostController;
use App\Http\Controllers\Api\Admin\LeadController as AdminLeadController;
use App\Http\Controllers\Api\Admin\ProjectController as AdminProjectController;
use App\Http\Controllers\Api\Admin\ProjectImageController;
use App\Http\Controllers\Api\Admin\ServiceController as AdminServiceController;
use App\Http\Controllers\Api\BlogPostController;
use App\Http\Controllers\Api\LeadController;
use App\Http\Controllers\Api\ProjectController;
use App\Http\Controllers\Api\ServiceController;
use Illuminate\Support\Facades\Route;

// ---- Public ----

Route::get('/services', [ServiceController::class, 'index']);
Route::get('/services/{slug}', [ServiceController::class, 'show']);

Route::get('/projects', [ProjectController::class, 'index']);
Route::get('/projects/{slug}', [ProjectController::class, 'show']);

Route::get('/blog', [BlogPostController::class, 'index']);
Route::get('/blog/{slug}', [BlogPostController::class, 'show']);

Route::post('/leads', [LeadController::class, 'store'])
    ->middleware('throttle:10,1');

Route::post('/admin/login', [AuthController::class, 'login'])
    ->middleware('throttle:10,1');

// ---- Admin (protected) ----

Route::middleware('auth:sanctum')->prefix('admin')->group(function () {
    Route::post('/logout', [AuthController::class, 'logout']);
    Route::get('/me', [AuthController::class, 'me']);
    Route::get('/leads', [AdminLeadController::class, 'index']);

    Route::apiResource('services', AdminServiceController::class)->parameters([
        'services' => 'service',
    ]);

    Route::apiResource('projects', AdminProjectController::class)->parameters([
        'projects' => 'project',
    ]);
    Route::post('/projects/{project}/images', [ProjectImageController::class, 'store']);
    Route::patch('/projects/{project}/images/{image}', [ProjectImageController::class, 'update']);
    Route::delete('/projects/{project}/images/{image}', [ProjectImageController::class, 'destroy']);

    Route::apiResource('blog-posts', AdminBlogPostController::class)->parameters([
        'blog-posts' => 'blog_post',
    ]);
});
