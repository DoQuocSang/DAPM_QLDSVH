import React from "react"
import "style.css"
import tw from "twin.macro";
import "tailwindcss/lib/css/preflight.css"
import AnimationRevealPage from "helpers/AnimationRevealPage"

import UserLayout from "components/user/layout/Layout"
import AdminLayout from "components/admin/layout/Layout"
import Dashboard from "pages/admin/dashboard/Dashboard"

import AllHeritage from "pages/admin/heritage/AllHeritage"
import AddOrUpdateHeritage from "pages/admin/heritage/AddOrUpdateHeritage"

import AllHeritageType from "pages/admin/heritage-type/AllHeritageType"
import AddOrUpdateHeritageType from "pages/admin/heritage-type/AddOrUpdateHeritageType"


import AdminLogin from "pages/admin/login/Login"

import { Route, Routes } from "react-router-dom"

function App() {
  return (
    <AnimationRevealPage>
      <Routes>
        <Route path="/" element={<UserLayout />}>
          {/* <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<UserLogin />} />
          <Route path="/signup" element={<UserSignup />} />
          <Route path="/all-product" element={<AllProductPage />} />
          <Route path="/all-product/:type/:slug" element={<AllProductPage />} />
          <Route path="/product-detail/:slug" element={<ProductDetailPage />} />
          <Route path="/about-us" element={<AboutUs />} />
          <Route path="/blog" element={<BlogIndex />} />
          <Route path="/blog/:type/:slug" element={<BlogIndex />} />
          <Route path="/blog-detail/:slug" element={<BlogDetail />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/not-found-404" element={<NotFound404 />} /> */}
        </Route>

        <Route path="/admin" element={<AdminLogin />} />

        <Route path="/admin/dashboard" element={<AdminLayout />}>
          <Route path="/admin/dashboard" element={<Dashboard />} />
          <Route path="/admin/dashboard/all-heritage" element={<AllHeritage />} />
          <Route path="/admin/dashboard/add-heritage" element={<AddOrUpdateHeritage type="add" />} />
          <Route path="/admin/dashboard/update-heritage/:id" element={<AddOrUpdateHeritage type="update" />} />

          <Route path="/admin/dashboard/all-heritage-type" element={<AllHeritageType />} />
          <Route path="/admin/dashboard/add-heritage-type" element={<AddOrUpdateHeritageType type="add" />} />
          <Route path="/admin/dashboard/update-heritage-type/:id" element={<AddOrUpdateHeritageType type="update" />} />
        </Route>

        {/* <Route path="*" element={<NotFound404 />} /> */}

      </Routes>
    </AnimationRevealPage>
  )
}

export default App