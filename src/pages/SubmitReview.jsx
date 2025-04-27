// pages/SubmitReview.jsx
import { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import Header from '../components/Header';
import Footer from '../components/Footer';

const SubmitReview = () => {
  const { id } = useParams();
  const { user } = useAuth();
  const navigate = useNavigate();
  
  const [food, setFood] = useState(null);
  const [loading, setLoading] = useState(true);
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState('');
  const [submitLoading, setSubmitLoading] = useState(false);
  const [error, setError] = useState('');
  const [characterCount, setCharacterCount] = useState(0);
  const maxCharacters = 500;

  useEffect(() => {
    // Fetch food details
    const fetchFood = async () => {
      try {
        const mockFood = {
          id: parseInt(id),
          name: 'Pepperoni Pizza',
          category: 'Pizza',
          image: 'https://via.placeholder.com/300x200',
          avgRating: 4.5,
          reviewCount: 127,
        };
        
        setFood(mockFood);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching food details:', error);
        setLoading(false);
      }
    };
    
    fetchFood();
  }, [id]);

  const handleCommentChange = (e) => {
    const text = e.target.value;
    if (text.length <= maxCharacters) {
      setComment(text);
      setCharacterCount(text.length);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (rating < 1 || rating > 5) {
      setError('Please select a rating between 1 and 5.');
      return;
    }
    if (comment.trim().length < 10) {
      setError('Please enter a comment with at least 10 characters.');
      return;
    }
    setSubmitLoading(true);
    try {
      await new Promise(resolve => setTimeout(resolve, 1000));
      navigate(`/food/${id}/reviews`);
    } catch (error) {
      setError('Failed to submit review. Please try again.');
      setSubmitLoading(false);
    }
  };

  // Star rating component
  const StarRating = ({ editing = false }) => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      stars.push(
        <button
          key={i}
          type={editing ? "button" : "none"}
          onClick={editing ? () => setRating(i) : undefined}
          className={`text-2xl ${i <= rating ? 'text-[#FFDF88]' : 'text-gray-300'} focus:outline-none ${editing ? 'cursor-pointer hover:text-[#FFA55D]' : ''}`}
        >
          ★
        </button>
      );
    }
    return <div className="flex">{stars}</div>;
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#FFDF88]">
        <Header />
        <div className="container mx-auto px-4 py-8">
          <div className="text-center py-8 text-[#A76545]">Loading...</div>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#FFDF88]/10">
      <Header />
      <div className="container mx-auto px-4 py-16">
        {/* Breadcrumb */}
        <div className="flex items-center text-sm text-[#A76545] mb-6">
          <Link to="/dashboard" className="hover:text-[#FFA55D]">Dashboard</Link>
          <span className="mx-2">›</span>
          <Link to="/food-list" className="hover:text-[#FFA55D]">Food List</Link>
          <span className="mx-2">›</span>
          <Link to={`/food/${id}`} className="hover:text-[#FFA55D]">{food.name}</Link>
          <span className="mx-2">›</span>
          <span className="text-[#A76545]">Submit Review</span>
        </div>
        
        {/* Food Info */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <div className="md:flex items-center">
            <img 
              src={food.image} 
              alt={food.name} 
              className="w-24 h-24 object-cover rounded-lg"
            />
            <div className="md:ml-6 mt-4 md:mt-0">
              <h1 className="text-2xl font-bold text-[#A76545]">{food.name}</h1>
              <p className="text-[#A76545] mt-1">Share your experience with this item</p>
            </div>
          </div>
        </div>
        
        {/* Review Form */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-bold mb-6 text-[#A76545]">Write a Review</h2>
          
          {error && (
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
              {error}
            </div>
          )}
          
          <form onSubmit={handleSubmit}>
            <div className="mb-6">
              <label className="block text-[#A76545] font-medium mb-2">Rating</label>
              <div className="mb-2">
                <StarRating editing={true} />
              </div>
              <p className="text-[#FFA55D] text-sm">
                {rating === 1 && "Poor - Not recommended"}
                {rating === 2 && "Fair - Below average"}
                {rating === 3 && "Average - Meets expectations"}
                {rating === 4 && "Good - Above average"}
                {rating === 5 && "Excellent - Highly recommended"}
              </p>
            </div>
            
            <div className="mb-6">
              <label htmlFor="review-comment" className="block text-[#A76545] font-medium mb-2">
                Your Review
              </label>
              <textarea
                id="review-comment"
                className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#ACC572]"
                rows="5"
                placeholder="Tell others what you thought about this food item..."
                value={comment}
                onChange={handleCommentChange}
                required
              ></textarea>
              <div className="flex justify-end text-[#A76545] text-sm mt-1">
                {characterCount}/{maxCharacters} characters
              </div>
            </div>
            
            <div className="flex items-center justify-between">
              <Link
                to={`/food/${id}/reviews`}
                className="text-[#FFA55D] hover:text-[#A76545]"
              >
                Cancel
              </Link>
              
              <button
                type="submit"
                className={`bg-[#ACC572] hover:bg-[#A76545] text-white font-medium px-6 py-2 rounded transition-colors duration-200 ${submitLoading ? 'opacity-70 cursor-not-allowed' : ''}`}
                disabled={submitLoading}
              >
                {submitLoading ? 'Submitting...' : 'Submit Review'}
              </button>
            </div>
          </form>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default SubmitReview;