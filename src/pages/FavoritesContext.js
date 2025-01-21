import React, { createContext, useContext, useState } from 'react';

// FavoritesContext 생성
const FavoritesContext = createContext();

// FavoritesProvider 정의
export const FavoritesProvider = ({ children }) => {
  const [favorites, setFavorites] = useState([]);

  // 즐겨찾기 추가 함수
  const addFavorite = (movie) => {
    setFavorites((prevFavorites) => {
      const isFavorite = prevFavorites.some(
        (favMovie) => favMovie.title === movie.movieNm
      );

      // 이미 즐겨찾기에 있으면 추가하지 않음
      if (isFavorite) {
        return prevFavorites;
      } else {
        return [...prevFavorites, movie];
      }
    });
  };

  // 즐겨찾기에서 제거
  const removeFavorite = (movie) => {
    setFavorites((prevFavorites) =>
      prevFavorites.filter((favMovie) => favMovie.movieNm !== movie.movieNm)
    );
  };

  // 즐겨찾기에 있는지 확인
  const isFavorite = (movie) => {
    return favorites.some((favMovie) => favMovie.movieNm === movie.movieNm);
  };

  return (
    <FavoritesContext.Provider
      value={{ favorites, addFavorite, removeFavorite, isFavorite }}
    >
      {children}
    </FavoritesContext.Provider>
  );
};

// 커스텀 훅을 사용하여 FavoritesContext 접근
export const useFavorites = () => {
  const context = useContext(FavoritesContext);
  if (!context) {
    throw new Error(
      'useFavorites는 FavoritesProvider 내에서만 사용될 수 있습니다.'
    );
  }
  return context;
};
