// App.jsx
import './index.css';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import LandingPage from './pages/LandingPage';
import Dashboard from './pages/Dashboard';
import SignUp from './pages/SignUp';
import Login from './pages/Login';
import FoodList from './pages/FoodList';
import FoodItem from './pages/FoodItem';
import ViewReviews from './pages/ViewReviews';
import SubmitReview from './pages/SubmitReview';
import UserProfile from './pages/UserProfile';
import EditReviews from './pages/EditReviews';
import { AuthProvider, useAuth } from './context/AuthContext';

// Protected route component
const ProtectedRoute = ({ children }) => {
  const { isAuthenticated } = useAuth();
  
  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }
  
  return children;
};

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/login" element={<Login />} />
          <Route 
            path="/dashboard" 
            element={
              // <ProtectedRoute>
                <Dashboard />
              // </ProtectedRoute>
            } 
          />
          <Route 
            path="/food-list" 
            element={
              // <ProtectedRoute>
                <FoodList />
              // </ProtectedRoute>
            } 
          />
          <Route 
            path="/food/:id" 
            element={
              // <ProtectedRoute>
                <FoodItem />
              // </ProtectedRoute>
            } 
          />
          <Route 
            path="/food/:id/reviews" 
            element={
              // <ProtectedRoute>
                <ViewReviews />
              // </ProtectedRoute>
            } 
          />
          <Route 
            path="/food/:id/submit-review" 
            element={
              // <ProtectedRoute>
                <SubmitReview />
              // </ProtectedRoute>
            } 
          />
          <Route 
            path="/profile" 
            element={
              // <ProtectedRoute>
                <UserProfile />
              // </ProtectedRoute>
            } 
          />
          <Route 
            path="/my-reviews"
            element={
              // <ProtectedRoute>
                <EditReviews />
              // </ProtectedRoute>
            } 
          />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;