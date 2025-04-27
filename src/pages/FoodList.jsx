// pages/FoodList.jsx
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';

const FoodList = () => {
  const [foods, setFoods] = useState([]);
  const [loading, setLoading] = useState(true);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    // Fetch foods and categories
    // In a real app, this would be an API call
    const fetchFoods = async () => {
      try {
        // Mock data
        const mockCategories = ['All', 'Pizza', 'Burgers', 'Desserts', 'Asian', 'Italian', 'Beverages'];
        
        const mockFoods = [
          {
            id: 1,
            name: 'Pepperoni Pizza',
            category: 'Pizza',
            image: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?auto=format&fit=crop&w=800&q=80',
            avgRating: 4.5,
            reviewCount: 127,
            description: 'Classic pepperoni pizza with mozzarella cheese on a thin crust.',
          },
          {
            id: 2,
            name: 'Cheeseburger',
            category: 'Burgers',
            image: 'https://images.unsplash.com/photo-1550547660-d9450f859349?auto=format&fit=crop&w=800&q=80',
            avgRating: 4.3,
            reviewCount: 93,
            description: 'Juicy beef patty with melted cheese, lettuce, tomato, and special sauce.',
          },
          {
            id: 3,
            name: 'Chocolate Cake',
            category: 'Desserts',
            image: 'https://images.unsplash.com/photo-1601979031925-3c8e0b4e8e4e?auto=format&fit=crop&w=800&q=80',
            avgRating: 4.8,
            reviewCount: 156,
            description: 'Rich chocolate cake with layers of ganache and chocolate frosting.',
          },
          {
            id: 4,
            name: 'Pad Thai',
            category: 'Asian',
            image: 'https://images.unsplash.com/photo-1604908177522-3e6e1e0e3c3c?auto=format&fit=crop&w=800&q=80',
            avgRating: 4.6,
            reviewCount: 78,
            description: 'Stir-fried rice noodles with eggs, tofu, bean sprouts, and peanuts.',
          },
          {
            id: 5,
            name: 'Spaghetti Carbonara',
            category: 'Italian',
            image: 'https://images.unsplash.com/photo-1601924582975-7e1e6e0d3c7c?auto=format&fit=crop&w=800&q=80',
            avgRating: 4.7,
            reviewCount: 112,
            description: 'Pasta with a creamy sauce made with eggs, cheese, pancetta, and black pepper.',
          },
          {
            id: 6,
            name: 'Iced Coffee',
            category: 'Beverages',
            image: 'https://images.unsplash.com/photo-1604908177522-3e6e1e0e3c3c?auto=format&fit=crop&w=800&q=80',
            avgRating: 4.2,
            reviewCount: 65,
            description: 'Cold brewed coffee served over ice with a splash of milk.',
          },
        ];
        
        setCategories(mockCategories);
        setFoods(mockFoods);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching foods:', error);
        setLoading(false);
      }
    };
    
    fetchFoods();
  }, []);

  // Filter foods based on category and search term
  const filteredFoods = foods.filter(food => {
    const matchesCategory = selectedCategory === 'All' || selectedCategory === 'all' || food.category === selectedCategory;
    const matchesSearch = food.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          food.description.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="min-h-screen bg-[#FFDF88]/10">
      <Header />
      
      <div className="container mx-auto px-4 py-16">
        <h1 className="text-3xl font-bold text-center mb-8 text-[#A76545]">Food List</h1>
        
        {/* Search and Filter */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <div className="flex flex-col md:flex-row md:justify-between md:items-center space-y-4 md:space-y-0">
            {/* Search */}
            <div className="w-full md:w-1/2">
              <div className="relative">
                <input
                  type="text"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  placeholder="Search foods..."
                  className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:border-[#FFA55D]"
                />
                <span className="absolute right-3 top-2 text-gray-400">🔍</span>
              </div>
            </div>
            
            {/* Category Filter */}
            <div className="w-full md:w-1/3">
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:border-[#FFA55D]"
              >
                {categories.map(category => (
                  <option key={category} value={category}>{category}</option>
                ))}
              </select>
            </div>
          </div>
        </div>
        
        {/* Food Items Grid */}
        {loading ? (
          <div className="text-center py-8">Loading food items...</div>
        ) : filteredFoods.length === 0 ? (
          <div className="text-center py-8">
            <p className="text-lg text-gray-600">No food items found matching your criteria.</p>
            <button
              onClick={() => {
                setSelectedCategory('all');
                setSearchTerm('');
              }}
              className="text-[#FFA55D] hover:text-[#A76545] mt-2"
            >
              Clear filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredFoods.map(food => (
              <div key={food.id} className="bg-white rounded-lg shadow-md overflow-hidden transition-transform hover:scale-105">
                <img 
                  src={food.image} 
                  alt={food.name} 
                  className="w-full h-48 object-cover"
                />
                <div className="p-4">
                  <h2 className="text-xl font-semibold mb-2 text-[#A76545]">{food.name}</h2>
                  <span className="inline-block bg-[#FFDF88]/20 text-[#A76545] text-xs px-2 py-1 rounded mb-3">
                    {food.category}
                  </span>
                  <p className="text-gray-600 mb-3 text-sm">{food.description}</p>
                  <div className="flex justify-between items-center">
                    <div className="flex items-center">
                      <span className="text-[#FFDF88] mr-1">★</span>
                      <span className="font-medium">{food.avgRating.toFixed(1)}</span>
                      <span className="text-gray-500 text-sm ml-1">({food.reviewCount} reviews)</span>
                    </div>
                    <Link
                      to={`/food/${food.id}`}
                      className="text-[#FFA55D] hover:text-[#A76545] font-medium text-sm"
                    >
                      View Details →
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
      
      <Footer />
    </div>
  );
};

export default FoodList;