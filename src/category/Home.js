import axios from 'axios';
import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { useFavorites } from '../pages/FavoritesContext';
import { FaStar } from 'react-icons/fa';

const VideoElement = styled.video`
  width: 100%;
  height: auto;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: cover;
`;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const MovieItem = styled.li`
  display: inline-flex;
  flex-direction: column;
  align-items: center;
  margin: 20px;
  min-width: 200px;
`;

const MovieImage = styled.img`
  width: 150px;
  height: 220px;
  border-radius: 10px;
`;

const MovieInfo = styled.div`
  text-align: center;
  font-size: 16px;
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

const MovieTitle = styled.div`
  font-size: 14px;
  color: #333;
  text-align: center;
  white-space: nowrap; /* 텍스트 줄바꿈 방지 */
  overflow: hidden; /* 넘치는 텍스트 숨김 */
  text-overflow: ellipsis; /* 넘치는 텍스트 "..."으로 표시 */
  width: 150px; /* 고정된 너비 설정 */

  hr {
    border: 1px solid;
  }
`;

//즐겨찾기, 예매하기 버튼 그룹
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

//예매하기 버튼
const Button = styled.button`
  background-color: white;
  color: #bf3131;
  border: solid 1px;
  border-color: #bf3131;
  padding: 8px 20px;
  border-radius: 5px;
  cursor: pointer;
  font-size: 14px;
  margin-top: 5px;

  &:hover {
    color: white;
    background-color: #bf3131;
  }
`;

const DetailLink = styled(Link)`
  text-decoration: none;
  color: black;
`;

const ListButton = styled.button`
  border-radius: 10px;
  margin-left: 700px;
  border: 0px;
  background-color: white;
`;

const TopContent = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin: 0;
  padding: 0;
  padding-bottom: 20px;
  border-bottom: 1px solid #ebebeb;
`;

const ListLink = styled(Link)`
  text-decoration: none;
  font-size: 16px;
  color: black;

  &:hover {
    color: #e71a0f;
  }
`;

const Home = () => {
  const videoRef = useRef(null);

  // 페이지 로드 시 비디오 자동 재생
  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.play();
    }
  }, []);

  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [date, setDate] = useState('20241013'); // 기본 날짜 설정 (YYYYMMDD)
  const { addFavorite, isFavorite } = useFavorites(); // favorites는 필요 없으므로 제거

  const APIKey = '303756f624abaa433a616a1f01bf62c2'; // 영화진흥위원회 API 키
  const API_KEY_TMDB = 'c46c5e36b91e0c3b8e75ebe785d68935'; // TMDB API 키 입력

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        // KOBIS API를 통해 영화 리스트 가져오기
        const response = await axios.get(
          `http://www.kobis.or.kr/kobisopenapi/webservice/rest/boxoffice/searchDailyBoxOfficeList.json?key=${APIKey}&targetDt=${date}`
        );
        const movieList = response.data.boxOfficeResult.dailyBoxOfficeList;

        // TMDB API를 통해 각 영화의 포스터 가져오기
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
              poster_path: posterPath, // 포스터 경로 추가
            };
          })
        );

        // 영화 목록과 포스터 정보를 상태에 저장
        setMovies(moviesWithPosters);
        setLoading(false);
        console.log(moviesWithPosters);
      } catch (error) {
        console.error('API 요청 중 오류 발생:', error);
        setLoading(false);
      }
    };

    fetchMovies();
  }, [APIKey, API_KEY_TMDB, date]);

  const handleDateChange = (event) => {
    // 입력된 날짜를 YYYYMMDD 형식으로 변경
    setDate(event.target.value.replace(/-/g, ''));
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  const handleFavoriteClick = (movie) => {
    if (isFavorite(movie)) {
      // 이미 즐겨찾기에 있는 경우
      window.alert(`${movie.movieNm}은(는) 이미 즐겨찾기로 등록되어 있습니다.`);
    } else {
      // 즐겨찾기에 없는 경우 추가
      addFavorite(movie);
      window.alert(`${movie.movieNm}이(가) 즐겨찾기에 추가되었습니다.`);
    }
  };

  return (
    <div>
      <VideoElement id="movieVideo" ref={videoRef} autoPlay loop muted>
        <source
          src="https://adimg.cgv.co.kr/images/202410/6hours/6hour_1080x608.mp4"
          type="video/mp4"
        />
      </VideoElement>
      <Container>
        <TopContent>
          <div>
            <h1>무비 차트</h1>
            <input
              type="date"
              value={`${date.slice(0, 4)}-${date.slice(4, 6)}-${date.slice(
                6,
                8
              )}`}
              onChange={handleDateChange}
            />
          </div>
          <ListButton>
            <ListLink to="/movie">▶전체보기</ListLink>
          </ListButton>
        </TopContent>
        {loading ? (
          <p>로딩 중...</p>
        ) : movies.length === 0 ? (
          <p>영화 데이터가 없습니다.</p>
        ) : (
          <MovieListContainer>
            {movies.map((movie) => (
              <MovieItem key={movie.movieCd}>
                <DetailLink to={`/movie/${movie.movieCd}`} key={movie.movieCd}>
                  {movie.poster_path ? (
                    <MovieImage
                      src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} // TMDB에서 가져온 포스터 이미지 URL
                      alt={movie.movieNm}
                    />
                  ) : (
                    <MovieNoim>포스터 없음</MovieNoim>
                  )}
                  <MovieTitle>
                    <h3>
                      {movie.rank}. {movie.movieNm}
                    </h3>
                    <hr />
                  </MovieTitle>
                  <MovieInfo>
                    <p>개봉일: {movie.openDt}</p>
                    <p>관객수: {movie.audiCnt}</p>
                  </MovieInfo>
                </DetailLink>
                <ButtonGroup>
                  <IconButton
                    isFav={isFavorite(movie)}
                    onClick={() => handleFavoriteClick(movie)}
                  >
                    <FaStar /> 즐겨찾기
                  </IconButton>
                  <Link to={`/movie/${movie.movieCd}`} key={movie.movieCd}>
                    <Button>상세보기</Button>
                  </Link>
                </ButtonGroup>
              </MovieItem>
            ))}
          </MovieListContainer>
        )}
      </Container>
    </div>
  );
};

export default Home;
