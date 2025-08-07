import { useEffect, useState } from 'react';
import { Tag } from 'antd';
import axios from 'axios';
import Swal from 'sweetalert2';
import moment from "moment";

import Loader from '../components/Loader';
import Navbar1 from '../components/UserNav';
import Breadcrumbs from '../components/Breadcrumbs';
import FooterPage from '../components/Footer';

function MyBooking() {
  const API_URL = process.env.REACT_APP_API_URL;

  const [bookings, setbookings] = useState([]);
  const [loading, setloading] = useState(false);
  const [error, seterror] = useState();

  const user = JSON.parse(sessionStorage.getItem('currentUser'));

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        setloading(true);
        const response = await axios.post(`${API_URL}/api/bookings/getbookingbyuserid`, { userid: user._id });
        console.log(response.data);
        setbookings(response.data);
        setloading(false);
        seterror(true);
      } catch (error) {
        console.log(error);
      }
    };

    fetchBookings(); 
  }, []);

  async function cancelBooking(bookingid, roomid) {
    try {
      setloading(true);
      const result = await (await axios.post(`${API_URL}/api/bookings/cancelbooking`, { bookingid, roomid })).data;
      console.log(result);
      setloading(false);
      Swal.fire('Congrats', 'Your booking has been cancelled', 'success').then(result => {
        window.location.reload();
      });
    } catch (error) {
      console.log(error);
      setloading(false);
      Swal.fire('Oops', 'Something went wrong', 'error').then(result => {
        window.location.reload();
      });
    }
  }

  const breadcrumbsPaths = [
    { label: 'Home', link: '/' },
    { label: 'My Bookings' },
  ];

  return (
    <div>
      <Navbar1 />
      <Breadcrumbs paths={breadcrumbsPaths} />
      <div className="container mb-5">
        <h1 className="mt-4">My Bookings</h1>
        <div className="row">
          <div className="col-md-6">
            {loading && <Loader />}
            {!loading && bookings.length === 0 && (
              <div className='m-5' style={{ fontSize: '18px' }}>
                Your booking history is currently empty.<br /><br />You haven't made any reservations with us yet.<br /><br />To start your delightful stay, explore our available rooms and make a booking today.
              </div>
            )}

            {!loading &&
              bookings.length > 0 &&
              bookings.map(booking => {
                return (
                  <div className="bs" key={booking._id}>
                    <h1 className="mb-3">
                      <b>{booking.type}</b>
                    </h1>
                    <p>
                      <b>BookingId</b>: {booking._id}
                    </p>
                    <p>
                      <b>Check-In Date</b>: {booking.fromdate}
                    </p>
                    <p>
                      <b>Check-Out Date</b>: {booking.todate}
                    </p>
                    <p>
                      <b>Amount</b>: {booking.totalamount}
                    </p>
                    <p>
                      <b>Status</b>:{' '}
                      <Tag color={booking.status === 'booked' ? 'green' : 'red'}>
                        {booking.status === 'booked' ? 'CONFIRMED' : 'CANCELLED'}
                      </Tag>
                    </p>
                    {booking.status !== 'cancelled' && moment(booking.fromdate).isAfter(moment()) && (
                      <div className="text-right">
                        <button className="btn btn-primary" onClick={() => cancelBooking(booking._id, booking.roomid)}>
                          CANCEL BOOKING
                        </button>
                      </div>
                    )}
                  </div>
                );
              })}
          </div>
        </div>
      </div>
      <FooterPage />
    </div>
  );
}

export default MyBooking;
