<?php

namespace Database\Seeders;

use App\Models\Project;
use Illuminate\Database\Seeder;

class ProjectSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $description = 'It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout.';

        $projects = [
            ['title' => 'Modern Kitchen', 'category' => 'Decor / Architecture'],
            ['title' => 'Minimal Bedroom', 'category' => 'Decor / Architecture'],
            ['title' => 'Cozy Living Room', 'category' => 'Decor / Architecture'],
            ['title' => 'Elegant Bathroom', 'category' => 'Decor / Architecture'],
            ['title' => 'Boutique Retail Fit-Out', 'category' => 'Commercial'],
            ['title' => 'Open-Plan Office', 'category' => 'Commercial'],
            ['title' => 'Classic Dining Hall', 'category' => 'Decor / Architecture'],
            ['title' => 'Rooftop Lounge', 'category' => 'Commercial'],
        ];

        foreach ($projects as $i => $project) {
            Project::updateOrCreate(
                ['slug' => str($project['title'])->slug()],
                [
                    'title' => $project['title'],
                    'category' => $project['category'],
                    'description' => $description,
                    'is_published' => true,
                    'sort_order' => $i,
                ]
            );
        }
    }
}
