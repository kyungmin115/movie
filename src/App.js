import React from 'react';
import './App.css';
import { Route, Routes } from 'react-router-dom';
import Layout from './Layout';
import Home from './category/Home';
import Login from './pages/Login';
import MovieList from './movie/MovieList';
import WeekMovie from './movie/WeekMovie';
import CustomerService from './movie/CustomerService';
import NewMovie from './movie/NewMovie';
import SearchResults from './pages/SearchResults';
import MovieDetail from './movie/MovieDetail';
import FavoriteMovie from './pages/FavoriteMovie';
import { FavoritesProvider } from './pages/FavoritesContext';
import MyPage from './pages/Mypage';

const App = () => {
  return (
    <FavoritesProvider>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<Home />} />
          <Route path="/newmovie" element={<NewMovie />} />
          <Route path="/bookmark" element={<FavoriteMovie />} />
          <Route path="/service" element={<CustomerService />} />
          <Route path="/movie" element={<MovieList />} />
          <Route path="/weekly" element={<WeekMovie />} />
          <Route path="/login" element={<Login />} />
          <Route path="/mypage" element={<MyPage />} />
          <Route path="/search" element={<SearchResults />} />
          <Route path="/movie/:movieCd" element={<MovieDetail />} />
        </Route>
      </Routes>
    </FavoritesProvider>
  );
};

export default App;
