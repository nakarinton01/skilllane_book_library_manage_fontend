import { Route, Routes } from 'react-router-dom';

import BookPage from 'pages/BookPage';

export function AppRouter() {
  return (
    <Routes>
        <Route path="/" element={<BookPage />} />
    </Routes>)
  }