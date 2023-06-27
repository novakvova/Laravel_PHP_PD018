import React from "react";
import "./App.css";
import CategoryListPage from "./components/admin/category/list/CategoryListPage";
import { Route, Routes } from "react-router-dom";
import CategoryCreatePage from "./components/admin/category/create/CategoryCreatePage";
import DefaultLayout from "./components/containers/default/DefaultLayout";
import LoginPage from "./components/auth/login/LoginPage";
import AdminLayout from "./components/admin/container/AdminLayout";
import HomePage from "./components/home/HomePage";
import AdminHomePage from "./components/admin/home/AdminHomePage";

function App() {
    return (
      <>
        <Routes>
          <Route path="/" element={<DefaultLayout />}>
            <Route index element={<HomePage />} />
            <Route path="login" element={<LoginPage />} />
          </Route>
          <Route path={"/admin"} element={<AdminLayout/>}>
            <Route index element={<AdminHomePage/>} />
            <Route path={"category"}>
              <Route index element={<CategoryListPage />}/>
              <Route path="create" element={<CategoryCreatePage />} />
            </Route>
          </Route>
        </Routes>
      </>
    );
}

export default App;
