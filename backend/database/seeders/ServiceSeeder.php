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
            ['title' => 'Project Plan', 'highlighted' => false],
            ['title' => 'Interior Work', 'highlighted' => false],
            ['title' => 'Retail Design', 'highlighted' => false],
            ['title' => '2D/3D Art Work', 'highlighted' => false],
            ['title' => 'Space Planning', 'highlighted' => true],
            ['title' => 'Decoration Work', 'highlighted' => false],
        ];

        foreach ($services as $i => $service) {
            Service::updateOrCreate(
                ['slug' => str($service['title'])->slug()],
                [
                    'title' => $service['title'],
                    'summary' => $body,
                    'description' => $body.' '.$body,
                    'is_highlighted' => $service['highlighted'],
                    'is_published' => true,
                    'sort_order' => $i,
                ]
            );
        }
    }
}
