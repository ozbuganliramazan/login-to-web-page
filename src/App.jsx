import { useState } from "react";
import { BrowserRouter, Link, Route, Routes } from "react-router-dom";
import Footer from "./components/footer";
import Header from "./components/header";
import MainPage from "./pages/main-page";
import CategoryDetailsPage from "./pages/category-details-page";
import LoginPage from "./pages/login-page";
import RegisterPage from "./pages/register-page";

function App(props) {
  return (
    <BrowserRouter>
      <div className="container py-3">
        <Header />

        <main>
          <Routes>
            <Route index element={<MainPage />} />
            <Route path="category">
              <Route path=":slug" element={<CategoryDetailsPage />} />
            </Route>

            <Route path="auth">
              <Route path="login" element={<LoginPage />} />
              <Route path="register" element={<RegisterPage />} />
            </Route>
          </Routes>
        </main>

        <Footer />
      </div>
    </BrowserRouter>
  );
}

export default App;
