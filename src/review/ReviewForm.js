import React, { useEffect, useState } from 'react';
import StarRating from './StarRating';

const ReviewForm = ({ currentReview, onSubmit }) => {
  const [reviewText, setReviewText] = useState('');
  const [rating, setRating] = useState(0);

  useEffect(() => {
    if (currentReview) {
      setReviewText(currentReview.text);
      setRating(currentReview.rating);
    }
  }, [currentReview]);

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({ text: reviewText, rating });
    setReviewText('');
    setRating(0);
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>{currentReview ? 'Edit Review' : 'Add Review'}</h2>
      <textarea
        value={reviewText}
        onChange={(e) => setReviewText(e.target.value)}
        placeholder="리뷰를 작성해주세요"
        required
      />
      <StarRating rating={rating} onRatingChange={setRating} />
      <button type="submit">작성</button>
    </form>
  );
};

export default ReviewForm;
