// pages/FoodItem.jsx
import { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';

const FoodItem = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  
  const [food, setFood] = useState(null);
  const [loading, setLoading] = useState(true);
  const [relatedFoods, setRelatedFoods] = useState([]);

  useEffect(() => {
    // Fetch food details and related foods
    // In a real app, this would be an API call
    const fetchFoodDetails = async () => {
      try {
        // Mock data
        const mockFood = {
          id: parseInt(id),
          name: 'Pepperoni Pizza',
          category: 'Pizza',
          image: 'https://via.placeholder.com/600x400',
          avgRating: 4.5,
          reviewCount: 127,
          description: 'Classic pepperoni pizza with mozzarella cheese on a thin crust. Made with our special tomato sauce and premium pepperoni.',
          ingredients: ['Dough', 'Tomato Sauce', 'Mozzarella Cheese', 'Pepperoni', 'Oregano'],
          reviews: [
            {
              id: 1,
              userName: 'John Doe',
              rating: 5,
              comment: 'Best pepperoni pizza I have ever had! The crust was perfect and the pepperoni was just the right amount of spicy.',
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
          ],
        };
        
        const mockRelatedFoods = [
          {
            id: 7,
            name: 'Margherita Pizza',
            image: 'https://via.placeholder.com/150',
            avgRating: 4.7,
            reviewCount: 95,
          },
          {
            id: 8,
            name: 'Hawaiian Pizza',
            image: 'https://via.placeholder.com/150',
            avgRating: 4.2,
            reviewCount: 78,
          },
          {
            id: 9,
            name: 'Vegetable Pizza',
            image: 'https://via.placeholder.com/150',
            avgRating: 4.4,
            reviewCount: 63,
          },
        ];
        
        setFood(mockFood);
        setRelatedFoods(mockRelatedFoods);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching food details:', error);
        setLoading(false);
      }
    };
    
    fetchFoodDetails();
  }, [id]);

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

  if (loading) {
    return (
      <div className="min-h-screen bg-[#FFDF88]/10">
        <Header />
        <div className="container mx-auto px-4 py-8">
          <div className="text-center py-8">Loading food details...</div>
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
        <div className="flex items-center text-sm text-gray-600 mb-6">
          <Link to="/dashboard" className="hover:text-[#FFA55D]">Dashboard</Link>
          <span className="mx-2">›</span>
          <Link to="/food-list" className="hover:text-[#FFA55D]">Food List</Link>
          <span className="mx-2">›</span>
          <span className="text-[#A76545]">{food.name}</span>
        </div>
        
        {/* Food Details */}
        <div className="bg-white rounded-lg shadow-md overflow-hidden mb-8">
          <div className="md:flex">
            <div className="md:w-1/2">
              <img 
                src={food.image} 
                alt={food.name} 
                className="w-full h-full object-cover"
              />
            </div>
            <div className="p-6 md:w-1/2">
              <span className="inline-block bg-[#FFDF88]/20 text-[#A76545] text-xs px-2 py-1 rounded mb-3">
                {food.category}
              </span>
              <h1 className="text-3xl font-bold mb-3 text-[#A76545]">{food.name}</h1>
              
              <div className="flex items-center mb-4">
                <StarRating rating={food.avgRating} />
                <span className="ml-2 text-gray-600">
                  {food.avgRating.toFixed(1)} ({food.reviewCount} reviews)
                </span>
              </div>
              
              <div className="border-t border-b border-[#FFDF88]/30 py-4 my-4">
                <h2 className="text-lg font-semibold mb-2 text-[#A76545]">Description</h2>
                <p className="text-gray-700">{food.description}</p>
              </div>
              
              <div className="mb-6">
                <h2 className="text-lg font-semibold mb-2 text-[#A76545]">Ingredients</h2>
                <ul className="list-disc list-inside text-gray-700">
                  {food.ingredients.map((ingredient, index) => (
                    <li key={index}>{ingredient}</li>
                  ))}
                </ul>
              </div>
              
              <div className="flex space-x-4">
                <Link
                  to={`/food/${food.id}/reviews`}
                  className="bg-[#FFA55D] hover:bg-[#FFA55D]/80 text-white font-semibold py-2 px-4 rounded"
                >
                  Read All Reviews
                </Link>
                <Link
                  to={`/food/${food.id}/submit-review`}
                  className="bg-[#ACC572] hover:bg-[#ACC572]/80 text-white font-semibold py-2 px-4 rounded"
                >
                  Submit a Review
                </Link>
              </div>
            </div>
          </div>
        </div>
        
        {/* Recent Reviews */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-bold text-[#A76545]">Recent Reviews</h2>
            <Link
              to={`/food/${food.id}/reviews`}
              className="text-[#FFA55D] hover:text-[#A76545]"
            >
              View All Reviews →
            </Link>
          </div>
          
          {food.reviews.length === 0 ? (
            <p className="text-gray-600">No reviews yet. Be the first to review!</p>
          ) : (
            <div className="space-y-6">
              {food.reviews.slice(0, 3).map(review => (
                <div key={review.id} className="border-b border-[#FFDF88]/30 pb-4 last:border-b-0">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="font-semibold text-[#A76545]">{review.userName}</h3>
                      <StarRating rating={review.rating} />
                    </div>
                    <span className="text-gray-500 text-sm">{review.date}</span>
                  </div>
                  <p className="text-gray-700 mt-2">{review.comment}</p>
                </div>
              ))}
            </div>
          )}
        </div>
        
        {/* Related Foods */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-bold mb-4 text-[#A76545]">You Might Also Like</h2>
          
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {relatedFoods.map(relatedFood => (
              <div 
                key={relatedFood.id} 
                className="flex space-x-3 items-center cursor-pointer hover:bg-[#FFDF88]/10 p-2 rounded-lg"
                onClick={() => navigate(`/food/${relatedFood.id}`)}
              >
                <img
                  src={relatedFood.image}
                  alt={relatedFood.name}
                  className="w-16 h-16 rounded-lg object-cover"
                />
                <div>
                  <h3 className="font-semibold text-[#A76545]">{relatedFood.name}</h3>
                  <div className="flex items-center text-sm">
                    <span className="text-[#FFDF88] mr-1">★</span>
                    <span>{relatedFood.avgRating.toFixed(1)}</span>
                    <span className="text-gray-500 ml-1">
                      ({relatedFood.reviewCount} reviews)
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default FoodItem;