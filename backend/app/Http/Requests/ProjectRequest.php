<?php

namespace App\Http\Requests;

use Illuminate\Contracts\Validation\ValidationRule;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class ProjectRequest extends FormRequest
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
                Rule::unique('projects', 'slug')->ignore($this->route('project')),
            ],
            'category' => ['required', 'string', 'max:255'],
            'client' => ['nullable', 'string', 'max:255'],
            'tags' => ['nullable', 'array'],
            'tags.*' => ['string', 'max:50'],
            'project_date' => ['nullable', 'date'],
            'external_link' => ['nullable', 'url', 'max:255'],
            'description' => ['required', 'string'],
            'is_published' => ['boolean'],
            'sort_order' => ['integer'],
        ];
    }
}
