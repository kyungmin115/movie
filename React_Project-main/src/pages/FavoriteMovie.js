import React from 'react';
import styled from 'styled-components';
import { useFavorites } from './FavoritesContext';
import { FaStar } from 'react-icons/fa';
import { Link } from 'react-router-dom';

const Header = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0;
  margin: 0;
  width: 100%;
  border-bottom: 1px solid black;
`;

const TextContent = styled.h2`
  font-weight: bold;
  font-size: 26px;
`;

// 영화 목록 스타일
const MovieContainer = styled.div`
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

// 영화 아이템 스타일
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

//즐겨찾기, 예매하기 버튼
const ButtonGroup = styled.div`
  display: flex;
  justify-content: space-between;
  gap: 5px;
  align-items: center;
`;

//즐겨찾기 버튼
const IconButton = styled.button`
  background-color: white;
  color: #bf3131;
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

// 즐겨찾기 빈 상태 문구 스타일
const EmptyMessage = styled.div`
  font-size: 25px;
  color: #666;
  text-align: center;
  margin-top: 200px;
  margin-bottom: 300px;
`;

const FavoriteMovies = () => {
  const { favorites, removeFavorite } = useFavorites(); // removeFavorite 가져오기

  const handleRemoveClick = (movie) => {
    removeFavorite(movie); // 즐겨찾기에서 영화 삭제
  };

  return (
    <>
      <Header>
        <TextContent>즐겨찾기 영화</TextContent>
      </Header>
      <div>
        {favorites.length === 0 ? (
          <EmptyMessage>즐겨찾기한 영화가 없어요.</EmptyMessage>
        ) : (
          <div>
            <MovieContainer>
              {favorites.map((movie) => (
                <MovieItem key={movie.id}>
                  <MovieTitle>
                    {movie.poster_path ? (
                      <MovieImage
                        src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} // TMDB에서 가져온 포스터 이미지 URL
                        alt={movie.movieNm}
                      />
                    ) : (
                      <MovieNoim>포스터 없음</MovieNoim>
                    )}
                    <h3>{movie.movieNm}</h3>
                  </MovieTitle>
                  <MovieInfo>
                    <p>개봉일: {movie.openDt}</p>
                    <p>관객수: {movie.audiCnt}</p>
                  </MovieInfo>
                  <ButtonGroup>
                    <IconButton onClick={() => handleRemoveClick(movie)}>
                      <FaStar /> 즐겨찾기
                    </IconButton>
                    <ButtonLk
                      to={`/movie/${movie.movieCd}`}
                      key={movie.movieCd}
                    >
                      상세보기
                    </ButtonLk>
                  </ButtonGroup>
                </MovieItem>
              ))}
            </MovieContainer>
          </div>
        )}
      </div>
    </>
  );
};

export default FavoriteMovies;
