import { Route, Routes } from "react-router-dom";

import BookPage from "pages/BookPage";
import BookCreatePage from "pages/BookCreatePage/BookCreatePage";
import BookUpdatePage from "pages/BookUpdatePage";
import LoginPage from "pages/LoginPage";
import { AuthenticationRoute } from "./AuthenticationRoute";
import { PublicRoute } from "./PublicRoute";

export function AppRouter() {
  return (
    <Routes>
      <Route element={<AuthenticationRoute />}>
        <Route path="/" element={<BookPage />} />
        <Route path="/create" element={<BookCreatePage />} />
        <Route path="/update/:id" element={<BookUpdatePage />} />
      </Route>

      <Route element={<PublicRoute />}>
        <Route path="/login" element={<LoginPage />} />
      </Route>
    </Routes>
  );
}
