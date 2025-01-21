import React from 'react';
import { IoMdHeart } from 'react-icons/io';
import styled from 'styled-components';

const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 10px;
  position: relative;
`;

const Title = styled.h1`
  text-align: center;
  font-size: 30px;
  margin-bottom: 40px;
`;

const MovieList = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 50px;
  justify-content: space-between;
`;

const Movie = styled.div`
  border-radius: 8px;
  width: calc(25% - 30px);
  padding: 10px;
  text-align: center;
  box-sizing: border-box;
`;

const MovieImage = styled.img`
  width: 150%;
`;

const MovieTitle = styled.h2`
  font-size: 17px;
  text-align: left;
  margin: 10px 0 3px 0;
`;

const MovieDate = styled.p`
  font-size: 13px;
  text-align: left;
  margin-top: 1px;
  color: #666;
`;

const ButtonGroup = styled.div`
  display: flex;
  justify-content: center;
  gap: 5px; /* 버튼 간의 간격 */
  margin-top: 5px;
  justify-content: left;
  align-items: center;
`;

const Button = styled.button`
  background-color: #ff6f09;
  font-size: 14px;
  cursor: pointer;
  color: white;
  border: none;
  border-radius: 4px;
  padding: 5px;

  &:hover {
    background-color: #ff6f09;
  }
`;

const BlueButton = styled(Button)`
  background-color: white;
  font-size: 14px;
  cursor: pointer;
  color: #ff6f09;
  border: none;
  border-radius: 4px;
  padding: 5px;

  &:hover {
    background-color: #ff6f09;
  }
`;

const NoMoviesMessage = styled.p`
  width: 500px;
  text-align: center;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  font-size: 30px;
  color: #999;
`;

const none = [
  {
    title: '영화 제목 1',
    releaseDate: '2024.10.05',
    image: 'movie1.jpg',
  },
];

const movies = [
  {
    title: '영화 제목 1',
    releaseDate: '2024.10.05',
    image: 'movie1.jpg',
  },
  {
    title: '영화 제목 2',
    releaseDate: '2024.10.12',
    image: 'movie2.jpg',
  },
  {
    title: '영화 제목 3',
    releaseDate: '2024.10.19',
    image: 'movie3.jpg',
  },
  {
    title: '영화 제목 4',
    releaseDate: '2024.10.26',
    image: 'movie4.jpg',
  },
];

const MovieItem = () => {
  return (
    <Container>
      <Title>관심있는 영화</Title>
      {none.length > 0 ? (
        <MovieList>
          {movies.map((movie, index) => (
            <Movie key={index}>
              <MovieImage src={movie.image} alt={movie.title} />
              <MovieTitle>{movie.title}</MovieTitle>
              <MovieDate>개봉일: {movie.releaseDate}</MovieDate>
              <ButtonGroup>
                <Button>
                  <IoMdHeart />
                </Button>
                <BlueButton>예매하기</BlueButton>
              </ButtonGroup>
            </Movie>
          ))}
        </MovieList>
      ) : (
        <NoMoviesMessage>아직 관심있는 영화가 없어요.</NoMoviesMessage>
      )}
    </Container>
  );
};

export default MovieItem;
