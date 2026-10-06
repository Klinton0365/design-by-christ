<?php

namespace App\Http\Requests;

use Illuminate\Contracts\Validation\ValidationRule;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class BlogPostRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'title' => ['required', 'string', 'max:255'],
            'slug' => [
                'required',
                'string',
                'max:255',
                'alpha_dash',
                Rule::unique('blog_posts', 'slug')->ignore($this->route('blog_post')),
            ],
            'excerpt' => ['required', 'string', 'max:500'],
            'body' => ['required', 'string'],
            'cover_image' => ['nullable', 'image', 'max:5120'],
            'tags' => ['nullable', 'array'],
            'tags.*' => ['string', 'max:50'],
            'author_name' => ['nullable', 'string', 'max:255'],
            'pull_quote' => ['nullable', 'string', 'max:500'],
            'pull_quote_attribution' => ['nullable', 'string', 'max:255'],
            'is_published' => ['boolean'],
            'published_at' => ['nullable', 'date'],
        ];
    }
}
