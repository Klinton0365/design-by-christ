<?php

namespace Database\Seeders;

use App\Models\Service;
use Illuminate\Database\Seeder;

class ServiceSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $body = 'There are many variations of the passages of lorem Ipsum available, majority.';

        $services = [
            ['title' => 'Project Plan'],
            ['title' => 'Interior Work'],
            ['title' => 'Retail Design'],
            ['title' => '2D/3D Art Work'],
            ['title' => 'Space Planning'],
            ['title' => 'Decoration Work'],
        ];

        foreach ($services as $i => $service) {
            Service::updateOrCreate(
                ['slug' => str($service['title'])->slug()],
                [
                    'title' => $service['title'],
                    'summary' => $body,
                    'description' => $body.' '.$body,
                    'is_published' => true,
                    'sort_order' => $i,
                ]
            );
        }
    }
}
