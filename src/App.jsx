import { Routes, Route, Link } from 'react-router-dom';

import Layout from '@layout/Layout';

import LoginPage from '@features/auth/LoginPage';

import Home from '@pages/Home/Home';
import Cart from '@pages/Cart/Cart';

import Toaster from '@components/Toaster/Toaster';
// import NotFound from './pages/NotFound';

function App() {
  return (
    <div className='size-full h-[100vh] bg-slate-50'>
      <Toaster />
      <Routes>
        <Route
          path="/"
          element={
            <LoginPage />
          } 
        />
        <Route
          path="/home"
          element={
            <Layout>
              <Home />
            </Layout>
          } 
        />
        <Route
          path="/cart"
          element={
            <Layout>
              <Cart />
            </Layout>
          } 
        />
      </Routes>
    </div>
  );
}

export default App;
