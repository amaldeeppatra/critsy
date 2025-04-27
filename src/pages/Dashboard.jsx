// pages/Dashboard.jsx
import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import Header from '../components/Header';
import Footer from '../components/Footer';

const Dashboard = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  
  const [recentReviews, setRecentReviews] = useState([]);
  const [popularFoods, setPopularFoods] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fetch user's recent reviews and popular foods
    // In a real app, these would be API calls
    const fetchDashboardData = async () => {
      try {
        // Mock data
        const mockRecentReviews = [
          {
            id: 1,
            foodName: 'Cheese Burger',
            rating: 4,
            comment: 'Really juicy and flavorful burger!',
            date: '2025-04-20',
          },
          {
            id: 2,
            foodName: 'Vegetable Pasta',
            rating: 5,
            comment: 'Perfect al dente pasta with fresh veggies.',
            date: '2025-04-18',
          },
        ];
        
        const mockPopularFoods = [
          {
            id: 1,
            name: 'New York Pizza',
            image: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?auto=format&fit=crop&w=800&q=80',
            reviewCount: 248,
            avgRating: 4.7,
          },
          {
            id: 2,
            name: 'Chocolate Cake',
            image: 'https://images.unsplash.com/photo-1603028341948-1ec2f03ed6c3?auto=format&fit=crop&w=800&q=80',
            reviewCount: 187,
            avgRating: 4.5,
          },
          {
            id: 3,
            name: 'Spicy Ramen',
            image: 'https://images.unsplash.com/photo-1604908177522-3e6e1e0e3c3c?auto=format&fit=crop&w=800&q=80',
            reviewCount: 156,
            avgRating: 4.8,
          },
          {
            id: 4,
            name: 'Caesar Salad',
            image: 'https://images.unsplash.com/photo-1589307000255-28772b259f1e?auto=format&fit=crop&w=800&q=80',
            reviewCount: 124,
            avgRating: 4.2,
          },
        ];
        
        setRecentReviews(mockRecentReviews);
        setPopularFoods(mockPopularFoods);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching dashboard data:', error);
        setLoading(false);
      }
    };
    
    fetchDashboardData();
  }, []);

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  // Star rating component
  const StarRating = ({ rating }) => {
    const stars = [];
    
    for (let i = 1; i <= 5; i++) {
      stars.push(
        <span key={i} className={`text-xl ${i <= rating ? 'text-[#FFDF88]' : 'text-gray-300'}`}>
          ★
        </span>
      );
    }
    
    return <div className="flex">{stars}</div>;
  };

  return (
    <div className="min-h-screen bg-[#FFDF88]/10">
      <Header />
      
      <div className="container mx-auto px-4 py-16">
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-2xl font-bold text-[#A76545]">Welcome to Your Dashboard</h1>
            {/* <button
              onClick={handleLogout}
              className="bg-[#A76545] hover:bg-[#A76545]/80 text-white font-medium py-2 px-4 rounded"
            >
              Logout
            </button> */}
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-[#FFA55D]/20 p-6 rounded-lg text-center">
              <h3 className="text-lg font-semibold mb-2 text-[#A76545]">Browse Foods</h3>
              <p className="text-gray-600 mb-4">Discover new foods and read what others think about them.</p>
              <Link
                to="/food-list"
                className="bg-[#FFA55D] hover:bg-[#FFA55D]/80 text-white font-medium py-2 px-4 rounded block"
              >
                Browse Food List
              </Link>
            </div>
            
            <div className="bg-[#FFDF88]/20 p-6 rounded-lg text-center">
              <h3 className="text-lg font-semibold mb-2 text-[#A76545]">My Reviews</h3>
              <p className="text-gray-600 mb-4">Manage the reviews you've submitted.</p>
              <Link
                to="/my-reviews"
                className="bg-[#FFDF88] hover:bg-[#FFDF88]/80 text-[#A76545] font-medium py-2 px-4 rounded block"
              >
                View My Reviews
              </Link>
            </div>
            
            <div className="bg-[#ACC572]/20 p-6 rounded-lg text-center">
              <h3 className="text-lg font-semibold mb-2 text-[#A76545]">My Profile</h3>
              <p className="text-gray-600 mb-4">Update your profile information and preferences.</p>
              <Link
                to="/profile"
                className="bg-[#ACC572] hover:bg-[#ACC572]/80 text-white font-medium py-2 px-4 rounded block"
              >
                Edit Profile
              </Link>
            </div>
          </div>
        </div>
        
        {loading ? (
          <div className="text-center py-8">Loading your dashboard data...</div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Recent Reviews */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-xl font-bold mb-4 text-[#A76545]">Your Recent Reviews</h2>
              
              {recentReviews.length === 0 ? (
                <p className="text-gray-600">You haven't submitted any reviews yet.</p>
              ) : (
                <div className="space-y-4">
                  {recentReviews.map((review) => (
                    <div key={review.id} className="border-b border-[#FFDF88]/30 pb-4">
                      <div className="flex justify-between items-start">
                        <h3 className="font-semibold text-[#A76545]">{review.foodName}</h3>
                        <span className="text-gray-500 text-sm">{review.date}</span>
                      </div>
                      <StarRating rating={review.rating} />
                      <p className="text-gray-700 mt-2">{review.comment}</p>
                    </div>
                  ))}
                  
                  <Link
                    to="/my-reviews"
                    className="text-[#FFA55D] hover:text-[#A76545] font-medium inline-block mt-2"
                  >
                    View all your reviews →
                  </Link>
                </div>
              )}
            </div>
            
            {/* Popular Foods */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-xl font-bold mb-4 text-[#A76545]">Popular Food Items</h2>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {popularFoods.map((food) => (
                  <div key={food.id} className="flex space-x-3">
                    <img
                      src={food.image}
                      alt={food.name}
                      className="w-16 h-16 rounded-lg object-cover"
                    />
                    <div>
                      <h3 className="font-semibold text-[#A76545]">{food.name}</h3>
                      <div className="flex items-center text-sm">
                        <span className="text-[#FFDF88] mr-1">★</span>
                        <span>{food.avgRating.toFixed(1)}</span>
                        <span className="text-gray-500 ml-1">
                          ({food.reviewCount} reviews)
                        </span>
                      </div>
                      <Link
                        to={`/food/${food.id}`}
                        className="text-[#FFA55D] hover:text-[#A76545] text-sm"
                      >
                        View details
                      </Link>
                    </div>
                  </div>
                ))}
              </div>
              
              <Link
                to="/food-list"
                className="text-[#FFA55D] hover:text-[#A76545] font-medium inline-block mt-4"
              >
                Explore all food items →
              </Link>
            </div>
          </div>
        )}
      </div>
      
      <Footer />
    </div>
  );
};

export default Dashboard;