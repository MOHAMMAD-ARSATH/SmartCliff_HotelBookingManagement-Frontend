import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom'; // Import Routes

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


function App() {
  return (
    <BrowserRouter>
      <div className="App" >

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<AboutDesc />} />
          <Route path="/allrooms" element={<AllRooms />} />
          <Route path="/gallery" element={<Gallery />} />
          <Route path="/facilities" element={<AllFacilities />} />
          <Route path="/contact" element={<Contact />} />

          <Route path="/room/:roomid/" element={<SingleRoom />} />
          <Route path="/book/:roomid/" element={<BookingRoom />} />
          <Route path="/payment/:roomid/:type/:count/:altphone/:fromdate/:todate" element={<BookingScreen />} />
          <Route path="/mybookings" element={<MyBooking />} />

          <Route path="/admin" element={<AdminScreen />} />

        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
