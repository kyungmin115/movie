import React, { useState, useEffect } from 'react';
import axios from 'axios';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { FaStar } from 'react-icons/fa';
import { useFavorites } from '../pages/FavoritesContext';

const Header = styled.div`
  display: flex;
  align-item: center;
  justify-content: space-between;
  padding: 0;
  margin: 0 10px;
  width: 100%;
  border-bottom: 0.2px solid #adb5bd;
`;

const TextContent = styled.h2`
  font-weight: bold;
  font-size: 26px;
  margin-left: 20px;
`;

const MovieListContainer = styled.div`
  display: flex;
  flex-wrap: nowrap; /* 줄바꿈 없도록 설정 */
  justify-content: flex-start;
  margin-top: 20px;
  gap: 30px 10px;
  overflow-x: auto; /* 수평 스크롤 가능하게 설정 */
  padding: 10px; /* 스크롤 영역 안에 여백 추가 */
  max-width: 980px;
  white-space: nowrap; /* 텍스트가 줄바꿈되지 않도록 설정 */
`;

const MovieItem = styled.div`
  display: inline-flex;
  flex-direction: column;
  align-items: center;
  margin: 20px;
  min-width: 200px;
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
  font-size: 14px;
  color: #333;
  text-align: center;
  white-space: nowrap; /* 텍스트 줄바꿈 방지 */
  overflow: hidden; /* 넘치는 텍스트 숨김 */
  text-overflow: ellipsis; /* 넘치는 텍스트 "..."으로 표시 */
  width: 150px; /* 고정된 너비 설정 */
`;

//개봉일, 관객수 꾸미기
const MovieInfo = styled.div`
  margin-top: 10px;
  font-size: 14px;
  line-height: 10px;
  color: #333;
`;

//즐겨찾기, 상세정보 버튼 그룹
const ButtonGroup = styled.div`
  display: flex;
  justify-content: space-between;
  gap: 5px;
  align-items: center;
`;

//즐겨찾기 버튼
const IconButton = styled.button`
  background-color: ${({ isFav }) => (isFav ? '#bf3131' : 'white')};
  color: ${({ isFav }) => (isFav ? 'white' : '#bf3131')};
  border: solid 1px;
  border-color: #bf3131;
  padding: 8px 15px;
  border-radius: 5px;
  cursor: pointer;
  font-size: 14px;
  margin-top: 5px;

  &:hover {
    color: white;
    background-color: #bf3131;
  }
`;

//상세정보 버튼
const ButtonLk = styled(Link)`
  text-decoration: none;
  background-color: white;
  color: #bf3131;
  border: solid 1px;
  border-color: #bf3131;
  padding: 8px 35px;
  border-radius: 5px;
  cursor: pointer;
  font-size: 14px;
  margin-top: 5px;

  &:hover {
    color: white;
    background-color: #bf3131;
  }
`;

const Weekly = styled.div`
  margin-top: 30px;
`;

//링크 걸려있는 이미지, 영화 제목에 글자 꾸미기
const PostLink = styled(Link)`
  text-decoration: none;
`;

const MovieList = () => {
  const [movies, setMovies] = useState([]);
  const [weeklyMovies, setWeeklyMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const { addFavorite, isFavorite } = useFavorites();
  const API_KEY_KOFIC = '303756f624abaa433a616a1f01bf62c2'; // KOFIC API 키
  const API_KEY_TMDB = 'c46c5e36b91e0c3b8e75ebe785d68935'; // TMDB API 키
  const date = '20241013'; // 일간 영화 순위를 가져올 날짜
  const weeklyDate = '20241006'; // 주간 영화 순위를 가져올 날짜

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const response = await axios.get(
          `http://www.kobis.or.kr/kobisopenapi/webservice/rest/boxoffice/searchDailyBoxOfficeList.json?key=${API_KEY_KOFIC}&targetDt=${date}`
        );
        const movieList = response.data.boxOfficeResult.dailyBoxOfficeList;

        const moviesWithPosters = await Promise.all(
          movieList.map(async (movie) => {
            const tmdbResponse = await axios.get(
              `https://api.themoviedb.org/3/search/movie?api_key=${API_KEY_TMDB}&query=${encodeURIComponent(
                movie.movieNm
              )}`
            );
            const posterPath =
              tmdbResponse.data.results.length > 0
                ? tmdbResponse.data.results[0].poster_path
                : null;

            return {
              ...movie,
              poster_path: posterPath,
            };
          })
        );

        setMovies(moviesWithPosters);
        setLoading(false);
      } catch (error) {
        console.error('API 요청 중 오류 발생:', error);
        setLoading(false);
      }
    };

    const fetchWeeklyMovies = async () => {
      try {
        const weeklyResponse = await axios.get(
          `http://www.kobis.or.kr/kobisopenapi/webservice/rest/boxoffice/searchWeeklyBoxOfficeList.json?key=${API_KEY_KOFIC}&targetDt=${weeklyDate}&weekGb=0`
        );
        const weeklyMovieList =
          weeklyResponse.data.boxOfficeResult.weeklyBoxOfficeList;

        const weeklyMoviesWithPosters = await Promise.all(
          weeklyMovieList.map(async (movie) => {
            const tmdbResponse = await axios.get(
              `https://api.themoviedb.org/3/search/movie?api_key=${API_KEY_TMDB}&query=${encodeURIComponent(
                movie.movieNm
              )}`
            );
            const posterPath =
              tmdbResponse.data.results.length > 0
                ? tmdbResponse.data.results[0].poster_path
                : null;

            return {
              ...movie,
              poster_path: posterPath,
            };
          })
        );

        setWeeklyMovies(weeklyMoviesWithPosters);
        setLoading(false);
      } catch (error) {
        console.error('API 요청 중 오류 발생:', error);
        setLoading(false);
      }
    };

    fetchMovies();
    fetchWeeklyMovies();
  }, [date, weeklyDate]);

  if (loading) {
    return <div>Loading...</div>;
  }

  const handleFavoriteClick = (movie) => {
    if (isFavorite(movie)) {
      window.alert(`${movie.movieNm}은(는) 이미 즐겨찾기로 등록되어 있습니다.`);
    } else {
      addFavorite(movie);
      window.alert(`${movie.movieNm}이(가) 즐겨찾기에 추가되었습니다.`);
    }
  };

  return (
    <>
      <Header>
        <TextContent>일간 영화 순위</TextContent>
      </Header>
      <MovieListContainer>
        {movies.map((movie) => (
          <MovieItem key={movie.movieCd}>
            {movie.poster_path ? (
              <Link to={`/movie/${movie.movieCd}`}>
                <MovieImage
                  src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} // TMDB에서 가져온 포스터 이미지 URL
                  alt={movie.movieNm}
                />
              </Link>
            ) : (
              <PostLink to={`/movie/${movie.movieCd}`}>
                <MovieNoim>포스터 없음</MovieNoim>
              </PostLink>
            )}
            <PostLink to={`/movie/${movie.movieCd}`}>
              <MovieTitle>
                <h3>
                  {movie.rank}. {movie.movieNm}
                </h3>
              </MovieTitle>
            </PostLink>
            <MovieInfo>
              <p>개봉일: {movie.openDt}</p>
              <p>관객수: {movie.audiCnt}</p>
            </MovieInfo>
            <ButtonGroup>
              <IconButton
                isFav={isFavorite(movie)}
                onClick={() => handleFavoriteClick(movie)}
              >
                <FaStar /> 즐겨찾기
              </IconButton>
              <ButtonLk to={`/movie/${movie.movieCd}`} key={movie.movieCd}>
                상세정보
              </ButtonLk>
            </ButtonGroup>
          </MovieItem>
        ))}
      </MovieListContainer>
      <Weekly>
        <Header>
          <TextContent>주간 영화 순위</TextContent>
        </Header>
        <MovieListContainer>
          {weeklyMovies.map((movie) => (
            <MovieItem key={movie.movieCd}>
              {movie.poster_path ? (
                <Link to={`/movie/${movie.movieCd}`}>
                  <MovieImage
                    src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} // TMDB에서 가져온 포스터 이미지 URL
                    alt={movie.movieNm}
                  />
                </Link>
              ) : (
                <PostLink to={`/movie/${movie.movieCd}`}>
                  <MovieNoim>포스터 없음</MovieNoim>
                </PostLink>
              )}
              <PostLink to={`/movie/${movie.movieCd}`}>
                <MovieTitle>
                  <h3>
                    {movie.rank}. {movie.movieNm}
                  </h3>
                </MovieTitle>
              </PostLink>
              <MovieInfo>
                <p>개봉일: {movie.openDt}</p>
                <p>관객수: {movie.audiCnt}</p>
              </MovieInfo>
              <ButtonGroup>
                <IconButton onClick={() => handleFavoriteClick(movie)}>
                  <FaStar /> 즐겨찾기
                </IconButton>
                <ButtonLk to="/movie/:movieCd">상세정보</ButtonLk>
              </ButtonGroup>
            </MovieItem>
          ))}
        </MovieListContainer>
      </Weekly>
    </>
  );
};

export default React.memo(MovieList);
