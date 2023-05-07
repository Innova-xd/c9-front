import React from 'react';
import Header from './Header';
import Footer from './Footer';

import { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';

const Home = () => {
  const { currentUser } = useContext(AuthContext);

  return (
    <div>
      <Header />
      <main>
        <div className="py-8 px-16">
          <h2>Home</h2>
          {currentUser ? 'Hay User' : 'No hay User'}
        </div>
      </main>
      <Footer />
    </div>

  );
};

export default Home;
