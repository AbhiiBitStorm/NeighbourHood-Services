import React from 'react';
import './ReviewsList.css';

function ReviewsList({ reviews }) {
  const renderStars = (rating) => {
    return '⭐'.repeat(rating) + '☆'.repeat(5 - rating);
  };

  const formatDate = (date) => {
    return new Date(date).toLocaleDateString('en-IN', {
      day: 'numeric',
      month: 'short',
      year: 'numeric'
    });
  };

  if (reviews.length === 0) {
    return (
      <div className="reviews-section">
        <h2>Customer Reviews</h2>
        <div className="no-reviews">
          <p>No reviews yet. Be the first to review! 🌟</p>
        </div>
      </div>
    );
  }

  return (
    <div className="reviews-section">
      <h2>Customer Reviews ({reviews.length})</h2>
      <div className="reviews-list">
        {reviews.map((review) => (
          <div key={review._id} className="review-card">
            <div className="review-header">
              <div>
                <h4>{review.customerId.name}</h4>
                <span className="review-date">{formatDate(review.createdAt)}</span>
              </div>
              <div className="review-rating">
                {renderStars(review.rating)}
              </div>
            </div>
            {review.comment && (
              <p className="review-comment">{review.comment}</p>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

export default ReviewsList;