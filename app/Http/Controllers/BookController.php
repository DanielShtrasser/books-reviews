<?php

namespace App\Http\Controllers;

use App\Http\Resources\BookResource;
use App\Http\Resources\BookWithReviewsResource;
use App\Models\Book;
use Illuminate\Http\Request;

class BookController extends Controller
{
    public function index()
    {
        $books = Book::all();
        return BookResource::collection($books);
    }

    public function show($id)
    {
        $book = Book::with('reviews')->findOrFail($id);
        return new BookWithReviewsResource($book);
    }
}
