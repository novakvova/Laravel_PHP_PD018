import React from 'react';
import logo from './logo.svg';
import './App.css';
import CategoryListPage from './components/category/list/CategoryListPage';
import { Route, Routes } from 'react-router-dom';
import CategoryCreatePage from './components/category/create/CategoryCreatePage';
import DefaultLayout from './components/containers/default/DefaultLayout';

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<DefaultLayout/>}>
          <Route index element={<CategoryListPage />} />
          <Route path="category/create" element={<CategoryCreatePage />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;