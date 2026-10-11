<?php

namespace Database\Seeders;

use App\Models\Faq;
use Illuminate\Database\Seeder;

class FaqSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $faqs = [
            [
                'question' => 'How does the Design By Chris process work?',
                'answer' => 'We start with a free consultation to understand your space, style, and budget. From there we put together a concept and mood board, refine it with you, then move into detailed design, sourcing, and on-site execution — keeping you updated at every stage.',
            ],
            [
                'question' => 'What cities do you currently operate in?',
                'answer' => 'We\'re based in Brooklyn and take on projects throughout the greater New York area. For larger commercial or out-of-state projects, reach out and we\'ll let you know what\'s possible.',
            ],
            [
                'question' => 'What kind of interior designers do you have?',
                'answer' => 'Our team covers residential and commercial interiors, space planning, and custom furnishing — so whether it\'s a single room refresh or a full build-out, you\'re working with someone who specializes in that scope.',
            ],
            [
                'question' => 'How long does a typical project take?',
                'answer' => 'A single room typically takes 4-8 weeks from concept to install. Full-home or commercial projects usually run 3-6 months depending on scope, sourcing lead times, and any construction involved.',
            ],
            [
                'question' => 'Can I use my existing furnishings?',
                'answer' => 'Absolutely. We often build a design around pieces our clients already love — whether that\'s a family heirloom or a sofa you\'re not ready to part with. We\'ll help it feel intentional in the new space rather than out of place.',
            ],
            [
                'question' => 'Do you offer free consultations?',
                'answer' => 'Yes — every project starts with a free initial consultation so we can understand your space and goals before any commitment on either side.',
            ],
        ];

        foreach ($faqs as $i => $faq) {
            Faq::updateOrCreate(
                ['question' => $faq['question']],
                [
                    'answer' => $faq['answer'],
                    'is_published' => true,
                    'sort_order' => $i,
                ]
            );
        }
    }
}
