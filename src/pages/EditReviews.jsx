// pages/EditReviews.jsx
import { useState, useEffect } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import Header from '../components/Header';
import Footer from '../components/Footer';

const colorPalette = {
  primary: '#A76545',  // deep terracotta
  secondary: '#FFA55D', // warm orange
  light: '#FFDF88',     // soft yellow
  accent: '#ACC572',    // muted green
};

const EditReviews = () => {
  const { reviewId } = useParams();
  const { user } = useAuth();
  const navigate = useNavigate();
  
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [reviewData, setReviewData] = useState({
    rating: 0,
    comment: '',
    foodName: '',
    foodId: 0
  });
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    // Fetch review data for editing
    const fetchReviewData = async () => {
      try {
        const mockReviewData = {
          id: parseInt(reviewId),
          foodId: 5,
          foodName: 'Pepperoni Pizza',
          rating: 4,
          comment: 'Really good pizza. Could use a bit more sauce but overall very tasty.',
          date: '2025-04-10'
        };
        setReviewData(mockReviewData);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching review data:', error);
        setErrorMessage('Could not load review data. Please try again later.');
        setLoading(false);
      }
    };
    fetchReviewData();
  }, [reviewId]);

  const handleRatingChange = (newRating) => {
    setReviewData({
      ...reviewData,
      rating: newRating
    });
  };

  const handleCommentChange = (e) => {
    setReviewData({
      ...reviewData,
      comment: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    try {
      if (reviewData.rating === 0) {
        setErrorMessage('Please select a rating');
        setSaving(false);
        return;
      }
      if (reviewData.comment.trim() === '') {
        setErrorMessage('Please enter a comment');
        setSaving(false);
        return;
      }
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      navigate('/my-reviews', { state: { message: 'Review updated successfully!' } });
    } catch (error) {
      console.error('Error updating review:', error);
      setErrorMessage('Failed to update review. Please try again.');
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async () => {
    if (window.confirm('Are you sure you want to delete this review? This action cannot be undone.')) {
      try {
        await new Promise(resolve => setTimeout(resolve, 1000));
        navigate('/my-reviews', { state: { message: 'Review deleted successfully!' } });
      } catch (error) {
        console.error('Error deleting review:', error);
        setErrorMessage('Failed to delete review. Please try again.');
      }
    }
  };

  const StarRatingInput = ({ currentRating, onRatingChange }) => {
    const [hoveredRating, setHoveredRating] = useState(0);
    return (
      <div className="flex">
        {[1,2,3,4,5].map((star) => (
          <span
            key={star}
            className="text-2xl cursor-pointer"
            style={{
              color: (hoveredRating || currentRating) >= star ? colorPalette.light : '#e2e8f0'
            }}
            onMouseEnter={() => setHoveredRating(star)}
            onMouseLeave={() => setHoveredRating(0)}
            onClick={() => onRatingChange(star)}
          >
            ★
          </span>
        ))}
      </div>
    );
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Header />
        <div className="container mx-auto px-4 py-8">
          <div className="text-center py-8">Loading review data...</div>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen" style={{ backgroundColor: '#f9f9f9' }}>
      <Header />
      <div className="container mx-auto px-4 py-16">
        <div className="flex items-center text-sm mb-6" style={{ color: '#555' }}>
          <Link to="/dashboard" className="hover:text-opacity-75" style={{ color: colorPalette.primary }}>Dashboard</Link>
          <span className="mx-2">›</span>
          <Link to="/my-reviews" className="hover:text-opacity-75" style={{ color: colorPalette.primary }}>My Reviews</Link>
          <span className="mx-2">›</span>
          <span style={{ color: '#333' }}>Edit Review</span>
        </div>
        <div className="bg-white rounded-lg shadow-md overflow-hidden mb-8">
          <div className="px-6 py-4" style={{ backgroundColor: colorPalette.primary }}>
            <h1 className="text-2xl font-bold" style={{ color: '#fff' }}>Edit Your Review</h1>
          </div>
          {errorMessage && (
            <div className="border-l-4 text-red-700 p-4 mb-4 mx-6 mt-6" style={{ backgroundColor: '#ffe5e5', borderColor: '#FFA5A5' }}>
              <p>{errorMessage}</p>
            </div>
          )}
          <form onSubmit={handleSubmit} className="p-6">
            <div className="mb-6">
              <div className="flex items-center mb-2">
                <h2 className="text-xl font-semibold mr-2" style={{ color: colorPalette.primary }}>{reviewData.foodName}</h2>
                <Link
                  to={`/food/${reviewData.foodId}`}
                  className="text-sm hover:underline"
                  style={{ color: colorPalette.secondary }}
                >
                  View Food Details
                </Link>
              </div>
              <p style={{ color: '#777' }}>
                Last updated on {reviewData.date}
              </p>
            </div>
            <div className="mb-6">
              <label className="block font-medium mb-2" style={{ color: '#444' }}>
                Your Rating
              </label>
              <StarRatingInput
                currentRating={reviewData.rating}
                onRatingChange={handleRatingChange}
              />
            </div>
            <div className="mb-6">
              <label className="block font-medium mb-2" htmlFor="comment" style={{ color: '#444' }}>
                Your Review
              </label>
              <textarea
                id="comment"
                value={reviewData.comment}
                onChange={handleCommentChange}
                className="w-full px-4 py-2 border rounded-lg focus:outline-none h-32"
                style={{ borderColor: colorPalette.accent }}
                placeholder="Share your experience with this food item..."
                required
              ></textarea>
            </div>
            <div className="flex">
              <button
                type="button"
                onClick={handleDelete}
                className="px-6 py-2 rounded-lg hover:opacity-90 mr-2"
                style={{ backgroundColor: '#E57373', color: '#fff' }}
              >
                Delete Review
              </button>
              <div className="flex space-x-4">
                <Link
                  to="/my-reviews"
                  className="px-6 py-2 rounded-lg hover:bg-opacity-10 ml-2"
                  style={{ border: `1px solid ${colorPalette.primary}`, color: colorPalette.primary }}
                >
                  Cancel
                </Link>
                <button
                  type="submit"
                  disabled={saving}
                  className="px-6 py-2 rounded-lg hover:opacity-90 disabled:opacity-50"
                  style={{ backgroundColor: colorPalette.secondary, color: '#fff' }}
                >
                  {saving ? 'Saving...' : 'Save Changes'}
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default EditReviews;