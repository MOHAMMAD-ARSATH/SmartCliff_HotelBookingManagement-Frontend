import { useEffect, useState } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

import BookingScreen from './pages/BookingScreen';
import MyBooking from './pages/MyBooking';
import AdminScreen from './pages/AdminScreen';
import Home from './pages/LandingScreen';
import SingleRoom from './pages/SingleRoom';
import BookingRoom from './pages/BookingRoom';
import AboutDesc from './pages/AboutDesc';
import AllFacilities from './pages/AllFacilities';
import AllRooms from './pages/AllRooms';
import Contact from './pages/Contact';
import Gallery from './pages/Gallery';
import ProtectedRoute from './components/ProtectedRoute';
import './App.css';

function App() {
  const [user, setUser] = useState(null);
  const [checkingAuth, setCheckingAuth] = useState(true); 

  useEffect(() => {
    const sessionUser = sessionStorage.getItem("currentUser");
    if (sessionUser) {
      setUser(JSON.parse(sessionUser));
    }
    setCheckingAuth(false); 
  }, []);

  if (checkingAuth) return null; 

  return (
    <BrowserRouter>
      <div className="App">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<AboutDesc />} />
          <Route path="/allrooms" element={<AllRooms />} />
          <Route path="/gallery" element={<Gallery />} />
          <Route path="/facilities" element={<AllFacilities />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/room/:roomid" element={<SingleRoom />} />

          <Route
            path="/book/:roomid"
            element={
              <ProtectedRoute>
                <BookingRoom />
              </ProtectedRoute>
            }
          />
          <Route
            path="/payment/:roomid/:type/:count/:altphone/:fromdate/:todate"
            element={
              <ProtectedRoute>
                <BookingScreen />
              </ProtectedRoute>
            }
          />
          <Route
            path="/mybookings"
            element={
              <ProtectedRoute>
                <MyBooking />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin"
            element={
              <ProtectedRoute>
                <AdminScreen />
              </ProtectedRoute>
            }
          />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;