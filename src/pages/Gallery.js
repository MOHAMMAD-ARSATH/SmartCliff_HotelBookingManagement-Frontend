import { useState, useEffect } from 'react';

import Navbar1 from '../components/UserNav';
import Breadcrumbs from '../components/Breadcrumbs';
import GalleryVid from '../components/GalleryVid';
import GalleryImg from '../components/GalleryImg';
import Footer from '../components/Footer';
import Loader from '../components/Loader';

function Gallery() {
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
    { label: 'Gallery' },
  ];

  return (
    <div>
      <Navbar1 />
      <Breadcrumbs paths={breadcrumbsPaths} />
      {loading ? (
        <Loader /> 
      ) : (
        <>
          <GalleryVid />
          <GalleryImg />
        </>
      )}
      <Footer />
    </div>
  );
}

export default Gallery;