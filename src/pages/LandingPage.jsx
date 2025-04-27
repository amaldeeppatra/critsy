// pages/LandingPage.jsx
import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import Header from '../components/Header';
import Footer from '../components/Footer';
import FeaturedReviews from '../components/FeaturedReviews';

const LandingPage = () => {
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const [featuredItems, setFeaturedItems] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fetch featured food items and reviews
    // In a real app, this would be an API call
    const fetchFeaturedItems = async () => {
      try {
        // Mock data
        const mockFeaturedItems = [
          {
            id: 1,
            name: 'Margherita Pizza',
            image: 'https://images.unsplash.com/photo-1574071318508-1cdbab80d002?q=80&w=1469&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
            avgRating: 4.5,
            reviewCount: 120,
          },
          {
            id: 2,
            name: 'Samosa',
            image: 'https://plus.unsplash.com/premium_photo-1695297516676-04a259917c03?q=80&w=1374&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
            avgRating: 4.8,
            reviewCount: 85,
          },
          {
            id: 3,
            name: 'Chocolate Cake',
            image: 'https://images.unsplash.com/photo-1605807646983-377bc5a76493?q=80&w=1448&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
            avgRating: 4.3,
            reviewCount: 67,
          },
        ];
        
        setFeaturedItems(mockFeaturedItems);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching featured items:', error);
        setLoading(false);
      }
    };
    
    fetchFeaturedItems();
  }, []);

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      {/* Hero Section - Changed from blue/purple to brown/orange gradient */}
      <section className="bg-gradient-to-r from-[#A76545] to-[#FFA55D] text-white py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              Discover & Share Honest Food Reviews
            </h1>
            <p className="text-xl mb-8">
              Join our community to find the best foods and share your experiences with others.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              {isAuthenticated ? (
                <button
                  onClick={() => navigate('/dashboard')}
                  className="bg-white text-[#A76545] font-semibold px-6 py-3 rounded-lg shadow-md hover:bg-gray-100 transition"
                >
                  Go to Dashboard
                </button>
              ) : (
                <>
                  <Link
                    to="/signup"
                    className="bg-white text-[#A76545] font-semibold px-6 py-3 rounded-lg shadow-md hover:bg-gray-100 transition"
                  >
                    Sign Up Free
                  </Link>
                  <Link
                    to="/login"
                    className="bg-transparent border-2 border-white text-white font-semibold px-6 py-3 rounded-lg hover:bg-white hover:text-[#A76545] transition"
                  >
                    Log In
                  </Link>
                </>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* How It Works Section - Changed background to light yellow */}
      <section className="py-16 bg-[#FFDF88]/10">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">How It Works</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center p-6 bg-white rounded-lg shadow-md">
              <div className="w-16 h-16 bg-[#FFDF88]/50 text-[#A76545] rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4">1</div>
              <h3 className="text-xl font-semibold mb-2">Browse Foods</h3>
              <p className="text-gray-600">Explore our extensive collection of food items from various categories.</p>
            </div>
            <div className="text-center p-6 bg-white rounded-lg shadow-md">
              <div className="w-16 h-16 bg-[#FFDF88]/50 text-[#A76545] rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4">2</div>
              <h3 className="text-xl font-semibold mb-2">Read Reviews</h3>
              <p className="text-gray-600">Find honest opinions from our community members.</p>
            </div>
            <div className="text-center p-6 bg-white rounded-lg shadow-md">
              <div className="w-16 h-16 bg-[#FFDF88]/50 text-[#A76545] rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4">3</div>
              <h3 className="text-xl font-semibold mb-2">Share Your Experience</h3>
              <p className="text-gray-600">Submit your own reviews and help others make informed decisions.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Reviews Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Featured Food Reviews</h2>
          {loading ? (
            <div className="text-center">Loading featured items...</div>
          ) : (
            <FeaturedReviews items={featuredItems} />
          )}
          <div className="text-center mt-10">
            <Link
              to={isAuthenticated ? '/food-list' : '/signup'}
              className="bg-[#ACC572] text-white font-semibold px-6 py-3 rounded-lg shadow-md hover:bg-[#A76545] transition"
            >
              Explore All Foods
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default LandingPage;