import { useState, useEffect } from 'react';
import { Carousel } from 'react-bootstrap';
import { Dialog } from '@mui/material';
import { makeStyles } from '@mui/styles';

import Breadcrumbs from '../components/Breadcrumbs';
import Navbar1 from '../components/UserNav';
import Footer from '../components/Footer';
import Loader from '../components/Loader';

const useStyles = makeStyles({
    modal: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
})

function AboutDesc() {
    const classes = useStyles();
    const [visible, setVisible] = useState(false);
    const [selectedImage, setSelectedImage] = useState(null);

    const handleImageClick = (image) => {
        setSelectedImage(image);
        setVisible(true);
    };

    const handleCloseModal = () => {
        setVisible(false);
        setSelectedImage(null);
    };

    const [loading, setLoading] = useState(true);
    useEffect(() => {
        const fetchData = async () => {
            try {

                setLoading(false);
            } catch (error) {
                console.error('Error fetching data:', error);
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    const breadcrumbsPaths = [
        { label: 'Home', link: '/' },
        { label: 'About' },
    ];

    const carouselImages = [
        'https://cjpallazzio.com/wp-content/uploads/2023/06/a3.jpg',
        'https://cjpallazzio.com/wp-content/uploads/2023/06/a1.jpg',
        "https://cjpallazzio.com/wp-content/uploads/2023/06/a2.jpg",
        'https://cjpallazzio.com/wp-content/uploads/2023/06/a4.jpg',
        'https://cjpallazzio.com/wp-content/uploads/2023/06/a5.jpg'
    ];

    return (
        <div>
            <Navbar1 />
            <Breadcrumbs paths={breadcrumbsPaths} />
            {loading ? (
                <Loader />
            ) : (
                <div>
                    <div className="row ml-3 mt-5 mb-5 mr-3">

                        <div className="col-md-6 mt-4">
                            <Carousel nextLabel="" prevLabel="" fade>
                                {carouselImages.map((image, index) => (
                                    <Carousel.Item key={index} onClick={() => handleImageClick(image)}>
                                        <img
                                            className="d-block w-100"
                                            src={image}
                                            alt={`Slide ${index + 1}`}
                                            style={{
                                                height: "400px",
                                                borderRadius: "5%"
                                            }}
                                        />
                                    </Carousel.Item>
                                ))}
                            </Carousel>
                        </div>
                        <div className="col-md-6 mt-4">
                            <div className='mb-2'><h3><b>The Hospitality Jewel</b></h3></div>
                            <div style={{ fontSize: "16px" }}>
                                <div>
                                    Four years feels like a lifetime when the going gets tough. Today Coimbatore Jewellers, Salem is Proud to say Hotel CJ Pallazzio is truly <span style={{ fontWeight: "bold" }}>“The Hospitality Jewel”</span> of Salem city.
                                </div>
                                <br />
                                <div>
                                    We started welcoming our First Guests on January 29th 2016. CJ Pallazzio boasts of the most spacious and contemporary rooms in Salem. All our 72 Rooms and Suites are Wi-Fi Enabled and have beautiful view of Salem City on the Bangalore National Highway. We offer this with No Pollution in guest privacy levels with Three Layers of Sandwich Glass. You are absolutely away from the Real World Noise and Heat. The Pallazzio suite sets the bench mark for luxury in Salem.
                                </div>
                                <br />
                                <div>
                                    CJ Pallazzio is a  <span style={{ fontWeight: "bold" }}>“Business Class Luxury”</span> hotel offering comfort stay for it’s guests, located at the Salem – Bangalore NH7 – Junction Main Road Circle, fitted with 72 Rooms, including 12 Suites, 4 Conference halls capable of accommodating more than 800 guests. The Multi Cuisine restaurant, Coffee Shop, Bar, Lounge and Rooftop barbeque at the hotel add to your comfort.
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className='ml-4 mr-5 mb-5' style={{ fontSize: "16px" }}> Enjoy our hospitality; enjoy <span style={{ fontWeight: "bold" }}>‘Business Class Luxury’</span>, be our guest whether you are looking for stopovers between trips or a business visit to the city. Welcoming associates, friends or relatives for a sumptuous celebration is yet another reason to be here. What more, enjoy our exclusive spa and completely unwind to the luxury of our therapy while you are here.</div>
                    <Dialog open={visible}
                        onClose={handleCloseModal}
                        className={classes.modal}
                        maxWidth="lg">
                        {selectedImage && (
                            <img
                                className="d-block mx-auto"
                                style={{ height: '500px', width: '950px' }}
                                src={selectedImage}
                                alt="Selected Slide"
                                size='lg'
                            />
                        )}
                    </Dialog>
                </div>
            )}
            <Footer />
        </div>
    );
}

export default AboutDesc;