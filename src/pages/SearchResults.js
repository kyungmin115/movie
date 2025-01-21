import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import axios from 'axios';
import styled from 'styled-components';

const Header = styled.div`
  display: flex;
  align-item: center;
  justify-content: space-between;
  padding: 0;
  margin: 0 10px;
  width: 580px;
  border-bottom: 0.2px solid #adb5bd;
`;

const SearchText = styled.h1`
  font-weight: bold;
  font-size: 36px;
  margin-left: 20px;
`;

const ListText = styled.ul`
  margin-top: 50px;
  font-decoration: none;
  list-style-type: none;
`;

const SearchList = styled.li`
  display: flex;
  flex-direction: flex-start;
  margin-bottom: 50px;
  max-width: 580px;
  max-height: auto;
  border-top: 10px solid #998;
`;

//영화 포스터 이미지가 없을 때
const MovieNoim = styled.div`
  width: 100%;
  height: 330px;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: rgba(0, 0, 0, 0.1);
  border-radius: 5px;
  color: #fofofo;
  font-size: 20px;
`;

const MovieImage = styled.img`
  width: 220px;
  height: 330px;
  object-fit: cover;
  border-radius: 5px;
`;

//검색 제목 꾸미기
const SearchTitle = styled.div`
  margin-top: 40px;
  font-size: 17px;
  color: black;
`;

const SearchInfo = styled.div`
  display: -webkit-box;
  -webkit-line-clamp: 8;
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;
  max-height: 225px;
  flex-direction: column;
  padding: 10px 20px;
  font-size: 16px;
`;

const SearchResults = () => {
  const location = useLocation();
  const query = new URLSearchParams(location.search).get('q'); // 쿼리스트링에서 검색어 가져오기
  const [results, setResults] = useState([]); // 검색 결과 상태
  const [loading, setLoading] = useState(false); // 로딩 상태
  const [error, setError] = useState(null); // 오류 상태

  // TMDb 이미지 기본 URL
  const imageBaseUrl = 'https://image.tmdb.org/t/p/w500';

  useEffect(() => {
    if (query) {
      // API 요청을 시작하기 전에 로딩 상태를 true로 설정
      setLoading(true);
      setError(null); // 오류 상태 초기화

      // TMDb 영화 API 호출 예시
      axios
        .get(`https://api.themoviedb.org/3/search/movie`, {
          params: {
            api_key: '33f65510f53b4c0b08ad922eb25b9555', // 발급받은 API 키 입력
            query: query,
            language: 'ko-KR', // 한국어로 결과 받기
          },
        })
        .then((response) => {
          setResults(response.data.results || []); // 응답 결과를 상태에 저장
        })
        .catch((err) => {
          console.error('Error fetching search results:', err);
          setError('검색 중 오류가 발생했습니다.');
        })
        .finally(() => {
          setLoading(false); // 로딩 상태 해제
        });
    }
  }, [query]);

  return (
    <div>
      <Header>
        <SearchText>검색 결과 : {query}</SearchText>
      </Header>
      {loading && <p>검색 중...</p>}
      {error && <p>{error}</p>}
      <ListText>
        {results.length > 0
          ? results.map((result) => (
              <SearchList key={result.id}>
                {result.poster_path ? (
                  <MovieImage
                    src={`${imageBaseUrl}${result.poster_path}`}
                    alt={result.title}
                  />
                ) : (
                  <MovieNoim>포스터 없음</MovieNoim>
                )}
                <SearchInfo>
                  <SearchTitle>
                    <h3>{result.title}</h3>
                  </SearchTitle>
                  <p>{result.overview}</p>
                </SearchInfo>
              </SearchList>
            ))
          : !loading && <p>검색 결과가 없습니다.</p>}
      </ListText>
    </div>
  );
};

export default SearchResults;
