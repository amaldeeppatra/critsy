import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Header = () => {
  const { isAuthenticated, user } = useAuth();
  const navigate = useNavigate();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  // Add scroll event listener to change header appearance on scroll
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  return (
    <header className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
      scrolled ? 'py-2 backdrop-blur-md bg-white/10' : 'py-4'
    }`}>
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              className="w-8 h-8 text-[#A76545]"
            >
              <path d="M12.378 1.602a.75.75 0 00-.756 0L3 6.632l9 5.25 9-5.25-8.622-5.03zM21.75 7.93l-9 5.25v9l8.628-5.032a.75.75 0 00.372-.648V7.93zM11.25 22.18v-9l-9-5.25v8.57a.75.75 0 00.372.648l8.628 5.033z" />
            </svg>
            <span className="text-xl font-bold text-[#A76545]">FoodReview</span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <Link to="/food-list" className="text-[#A76545] hover:text-[#FFA55D] font-medium transition-colors">
              Foods
            </Link>
            <Link to="/popular-reviews" className="text-[#A76545] hover:text-[#FFA55D] font-medium transition-colors">
              Reviews
            </Link>
            <Link to="/about" className="text-[#A76545] hover:text-[#FFA55D] font-medium transition-colors">
              About
            </Link>
            
            {isAuthenticated ? (
              <div className="flex items-center space-x-6">
                <Link to="/dashboard" className="text-[#A76545] hover:text-[#FFA55D] font-medium transition-colors">
                  Dashboard
                </Link>
                <div className="relative group">
                  <button className="flex items-center space-x-1 text-[#A76545] hover:text-[#FFA55D] font-medium transition-colors">
                    <span>Account</span>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-4 w-4 transition-transform group-hover:rotate-180"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M19 9l-7 7-7-7"
                      />
                    </svg>
                  </button>
                  <div className="absolute right-0 mt-2 w-48 bg-white/90 backdrop-blur-md rounded-lg shadow-lg py-2 z-20 hidden group-hover:block border border-[#FFDF88]/30">
                    <Link
                      to="/profile"
                      className="block px-4 py-2 text-sm text-[#A76545] hover:bg-[#FFDF88]/20"
                    >
                      Profile Settings
                    </Link>
                    <Link
                      to="/my-reviews"
                      className="block px-4 py-2 text-sm text-[#A76545] hover:bg-[#FFDF88]/20"
                    >
                      My Reviews
                    </Link>
                    <button
                      onClick={() => {
                        // Call logout function from auth context
                        navigate('/');
                      }}
                      className="block w-full text-left px-4 py-2 text-sm text-[#A76545] hover:bg-[#FFDF88]/20"
                    >
                      Logout
                    </button>
                  </div>
                </div>
              </div>
            ) : (
              <div className="flex items-center space-x-4">
                <Link
                  to="/login"
                  className="text-[#A76545] hover:text-[#FFA55D] font-medium transition-colors"
                >
                  Log In
                </Link>
                <Link
                  to="/signup"
                  className="bg-[#ACC572] hover:bg-[#FFA55D] text-white px-5 py-2 rounded-full text-sm font-medium transition-colors"
                >
                  Sign Up
                </Link>
              </div>
            )}
          </nav>

          {/* Mobile menu button */}
          <button
            className="md:hidden text-[#A76545] focus:outline-none"
            onClick={toggleMobileMenu}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              {mobileMenuOpen ? (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              ) : (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              )}
            </svg>
          </button>
        </div>

        {/* Mobile Navigation */}
        {mobileMenuOpen && (
          <nav className="md:hidden py-4 mt-2 bg-white/90 backdrop-blur-md rounded-lg shadow-lg border border-[#FFDF88]/30">
            <Link
              to="/food-list"
              className="block px-4 py-3 text-[#A76545] hover:bg-[#FFDF88]/20 font-medium"
              onClick={() => setMobileMenuOpen(false)}
            >
              Foods
            </Link>
            <Link
              to="/popular-reviews"
              className="block px-4 py-3 text-[#A76545] hover:bg-[#FFDF88]/20 font-medium"
              onClick={() => setMobileMenuOpen(false)}
            >
              Popular Reviews
            </Link>
            <Link
              to="/about"
              className="block px-4 py-3 text-[#A76545] hover:bg-[#FFDF88]/20 font-medium"
              onClick={() => setMobileMenuOpen(false)}
            >
              About
            </Link>

            {isAuthenticated ? (
              <>
                <Link
                  to="/dashboard"
                  className="block px-4 py-3 text-[#A76545] hover:bg-[#FFDF88]/20 font-medium"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Dashboard
                </Link>
                <Link
                  to="/profile"
                  className="block px-4 py-3 text-[#A76545] hover:bg-[#FFDF88]/20 font-medium"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Profile Settings
                </Link>
                <Link
                  to="/my-reviews"
                  className="block px-4 py-3 text-[#A76545] hover:bg-[#FFDF88]/20 font-medium"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  My Reviews
                </Link>
                <button
                  onClick={() => {
                    setMobileMenuOpen(false);
                    navigate('/');
                  }}
                  className="block w-full text-left px-4 py-3 text-[#A76545] hover:bg-[#FFDF88]/20 font-medium"
                >
                  Logout
                </button>
              </>
            ) : (
              <div className="px-4 py-3 space-y-2">
                <Link
                  to="/login"
                  className="block text-[#A76545] hover:text-[#FFA55D] font-medium"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Log In
                </Link>
                <Link
                  to="/signup"
                  className="block bg-[#ACC572] hover:bg-[#FFA55D] text-white px-4 py-2 rounded-full text-center text-sm font-medium transition-colors"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Sign Up
                </Link>
              </div>
            )}
          </nav>
        )}
      </div>
    </header>
  );
};

export default Header;