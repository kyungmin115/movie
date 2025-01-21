import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import styled from 'styled-components';
import ReviewList from '../review/ReviewList';

const DetailHeader = styled.div`
  display: flex;
`;

const HeadContent = styled.div`
  display: flex;
  flex-direction: column;
`;

const MovieImage = styled.img`
  width: 200px;
  height: 285px;
  object-fit: cover;
  margin-left: 30px;
`;

//영화 포스터 이미지가 없을 때
const MovieNoim = styled.div`
  display: flex; /* flexbox 사용 */
  flex-direction: column;
  margin-left: 30px;

  div {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 200px;
    height: 285px;
    object-fit: cover;
    background-color: rgba(0, 0, 0, 0.1);
    color: black;
    font-size: 20px;
  }
`;

const Header = styled.div`
  display: flex;
  align-item: center;
  justify-content: space-between;
  padding: 0;
  margin: 0 10px;
`;

const TextContent = styled.h2`
  font-weight: bold;
  font-size: 36px;
  margin-left: 20px;
`;

//이미지 하단의 컨테이너
const MovieContainer = styled.div`
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
  justify-content: center;
  margin-top: 70px;
  padding: 20px;
  margin-left: 25px;
`;

//영화 제목 꾸미기
const MovieTitle = styled.div`
  font-size: 14px;
  color: #333;
`;

//개봉일, 관객수 꾸미기
const MovieInfo = styled.div`
  font-size: 16px;
  line-height: 20px;
  color: #333;
`;

const MovieDetail = () => {
  const { movieCd } = useParams();
  const [movieDetail, setMovieDetail] = useState({});
  const [loading, setLoading] = useState(true);
  const [posterPath, setPosterPath] = useState(null); // 포스터 경로 상태 추가
  const [movieOverview, setMvoieOverview] = useState('');

  useEffect(() => {
    const fetchMovieDetail = async () => {
      try {
        const apiKeyKOBIS = '303756f624abaa433a616a1f01bf62c2';
        const response = await axios.get(
          `http://www.kobis.or.kr/kobisopenapi/webservice/rest/movie/searchMovieInfo.json?key=${apiKeyKOBIS}&movieCd=${movieCd}`
        );
        console.log(response.data); // API 응답 데이터 확인
        const movieInfo = response.data.movieInfoResult.movieInfo;
        setMovieDetail(movieInfo);

        // TMDB API를 통해 포스터 정보 가져오기
        const apiKeyTMDB = 'c46c5e36b91e0c3b8e75ebe785d68935'; // TMDB API 키
        const tmdbResponse = await axios.get(
          `https://api.themoviedb.org/3/search/movie?api_key=${apiKeyTMDB}&query=${encodeURIComponent(
            movieInfo.movieNm
          )}&language=ko`
        );

        if (tmdbResponse.data.results.length > 0) {
          const tmdbMovie = tmdbResponse.data.results[0];

          setMvoieOverview(tmdbMovie.overview);
          setPosterPath(tmdbResponse.data.results[0].poster_path);
        }

        setLoading(false);
      } catch (error) {
        console.error('API 호출 중 에러 발생 : ', error);
        setLoading(false);
      }
    };

    fetchMovieDetail();
  }, [movieCd]);

  if (loading) {
    return <div>로딩 중입니다 ...</div>;
  }

  if (!movieDetail || Object.keys(movieDetail).length === 0) {
    return <div>영화 정보를 찾을 수 없습니다.</div>;
  }

  return (
    <>
      <DetailHeader>
        {posterPath ? (
          <HeadContent>
            <Header>
              <TextContent>상세정보</TextContent>
            </Header>
            <MovieImage
              src={`https://image.tmdb.org/t/p/w500${posterPath}`} // TMDB에서 가져온 포스터 이미지 URL
              alt={movieDetail.movieNm}
            />
          </HeadContent>
        ) : (
          <MovieNoim>
            <TextContent>상세정보</TextContent>
            <div>포스터 없음</div>
          </MovieNoim>
        )}
        <MovieContainer>
          <MovieTitle>
            <h1>{movieDetail.movieNm}</h1>
          </MovieTitle>
          <MovieInfo>
            <p>
              감독 :{' '}
              {movieDetail.directors &&
                movieDetail.directors
                  .map((director) => director.peopleNm)
                  .join(', ')}
            </p>
            <p>
              출연 배우 :{' '}
              {movieDetail.actors &&
                movieDetail.actors.map((actor) => actor.peopleNm).join(', ')}
            </p>
            <p>
              장르 :{' '}
              {movieDetail.genres &&
                movieDetail.genres.map((genre) => genre.genreNm).join(', ')}
            </p>
            <p>개봉일 : {movieDetail.openDt}</p>
          </MovieInfo>
          <p>
            <strong style={{ fontSize: '20px' }}>영화 소개</strong>
            <br />
            <span
              style={{ marginTop: '15px', display: 'block', lineHeight: '1.8' }}
            >
              {' '}
              {/* 여백을 주기 위해 span 사용 */}
              {movieOverview || '영화 설명 없음'}
            </span>
          </p>
        </MovieContainer>
      </DetailHeader>
      <div>
        <h1>REVIEW</h1>
        <ReviewList />
      </div>
    </>
  );
};

export default MovieDetail;
