import { Routes, Route, Link } from 'react-router-dom';

import Layout from '@layout/Layout';

import Home from '@pages/Home/Home';
import Cart from '@pages/Cart/Cart';
// import NotFound from './pages/NotFound';

function App() {
  return (
    <div className='bg-slate-50'>
      {/* <nav>
        <Link to="/">Home</Link> |{" "}
        <Link to="/about">About</Link> |{" "}
        <Link to="/contact">Contact</Link>
      </nav> */}

      <Routes>
        <Route
          path="/"
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
