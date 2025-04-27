// pages/UserProfile.jsx
import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import Header from '../components/Header';
import Footer from '../components/Footer';

const colorPalette = {
  primary: '#A76545',  // deep terracotta
  secondary: '#FFA55D', // warm orange
  light: '#FFDF88',     // soft yellow
  accent: '#ACC572',    // muted green
};

const UserProfile = () => {
  const { user, updateUserProfile, logout } = useAuth();
  const navigate = useNavigate();
  
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');
  const [profileData, setProfileData] = useState({
    displayName: '',
    email: '',
    bio: '',
    location: '',
    preferences: {
      emailNotifications: true,
      privacyLevel: 'public'
    }
  });

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const mockUserData = {
          displayName: 'Jane Smith',
          email: 'jane.smith@example.com',
          bio: 'Food enthusiast and amateur chef. I love trying new restaurants and sharing my experiences!',
          location: 'San Francisco, CA',
          joinDate: '2024-09-15',
          reviewCount: 42,
          preferences: {
            emailNotifications: true,
            privacyLevel: 'public'
          }
        };
        setProfileData(mockUserData);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching user profile:', error);
        setLoading(false);
      }
    };
    fetchUserProfile();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (name.includes('.')) {
      const [parent, child] = name.split('.');
      setProfileData({
        ...profileData,
        [parent]: {
          ...profileData[parent],
          [child]: value
        }
      });
    } else {
      setProfileData({
        ...profileData,
        [name]: value
      });
    }
  };

  const handleCheckboxChange = (e) => {
    const { name, checked } = e.target;
    const [parent, child] = name.split('.');
    setProfileData({
      ...profileData,
      [parent]: {
        ...profileData[parent],
        [child]: checked
      }
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    try {
      await new Promise(resolve => setTimeout(resolve, 1000));
      setSuccessMessage('Profile updated successfully!');
      setTimeout(() => setSuccessMessage(''), 3000);
    } catch (error) {
      console.error('Error updating profile:', error);
    } finally {
      setSaving(false);
    }
  };

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  if (loading) {
    return (
      <div className="min-h-screen" style={{ backgroundColor: '#f9f9f9' }}>
        <Header />
        <div className="container mx-auto px-4 py-8">
          <div className="text-center py-8" style={{ color: colorPalette.primary }}>Loading profile...</div>
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
          <span style={{ color: '#333' }}>My Profile</span>
        </div>
        <div className="bg-white rounded-lg shadow-md overflow-hidden mb-8">
          <div className="px-6 py-4" style={{ backgroundColor: colorPalette.primary }}>
            <div className="flex justify-between items-center">
              <h1 className="text-2xl font-bold" style={{ color: '#fff' }}>My Profile</h1>
              <button
                onClick={handleLogout}
                className="font-medium py-2 px-4 rounded text-sm"
                style={{ backgroundColor: '#fff', color: colorPalette.primary }}
              >
                Logout
              </button>
            </div>
          </div>
          {successMessage && (
            <div className="border-l-4 p-4 mb-4 mx-6 mt-6" style={{ backgroundColor: '#EAF8EA', borderColor: colorPalette.accent }}>
              <p style={{ color: colorPalette.accent }}>{successMessage}</p>
            </div>
          )}
          <form onSubmit={handleSubmit} className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Display Name */}
              <div>
                <label className="block font-medium mb-2" style={{ color: '#444' }}>Display Name</label>
                <input
                  type="text"
                  name="displayName"
                  value={profileData.displayName}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border rounded-lg focus:outline-none h-10"
                  style={{ borderColor: colorPalette.accent }}
                  required
                />
              </div>
              {/* Email */}
              <div>
                <label className="block font-medium mb-2" style={{ color: '#444' }}>Email Address</label>
                <input
                  type="email"
                  name="email"
                  value={profileData.email}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border rounded-lg focus:outline-none h-10"
                  style={{ borderColor: colorPalette.accent }}
                  required
                />
              </div>
              {/* Location */}
              <div>
                <label className="block font-medium mb-2" style={{ color: '#444' }}>Location</label>
                <input
                  type="text"
                  name="location"
                  value={profileData.location}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border rounded-lg focus:outline-none h-10"
                  style={{ borderColor: colorPalette.accent }}
                />
              </div>
              {/* Privacy */}
              <div>
                <label className="block font-medium mb-2" style={{ color: '#444' }}>Privacy Level</label>
                <select
                  name="preferences.privacyLevel"
                  value={profileData.preferences.privacyLevel}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border rounded-lg focus:outline-none h-10"
                  style={{ borderColor: colorPalette.accent }}
                >
                  <option value="public">Public - Anyone can see my reviews</option>
                  <option value="followers">Followers Only - Only my followers can see my reviews</option>
                  <option value="private">Private - Only I can see my reviews</option>
                </select>
              </div>
              {/* Bio */}
              <div className="md:col-span-2">
                <label className="block font-medium mb-2" style={{ color: '#444' }}>Bio</label>
                <textarea
                  name="bio"
                  value={profileData.bio}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border rounded-lg focus:outline-none h-32"
                  style={{ borderColor: colorPalette.accent }}
                  placeholder="Tell us about yourself and your food preferences..."
                ></textarea>
              </div>
              {/* Email Notifications */}
              <div className="md:col-span-2">
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    name="preferences.emailNotifications"
                    checked={profileData.preferences.emailNotifications}
                    onChange={handleCheckboxChange}
                    className="mr-2 h-5 w-5"
                    style={{ accentColor: colorPalette.secondary }}
                  />
                  <span style={{ color: '#444' }}>
                    Send me email notifications about new reviews and comments
                  </span>
                </label>
              </div>
            </div>
            <div className="flex justify-end mt-6 space-x-4">
              <Link
                to="/dashboard"
                className="px-6 py-2 rounded-lg hover:bg-opacity-10"
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
          </form>
          <div className="bg-white px-6 py-4 border-t" style={{ borderColor: colorPalette.accent }}>
            <h2 className="text-lg font-semibold" style={{ color: '#333' }}>Account Stats</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4">
              <div className="p-4 rounded-lg border" style={{ borderColor: colorPalette.accent }}>
                <span className="text-sm" style={{ color: '#777' }}>Member Since</span>
                <p className="text-lg font-medium" style={{ color: colorPalette.primary }}>{profileData.joinDate}</p>
              </div>
              <div className="p-4 rounded-lg border" style={{ borderColor: colorPalette.accent }}>
                <span className="text-sm" style={{ color: '#777' }}>Total Reviews</span>
                <p className="text-lg font-medium" style={{ color: colorPalette.primary }}>{profileData.reviewCount}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default UserProfile;