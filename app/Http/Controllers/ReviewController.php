<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreReviewRequest;
use App\Http\Resources\ReviewResource;
use App\Models\Book;
use App\Models\Review;
use Illuminate\Http\Request;

class ReviewController extends Controller
{
    public function store(StoreReviewRequest $request, $bookId)
    {
        $book = Book::findOrFail($bookId);
        
        $review = new Review($request->validated());
        $review->book_id = $bookId;
        $review->save();
        
        return new ReviewResource($review);
    }
}