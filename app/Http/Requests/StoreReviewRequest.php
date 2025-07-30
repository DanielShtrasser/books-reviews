<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class StoreReviewRequest extends FormRequest
{
    public function authorize()
    {
        return true;
    }

    public function rules()
    {
        return [
            'username' => 'required|string|max:50',
            'rating' => 'required|integer|min:1|max:5',
            'comment' => 'nullable|string',
        ];
    }
}