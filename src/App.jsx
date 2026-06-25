import React, { Suspense } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Loading from "./components/Loading";
import MainLayout from "./layouts/MainLayout";
import AuthLayout from "./layouts/AuthLayout";

// ✅ React.lazy() — komponen di-load hanya saat dibutuhkan
const Dashboard  = React.lazy(() => import("./pages/Dashboard"));
const Orders     = React.lazy(() => import("./pages/Orders"));
const Services   = React.lazy(() => import("./pages/Services"));
const Customers  = React.lazy(() => import("./pages/Customers"));
const Marketing  = React.lazy(() => import("./pages/Marketing"));
const Complaints = React.lazy(() => import("./pages/Complaints"));
const User       = React.lazy(() => import("./pages/User"));
const Components = React.lazy(() => import("./pages/Components"));
const Account    = React.lazy(() => import("./pages/Account"));
const Guest      = React.lazy(() => import("./pages/Guest"));
const Login      = React.lazy(() => import("./pages/auth/Login"));
const Register   = React.lazy(() => import("./pages/auth/Register"));
const Forgot     = React.lazy(() => import("./pages/auth/Forgot"));

// Helper: cek apakah user sudah login
function isLoggedIn() {
  return !!localStorage.getItem("user");
}

// Protected route — harus login
function ProtectedRoute({ children }) {
  return isLoggedIn() ? children : <Navigate to="/login" replace />;
}

// Guest route — jika sudah login, langsung ke dashboard
function GuestRoute({ children }) {
  return isLoggedIn() ? <Navigate to="/" replace /> : children;
}

export default function App() {
  return (
    <Suspense fallback={<Loading />}>
      <Routes>
        {/* Auth Layout — untuk login/register */}
        <Route element={<AuthLayout />}>
          <Route path="/login"    element={<GuestRoute><Login /></GuestRoute>} />
          <Route path="/register" element={<GuestRoute><Register /></GuestRoute>} />
          <Route path="/forgot"   element={<Forgot />} />
        </Route>

        {/* Halaman publik — bisa diakses siapa saja */}
        <Route path="/guest"   element={<Guest />} />
        <Route path="/account" element={<Account />} />

        {/* Main Layout — harus login */}
        <Route element={<ProtectedRoute><MainLayout /></ProtectedRoute>}>
          <Route path="/"           element={<Dashboard />}  />
          <Route path="/orders"     element={<Orders />}     />
          <Route path="/services"   element={<Services />}   />
          <Route path="/customers"  element={<Customers />}  />
          <Route path="/marketing"  element={<Marketing />}  />
          <Route path="/complaints" element={<Complaints />} />
          <Route path="/users"      element={<User />}       />
          <Route path="/components" element={<Components />} />
        </Route>

        {/* Fallback — route tidak dikenal redirect ke login */}
        <Route path="*" element={<Navigate to="/login" replace />} />
      </Routes>
    </Suspense>
  );
}
