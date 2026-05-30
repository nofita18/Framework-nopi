import React, { Suspense } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Loading from "./components/Loading";
import MainLayout from "./layouts/MainLayout";
import AuthLayout from "./layouts/AuthLayout";

// ✅ React.lazy() — komponen di-load hanya saat dibutuhkan
const Dashboard = React.lazy(() => import("./pages/Dashboard"));
const Orders     = React.lazy(() => import("./pages/Orders"));
const Services   = React.lazy(() => import("./pages/Services"));
const Customers  = React.lazy(() => import("./pages/Customers"));
const Login      = React.lazy(() => import("./pages/auth/Login"));
const Register   = React.lazy(() => import("./pages/auth/Register"));
const Forgot      = React.lazy(() => import("./pages/auth/Forgot"));
const Components  = React.lazy(() => import("./pages/Components"));

export default function App() {
  return (
    // ✅ Suspense — tampilkan Loading saat komponen lazy sedang di-load
    <Suspense fallback={<Loading />}>
      <Routes>
        {/* ── MainLayout: sidebar + header ── */}
        <Route element={<MainLayout />}>
          <Route path="/"          element={<Dashboard />} />
          <Route path="/orders"    element={<Orders />} />
          <Route path="/services"  element={<Services />} />
          <Route path="/customers"   element={<Customers />} />
          <Route path="/components" element={<Components />} />
        </Route>

        {/* ── AuthLayout: login, register, forgot ── */}
        <Route element={<AuthLayout />}>
          <Route path="/login"    element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/forgot"   element={<Forgot />} />
        </Route>

        {/* Fallback */}
        <Route path="*" element={<Navigate to="/login" replace />} />
      </Routes>
    </Suspense>
  );
}
