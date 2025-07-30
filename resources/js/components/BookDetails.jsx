import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, Link } from 'react-router-dom';

function BookDetails() {
    const { id } = useParams();
    const [book, setBook] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [formData, setFormData] = useState({
        username: '',
        rating: 1,
        comment: ''
    });
    const [formErrors, setFormErrors] = useState({});

    useEffect(() => {
        axios.get(`/api/books/${id}`)
            .then(response => {
                setBook(response.data.data);
                setLoading(false);
            })
            .catch(error => {
                setError(error.message);
                setLoading(false);
            });
    }, [id]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const validate = () => {
        const errors = {};
        if (!formData.username.trim()) errors.username = 'Имя пользователя обязательно';
        if (!formData.rating) errors.rating = 'Оценка обязательна';
        return errors;
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const errors = validate();
        if (Object.keys(errors).length > 0) {
            setFormErrors(errors);
            return;
        }

        axios.post(`/api/books/${id}/reviews`, formData)
            .then(response => {
                setBook(prev => ({
                    ...prev,
                    reviews: [...prev.reviews, response.data]
                }));
                setFormData({
                    username: '',
                    rating: 1,
                    comment: ''
                });
                setFormErrors({});
            })
            .catch(error => {
                console.error('Ошибка при добавлении отзыва:', error);
            });
    };

    if (loading) return <div>Загрузка...</div>;
    if (error) return <div>Ошибка: {error}</div>;

    return (
        <div className='flex flex-col gap-6'>
            <Link to="/" className="text-lg text-blue-600 hover:text-blue-800 rounded-md py-4 self-start">
                ← Назад к списку
            </Link>
            
            <div>
                <h2 className="text-2xl font-bold pb-2">{book.title}</h2>
                <p className="text-gray-600">Автор: {book.author}</p>
                <p className="text-gray-600">Год: {book.year}</p>
                <p className="text-gray-600">Жанр: {book.genre}</p>
                <p className='py-2'>{book.description}</p>
            </div>

            <div>
                <h3 className="text-xl font-semibold py-4">Отзывы</h3>
                {book.reviews.length > 0 ? (
                    <div className="space-y-4">
                        {book.reviews.map(review => (
                            <div key={review.id} className="border-b-2 border-gray-300 pb-4">
                                <div className="flex justify-between items-start">
                                    <h4 className="font-medium">{review.username}</h4>
                                    <div className="text-yellow-500">
                                        {'★'.repeat(review.rating)}{'☆'.repeat(5 - review.rating)}
                                    </div>
                                </div>
                                <p className="text-gray-600 mt-1">{review.comment}</p>
                                <p className="text-gray-400 text-sm mt-1">
                                    {new Date(review.created_at).toLocaleDateString()}
                                </p>
                            </div>
                        ))}
                    </div>
                ) : (
                    <p className="text-gray-500">Пока нет отзывов</p>
                )}
            </div>

            <div className="">
                <h3 className="text-xl font-semibold py-4">Оставить отзыв</h3>
                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label className="block text-gray-700 mb-2" htmlFor="username">
                            Имя пользователя*
                        </label>
                        <input
                            type="text"
                            id="username"
                            name="username"
                            value={formData.username}
                            onChange={handleChange}
                            className={`w-full px-3 py-2 border rounded ${formErrors.username ? 'border-red-500' : 'border-gray-300'}`}
                        />
                        {formErrors.username && <p className="text-red-500 text-sm mt-1">{formErrors.username}</p>}
                    </div>
                    
                    <div className="mb-4">
                        <label className="block text-gray-700 mb-2" htmlFor="rating">
                            Оценка
                        </label>
                        <select
                            id="rating"
                            name="rating"
                            value={formData.rating}
                            onChange={handleChange}
                            className={`px-3 py-2 border rounded ${formErrors.rating ? 'border-red-500' : 'border-gray-300'}`}
                        >
                            <option value="1">1 ★</option>
                            <option value="2">2 ★★</option>
                            <option value="3">3 ★★★</option>
                            <option value="4">4 ★★★★</option>
                            <option value="5">5 ★★★★★</option>
                        </select>
                        {formErrors.rating && <p className="text-red-500 text-sm mt-1">{formErrors.rating}</p>}
                    </div>
                    
                    <div className="mb-4">
                        <label className="block text-gray-700 mb-2" htmlFor="comment">
                            Комментарий
                        </label>
                        <textarea
                            id="comment"
                            name="comment"
                            value={formData.comment}
                            onChange={handleChange}
                            className="w-full px-3 py-2 border border-gray-300 rounded"
                            rows="3"
                        ></textarea>
                    </div>
                    
                    <button
                        type="submit"
                        className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-lg"
                    >
                        Отправить отзыв
                    </button>
                </form>
            </div>
        </div>
    );
}

export default BookDetails;