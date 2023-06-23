import React from "react";
import "style.css";
import tw from "twin.macro";
import "tailwindcss/lib/css/preflight.css";
import AnimationRevealPage from "helpers/AnimationRevealPage";
import { Navigate, Route, Routes, useLocation } from "react-router-dom";

import UserLayout from "components/user/layout/Layout";
import AdminLayout from "components/admin/layout/Layout";
import Dashboard from "pages/admin/dashboard/Dashboard";

import AllHeritage from "pages/admin/heritage/AllHeritage";
import AddOrUpdateHeritage from "pages/admin/heritage/AddOrUpdateHeritage";

import AllHeritageType from "pages/admin/heritage-type/AllHeritageType";
import AddOrUpdateHeritageType from "pages/admin/heritage-type/AddOrUpdateHeritageType";

import AllLocation from "pages/admin/location/AllLocation";
import AddOrUpdateLocation from "pages/admin/location/AddOrUpdateLocation";

import AllManagementUnit from "pages/admin/management-unit/AllManagementUnit";
import AddOrUpdateManagementUnit from "pages/admin/management-unit/AddOrUpdateManagementUnit";

import AllUser from "pages/admin/user/AllUser";
import AddOrUpdateUser from "pages/admin/user/AddOrUpdateUser";

import AdminLogin from "pages/admin/login/Login";

import HomePage from "pages/user/HomePage";
import NotFound404 from "pages/user/NotFound404";

function App() {
  const loggedInUsername = localStorage.getItem("loggedInUsername");
  const location = useLocation();
  const isAdminRoute = location.pathname.startsWith("/admin/dashboard");

  if (isAdminRoute && !loggedInUsername) {
    // Nếu đường dẫn là trang admin và chưa đăng nhập, chuyển hướng đến trang đăng nhập
    return <Navigate to="/admin" replace />;
  }

  return (
    <AnimationRevealPage>
      <Routes>
        <Route path="/" element={<UserLayout />}>
          <Route index element={<HomePage />} />
        </Route>
        <Route path="/admin" element={<AdminLogin />} />

        {loggedInUsername && (
          <Route path="/admin/dashboard" element={<AdminLayout />}>
            <Route index element={<Dashboard />} />
            <Route path="all-heritage" element={<AllHeritage />} />
            <Route path="add-heritage" element={<AddOrUpdateHeritage type="add" />} />
            <Route path="update-heritage/:id" element={<AddOrUpdateHeritage type="update" />} />

            <Route path="all-heritage-type" element={<AllHeritageType />} />
            <Route path="add-heritage-type" element={<AddOrUpdateHeritageType type="add" />} />
            <Route path="update-heritage-type/:id" element={<AddOrUpdateHeritageType type="update" />} />

            <Route path="all-location" element={<AllLocation />} />
            <Route path="add-location" element={<AddOrUpdateLocation type="add" />} />
            <Route path="update-location/:id" element={<AddOrUpdateLocation type="update" />} />

            <Route path="all-management-unit" element={<AllManagementUnit />} />
            <Route path="add-management-unit" element={<AddOrUpdateManagementUnit type="add" />} />
            <Route path="update-management-unit/:id" element={<AddOrUpdateManagementUnit type="update" />} />

            <Route path="all-user" element={<AllUser />} />
            <Route path="add-user" element={<AddOrUpdateUser type="add" />} />
            <Route path="update-user/:id" element={<AddOrUpdateUser type="update" />} />
          </Route>
        )}

        <Route path="*" element={<NotFound404 />} />
      </Routes>
    </AnimationRevealPage>
  );
}

export default App;
