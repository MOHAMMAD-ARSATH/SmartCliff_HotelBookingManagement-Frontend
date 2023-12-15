import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Carousel as BootstrapCarousel, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { Dialog, DialogTitle, CardMedia, DialogActions, IconButton } from '@mui/material';
import { Close as CloseIcon } from '@mui/icons-material';
import { BsChevronLeft, BsChevronRight } from 'react-icons/bs';

import Loader from '../components/Loader';
import Error from '../components/Error';
import Breadcrumbs from '../components/Breadcrumbs';
import Navbar1 from '../components/UserNav';
import Footer from '../components/Footer';
import RoomList from '../components/RoomList';
import Login from '../components/Login';

function SingleRoom() {
  const { roomid } = useParams();
  const navigate = useNavigate();

  const [room, setRoom] = useState();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState();
  const [activeSlide, setActiveSlide] = useState(0);
  const [openDialog, setOpenDialog] = useState(false);

  const [selectedImage, setSelectedImage] = useState(null);
  const [roomDataArray, setRoomDataArray] = useState([]);

  const [showLoginModal, setShowLoginModal] = useState(false);

  const openLoginModal = () => {
    setShowLoginModal(true);
  };


  const closeLoginModal = () => {
    setShowLoginModal(false);
  };

  const confirmLogin = () => {
    const currentUser = JSON.parse(sessionStorage.getItem('currentUser'));

    console.log('currentUser:', currentUser);

    if (!currentUser || !currentUser.email) {
      console.log('Opening login modal');
      openLoginModal();
    } else if (room && room._id) {
      console.log('Navigating to book');
      navigate(`/book/${room._id}`);
    } else {
      console.error('Room or room._id is null or undefined.');
    }
  };




  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const data = (await axios.post(`/api/rooms/getroombyid`, { roomid })).data;
        setRoom(data);
        setLoading(false);
      } catch (error) {
        setError(true);
        console.log(error);
        setLoading(false);
      }
    };

    fetchData();
  }, [roomid]);

  useEffect(() => {
    const fetchRoomData = async () => {
      try {
        const data = (await axios.post("/api/rooms/getallrooms")).data;

        setRoomDataArray(data);
      } catch (error) {
        console.error('Error fetching room data:', error);
      }
    };

    fetchRoomData();
  }, []);

  const breadcrumbsPaths = [
    { label: 'Home', link: '/' },
    { label: 'Rooms', link: '/allrooms' },
    { label: `${room?.type || 'Room'}` },
  ];


  const handleImageClick = (imageUrl) => {
    setSelectedImage(imageUrl);
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

  console.log('showLoginModal:', showLoginModal);


  return (
    <div>
      <Navbar1 />
      <Breadcrumbs paths={breadcrumbsPaths} style={{ marginTop: '500px' }} />
      {loading ? (
        <Loader />
      ) : room ? (
        <div className='m-5'>
          <div className='row justify-content-center mt-5'>
            <div className='col-md-6 mb-5'>
              {room.imageurls && room.imageurls.length > 0 ? (
                <BootstrapCarousel
                  interval={5000}
                  indicators={false}
                  fade
                  activeIndex={activeSlide}
                  onSelect={(index) => setActiveSlide(index)}
                  prevIcon={<BsChevronLeft />} // Use the left chevron icon
                  nextIcon={<BsChevronRight />} // Use the right chevron icon

                >
                  {room.imageurls.map((imageUrl, index) => (
                    <BootstrapCarousel.Item key={index} onClick={() => handleImageClick(imageUrl)}>
                      <img
                        src={imageUrl}
                        alt={`Image ${index + 1}`}
                        height='440px'  // Set your desired fixed height here
                        style={{ objectFit: 'cover', width: '100%', borderRadius: '20px' }} // Maintain aspect ratio
                      />
                    </BootstrapCarousel.Item>

                  ))}
                </BootstrapCarousel>
              ) : (
                <p>No images available</p>
              )}
              <Dialog open={openDialog} onClose={handleCloseDialog} maxWidth="xl">
                {selectedImage && (
                  <CardMedia
                    component="img"
                    alt={`Image ${activeSlide + 1}`}
                    height="550"
                    image={selectedImage}
                    style={{ maxWidth: '900px' }}
                  />
                )}
                {/* <IconButton edge="end" color="inherit" onClick={handleCloseDialog} aria-label="close">
                  <CloseIcon />
                </IconButton> */}
              </Dialog>
            </div>
            <div className='col-md-6'>
              <div>
                <h3>
                  <b>{room.type}</b>
                </h3>
                <div className='mb-3' style={{ fontSize: '18px' }}>
                  {room.description}
                </div>
                <h4>Max Count : {room.maxcount}</h4>
                <h4>Rent per Day : Rs. {room.rentperday} </h4>
                <h4>
                  Facilities :{' '}
                  {room.facilities && room.facilities.length > 0 ? (
                    room.facilities.map((facilityObj, index) => (
                      <span key={index}>
                        {facilityObj.facility}
                        {index < room.facilities.length - 1 && ', '}
                      </span>
                    ))
                  ) : (
                    'No facilities available'
                  )}
                </h4>
              </div>

              <button className='btn btn-primary m-2' onClick={confirmLogin}>Book Now</button>

            </div>
          </div>

          <div className='mt-5 mb-5'>
            <h3 style={{ textAlign: 'center', fontWeight: 'bold' }}>Choose From Our Multiple Room Categories</h3>
            <RoomList roomDataArray={roomDataArray} />
          </div>
        </div>
      ) : (
        <Error />
      )}
      {/* Login Modal */}
      {showLoginModal && <Login closeModal={closeLoginModal} />}

      <Footer />
    </div>
  );
}

export default SingleRoom;
