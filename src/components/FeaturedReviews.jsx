// components/FeaturedReviews.jsx
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const FeaturedReviews = ({ items }) => {
  const { isAuthenticated } = useAuth();
  const [hoveredItem, setHoveredItem] = useState(null);
  
  // Helper function to render star rating - updated to use the orange color
  const renderStars = (rating) => {
    const stars = [];
   
    for (let i = 1; i <= 5; i++) {
      stars.push(
        <span key={i} className={`text-lg ${i <= rating ? 'text-[#FFA55D]' : 'text-gray-300'}`}>
          ★
        </span>
      );
    }
   
    return <div className="flex">{stars}</div>;
  };
  
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
      {items.map((item) => (
        <div
          key={item.id}
          className="bg-white rounded-lg shadow-md overflow-hidden transition-transform duration-300 hover:shadow-lg"
          onMouseEnter={() => setHoveredItem(item.id)}
          onMouseLeave={() => setHoveredItem(null)}
        >
          <img
            src={item.image}
            alt={item.name}
            className="w-full h-48 object-cover"
          />
          <div className="p-6">
            <h3 className="text-xl font-semibold mb-2">{item.name}</h3>
            <div className="flex items-center mb-3">
              {renderStars(item.avgRating)}
              <span className="ml-2 text-gray-600 text-sm">
                ({item.reviewCount} reviews)
              </span>
            </div>
           
            <Link
              to={isAuthenticated ? `/food/${item.id}` : '/signup'}
              className={`block text-center ${
                hoveredItem === item.id ? 'bg-[#A76545]' : 'bg-[#ACC572]'
              } hover:bg-[#A76545] text-white font-medium py-2 px-4 rounded transition`}
            >
              {hoveredItem === item.id ? 'View Details' : 'Read Reviews'}
            </Link>
          </div>
        </div>
      ))}
    </div>
  );
};

export default FeaturedReviews;