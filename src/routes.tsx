import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import UserList from './pages/UserList';
import UserDetails from './pages/UserDetails';

export default function AppRoutes() {

  const ManyUserList = () => {
    return (
      <>
        <UserList />
        <UserList />
        <UserList />
      </>
    )
  }

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<ManyUserList />} />
        <Route path="/users/:id" element={<UserDetails />} />
      </Routes>
    </BrowserRouter>
  )
}