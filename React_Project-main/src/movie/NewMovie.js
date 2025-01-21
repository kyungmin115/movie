import React, { useEffect, useState } from 'react';
import axios from 'axios';
import styled from 'styled-components';

const Header = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0;
  margin: 0 10px;
  width: 580px;
  border-bottom: 0.2px solid #adb5bd;
`;

const TextContent = styled.h2`
  font-weight: bold;
  font-size: 26px;
  margin-left: 20px;
`;

const MovieListContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  margin-top: 20px;
  max-width: 980px;
  white-space: nowrap; /* 텍스트가 줄바꿈되지 않도록 설정 */
`;

const MovieItem = styled.div`
  display: inline-flex;
  flex-direction: column;
  align-items: center;
  margin: 10px;
`;

//영화 포스터 이미지가 없을 때
const MovieNoim = styled.div`
  width: 150px;
  height: 220px;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: rgba(0, 0, 0, 0.1);
  border-radius: 5px;
  color: #fofofo;
  font-size: 16px;
  margin-bottom: 4px;
`;

const MovieImage = styled.img`
  width: 150px;
  height: 220px;
  border-radius: 10px;
`;

//영화 제목 꾸미기
const MovieTitle = styled.div`
  font-size: 12px;
  color: #333;
  text-align: center;
  white-space: nowrap; /* 텍스트 줄바꿈 방지 */
  overflow: hidden; /* 넘치는 텍스트 숨김 */
  text-overflow: ellipsis; /* 넘치는 텍스트 "..."으로 표시 */
  width: 150px; /* 고정된 너비 설정 */
`;

//개봉일, 관객수 꾸미기
const MovieInfo = styled.div`
  font-size: 12px;
  color: #333;
  margin-top: -10px;
`;

const NewMovie = () => {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const API_KEY_TMDB = 'c46c5e36b91e0c3b8e75ebe785d68935'; // TMDB API 키

  useEffect(() => {
    const fetchMovies = async () => {
      let allMovies = [];
      let page = 1;
      let totalPages = 1;

      try {
        // 페이지를 순회하여 모든 영화 가져오기
        do {
          const response = await axios.get(
            `https://api.themoviedb.org/3/movie/upcoming?api_key=${API_KEY_TMDB}&language=ko-KR&page=${page}`
          );

          const movieList = response.data.results; // 영화 데이터
          allMovies = [...allMovies, ...movieList]; // 모든 영화 리스트에 추가
          totalPages = response.data.total_pages; // 총 페이지 수
          page++;
        } while (page <= totalPages);

        // 오늘 날짜 구하기
        const today = new Date();
        const todayString = today.toISOString().split('T')[0]; // YYYY-MM-DD 형식으로 변환

        // 영화 데이터를 필터링하여 오늘 이후 개봉 예정 영화만 남기기
        const upcomingMovies = allMovies.filter(
          (movie) => movie.release_date > todayString
        );

        // 영화 데이터를 포스터 URL과 함께 설정
        const moviesWithPosters = upcomingMovies.map((movie) => ({
          title: movie.title,
          poster_path: movie.poster_path,
          release_date: movie.release_date,
        }));

        setMovies(moviesWithPosters);
      } catch (error) {
        console.error('API 요청 중 오류 발생:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchMovies();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <Header>
        <TextContent>상영 예정작</TextContent>
      </Header>
      <MovieListContainer>
        {movies.map((movie, index) => (
          <MovieItem key={index}>
            {movie.poster_path ? (
              <MovieImage
                src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} // TMDB에서 가져온 포스터 이미지 URL
                alt={movie.title}
              />
            ) : (
              <MovieNoim>포스터 없음</MovieNoim>
            )}
            <MovieTitle>
              <h3>{movie.title}</h3> {/* 영화 제목 표시 */}
            </MovieTitle>
            <MovieInfo>
              <p>개봉일: {movie.release_date}</p>
            </MovieInfo>
          </MovieItem>
        ))}
      </MovieListContainer>
    </>
  );
};

export default React.memo(NewMovie);
