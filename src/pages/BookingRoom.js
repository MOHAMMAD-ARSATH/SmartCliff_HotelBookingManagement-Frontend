import React, { useState, useEffect } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import moment from 'moment';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import { Link } from 'react-router-dom';

import Loader from '../components/Loader';
import Error from '../components/Error';
import Breadcrumbs from '../components/Breadcrumbs';
import Navbar1 from '../components/UserNav';
import FooterPage from '../components/Footer';

const BookingRoom = () => {
    const { roomid } = useParams();
    const [fromdate, setfromdate] = useState(null);
    const [todate, settodate] = useState(null);
    const [room, setRoom] = useState();
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState();
    const [users, setUsers] = useState([]);
    const [count, setCount] = useState(1);
    const [altphone, setaltphone] = useState("");
    const navigate = useNavigate();

    const handlefromdateChange = (date) => {
        setfromdate(date);
    };

    const handletodateChange = (date) => {
        settodate(date);
    };

    const handleBookRoom = () => {

        console.log('Room booked from', moment(fromdate).format('DD/MM/YYYY'), 'to', moment(todate).format('DD/MM/YYYY'));
    };

    useEffect(() => {
        // if (!sessionStorage.getItem('currentUser')) {
        //     navigate('/login');
        // }

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
    }, [roomid, navigate]);

    const handleIncrement = () => {
        setCount(count + 1);
    };

    const handleDecrement = () => {
        if (count > 1) {
            setCount(count - 1);
        }
    };

    async function fetchMyData() {
        setError("");
        setLoading(true);
        try {
            const data = (await axios.post("/api/users/getallusers")).data;
            setUsers(data);
        } catch (error) {
            console.log(error);
            setError(error);
        }
        setLoading(false);
    }
    useEffect(() => {
        fetchMyData();
    }, []);

    const currentuser = users.find(user => user.email === JSON.parse(sessionStorage.getItem("currentUser")).email);
    console.log("Current User:", currentuser);
    // const phoneno = currentuser.phone;
    // console.log("Current User Phone No.:", phoneno);

    const [altphoneError, setaltphoneError] = useState('');

    const validatealtaltphone = (value) => {
        // Regular expression for Indian altphone number validation
        const altphoneRegex = /^[6-9]\d{9}$/;

        const phoneno = currentuser.phone; // Assuming currentuser is available

        if (!value) {
            setaltphoneError('Alternate phone number is required');
        } else if (!altphoneRegex.test(value)) {
            setaltphoneError('Invalid phone number');
        } else if (String(value) === String(currentuser.phone)) {
            setaltphoneError('Different from primary phone number.');
        } else {
            setaltphoneError('');
        }
        setaltphone(value);
    };

    const [currentUser, setCurrentUser] = useState(JSON.parse(sessionStorage.getItem("currentUser")) || {});

    const handleNameChange = (e) => {
        setCurrentUser({ ...currentUser, name: e.target.value });
    };

    const handleEmailChange = (e) => {
        setCurrentUser({ ...currentUser, email: e.target.value });
    };

    const handlePhoneChange = (e) => {
        setCurrentUser({ ...currentUser, phone: e.target.value });
    };



    const breadcrumbsPaths = [
        { label: 'Home', link: '/' },
        { label: 'Rooms', link: '/allrooms' },
        { label: `${room?.type || 'Room'}`, link: `/room/${roomid}` },
        { label: 'Booking Details' },
    ];

    return (

        <div>
            <Navbar1 />
            <Breadcrumbs paths={breadcrumbsPaths} />
            {loading ? (
                <Loader />
            ) : room ? (
                <div className='row m-5 bs'>


                    <div className='col-md-6'>
                        <h3>{room.type}</h3>
                        {room.imageurls && room.imageurls.length > 0 ? (
                            <img src={room.imageurls[0]} alt={room.name}
                                height='400px'
                                style={{ objectFit: 'cover', width: '100%', borderRadius: '20px' }} />
                        ) : (
                            <p>No images available</p>
                        )}
                    </div>
                    <div className='col-md-6'>
                        <h1><b>Booking Details</b></h1>
                        <hr />
                        {currentUser && currentuser && (
                            <div className='row mt-4'>
                                <div className='col-md-6'>
                                    <label style={{ width: "100%" }}>
                                        <b>Name :</b>
                                        <input
                                            type="text"
                                            value={currentUser.name}
                                            onChange={handleNameChange}
                                            disabled
                                            className='form-control' // Add text-center class
                                        />
                                    </label>
                                </div>


                                <div className='col-md-6'>
                                    <label style={{ width: "100%" }}>
                                        <b>Email ID :</b>
                                        <input
                                            type="text"
                                            value={currentUser.email}
                                            onChange={handleEmailChange}
                                            disabled
                                            className='form-control' // Add text-center class
                                        />
                                    </label>
                                </div>

                                <div className='col-md-6 mt-3'>
                                    <label style={{ width: "100%" }}>
                                        <b>Phone Number :</b>
                                        <input
                                            type="number"
                                            value={currentuser.phone}
                                            onChange={handlePhoneChange}
                                            disabled
                                            className='form-control' // Add text-center class
                                        />
                                    </label>
                                </div>

                                <div className='col-md-6 mt-3'>
                                    <label style={{ width: "100%" }}>
                                        <b>Alternate Phone Number :</b>
                                        <input type="number" value={altphone} onChange={(e) => validatealtaltphone(e.target.value)} className='form-control' />
                                    </label>
                                    {altphoneError && <span style={{ color: 'red' }}>{altphoneError}</span>}
                                </div>
                            </div>
                        )}
                        <div className='row mt-1 mb-5'>
                            <div className='col-md-4 mt-3'>
                                <label ><b>Check-In Date :</b></label>
                                <DatePicker
                                    selected={fromdate}
                                    onChange={handlefromdateChange}
                                    dateFormat="dd/MM/yyyy"
                                    minDate={new Date()} // Disable past dates
                                    isClearable
                                    className='form-control' // Add text-center class
                                />
                            </div>

                            <div className='col-md-4 mt-3'>
                                <label ><b>Check-Out Date :</b></label>
                                <DatePicker
                                    selected={todate}
                                    onChange={handletodateChange}
                                    dateFormat="dd/MM/yyyy"
                                    minDate={fromdate || new Date()} // Disable dates before check-in date
                                    isClearable
                                    className='form-control' // Add text-center class
                                />
                            </div>
                            <div className='col-md-4 mt-3'>
                                <label><b>Rooms :</b></label>
                                <div className='input-group'>
                                    <button className='input-group-text mt-2' type="button" style={{ width: "20%", height: '38px' }} onClick={handleDecrement}><i className='fas fa-minus'></i></button>
                                    <input
                                        type='text'
                                        className='form-control text-center w-25' // Adjust width here, e.g., w-75 for 75% width
                                        value={count}
                                    />

                                    <button className='input-group-text mt-2' type="button" style={{ width: "20%", height: '38px' }} onClick={handleIncrement}><i className='fas fa-plus'></i></button>
                                </div>
                            </div>
                        </div>
                        <Link to={`/payment/${room._id}/${room.type}/${count}/${altphone}/${fromdate}/${todate}`}>
                            <button
                                className='btn btn-primary mt-4'
                                onClick={handleBookRoom}
                                disabled={!fromdate || !todate || !altphone || altphoneError}
                                style={{ float: "right" }}
                            >
                                Book Room
                            </button>
                        </Link>

                    </div>

                </div>


            ) : (
                <Error />
            )}
            <FooterPage />
        </div>

    );
};

export default BookingRoom;





