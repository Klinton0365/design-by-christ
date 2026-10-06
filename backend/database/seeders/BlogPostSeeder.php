<?php

namespace Database\Seeders;

use App\Models\BlogPost;
use Illuminate\Database\Seeder;

class BlogPostSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $body = "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam eu sem vitae turpis dignissim maximus. There are many variations of passages of lorem Ipsum available, but the majority have suffered alteration in some form.\n\nContrary to popular belief, lorem Ipsum is not simply random text. It has roots in a piece of classical literature, making it over 2000 years old.";

        $posts = [
            [
                'title' => 'Low Cost Latest Invented Interior Designing Ideas',
                'excerpt' => 'Lorem ipsum dolor sit amet, adipiscing Aliquam eu sem vitae turpis dignissim maximus.',
                'tags' => ['Living Design'],
                'published_at' => now()->subDays(2),
            ],
            [
                'title' => "Let's Get Solution For Building Construction Work",
                'excerpt' => 'There are many variations of the passages of lorem Ipsum available, majority.',
                'tags' => ['Kitchen Design'],
                'published_at' => now()->subDays(8),
            ],
            [
                'title' => 'Best For Any Office & Business Interior Solution',
                'excerpt' => 'It is a long established fact that a reader will be distracted by the readable content.',
                'tags' => ['Interior Design'],
                'published_at' => now()->subDays(14),
            ],
        ];

        foreach ($posts as $post) {
            BlogPost::updateOrCreate(
                ['slug' => str($post['title'])->slug()],
                [
                    'title' => $post['title'],
                    'excerpt' => $post['excerpt'],
                    'body' => $body,
                    'tags' => $post['tags'],
                    'author_name' => 'Chris',
                    'pull_quote' => 'Good design is as little design as possible.',
                    'pull_quote_attribution' => 'Design Philosophy',
                    'is_published' => true,
                    'published_at' => $post['published_at'],
                ]
            );
        }
    }
}
