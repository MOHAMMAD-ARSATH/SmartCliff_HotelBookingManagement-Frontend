import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import StripeCheckout from "react-stripe-checkout";
import axios from 'axios';
import moment from 'moment';
import Swal from "sweetalert2";

import Loader from '../components/Loader';
import Error from '../components/Error';
import Navbar1 from '../components/UserNav';
import Breadcrumbs from '../components/Breadcrumbs';
import FooterPage from '../components/Footer';

function BookingScreen() {
  const API_URL = process.env.REACT_APP_API_URL;
  
  const { roomid, type, fromdate, todate, count, phoneno, altphone } = useParams();
  const navigate = useNavigate();

  const [room, setRoom] = useState();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState();

  const formattedFromDate = moment(fromdate).format('DD/MM/YYYY');
  const formattedToDate = moment(todate).format('DD/MM/YYYY');

  const totaldays = moment.duration(moment(todate).diff(moment(fromdate))).asDays() + 1;
  console.log(totaldays);
  const [totalamount, setTotalAmount] = useState();
  // console.log(phoneno);
  console.log(altphone);

  useEffect(() => {
    if (!sessionStorage.getItem('currentUser')) {
      navigate('/login');
    }

    const fetchData = async () => {
      try {
        setLoading(true);
        const data = (await axios.post(`/api/rooms/getroombyid`, { roomid })).data;
        setTotalAmount(data.rentperday * totaldays * count);
        setRoom(data);
        setLoading(false);
      } catch (error) {
        setError(true);
        console.log(error);
        setLoading(false);
      }
    };

    fetchData();
  }, [roomid, formattedFromDate, formattedToDate, type, totaldays, navigate]);

  const onToken = async (token) => {
    console.log(token);
    const currentUser = JSON.parse(sessionStorage.getItem("currentUser"));

    const bookingDetails = {
      room,
      userid: currentUser._id,
      type,
      fromdate,
      todate,
      count,
      phoneno,
      altphone,
      totalamount,
      totaldays,
      name: currentUser.name,
      email: currentUser.email,
      token,
    };

    try {
      setLoading(true);
      const result = await axios.post(`${API_URL}/api/bookings/bookroom`, bookingDetails);
      setLoading(false);

      if (result.data === 'Room Booked Successfully') {
        Swal.fire(
          "Congratulations",
          "Your Room Booked Successfully",
          "success"
        ).then(() => {
          navigate('/');
        });
      } else {
        Swal.fire("Oops", "Payment failed", "error");
      }
    } catch (error) {
      setError(error);
      Swal.fire("Oops", "Error: " + error, "error");
      setLoading(false);
    }
  };

  const breadcrumbsPaths = [
    { label: 'Home', link: '/' },
    { label: 'Rooms', link: '/allrooms' },
    { label: `${room?.type || 'Room'}`, link: `/room/${roomid}` },
    { label: 'Booking Details', link: `/book/${roomid}` },
    { label: 'Payment Info' },
  ];

  return (
    <div>
      <Navbar1 />
      <Breadcrumbs paths={breadcrumbsPaths} />
      {loading ? (
        <Loader />
      ) : room ? (
        <div>
          <div className='row justify-content-center m-5 bs'>
            <div className="col-md-6">
              <h3>{room.type}</h3>
              {room.imageurls && room.imageurls.length > 0 ? (
                <img src={room.imageurls[0]} alt={room.name}
                  height='400px'
                  style={{ objectFit: 'cover', width: '100%', borderRadius: '20px' }} />
              ) : (
                <p>No images available</p>
              )}
            </div>

            <div className="col-md-6">
              <div style={{ textAlign: 'right' }}>
                <h1>Booking Info</h1>
                <hr />
                <div className='bill'>
                  <p><strong>Name :</strong> {JSON.parse(sessionStorage.getItem("currentUser")).name}</p>
                  <p><strong>Email :</strong> {JSON.parse(sessionStorage.getItem("currentUser")).email}</p>
                  <p><strong>Check-In Date :</strong> {formattedFromDate}</p>
                  <p><strong>Check-Out Date :</strong> {formattedToDate}</p>
                  <p><strong>Number of Rooms Booked :</strong> {count}</p>

                </div>
              </div>

              <div className='mt-5' style={{ textAlign: 'right' }}>
                <h1>Amount Info</h1>
                <hr />
                <div className='bill'>
                  <p><strong>Total Days :</strong> {totaldays}</p>
                  <p><strong>Rent per Day :</strong> {room.rentperday * count}</p>
                  <p><strong>Total Amount :</strong> {totalamount}</p>
                </div>
              </div>

              <div style={{ float: "right" }}>
                <StripeCheckout
                  amount={totalamount * 100}
                  currency="INR"
                  token={onToken}
                  stripeKey="pk_test_51OAx74SGDjJ9frH6yaQ7jKRMmE76wUebnXtbRavMCD2ZswMpOrLXqkm4C10smB0F50fNEvGVK8h8hgZAJVkxOIMm00h91f22sr"
                >
                  <button className='btn btn-primary mt-3'>Pay Now</button>
                </StripeCheckout>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <Error />
      )}
      <FooterPage />
    </div>
  );
}

export default BookingScreen;