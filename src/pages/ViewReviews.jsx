// pages/ViewReviews.jsx
import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';

const ViewReviews = () => {
  const { id } = useParams();
  
  const [food, setFood] = useState(null);
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('all');
  const [sort, setSort] = useState('newest');

  useEffect(() => {
    // Fetch food and reviews
    const fetchFoodReviews = async () => {
      try {
        const mockFood = {
          id: parseInt(id),
          name: 'Pepperoni Pizza',
          category: 'Pizza',
          image: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?auto=format&fit=crop&w=800&q=80',
          avgRating: 4.5,
          reviewCount: 127,
        };
        
        const mockReviews = [
          {
            id: 1,
            userName: 'John Doe',
            rating: 5,
            comment: 'Best pepperoni pizza I have ever had! The crust was perfect and the pepperoni was just the right amount of spicy. I would definitely order this again and recommend to friends.',
            date: '2025-04-15',
          },
          {
            id: 2,
            userName: 'Sarah Smith',
            rating: 4,
            comment: 'Really good pizza. Could use a bit more sauce but overall very tasty.',
            date: '2025-04-10',
          },
          {
            id: 3,
            userName: 'Mike Johnson',
            rating: 5,
            comment: 'Fantastic flavor and the crust was nice and crispy. Will order again!',
            date: '2025-04-05',
          },
          {
            id: 4,
            userName: 'Emily Wilson',
            rating: 3,
            comment: 'It was okay. A bit too greasy for my liking but the flavor was good.',
            date: '2025-03-28',
          },
          {
            id: 5,
            userName: 'David Brown',
            rating: 5,
            comment: 'Absolutely delicious! Perfect amount of cheese and the pepperoni was crispy.',
            date: '2025-03-20',
          },
          {
            id: 6,
            userName: 'Jessica Lee',
            rating: 2,
            comment: 'Disappointed with this pizza. The crust was too thick and the toppings were sparse.',
            date: '2025-03-15',
          },
          {
            id: 7,
            userName: 'Robert Garcia',
            rating: 4,
            comment: 'Good pizza, fresh ingredients, and delivered hot. Just what I wanted!',
            date: '2025-03-10',
          },
        ];
        
        setFood(mockFood);
        setReviews(mockReviews);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching reviews:', error);
        setLoading(false);
      }
    };
    
    fetchFoodReviews();
  }, [id]);

  // Filter reviews based on rating
  const filteredReviews = reviews.filter(review => {
    if (filter === 'all') return true;
    if (filter === '5') return review.rating === 5;
    if (filter === '4') return review.rating === 4;
    if (filter === '3') return review.rating === 3;
    if (filter === '2') return review.rating === 2;
    if (filter === '1') return review.rating === 1;
    return true;
  });

  // Sort reviews
  const sortedReviews = [...filteredReviews].sort((a, b) => {
    if (sort === 'newest') {
      return new Date(b.date) - new Date(a.date);
    } else if (sort === 'oldest') {
      return new Date(a.date) - new Date(b.date);
    } else if (sort === 'highest') {
      return b.rating - a.rating;
    } else if (sort === 'lowest') {
      return a.rating - b.rating;
    }
    return 0;
  });

  // Star rating component
  const StarRating = ({ rating }) => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      stars.push(
        <span 
          key={i} 
          className={`text-xl ${i <= rating ? 'text-[#FFDF88]' : 'text-gray-300'}`}>
          ★
        </span>
      );
    }
    return <div className="flex">{stars}</div>;
  };

  // Calculate rating statistics
  const calculateRatingStats = () => {
    if (reviews.length === 0) return { avg: 0, counts: [0, 0, 0, 0, 0] };
    const counts = [0, 0, 0, 0, 0]; // [1-star, 2-star, 3-star, 4-star, 5-star]
    let sum = 0;
    reviews.forEach(review => {
      counts[review.rating - 1]++;
      sum += review.rating;
    });
    return {
      avg: sum / reviews.length,
      counts,
    };
  };

  const ratingStats = calculateRatingStats();

  if (loading) {
    return (
      <div className="min-h-screen bg-[#FFDF88]">
        <Header />
        <div className="container mx-auto px-4 py-8">
          <div className="text-center py-8">Loading reviews...</div>
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
          <span className="text-[#A76545]">Reviews</span>
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
              <div className="flex items-center mt-2">
                <StarRating rating={ratingStats.avg} />
                <span className="ml-2 text-[#A76545]">
                  {ratingStats.avg.toFixed(1)} out of 5 ({reviews.length} reviews)
                </span>
              </div>
              <Link
                to={`/food/${id}/submit-review`}
                className="inline-block bg-[#ACC572] hover:bg-[#A76545] text-white font-medium px-4 py-2 rounded mt-3"
              >
                Write a Review
              </Link>
            </div>
          </div>
        </div>
        
        {/* Rating Summary */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <h2 className="text-xl font-bold mb-4 text-[#A76545]">Rating Summary</h2>
          
          <div className="md:flex">
            <div className="md:w-1/4 text-center mb-6 md:mb-0">
              <div className="text-5xl font-bold text-[#A76545]">{ratingStats.avg.toFixed(1)}</div>
              <StarRating rating={ratingStats.avg} />
              <div className="text-[#A76545] mt-1">{reviews.length} reviews</div>
            </div>
            
            <div className="md:w-3/4">
              {[5, 4, 3, 2, 1].map(star => {
                const count = ratingStats.counts[star - 1];
                const percentage = reviews.length > 0 ? (count / reviews.length) * 100 : 0;
                return (
                  <div key={star} className="flex items-center mb-2">
                    <div className="w-12 text-right mr-2 text-[#A76545]">{star} stars</div>
                    <div className="flex-1 h-4 bg-gray-200 rounded-full overflow-hidden">
                      <div 
                        className="h-full bg-[#FFA55D]" 
                        style={{ width: `${percentage}%` }}
                      ></div>
                    </div>
                    <div className="w-12 text-left ml-2 text-[#A76545]">{count}</div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
        
        {/* Reviews */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-bold text-[#A76545]">All Reviews</h2>
            
            <div className="flex items-center space-x-4">
              <div>
                <label htmlFor="filter" className="text-sm text-[#A76545] mr-2">Filter:</label>
                <select
                  id="filter"
                  value={filter}
                  onChange={(e) => setFilter(e.target.value)}
                  className="border rounded px-2 py-1 text-sm focus:ring-[#ACC572] focus:border-[#ACC572]"
                >
                  <option value="all">All Stars</option>
                  <option value="5">5 Stars</option>
                  <option value="4">4 Stars</option>
                  <option value="3">3 Stars</option>
                  <option value="2">2 Stars</option>
                  <option value="1">1 Star</option>
                </select>
              </div>
              
              <div>
                <label htmlFor="sort" className="text-sm text-[#A76545] mr-2">Sort by:</label>
                <select
                  id="sort"
                  value={sort}
                  onChange={(e) => setSort(e.target.value)}
                  className="border rounded px-2 py-1 text-sm focus:ring-[#ACC572] focus:border-[#ACC572]"
                >
                  <option value="newest">Newest First</option>
                  <option value="oldest">Oldest First</option>
                  <option value="highest">Highest Rating</option>
                  <option value="lowest">Lowest Rating</option>
                </select>
              </div>
            </div>
          </div>
          
          {sortedReviews.length === 0 ? (
            <p className="text-center text-[#A76545] py-8">No reviews match your filter criteria.</p>
          ) : (
            <div className="space-y-6">
              {sortedReviews.map(review => (
                <div key={review.id} className="border-b pb-6 last:border-b-0">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="font-semibold text-[#A76545]">{review.userName}</h3>
                      <StarRating rating={review.rating} />
                    </div>
                    <span className="text-[#FFA55D] text-sm">{review.date}</span>
                  </div>
                  <p className="text-gray-700 mt-3">{review.comment}</p>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default ViewReviews;