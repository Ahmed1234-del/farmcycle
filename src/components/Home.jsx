import React from 'react';
import BackgroundPic from './farm.jpg';
import Signup from './Signup'
import { Link } from 'react-router-dom'
const Home = () => {
  return (
    <div
      className="min-h-screen bg-cover bg-center relative flex items-center justify-center"
      style={{ backgroundImage: `url(${BackgroundPic})` }}
    >
      <div className="absolute inset-0 bg-black bg-opacity-50 backdrop-blur-sm"></div>

      <div className="relative z-10 text-center px-6">
        <h1 className="text-5xl md:text-6xl font-bold text-white drop-shadow-lg mb-4 animate-fade-in">
          🌾 Welcome to <span className="text-green-300">FarmCycle</span>
        </h1>
        <p className="text-lg md:text-xl text-gray-100 max-w-2xl mx-auto drop-shadow-md">
          Discover, trade, and thrive with local farm products. FarmCycle is your trusted bridge between farmers and communities.
        </p>
        <Link to="/signup">
        <button className="mt-8 px-6 py-3 bg-green-500 hover:bg-green-600 text-white font-semibold text-lg rounded-full shadow-lg hover:shadow-green-400 transition-all duration-300 animate-pulse">
          Explore Now 🚜
        </button>
        </Link>
      </div>

      
    </div>
  );
};

export default Home;
