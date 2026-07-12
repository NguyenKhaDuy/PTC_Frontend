import { Routes, Route } from "react-router-dom";

import CustomerLayout from "./Layouts/CustomerLayout";
import AdminLayout from "./Layouts/AdminLayout";

// User
import Home from "./Pages/User/HomePage";
import LoginPage from "./Pages/LoginPage";
import RegisterPage from "./Pages/RegisterPage";
import MoviePage from "./Pages/User/MoviePage";
import MovieDetailPage from "./Pages/User/MovieDetailPage";
import BookingPage from "./Pages/User/BookingPage";
import CinemaPage from "./Pages/User/CinemaPage";
import ShowtimePage from "./Pages/User/ShowtimePage";
import PromotionsPage from "./Pages/User/PromotionsPage";
import ProfilePage from "./Pages/User/ProfilePage";
import PaymentSuccessPage from "./Pages/User/PaymentSuccessPage";
import ForgotPasswordPage from "./Pages/User/ForgotPasswordPage";
import FavoriteMoviesPage from "./Pages/User/FavoriteMoviesPage";

// Admin
import Dashboard from "./Pages/Admin/Dashboard";
import Movies from "./Pages/Admin/Movies";
import Users from "./Pages/Admin/Users";
import Bookings from "./Pages/Admin/Bookings";
import Branches from "./Pages/Admin/Branches";
import Schedules from "./Pages/Admin/Schedules";
import Categories from "./Pages/Admin/Categories";
import Rooms from "./Pages/Admin/Rooms";
import Seats from "./Pages/Admin/Seats";
import SeatTypes from "./Pages/Admin/SeatTypes";
import Vouchers from "./Pages/Admin/Vouchers";
import Actors from "./Pages/Admin/Actors";
import Drinks from "./Pages/Admin/Drinks";
import Foods from "./Pages/Admin/Foods";
import Sizes from "./Pages/Admin/Sizes";
import Roles from "./Pages/Admin/Roles";

function App() {
  return (
    <Routes>
      {/* Public */}
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />
      <Route path="/forgot-password" element={<ForgotPasswordPage />} />

      {/* Customer */}
      <Route element={<CustomerLayout />}>
        <Route path="/" element={<Home />} />
        <Route path="/movies" element={<MoviePage />} />
        <Route path="/movie/:id" element={<MovieDetailPage />} />
        <Route path="/booking/:id" element={<BookingPage />} />
        <Route path="/cinemas" element={<CinemaPage />} />
        <Route path="/showtimes" element={<ShowtimePage />} />
        <Route path="/promotions" element={<PromotionsPage />} />
        <Route path="/profile/:id" element={<ProfilePage />} />
        <Route path="/payment/:status" element={<PaymentSuccessPage />} />
        <Route path="/favorites" element={<FavoriteMoviesPage />} />
      </Route>

      {/* Admin */}
      <Route path="/admin" element={<AdminLayout />}>
        <Route index element={<Dashboard />} />
        <Route path="movies" element={<Movies />} />
        <Route path="branches" element={<Branches />} />
        <Route path="schedules" element={<Schedules />} />
        <Route path="users" element={<Users />} />
        <Route path="bookings" element={<Bookings />} />
        <Route path="categories" element={<Categories />} />
        <Route path="rooms" element={<Rooms />} />
        <Route path="seats" element={<Seats />} />
        <Route path="seat-types" element={<SeatTypes />} />
        <Route path="vouchers" element={<Vouchers />} />
        <Route path="actors" element={<Actors />} />
        <Route path="drinks" element={<Drinks />} />
        <Route path="foods" element={<Foods />} />
        <Route path="sizes" element={<Sizes />} />
        <Route path="roles" element={<Roles />} />
      </Route>
    </Routes>
  );
}

export default App;
