import React, { useState } from 'react';
import { FaRegStar } from 'react-icons/fa';
import styled from 'styled-components';

const Star = styled.div`
    diplay : flex;
    direction : row;
    align-items: : center;
`;

const StarRating = ({ rating, onRatingChange }) => {
  const [hover, setHover] = useState(null);
  return (
    <Star>
      {[...Array(5)].map((star, index) => {
        const ratingValue = index + 1;

        return (
          <label key={index}>
            <input
              type="radio"
              name="rating"
              value={ratingValue}
              onClick={() => onRatingChange(ratingValue)}
              style={{ display: 'none' }} // 라디오 버튼 숨기기
            />
            <FaRegStar
              size={30} // 별 크기
              color={ratingValue <= (hover || rating) ? '#ffc107' : '#e4e5e9'} // 별 색상 설정
              onMouseEnter={() => setHover(ratingValue)}
              onMouseLeave={() => setHover(null)}
              onClick={() => onRatingChange(ratingValue)}
              style={{ cursor: 'pointer', marginRight: '5px' }} // 커서 및 별 사이 간격 설정
            />
          </label>
        );
      })}
    </Star>
  );
};

export default StarRating;
