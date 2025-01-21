import React, { useState } from 'react';
import ReviewForm from './ReviewForm';
import StarRating from './StarRating';

const ReviewLIst = () => {
  const [reviews, setReviews] = useState([]);
  const [currentReview, setCurrentReview] = useState(null);

  const addReview = (newReview) => {
    if (currentReview) {
      setReviews(
        reviews.map((r) => (r.id === currentReview.id ? newReview : r))
      );
    } else {
      setReviews([...reviews, { id: Date.now(), ...newReview }]);
    }
    setCurrentReview(null);
    console.log(reviews);
  };

  const editReview = (review) => {
    setCurrentReview(review);
  };

  const deleteReview = (id) => {
    setReviews(reviews.filter((review) => review.id !== id));
    window.confirm('정말 삭제하시겠습니까?');
  };

  return (
    <div>
      <ReviewForm currentReview={currentReview} onSubmit={addReview} />
      <h2>Reviews</h2>
      <ul>
        {reviews.map((review) => (
          <li key={review.id}>
            <p>{review.text}</p>
            <StarRating rating={review.rating} onRatingChange={() => {}} />
            <button onClick={() => editReview(review)}>Edit</button>
            <button onClick={() => deleteReview(review.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ReviewLIst;
