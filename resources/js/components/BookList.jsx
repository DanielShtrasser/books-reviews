import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

function BookList() {
    const [books, setBooks] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        axios.get('/api/books')
            .then(response => {
                setBooks(response.data.data);
                setLoading(false);
            })
            .catch(error => {
                setError(error.message);
                setLoading(false);
                
            });
    }, []);

    if (loading) return <div>Загрузка...</div>;
    if (error) return <div>Ошибка: {error}</div>;

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {books.map(book => (
                <div key={book.id} className="border border-gray-300 rounded-lg p-4 hover:shadow-xl transition-shadow">
                    <h2 className="text-xl font-semibold mb-2">{book.title}</h2>
                    <p className="text-gray-600 mb-1">Автор: {book.author}</p>
                    <p className="text-gray-600 mb-1">Год: {book.year}</p>
                    <p className="text-gray-600 mb-3">Жанр: {book.genre}</p>
                    <Link 
                        to={`/books/${book.id}`} 
                        className="text-blue-600 hover:text-blue-800 py-2 font-medium"
                    >
                        Подробнее
                    </Link>
                </div>
            ))}
        </div>
    );
}

export default BookList;