import { Routes, Route } from 'react-router-dom';
import BookList from './components/BookList';
import BookDetails from './components/BookDetails';

function App() {
    return (
            <div className="container mx-auto px-4 py-8">
                <Routes>
                    <Route path="/" element={<BookList />} />
                    <Route path="/books/:id" element={<BookDetails />} />
                </Routes>
            </div>
    );
}

export default App;