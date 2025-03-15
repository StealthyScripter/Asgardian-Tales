import React from 'react';
import { Outlet } from 'react-router-dom';
import Header from '../components/common/Header';

const RootLayout: React.FC = () => {
  return (
    <div className="app-container">
      <Header />
      <main className="main-content">
        <Outlet />
      </main>
    </div>
  );
};

export default RootLayout;